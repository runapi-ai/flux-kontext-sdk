import type { AsyncTaskStatus } from '@runapi.ai/core';

// Model types
export type FluxKontextModel = 'flux-kontext-pro' | 'flux-kontext-max';

// Aspect ratio options
export type AspectRatio = '21:9' | '16:9' | '4:3' | '1:1' | '3:4' | '9:16';

// Output format
export type OutputFormat = 'jpeg' | 'png';

// Generation params
export interface TextToImageParams {
  model: FluxKontextModel;
  prompt: string;
  callback_url?: string;
  aspect_ratio?: AspectRatio;
  output_format?: OutputFormat;
  input_image?: string;
  /** Auto-translate prompt to English (default: true). */
  enable_translation?: boolean;
  prompt_upsampling?: boolean;
  safety_tolerance?: number;
  upload_cn?: boolean;
  watermark?: string;
}

// Response types
export interface TaskCreateResponse {
  id: string;
}

export interface Image {
  url: string;
  origin_url?: string;
}

export interface TextToImageResponse {
  id: string;
  status: AsyncTaskStatus;
  images?: Image[];
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
