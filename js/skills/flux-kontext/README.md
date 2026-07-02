<p align="center">
  <a href="https://github.com/runapi-ai/flux-kontext">
    <h3 align="center">Flux Kontext API Skill for RunAPI</h3>
  </a>
</p>

<p align="center">
  Install this agent skill, inspect Flux Kontext fields, then run jobs through the RunAPI CLI.
</p>

<p align="center">
  <a href="https://runapi.ai/models/flux-kontext"><strong>Model Reference</strong></a> · <a href="https://github.com/runapi-ai/cli"><strong>CLI</strong></a> · <a href="https://github.com/runapi-ai/flux-kontext-sdk"><strong>SDK</strong></a>
</p>

<div align="center">

[![skills.sh](https://www.skills.sh/b/runapi-ai/flux-kontext)](https://www.skills.sh/runapi-ai/flux-kontext/flux-kontext)
[![ClawHub](https://img.shields.io/badge/ClawHub-runapi--flux--kontext-111827)](https://clawhub.ai/runapi-ai/runapi-flux-kontext)
[![License](https://img.shields.io/github/license/runapi-ai/flux-kontext)](https://github.com/runapi-ai/flux-kontext/blob/main/LICENSE)

</div>
<br/>

Generate and transform images with Flux Kontext Pro and Max. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Flux Kontext through RunAPI.

The canonical agent file is `skills/flux-kontext/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/flux-kontext -g
```

Or paste this prompt to your AI agent:

```text
Install the flux-kontext skill for me:

1. Clone https://github.com/runapi-ai/flux-kontext
2. Copy the skills/flux-kontext/ directory into your
   user-level skills directory (e.g. ~/.claude/skills/
   for Claude Code, ~/.codex/skills/ for Codex).
3. Verify that SKILL.md is present.
4. Confirm the install path when done.
```

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

- Integration work uses the target language SDK; one-off generation, manual smoke tests, debugging, or user-requested CLI runs use the RunAPI CLI skill: https://github.com/runapi-ai/cli-skill
- RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.
- Keep API keys in `RUNAPI_API_KEY` or RunAPI CLI config; never commit secrets.
- Prefer `create`, `get`, and `run` JSON passthrough patterns instead of inventing flags for every model parameter.
- For pricing, rate-limit, and commercial-usage answers, link to the variant page rather than the repository README.

## License

Licensed under the Apache License, Version 2.0.
