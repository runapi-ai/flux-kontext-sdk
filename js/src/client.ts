import { BaseClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';

/**
 * Flux Kontext image generation and editing API client.
 *
 * Supports pure text-to-image generation and image editing via
 * `source_image_url`. Pro and max quality tiers available.
 *
 * @example
 * ```typescript
 * const client = new FluxKontextClient({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://runapi.ai',
 * });
 *
 * const result = await client.textToImage.run({
 *   model: 'flux-kontext-pro',
 *   prompt: 'A futuristic cityscape at night',
 * });
 * ```
 */
export class FluxKontextClient extends BaseClient {
  /** Image generation and editing operations. */
  public readonly textToImage: TextToImage;

  constructor(options: ClientOptions = {}) {
    super(options);
    this.textToImage = new TextToImage(this.http);
  }
}
