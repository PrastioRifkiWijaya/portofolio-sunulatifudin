/**
 * Helper to determine the provider and embed URL for a given video URL.
 */

export type VideoProvider = 'youtube' | 'google-drive' | 'direct-video' | 'external' | 'invalid';

export interface VideoInfo {
  provider: VideoProvider;
  embedUrl: string | null;
  videoId?: string | null;
  originalUrl: string;
}

export function parseVideoUrl(url: string): VideoInfo {
  if (!url || typeof url !== 'string') {
    return { provider: 'invalid', embedUrl: null, originalUrl: '' };
  }

  try {
    const parsedUrl = new URL(url);

    // Only allow HTTP/HTTPS
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return { provider: 'invalid', embedUrl: null, originalUrl: url };
    }

    // YouTube
    if (
      parsedUrl.hostname === 'youtube.com' ||
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtu.be'
    ) {
      let videoId = null;
      if (parsedUrl.hostname === 'youtu.be') {
        videoId = parsedUrl.pathname.slice(1);
      } else {
        videoId = parsedUrl.searchParams.get('v');
      }

      if (videoId) {
        return {
          provider: 'youtube',
          videoId,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          originalUrl: url,
        };
      }
    }

    // Google Drive
    if (
      parsedUrl.hostname === 'drive.google.com' ||
      parsedUrl.hostname === 'docs.google.com'
    ) {
      // Typically: https://drive.google.com/file/d/VIDEO_ID/view
      const match = parsedUrl.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return {
          provider: 'google-drive',
          videoId: match[1],
          embedUrl: `https://drive.google.com/file/d/${match[1]}/preview`,
          originalUrl: url,
        };
      }
    }

    // Direct Video (mp4, webm, etc)
    const pathname = parsedUrl.pathname.toLowerCase();
    if (pathname.endsWith('.mp4') || pathname.endsWith('.webm') || pathname.endsWith('.ogg')) {
      return {
        provider: 'direct-video',
        embedUrl: url,
        originalUrl: url,
      };
    }

    // External (Valid HTTP/HTTPS but not explicitly supported for embed)
    return { provider: 'external', embedUrl: null, originalUrl: url };
  } catch {
    // Invalid URL format
    return { provider: 'invalid', embedUrl: null, originalUrl: url };
  }
}
