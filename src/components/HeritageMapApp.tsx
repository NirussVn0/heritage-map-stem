'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  HERITAGE_CONFIG,
  type MediaSlotId,
} from '@/src/config/heritage.config';
import { BotanicalFrameScene } from '@/src/components/art/BotanicalFrameScene';
import { FlagGarlandBanner } from '@/src/components/art/FlagGarlandBanner';
import { MapStage } from '@/src/components/map/MapStage';
import { FloatingHudDock } from '@/src/components/hud/FloatingHudDock';
import { MediaPreviewModal } from '@/src/components/modal/MediaPreviewModal';

const CONFIG_LINKS: Record<MediaSlotId, string> = {
  pdf: HERITAGE_CONFIG.links.heritageProfilePdfUrl,
  video: HERITAGE_CONFIG.links.introVideoUrl,
  english: HERITAGE_CONFIG.links.englishGuideFileUrl,
  solutions: HERITAGE_CONFIG.links.conservationPlanFileUrl,
};

/**
 * Khung ứng dụng chính HERITAGE MAP theo phong cách cổng trại Ngày hội STEM:
 * - Đọc toàn bộ đường dẫn tư liệu trực tiếp từ src/config/heritage.config.ts
 * - Lớp nền cây xanh rực rỡ + cảnh Chiến sĩ – Nón lá – Nửa lon gạo hòa vào cạnh dưới
 * - Dải cờ Tổ quốc treo cong dọc mép trên
 * - Chỉ dẫn lần đầu tự ẩn ngay khi người dùng có tương tác bất kỳ
 */
export function HeritageMapApp() {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    HERITAGE_CONFIG.milestones[0].id
  );
  const [activeModalId, setActiveModalId] = useState<MediaSlotId | null>(null);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  const markInteracted = useCallback(() => {
    setHasUserInteracted(true);
  }, []);

  // Tự động ẩn chỉ dẫn lần đầu ngay khi người dùng chạm, bấm chuột, cuộn, nhấn phím hoặc bấm vào iframe bản đồ
  useEffect(() => {
    if (hasUserInteracted) return;
    const handleFirstInteraction = () => setHasUserInteracted(true);

    window.addEventListener('pointerdown', handleFirstInteraction, {
      once: true,
      capture: true,
    });
    window.addEventListener('keydown', handleFirstInteraction, {
      once: true,
      capture: true,
    });
    window.addEventListener('wheel', handleFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener('blur', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction, {
        capture: true,
      });
      window.removeEventListener('keydown', handleFirstInteraction, {
        capture: true,
      });
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('blur', handleFirstInteraction);
    };
  }, [hasUserInteracted]);

  return (
    <main className="relative h-dvh w-screen overflow-hidden text-[#143D28]">
      {/* Lớp 1: Không gian cây xanh bao quanh + Cảnh Nửa Lon hòa tự nhiên vào cạnh dưới */}
      <BotanicalFrameScene />

      {/* Lớp 2: Dải cờ Tổ quốc treo cong phấp phới dọc mép trên trang */}
      <FlagGarlandBanner />

      {/* Lớp 3: Không gian Bản đồ & Bảng điều khiển nằm gọn bên trong khung cây xanh và dải cờ */}
      <div className="relative z-10 flex h-dvh w-full gap-3 lg:gap-4 pt-[40px] sm:pt-[46px] px-2.5 sm:px-4 lg:px-7 pb-3 sm:pb-4 lg:pb-[74px]">
        <div className="relative flex-1 min-w-0 h-full">
          <MapStage
            isHudCollapsed={isHudCollapsed}
            onToggleHudCollapse={() => {
              markInteracted();
              setIsHudCollapsed((prev) => !prev);
            }}
            onUserInteract={markInteracted}
          />
        </div>

        <FloatingHudDock
          activeMilestoneId={activeMilestoneId}
          onSelectMilestone={(id) => {
            markInteracted();
            setActiveMilestoneId(id);
          }}
          onOpenMedia={(id) => {
            markInteracted();
            setActiveModalId(id);
          }}
          isHudCollapsed={isHudCollapsed}
          onToggleHudCollapse={() => {
            markInteracted();
            setIsHudCollapsed((prev) => !prev);
          }}
          showFirstVisitGuide={!hasUserInteracted}
          resolvedLinks={CONFIG_LINKS}
        />
      </div>

      {/* Cửa sổ Popup MVP: Đọc trực tiếp link từ heritage.config.ts */}
      <MediaPreviewModal
        activeModalId={activeModalId}
        resolvedLinks={CONFIG_LINKS}
        onSelectModal={setActiveModalId}
        onClose={() => setActiveModalId(null)}
      />
    </main>
  );
}
