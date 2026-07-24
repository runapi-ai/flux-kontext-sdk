"""Flux Kontext text-to-image resource."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..contract_gen import CONTRACT
from ..types import (
    CompletedTextToImageResponse,
    TextToImageResponse,
)


class TextToImage(Resource):
    """Generate and edit images with Flux Kontext models."""

    ENDPOINT = "/api/v1/flux_kontext/text_to_image"

    RESPONSE_CLASS = TextToImageResponse
    COMPLETED_RESPONSE_CLASS = CompletedTextToImageResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create an image generation task and poll until it completes.

        Args:
            **params: Image generation parameters (model, prompt, ...).

        Returns:
            The completed image generation response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create an image generation task and return immediately with an id.

        Args:
            **params: Image generation parameters (model, prompt, ...).

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_contract(CONTRACT["text-to-image"], compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of an image generation task.

        Args:
            id: Task id.

        Returns:
            The current image generation status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)
