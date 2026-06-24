<p align="center">
  <a href="https://runapi.ai"><img src="https://runapi.ai/icon.svg" height="56" alt="RunAPI"></a>
</p>

<h3 align="center">
  <a href="https://github.com/runapi-ai/flux-kontext-sdk">Flux Kontext API SDK for RunAPI</a>
</h3>

<p align="center">
  Flux Kontext API SDKs for JavaScript, Python, Ruby, Go, and Java on RunAPI.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/@runapi.ai/flux-kontext)](https://www.npmjs.com/package/@runapi.ai/flux-kontext)
[![PyPI](https://img.shields.io/pypi/v/runapi-flux-kontext)](https://pypi.org/project/runapi-flux-kontext/)
[![RubyGems](https://img.shields.io/gem/v/runapi-flux_kontext)](https://rubygems.org/gems/runapi-flux_kontext)
[![Go Reference](https://pkg.go.dev/badge/github.com/runapi-ai/flux-kontext-sdk/go.svg)](https://pkg.go.dev/github.com/runapi-ai/flux-kontext-sdk/go)
[![Maven Central](https://img.shields.io/maven-central/v/ai.runapi/runapi-flux-kontext)](https://central.sonatype.com/artifact/ai.runapi/runapi-flux-kontext)
[![License](https://img.shields.io/github/license/runapi-ai/flux-kontext-sdk)](https://github.com/runapi-ai/flux-kontext-sdk/blob/main/LICENSE)

</div>
<br/>

The Flux Kontext API SDK packages JavaScript, Python, Ruby, Go, and Java clients for Flux Kontext on RunAPI. Use it for text-to-image and source-image editing workflows when your app needs typed request builders, predictable task polling, file upload helpers, account helpers, and consistent RunAPI errors.

Flux Kontext is listed in the RunAPI model catalog at https://runapi.ai/models/flux-kontext. Variant pages below carry pricing, rate-limit, and commercial-usage details. The public `flux-kontext-sdk` repository groups the language packages, examples, CI, and release tags for this model.

## Install

```bash
npm install @runapi.ai/flux-kontext
pip install runapi-flux-kontext
gem install runapi-flux_kontext
go get github.com/runapi-ai/flux-kontext-sdk/go@latest
```

Gradle:

```kotlin
dependencies {
  implementation("ai.runapi:runapi-flux-kontext:0.1.0")
}
```

Maven:

```xml
<dependency>
  <groupId>ai.runapi</groupId>
  <artifactId>runapi-flux-kontext</artifactId>
  <version>0.1.0</version>
</dependency>
```

Use the Java BOM when installing multiple RunAPI Java modules:

```kotlin
dependencies {
  implementation(platform("ai.runapi:runapi-bom:0.1.0"))
  implementation("ai.runapi:runapi-flux-kontext")
}
```

## What you can build

- Build apps, agent workflows, batch jobs, and production services around Flux Kontext requests.
- Install only the language package your app needs while keeping one model-specific repository for docs and releases.
- Use `create` for submit-only jobs, `get` for status lookup, and `run` for submit-and-poll scripts.
- Upload local files, URL files, or base64 files through shared RunAPI file helpers.
- Handle validation, authentication, rate limits, insufficient credits, task failures, and polling timeouts through RunAPI SDK errors.

## Java quick start

```java
import ai.runapi.fluxkontext.FluxKontextClient;
import ai.runapi.fluxkontext.types.TextToImageParams;
import ai.runapi.fluxkontext.types.CompletedTextToImageResponse;
import ai.runapi.fluxkontext.types.TextToImageModel;

FluxKontextClient client = FluxKontextClient.builder()
    .apiKey(System.getenv("RUNAPI_API_KEY"))
    .build();

CompletedTextToImageResponse result = client.textToImage().run(
    TextToImageParams.builder()
        .model(TextToImageModel.FLUX_KONTEXT_MAX)
        .prompt("A cinematic product photo of a matte black espresso machine")
        .aspectRatio("16:9")
        .sourceImageUrl(java.util.Arrays.asList("https://cdn.runapi.ai/public/samples/image.jpg"))
        .build()
);
```

Java packages target Java 8 bytecode and are tested on Java 8, 11, 17, and 21. Each model artifact depends on `ai.runapi:runapi-core`, so application code normally installs only `ai.runapi:runapi-flux-kontext`.

## Task lifecycle

Most media endpoints are asynchronous. `create()` submits a task and returns its id, `get(id)` fetches the latest task state, and `run(params)` creates the task and polls until it reaches a terminal state. In web request handlers, prefer `create()` plus webhook or later `get()` polling so the server does not hold a worker open.

## Repository layout

- `js/` publishes `@runapi.ai/flux-kontext`.
- `python/` publishes `runapi-flux-kontext`.
- `ruby/` publishes `runapi-flux_kontext` when RubyGems publishing resumes.
- `go/` publishes `github.com/runapi-ai/flux-kontext-sdk/go` and depends on `github.com/runapi-ai/core-sdk/go`.
- `java/` publishes `ai.runapi:runapi-flux-kontext` and depends on `ai.runapi:runapi-core`.

## Public links

- Model page: https://runapi.ai/models/flux-kontext
- SDK docs: https://runapi.ai/docs#sdk-flux-kontext
- Product docs: https://runapi.ai/docs#flux-kontext
- SDK repository: https://github.com/runapi-ai/flux-kontext-sdk
- Skill repository: https://github.com/runapi-ai/flux-kontext
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Full catalog: https://runapi.ai/models

## Pricing and variants

Use the most specific Flux Kontext variant page for pricing, rate limits, and commercial usage:
- [Flux Kontext Pro](https://runapi.ai/models/flux-kontext/pro)
- [Flux Kontext Max](https://runapi.ai/models/flux-kontext/max)

Default pricing link for the Flux Kontext SDK: https://runapi.ai/models/flux-kontext/pro

## File storage

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## FAQ

### Which package should I install for Flux Kontext work?

Install the model package for your language: `@runapi.ai/flux-kontext` on npm, `runapi-flux-kontext` on PyPI, `runapi-flux_kontext` on RubyGems, `github.com/runapi-ai/flux-kontext-sdk/go`, or `ai.runapi:runapi-flux-kontext`. Install core SDK packages only when you are building shared SDK infrastructure.

### Where should public links point?

Primary Flux Kontext links point to https://runapi.ai/models/flux-kontext. Pricing and usage-policy links point to variant pages such as https://runapi.ai/models/flux-kontext/pro. Provider comparisons point to https://runapi.ai/providers/black-forest-labs, and broad browsing points to https://runapi.ai/models.

## License

Licensed under the Apache License, Version 2.0.
