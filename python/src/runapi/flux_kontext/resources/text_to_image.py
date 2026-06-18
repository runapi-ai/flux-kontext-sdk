"""Flux Kontext text-to-image resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource, ValidationError

from ..types import (
    ASPECT_RATIOS,
    MODELS,
    OUTPUT_FORMATS,
    CompletedTextToImageResponse,
    TextToImageResponse,
)


class TextToImage(Resource):
    """Generate and edit images with Flux Kontext models."""

    ENDPOINT = "/api/v1/flux_kontext/text_to_image"

    RESPONSE_CLASS = TextToImageResponse
    COMPLETED_RESPONSE_CLASS = CompletedTextToImageResponse

    def run(self, **params: Any) -> Any:
        """Create an image generation task and poll until it completes.

        Args:
            **params: Image generation parameters (model, prompt, ...).

        Returns:
            The completed image generation response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create an image generation task and return immediately with an id.

        Args:
            **params: Image generation parameters (model, prompt, ...).

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of an image generation task.

        Args:
            id: Task id.

        Returns:
            The current image generation status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        if not params.get("model"):
            raise ValidationError("model is required")
        if not params.get("prompt"):
            raise ValidationError("prompt is required")

        model = params.get("model")
        if model not in MODELS:
            joined = ", ".join(MODELS)
            raise ValidationError(f"Invalid model: {model}. Must be one of: {joined}")

        self._validate_optional(params, "aspect_ratio", ASPECT_RATIOS)
        self._validate_optional(params, "output_format", OUTPUT_FORMATS)
