import { createHttpClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';

/**
 * Flux Kontext text-to-image API client.
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
export class FluxKontextClient {
  /** Text-to-image operations. */
  public readonly textToImage: TextToImage;

  constructor(options: ClientOptions = {}) {
    const http = createHttpClient(options);
    this.textToImage = new TextToImage(http);
  }
}
