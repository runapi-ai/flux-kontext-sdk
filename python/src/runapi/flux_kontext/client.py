"""Flux Kontext client."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import ProviderClient

from .resources.text_to_image import TextToImage


class FluxKontextClient(ProviderClient):
    """Flux Kontext image generation and editing client.

    Example::

        client = FluxKontextClient(api_key="sk-...")
        result = client.text_to_image.run(
            model="flux-kontext-pro", prompt="A futuristic cityscape"
        )
    """

    def __init__(self, api_key: Optional[str] = None, **options: Any) -> None:
        super().__init__(api_key, **options)
        http = self._http
        self.text_to_image = TextToImage(http)
