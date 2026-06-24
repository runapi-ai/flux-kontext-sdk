import pytest

from runapi.core import config
from runapi.core.errors import AuthenticationError, ValidationError
from runapi.flux_kontext import FluxKontextClient
from runapi.flux_kontext.resources.text_to_image import TextToImage
from runapi.flux_kontext.types import (
    CompletedTextToImageResponse,
    TextToImageResponse,
)


class FakeHttp:
    """Records (method, path, body) and replays preset responses by call order."""

    def __init__(self, *responses):
        self._responses = list(responses)
        self.calls = []

    def request(self, method, path, body=None, options=None):
        self.calls.append((method, path, body))
        if self._responses:
            return self._responses.pop(0)
        return {"id": "task_1", "status": "pending"}


@pytest.fixture(autouse=True)
def reset_config(monkeypatch):
    monkeypatch.delenv("RUNAPI_API_KEY", raising=False)
    monkeypatch.setattr(config, "api_key", None)
    yield


# --- authentication -------------------------------------------------------


def test_accepts_api_key_parameter():
    assert isinstance(
        FluxKontextClient(api_key="param-key", http_client=FakeHttp()),
        FluxKontextClient,
    )


def test_falls_back_to_global(monkeypatch):
    monkeypatch.setattr(config, "api_key", "global-key")
    assert isinstance(FluxKontextClient(http_client=FakeHttp()), FluxKontextClient)


def test_falls_back_to_env(monkeypatch):
    monkeypatch.setenv("RUNAPI_API_KEY", "env-key")
    assert isinstance(FluxKontextClient(http_client=FakeHttp()), FluxKontextClient)


def test_raises_without_api_key():
    with pytest.raises(AuthenticationError, match="API key is required"):
        FluxKontextClient()


# --- transport injection / accessors --------------------------------------


def test_uses_injected_http_client():
    fake = FakeHttp()
    client = FluxKontextClient(api_key="k", http_client=fake)
    assert client.text_to_image._http is fake


def test_exposes_resource_accessors():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    assert isinstance(client.text_to_image, TextToImage)


# --- request shapes -------------------------------------------------------


def test_create_posts_compacted_body():
    fake = FakeHttp({"id": "t1", "status": "pending"})
    client = FluxKontextClient(api_key="k", http_client=fake)
    result = client.text_to_image.create(
        model="flux-kontext-pro",
        prompt="hello",
        aspect_ratio="1:1",
        output_format=None,
    )
    assert fake.calls == [
        (
            "post",
            "/api/v1/flux_kontext/text_to_image",
            {"model": "flux-kontext-pro", "prompt": "hello", "aspect_ratio": "1:1"},
        ),
    ]
    assert isinstance(result, TextToImageResponse)
    assert result.id == "t1"


def test_get_fetches_by_id():
    fake = FakeHttp({"id": "t1", "status": "processing"})
    client = FluxKontextClient(api_key="k", http_client=fake)
    client.text_to_image.get("t1")
    assert fake.calls == [("get", "/api/v1/flux_kontext/text_to_image/t1", None)]


def test_run_polls_and_narrows_completed_type():
    fake = FakeHttp(
        {"id": "t1", "status": "pending"},
        {
            "id": "t1",
            "status": "completed",
            "images": [{"url": "https://x/y.png", "origin_url": "https://x/orig.png"}],
        },
    )
    client = FluxKontextClient(api_key="k", http_client=fake)
    result = client.text_to_image.run(model="flux-kontext-pro", prompt="hi")

    assert isinstance(result, CompletedTextToImageResponse)
    assert result.images[0].url == "https://x/y.png"
    assert result.images[0].origin_url == "https://x/orig.png"
    assert [call[0] for call in fake.calls] == ["post", "get"]


# --- validation -----------------------------------------------------------


def test_create_requires_model():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="model must be one of: flux-kontext-max, flux-kontext-pro"):
        client.text_to_image.create(prompt="hi")


def test_create_requires_prompt():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="prompt is required"):
        client.text_to_image.create(model="flux-kontext-pro")


def test_create_rejects_unknown_model():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="model must be one of: flux-kontext-max, flux-kontext-pro"):
        client.text_to_image.create(model="not-a-model", prompt="hi")


def test_create_rejects_invalid_aspect_ratio():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="aspect_ratio must be one of: 21:9, 16:9, 4:3, 1:1, 3:4, 9:16"):
        client.text_to_image.create(
            model="flux-kontext-pro", prompt="hi", aspect_ratio="99:1"
        )


def test_create_rejects_invalid_output_format():
    client = FluxKontextClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="output_format must be one of: jpeg, png"):
        client.text_to_image.create(
            model="flux-kontext-pro", prompt="hi", output_format="gif"
        )
