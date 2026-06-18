# Flux Kontext API Python SDK for RunAPI

The flux kontext api Python SDK is the language-specific package for Flux Kontext on RunAPI. Use this flux kontext api package for text-to-image, image editing, and creative production flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in Python.

This flux kontext api README is the Python package guide inside the public `flux-kontext-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/flux-kontext; for API reference, use https://runapi.ai/docs#flux-kontext; for SDK docs, use https://runapi.ai/docs#sdk-flux-kontext.

## Install

```bash
pip install runapi-flux-kontext
```

## Quick start

```python
from runapi.flux_kontext import FluxKontextClient

client = FluxKontextClient()  # reads RUNAPI_API_KEY, or pass api_key="sk-..."

task = client.text_to_image.create(
    model="flux-kontext-pro",
    prompt="A cinematic product photo on warm paper",
    aspect_ratio="1:1",
)
status = client.text_to_image.get(task.id)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion:

```python
result = client.text_to_image.run(
    model="flux-kontext-pro",
    prompt="A futuristic cityscape at dusk",
)
print(result.images[0].url)
```

In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Pass parameters as keyword arguments and catch the `runapi.flux_kontext` error classes when building image jobs or scripts. The available resource is `text_to_image`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/flux-kontext
- SDK docs: https://runapi.ai/docs#sdk-flux-kontext
- Product docs: https://runapi.ai/docs#flux-kontext
- Pricing and rate limits: https://runapi.ai/models/flux-kontext/pro
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/flux-kontext-sdk

## License

Licensed under the Apache License, Version 2.0.
