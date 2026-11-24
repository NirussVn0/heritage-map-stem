'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Clock,
  ExternalLink,
  FileText,
  Globe2,
  Link2,
  Loader2,
  PlayCircle,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  HERITAGE_CONFIG,
  type MediaItemConfig,
  type MediaSlotId,
} from '@/src/config/heritage.config';
import { normalizeEmbedUrl } from '@/src/utils/embedUrl';

interface MediaPreviewModalProps {
  activeModalId: MediaSlotId | null;
  resolvedLinks: Record<MediaSlotId, string>;
  onSelectModal: (id: MediaSlotId) => void;
  onClose: () => void;
}

const MODAL_ICONS: Record<MediaSlotId, typeof FileText> = {
  pdf: FileText,
  video: PlayCircle,
  english: Globe2,
  solutions: ShieldCheck,
};

interface MediaModalPanelProps {
  activeItem: MediaItemConfig;
  currentUrl: string;
  onSelectModal: (id: MediaSlotId) => void;
  onClose: () => void;
}

function MediaModalPanel({
  activeItem,
  currentUrl,
  onSelectModal,
  onClose,
}: MediaModalPanelProps) {
  const [loadedEmbedUrl, setLoadedEmbedUrl] = useState<string | null>(null);

  const normalized = normalizeEmbedUrl(currentUrl);
  const embedLoaded = Boolean(
    normalized?.embedUrl && loadedEmbedUrl === normalized.embedUrl
  );
  const ActiveIcon = MODAL_ICONS[activeItem.id];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 10 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col w-[92vw] max-w-5xl h-[85dvh] rounded-2xl bg-[#FFFDF8] border border-[#1B5A37]/20 shadow-[0_28px_70px_-20px_rgba(14,46,29,0.52)] overflow-hidden"
    >
      {/* THANH TIÊU ĐỀ + CHUYỂN NHANH 4 TƯ LIỆU */}
      <header className="shrink-0 border-b border-[#195334]/12 bg-[#F3F8EF] px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#195334] text-[#FFFDF8] shrink-0">
              <ActiveIcon className="w-4.5 h-4.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#456854] truncate">
                Kho tư liệu số hóa · {HERITAGE_CONFIG.site.commonName}
              </p>
              <h2
                id="heritage-modal-title"
                className="font-serif text-base sm:text-lg font-bold text-[#143D28] truncate"
              >
                {activeItem.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ tư liệu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#195334]/16 bg-[#FFFFFF] text-[#143D28] hover:bg-[#DA251D] hover:text-[#FFFDF8] hover:border-[#DA251D] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thanh chuyển nhanh giữa 4 mục tư liệu */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {HERITAGE_CONFIG.mediaItems.map((tab) => {
            const TabIcon = MODAL_ICONS[tab.id];
            const isCurrent = tab.id === activeItem.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectModal(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#DA251D] ${
                  isCurrent
                    ? 'bg-[#195334] text-[#FFFDF8]'
                    : 'bg-[#E5F0DE] text-[#195334] hover:bg-[#D5E7CA]'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* THÂN MODAL: ĐẦU CARD DẪN LINK GỐC + DƯỚI TỰ NHÚNG NẾU EMBED ĐƯỢC */}
      <div className="flex-1 min-h-0 flex flex-col bg-[#FFFDF8] overflow-hidden">
        {normalized ? (
          <>
            {/* ĐẦU CARD: NÚT DẪN THẲNG TỚI GOOGLE DRIVE / TỆP GỐC */}
            <div className="shrink-0 border-b border-[#195334]/12 bg-[#FFFFFF] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3E4] text-[#195334] shrink-0">
                  <Link2 className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#143D28] truncate">
                    {normalized.providerLabel} · {activeItem.title}
                  </p>
                  <p className="text-[11px] text-[#456854] truncate">
                    {normalized.directUrl}
                  </p>
                </div>
              </div>

              <a
                href={normalized.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] rounded-xl bg-[#DA251D] text-[#FFFDF8] hover:bg-[#B91C1C] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#195334]"
              >
                <span>Mở trên {normalized.providerLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PHẦN DƯỚI: TỰ HIỂN THỊ EMBED NẾU HỖ TRỢ NHÚNG */}
            {normalized.canEmbed && normalized.embedUrl ? (
              <div className="relative flex-1 min-h-0 w-full bg-[#F7FAF5]">
                {!embedLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#F3F8EF] text-[#195334]/80">
                    <Loader2 className="w-5 h-5 animate-spin text-[#DA251D]" />
                    <p className="text-xs font-medium">
                      Đang tải khung xem trực tiếp từ {normalized.providerLabel}…
                    </p>
                  </div>
                )}
                <iframe
                  key={normalized.embedUrl}
                  src={normalized.embedUrl}
                  title={activeItem.title}
                  onLoad={() => setLoadedEmbedUrl(normalized.embedUrl)}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#F7FAF5]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3E4] text-[#195334]">
                  <ExternalLink className="w-5 h-5" />
                </span>
                <div className="max-w-md space-y-1">
                  <p className="text-sm font-semibold text-[#143D28]">
                    Liên kết này mở trực tiếp ngoài khung nhúng
                  </p>
                  <p className="text-xs leading-relaxed text-[#456854]">
                    Bấm nút ở đầu thẻ phía trên để mở thẳng trên{' '}
                    {normalized.providerLabel}.
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* TRẠNG THÁI CHƯA CÓ LINK TRONG CONFIG — GỌN SẠCH, KHÔNG FORM NHẬP */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#F7FAF5]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3E4] text-[#195334]">
              <Clock className="w-5 h-5" />
            </span>
            <div className="max-w-sm space-y-1">
              <h3 className="font-serif text-base font-bold text-[#143D28]">
                Tư liệu đang được cập nhật
              </h3>
              <p className="text-xs leading-relaxed text-[#456854]">
                Liên kết cho mục {activeItem.title} sẽ hiển thị ngay sau khi bổ
                sung trong tệp cấu hình.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function MediaPreviewModal({
  activeModalId,
  resolvedLinks,
  onSelectModal,
  onClose,
}: MediaPreviewModalProps) {
  const activeItem = activeModalId
    ? HERITAGE_CONFIG.mediaItems.find((item) => item.id === activeModalId) ??
      null
    : null;

  useEffect(() => {
    if (!activeModalId) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalId, onClose]);

  return (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          key="media-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="heritage-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#143D28]/52 backdrop-blur-sm p-3 sm:p-5"
        >
          <MediaModalPanel
            key={activeItem.id}
            activeItem={activeItem}
            currentUrl={resolvedLinks[activeItem.id]}
            onSelectModal={onSelectModal}
            onClose={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
