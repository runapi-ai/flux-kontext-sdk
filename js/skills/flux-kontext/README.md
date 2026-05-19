# Flux Kontext API Skill for RunAPI

Generate and transform images with Flux Kontext Pro and Max. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Flux Kontext through RunAPI.

The canonical agent file is `skills/flux-kontext/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/flux-kontext -g
```

Or manually: clone this repo and copy `skills/flux-kontext/` into your agent's skills directory.

## Quick example

```typescript
import { FluxKontextClient } from '@runapi.ai/flux-kontext';

const client = new FluxKontextClient();
const result = await client.textToImage.run({
  model: 'flux-kontext-pro',
  prompt: 'A futuristic cityscape at night',
  aspect_ratio: '16:9',
});
const url = result.images[0].url;
```

## Routing

- Model page: https://runapi.ai/models/flux-kontext
- Product docs: https://runapi.ai/docs#flux-kontext
- SDK docs: https://runapi.ai/docs#sdk-flux-kontext
- SDK repository: https://github.com/runapi-ai/flux-kontext-sdk
- Pricing and rate limits: https://runapi.ai/models/flux-kontext/pro
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Browse all RunAPI models and skills: https://runapi.ai/models

## Variants

- [Flux Kontext Pro](https://runapi.ai/models/flux-kontext/pro)
- [Flux Kontext Max](https://runapi.ai/models/flux-kontext/max)

## Agent rules

- Keep API keys in `RUNAPI_API_KEY` or RunAPI CLI config; never commit secrets.
- Prefer `create`, `get`, and `run` JSON passthrough patterns instead of inventing flags for every model parameter.
- For flux kontext api pricing, rate-limit, and commercial-usage answers, link to the variant page rather than the repository README.

## License

Licensed under the Apache License, Version 2.0.
