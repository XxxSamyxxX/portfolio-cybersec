import { describe, it, expect } from 'vitest';
import { getOptimizedUrl } from '../../lib/imageUtils';

describe('getOptimizedUrl', () => {
  describe('with Unsplash URLs', () => {
    it('should add optimization params to Unsplash URL', () => {
      const url = 'https://images.unsplash.com/photo-123456';
      const result = getOptimizedUrl(url, 800, 80);
      
      expect(result).toBe('https://images.unsplash.com/photo-123456?auto=format&fit=crop&w=800&q=80');
    });

    it('should strip existing params and add new ones', () => {
      const url = 'https://images.unsplash.com/photo-123456?existing=param';
      const result = getOptimizedUrl(url, 1200, 90);
      
      expect(result).toBe('https://images.unsplash.com/photo-123456?auto=format&fit=crop&w=1200&q=90');
    });

    it('should use custom width and quality', () => {
      const url = 'https://images.unsplash.com/photo-abc';
      const result = getOptimizedUrl(url, 400, 60);
      
      expect(result).toContain('w=400');
      expect(result).toContain('q=60');
    });
  });

  describe('with Supabase URLs', () => {
    it('should add optimization params to Supabase URL', () => {
      const url = 'https://xyz.supabase.co/storage/v1/object/public/images/test.jpg';
      const result = getOptimizedUrl(url, 800, 80);
      
      expect(result).toContain('width=800');
      expect(result).toContain('format=webp');
      expect(result).toContain('quality=80');
    });

    it('should use & separator if URL already has params', () => {
      const url = 'https://xyz.supabase.co/storage/v1/object/public/images/test.jpg?token=abc';
      const result = getOptimizedUrl(url, 800, 80);
      
      expect(result).toContain('?token=abc&width=800');
    });

    it('should use ? separator if URL has no params', () => {
      const url = 'https://xyz.supabase.co/storage/v1/object/public/images/test.jpg';
      const result = getOptimizedUrl(url, 800, 80);
      
      expect(result).toContain('?width=800');
    });
  });

  describe('with other URLs', () => {
    it('should return URL unchanged for local images', () => {
      const url = '/images/local.jpg';
      const result = getOptimizedUrl(url);
      
      expect(result).toBe('/images/local.jpg');
    });

    it('should return URL unchanged for unknown hosts', () => {
      const url = 'https://example.com/image.jpg';
      const result = getOptimizedUrl(url);
      
      expect(result).toBe('https://example.com/image.jpg');
    });

    it('should return empty string for empty URL', () => {
      const result = getOptimizedUrl('');
      
      expect(result).toBe('');
    });

    it('should return empty string for undefined-like values', () => {
      // @ts-expect-error - testing edge case
      const result = getOptimizedUrl(null);
      
      expect(result).toBe('');
    });
  });

  describe('default parameters', () => {
    it('should use default width of 800 and quality of 80', () => {
      const url = 'https://images.unsplash.com/photo-123';
      const result = getOptimizedUrl(url);
      
      expect(result).toContain('w=800');
      expect(result).toContain('q=80');
    });
  });
});
