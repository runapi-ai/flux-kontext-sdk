import type { AsyncTaskStatus } from '@runapi.ai/core';

/** Model variants. Pro balances speed and quality; max prioritizes quality at longer generation time. */
export type FluxKontextModel = 'flux-kontext-pro' | 'flux-kontext-max';

/** Output aspect ratio. Landscape, portrait, and square orientations. Default: 16:9. */
export type AspectRatio = '21:9' | '16:9' | '4:3' | '1:1' | '3:4' | '9:16';

/** Output image encoding format. */
export type OutputFormat = 'jpeg' | 'png';

/**
 * Parameters for Flux Kontext image creation. Operates in two modes:
 * - **Generation**: omit `source_image_url` to create from scratch. `safety_tolerance` range is 0-6.
 * - **Editing**: provide `source_image_url` to transform the source image according to the prompt. `safety_tolerance` range is 0-2.
 */
export interface TextToImageParams {
  model: FluxKontextModel;
  /** Image description. English only unless `enable_translation` is on. */
  prompt: string;
  /** Webhook URL for async completion notifications. */
  callback_url?: string;
  aspect_ratio?: AspectRatio;
  output_format?: OutputFormat;
  /** Source image URL. When set, switches from generation to editing mode. */
  source_image_url?: string;
  /** Auto-translate non-English prompts before generation (default: true). */
  enable_translation?: boolean;
  /** Expand the prompt with additional detail for richer output (default: false). */
  enable_prompt_expansion?: boolean;
  /** Content filter tolerance. Range differs by mode: 0-6 for generation, 0-2 for editing (default: 2). */
  safety_tolerance?: number;
  /** Watermark identifier string to embed in the output. */
  watermark?: string;
}

export interface TaskCreateResponse {
  id: string;
}

/** A single generated or edited image result. */
export interface Image {
  /** CDN-delivered image URL. */
  url: string;
  /** Pre-CDN original location, when available. */
  origin_url?: string;
}

/** Task result for a Flux Kontext image creation request. */
export interface TextToImageResponse {
  id: string;
  status: AsyncTaskStatus;
  /** Output images, populated once the task completes successfully. */
  images?: Image[];
  /** Error message when the task has failed. */
  error?: string;
  [key: string]: unknown;
}

/**
 * Resolved response returned by `textToImage.run()` after polling sees
 * `status: 'completed'`. Narrows the base response so `images` is guaranteed
 * non-optional in user code.
 */
export type CompletedTextToImageResponse = TextToImageResponse & {
  status: 'completed';
  images: Image[];
};
