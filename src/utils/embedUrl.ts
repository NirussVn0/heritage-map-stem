export type EmbedProvider =
  | 'google-drive-file'
  | 'google-drive-folder'
  | 'google-docs'
  | 'google-slides'
  | 'google-sheets'
  | 'youtube'
  | 'canva'
  | 'google-mymaps'
  | 'direct-media'
  | 'external-link';

export interface NormalizedEmbedResult {
  embedUrl: string | null;
  directUrl: string;
  provider: EmbedProvider;
  providerLabel: string;
  canEmbed: boolean;
}

/**
 * Chuẩn hóa liên kết Google Drive (File / Thư mục), Google Docs/Slides, YouTube, Canva
 * và phân loại rõ đường dẫn nào có thể nhúng trực tiếp (canEmbed: true)
 * và đường dẫn nào mở qua thẻ dẫn link gốc (canEmbed: false).
 */
export function normalizeEmbedUrl(rawUrl: string): NormalizedEmbedResult | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  const path = parsed.pathname;

  // 1. Google My Maps
  if (
    (host.includes('google.com') || host.includes('google.com.vn')) &&
    path.includes('/maps/d/')
  ) {
    const mid = parsed.searchParams.get('mid');
    return {
      embedUrl: mid
        ? `https://www.google.com/maps/d/embed?mid=${encodeURIComponent(mid)}`
        : trimmed.replace(/\/(edit|viewer)(\?|$)/, '/embed$2'),
      directUrl: trimmed,
      provider: 'google-mymaps',
      providerLabel: 'Google My Maps',
      canEmbed: true,
    };
  }

  // 2. Google Drive Folder (/drive/folders/{ID}) -> không embed iframe ổn định, dẫn trực tiếp ở đầu card
  if (host.includes('drive.google.com') && path.includes('/folders/')) {
    return {
      embedUrl: null,
      directUrl: trimmed,
      provider: 'google-drive-folder',
      providerLabel: 'Thư mục Google Drive',
      canEmbed: false,
    };
  }

  // 3. Google Drive File (/file/d/{ID}/view hoặc ?id={ID})
  if (host.includes('drive.google.com')) {
    const fileMatch = path.match(/\/file\/d\/([^/]+)/);
    const idParam = parsed.searchParams.get('id');
    const fileId = fileMatch?.[1] ?? idParam;

    if (fileId) {
      return {
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        directUrl: `https://drive.google.com/file/d/${fileId}/view`,
        provider: 'google-drive-file',
        providerLabel: 'Google Drive',
        canEmbed: true,
      };
    }

    return {
      embedUrl: null,
      directUrl: trimmed,
      provider: 'google-drive-folder',
      providerLabel: 'Google Drive',
      canEmbed: false,
    };
  }

  // 4. Google Docs / Slides / Sheets
  if (host.includes('docs.google.com')) {
    const docMatch = path.match(/\/document\/d\/([^/]+)/);
    if (docMatch?.[1]) {
      return {
        embedUrl: `https://docs.google.com/document/d/${docMatch[1]}/preview`,
        directUrl: trimmed,
        provider: 'google-docs',
        providerLabel: 'Google Docs',
        canEmbed: true,
      };
    }

    const slideMatch = path.match(/\/presentation\/d\/([^/]+)/);
    if (slideMatch?.[1]) {
      return {
        embedUrl: `https://docs.google.com/presentation/d/${slideMatch[1]}/embed?start=false&loop=false&delayms=5000`,
        directUrl: trimmed,
        provider: 'google-slides',
        providerLabel: 'Google Slides',
        canEmbed: true,
      };
    }

    const sheetMatch = path.match(/\/spreadsheets\/d\/([^/]+)/);
    if (sheetMatch?.[1]) {
      return {
        embedUrl: `https://docs.google.com/spreadsheets/d/${sheetMatch[1]}/preview`,
        directUrl: trimmed,
        provider: 'google-sheets',
        providerLabel: 'Google Sheets',
        canEmbed: true,
      };
    }
  }

  // 5. YouTube (watch, youtu.be, shorts, embed)
  if (host.includes('youtube.com') || host.includes('youtu.be')) {
    let videoId: string | null = null;
    if (host.includes('youtu.be')) {
      videoId = path.replace(/^\/+/, '').split('/')[0] || null;
    } else if (path.startsWith('/embed/') || path.startsWith('/shorts/')) {
      videoId = path.split('/')[2] || null;
    } else {
      videoId = parsed.searchParams.get('v');
    }

    if (videoId) {
      return {
        embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`,
        directUrl: `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
        provider: 'youtube',
        providerLabel: 'YouTube',
        canEmbed: true,
      };
    }
  }

  // 6. Canva
  if (host.includes('canva.com')) {
    const embedUrl = parsed.searchParams.has('embed')
      ? trimmed
      : `${trimmed}${trimmed.includes('?') ? '&' : '?'}embed`;
    return {
      embedUrl,
      directUrl: trimmed,
      provider: 'canva',
      providerLabel: 'Canva',
      canEmbed: true,
    };
  }

  // 7. Tệp PDF hoặc video trực tiếp (.pdf, .mp4, .webm)
  if (/\.(pdf|mp4|webm|ogg)(\?|$)/i.test(path)) {
    return {
      embedUrl: trimmed,
      directUrl: trimmed,
      provider: 'direct-media',
      providerLabel: 'Tệp đa phương tiện',
      canEmbed: true,
    };
  }

  // 8. Các đường dẫn rút gọn / web ngoài thường chặn iframe -> chỉ hiện thẻ dẫn link gốc
  return {
    embedUrl: null,
    directUrl: trimmed,
    provider: 'external-link',
    providerLabel: 'Liên kết ngoài',
    canEmbed: false,
  };
}

/**
 * Tạo đường dẫn nhúng Google Maps chuẩn từ tọa độ GPS thực tế.
 */
export function buildCoordinateMapsEmbedUrl(
  lat: number,
  lng: number,
  mapType: 'm' | 'k' = 'm',
  zoom = 15
): string {
  return `https://maps.google.com/maps?q=${lat},${lng}&t=${mapType}&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
}
