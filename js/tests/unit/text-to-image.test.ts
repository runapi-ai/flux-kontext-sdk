import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TextToImage } from '../../src/resources/text-to-image';
import type { HttpClient } from '@runapi.ai/core';
import type { TextToImageResponse, TaskCreateResponse } from '../../src/types';

describe('TextToImage', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for flux-kontext-pro', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.create({
        model: 'flux-kontext-pro',
        prompt: 'A futuristic cityscape at night',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/flux_kontext/text_to_image',
        {
          body: {
            model: 'flux-kontext-pro',
            prompt: 'A futuristic cityscape at night',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send correct request for flux-kontext-max', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-456' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.create({
        model: 'flux-kontext-max',
        prompt: 'Ultra-detailed portrait',
        aspect_ratio: '16:9',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/flux_kontext/text_to_image',
        {
          body: {
            model: 'flux-kontext-max',
            prompt: 'Ultra-detailed portrait',
            aspect_ratio: '16:9',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send correct request with input_image for editing', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-789' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      await textToImage.create({
        model: 'flux-kontext-pro',
        prompt: 'Change the background to a sunset',
        input_image: 'https://example.com/photo.jpg',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/flux_kontext/text_to_image',
        {
          body: {
            model: 'flux-kontext-pro',
            prompt: 'Change the background to a sunset',
            input_image: 'https://example.com/photo.jpg',
          },
        }
      );
    });

    it('should include optional parameters', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-opt' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      await textToImage.create({
        model: 'flux-kontext-max',
        prompt: 'Test image',
        callback_url: 'https://example.com/callback',
        output_format: 'png',
        aspect_ratio: '1:1',
        enable_translation: true,
        prompt_upsampling: true,
        safety_tolerance: 3,
        upload_cn: true,
        watermark: false,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/flux_kontext/text_to_image',
        {
          body: {
            model: 'flux-kontext-max',
            prompt: 'Test image',
            callback_url: 'https://example.com/callback',
            output_format: 'png',
            aspect_ratio: '1:1',
            enable_translation: true,
            prompt_upsampling: true,
            safety_tolerance: 3,
            upload_cn: true,
            watermark: false,
          },
        }
      );
    });
  });

  describe('get', () => {
    it('should fetch task status by ID', async () => {
      const mockResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'processing',
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/flux_kontext/text_to_image/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should return completed status with images', async () => {
      const mockResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [
          { url: 'https://example.com/result.png', origin_url: 'https://origin.com/result.png' },
        ],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.get('task-123');

      expect(result.status).toBe('completed');
      expect(result.images).toHaveLength(1);
      expect(result.images?.[0].url).toBe('https://example.com/result.png');
      expect(result.images?.[0].origin_url).toBe('https://origin.com/result.png');
    });

    it('should return failed status with error', async () => {
      const mockResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'failed',
        error: 'Content policy violation',
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.get('task-123');

      expect(result.status).toBe('failed');
      expect(result.error).toBe('Content policy violation');
    });
  });

  describe('run', () => {
    it('should create and poll until completion', async () => {
      const createResponse: TaskCreateResponse = { id: 'task-123' };
      const processingResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'processing',
      };
      const completedResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [
          { url: 'https://example.com/result.png' },
        ],
      };

      vi.mocked(mockHttp.request)
        .mockResolvedValueOnce(createResponse)
        .mockResolvedValueOnce(processingResponse)
        .mockResolvedValueOnce(completedResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.run({
        model: 'flux-kontext-pro',
        prompt: 'Test image',
      });

      expect(result.status).toBe('completed');
      expect(result.images).toHaveLength(1);
    });
  });
});
