# Flux Kontext API JavaScript SDK for RunAPI

The flux kontext api JavaScript SDK is the language-specific package for Flux Kontext on RunAPI. Use this flux kontext api package for text-to-image, image editing, and creative production flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in JavaScript.

This flux kontext api README is the JavaScript package guide inside the public `flux-kontext-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/flux-kontext; for API reference, use https://runapi.ai/docs#flux-kontext; for SDK docs, use https://runapi.ai/docs#sdk-flux-kontext.

## Install

```bash
npm install @runapi.ai/flux-kontext
```

## Quick start

```typescript
import { FluxKontextClient } from '@runapi.ai/flux-kontext';

const client = new FluxKontextClient();
const task = await client.generations.create({
  // Pass the Flux Kontext JSON request body from https://runapi.ai/docs#flux-kontext.
});
const status = await client.generations.get(task.id);
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

## Language notes

Use the TypeScript types in `src/types.ts` and the resource classes under `src/resources` when building image applications. The available resources include generations. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

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
