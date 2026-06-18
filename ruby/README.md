# Flux Kontext API Ruby SDK for RunAPI

The flux kontext api Ruby SDK is the language-specific package for Flux Kontext on RunAPI. Use this flux kontext api package for text-to-image, image editing, and creative production flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in Ruby.

This flux kontext api README is the Ruby package guide inside the public `flux-kontext-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/flux-kontext; for API reference, use https://runapi.ai/docs#flux-kontext; for SDK docs, use https://runapi.ai/docs#sdk-flux-kontext.

## Install

```bash
gem install runapi-flux-kontext
```

## Quick start

```ruby
require "runapi-flux-kontext"

client = RunApi::FluxKontext::Client.new
task = client.generations.create(
  # Pass the Flux Kontext JSON request body from https://runapi.ai/docs#flux-kontext.
)
status = client.generations.get(task.id)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Use Ruby keyword arguments and the `RunApi::FluxKontext` error classes when building image jobs, Rails workers, or scripts. The available resources include generations. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

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
