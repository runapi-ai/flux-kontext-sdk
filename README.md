<p align="center">
  <a href="https://runapi.ai"><img src="https://runapi.ai/icon.svg" height="56" alt="RunAPI"></a>
</p>

<h3 align="center">
  <a href="https://github.com/runapi-ai/flux-kontext-sdk">Flux Kontext API SDK for RunAPI</a>
</h3>

<p align="center">
  Flux Kontext API SDKs for JavaScript, Ruby, and Go on RunAPI.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/@runapi.ai/flux-kontext)](https://www.npmjs.com/package/@runapi.ai/flux-kontext)
[![RubyGems](https://img.shields.io/gem/v/runapi-flux-kontext)](https://rubygems.org/gems/runapi-flux-kontext)
[![Go Reference](https://pkg.go.dev/badge/github.com/runapi-ai/flux-kontext-sdk/go.svg)](https://pkg.go.dev/github.com/runapi-ai/flux-kontext-sdk/go)
[![License](https://img.shields.io/github/license/runapi-ai/flux-kontext-sdk)](https://github.com/runapi-ai/flux-kontext-sdk/blob/main/LICENSE)

</div>
<br/>

The flux kontext api SDK packages JavaScript, Ruby, and Go clients for Flux Kontext on RunAPI. Use this flux kontext api SDK for text-to-image, image-to-image, edit, and creative production workflows that need typed installs, JSON request bodies, task polling, and consistent RunAPI errors across services.

Flux Kontext belongs to the Black Forest Labs catalog on RunAPI. The public model page is https://runapi.ai/models/flux-kontext; variant pages below carry pricing, rate-limit, and commercial-usage details. The public `flux-kontext-sdk` repository groups the JavaScript, Ruby, and Go packages for this model.

## Install

```bash
npm install @runapi.ai/flux-kontext
gem install runapi-flux-kontext
go get github.com/runapi-ai/flux-kontext-sdk/go@latest
```

## What you can build

- Build product imagery, creative automation, design previews, and agent image workflows with the flux kontext api SDK.
- Keep one model-specific repository while installing only the language package your app needs.
- Use `create` for submit-only jobs, `get` for status lookup, and `run` for submit-and-poll scripts.
- Handle authentication, validation, rate limits, insufficient credits, task failures, and polling timeouts through RunAPI SDK errors.

The JavaScript client exposes generations resources, and the Ruby and Go packages mirror the same RunAPI task lifecycle.

## JavaScript quick start

```typescript
import { FluxKontextClient } from '@runapi.ai/flux-kontext';

const client = new FluxKontextClient();

const task = await client.generations.create({
  // Pass the Flux Kontext request body documented at https://runapi.ai/docs#flux-kontext.
});

const status = await client.generations.get(task.id);
```

For short scripts, use `run` with the same JSON body to create the task and wait for completion. For web request handlers, prefer `create` plus webhook or later `get` polling so the server does not hold a worker open.

## Repository layout

- `js/` publishes `@runapi.ai/flux-kontext`.
- `ruby/` publishes `runapi-flux-kontext` when RubyGems publishing resumes.
- `go/` publishes `github.com/runapi-ai/flux-kontext-sdk/go` and depends on `github.com/runapi-ai/core-sdk/go`.

## Public links

- Model page: https://runapi.ai/models/flux-kontext
- SDK docs: https://runapi.ai/docs#sdk-flux-kontext
- Product docs: https://runapi.ai/docs#flux-kontext
- SDK repository: https://github.com/runapi-ai/flux-kontext-sdk
- Skill repository: https://github.com/runapi-ai/flux-kontext
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Full catalog: https://runapi.ai/models

## Pricing and variants

Use the most specific flux kontext api variant page for pricing, rate limits, and commercial usage:
- [Flux Kontext Pro](https://runapi.ai/models/flux-kontext/pro)
- [Flux Kontext Max](https://runapi.ai/models/flux-kontext/max)

Default pricing link for the flux kontext api SDK: https://runapi.ai/models/flux-kontext/pro

## FAQ

### Which package should I install for flux kontext api work?

Install the model package for your language: `@runapi.ai/flux-kontext`, `runapi-flux-kontext`, or `github.com/runapi-ai/flux-kontext-sdk/go`. Install core SDK packages only when you are building shared SDK infrastructure.

### Where should public links point?

Primary flux kontext api links point to https://runapi.ai/models/flux-kontext. Pricing and usage-policy links point to variant pages such as https://runapi.ai/models/flux-kontext/pro. Provider comparisons point to https://runapi.ai/providers/black-forest-labs, and broad browsing points to https://runapi.ai/models.

## License

Licensed under the Apache License, Version 2.0.
