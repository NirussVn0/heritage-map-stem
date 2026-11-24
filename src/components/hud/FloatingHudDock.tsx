'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  BookOpenText,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  Globe2,
  MapPin,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  HERITAGE_CONFIG,
  type MediaSlotId,
} from '@/src/config/heritage.config';
import { CurvedGuideArrow } from '@/src/components/art/CurvedGuideArrow';

interface FloatingHudDockProps {
  activeMilestoneId: string;
  onSelectMilestone: (id: string) => void;
  onOpenMedia: (id: MediaSlotId) => void;
  isHudCollapsed: boolean;
  onToggleHudCollapse: () => void;
  showFirstVisitGuide: boolean;
  resolvedLinks: Record<MediaSlotId, string>;
}

type InfoTab = 'address' | 'distinction';

const MEDIA_STYLE: Record<
  MediaSlotId,
  { icon: typeof FileText; iconBg: string; iconText: string; hoverBorder: string }
> = {
  pdf: {
    icon: FileText,
    iconBg: 'bg-[#FEF2F2] group-hover:bg-[#DA251D]',
    iconText: 'text-[#C81E1E] group-hover:text-[#FFFDF8]',
    hoverBorder: 'hover:border-[#DA251D]/45',
  },
  video: {
    icon: PlayCircle,
    iconBg: 'bg-[#FEF9E7] group-hover:bg-[#D97706]',
    iconText: 'text-[#B45309] group-hover:text-[#FFFDF8]',
    hoverBorder: 'hover:border-[#D97706]/45',
  },
  english: {
    icon: Globe2,
    iconBg: 'bg-[#ECFDF5] group-hover:bg-[#195334]',
    iconText: 'text-[#195334] group-hover:text-[#FFFDF8]',
    hoverBorder: 'hover:border-[#195334]/45',
  },
  solutions: {
    icon: ShieldCheck,
    iconBg: 'bg-[#F0FDF4] group-hover:bg-[#15803D]',
    iconText: 'text-[#15803D] group-hover:text-[#FFFDF8]',
    hoverBorder: 'hover:border-[#15803D]/45',
  },
};

export function FloatingHudDock({
  activeMilestoneId,
  onSelectMilestone,
  onOpenMedia,
  isHudCollapsed,
  onToggleHudCollapse,
  showFirstVisitGuide,
  resolvedLinks,
}: FloatingHudDockProps) {
  const [infoTab, setInfoTab] = useState<InfoTab>('address');
  const [copiedGps, setCopiedGps] = useState(false);

  const activeMilestone =
    HERITAGE_CONFIG.milestones.find((m) => m.id === activeMilestoneId) ??
    HERITAGE_CONFIG.milestones[0];

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText(HERITAGE_CONFIG.site.coordinates.label);
      setCopiedGps(true);
      window.setTimeout(() => setCopiedGps(false), 1800);
    } catch {
      // Bỏ qua nếu môi trường iframe hạn chế clipboard
    }
  };

  const renderMediaGrid = (compact = false) => (
    <div className="grid grid-cols-2 gap-2.5">
      {HERITAGE_CONFIG.mediaItems.map((item) => {
        const style = MEDIA_STYLE[item.id];
        const Icon = style.icon;
        const hasLiveLink = resolvedLinks[item.id].trim().length > 0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenMedia(item.id)}
            className={`group relative text-left rounded-xl border border-[#195334]/14 bg-[#FFFFFF] ${style.hoverBorder} hover:shadow-[0_10px_22px_-14px_rgba(20,61,40,0.34)] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D] ${
              compact ? 'p-2.5 min-h-[64px]' : 'p-3.5 min-h-[84px]'
            }`}
          >
            <div className="flex items-start justify-between gap-1.5">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors shrink-0 ${style.iconBg} ${style.iconText}`}
              >
                <Icon className="w-4 h-4" />
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#195334]/35 group-hover:text-[#DA251D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>

            <div className={compact ? 'mt-2' : 'mt-2.5'}>
              <p className="text-[13px] font-semibold text-[#143D28] leading-snug truncate">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-[#456854] truncate">
                {hasLiveLink ? item.shortSubtitle : 'Đang cập nhật'}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ==================== DESKTOP RIGHT HUD PANEL (>= 1024px) ==================== */}
      <AnimatePresence initial={false}>
        {!isHudCollapsed && (
          <motion.aside
            key="desktop-hud"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Bảng điều khiển thông tin và tư liệu di tích"
            className="relative hidden lg:flex flex-col h-full w-[35%] xl:w-[33%] min-w-[360px] max-w-[450px] shrink-0 rounded-2xl border border-[#1B5A37]/20 bg-[#FFFDF8]/95 backdrop-blur-md shadow-[0_18px_40px_-20px_rgba(20,61,40,0.34)]"
          >
            {/* MŨI TÊN CHỈ DẪN LẦN ĐẦU DUY NHẤT (TRỎ VÀO KHO TƯ LIỆU, TỰ ẨN NGAY KHI TƯƠNG TÁC) */}
            <AnimatePresence>
              {showFirstVisitGuide && (
                <CurvedGuideArrow
                  direction="right"
                  label="Bấm mở 4 tệp tư liệu tại đây"
                  className="hidden lg:flex absolute bottom-[124px] -left-[254px] z-30"
                />
              )}
            </AnimatePresence>

            <div className="flex flex-col h-full overflow-y-auto px-5 xl:px-6 py-5 gap-4">
              {/* 1. Tiêu đề dự án & Di tích */}
              <header className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-xs text-[#456854]">
                  <span className="font-bold tracking-wider text-[#DA251D] whitespace-nowrap">
                    {HERITAGE_CONFIG.project.brand}
                  </span>
                  <span className="truncate text-right font-medium">
                    {HERITAGE_CONFIG.project.group} ·{' '}
                    {HERITAGE_CONFIG.project.school}
                  </span>
                </div>

                <h1 className="font-serif text-[21px] xl:text-[23px] font-bold leading-[1.32] text-[#143D28] [text-wrap:balance]">
                  {HERITAGE_CONFIG.site.officialName}
                </h1>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#456854]">
                  <span className="font-semibold text-[#195334]">
                    {HERITAGE_CONFIG.site.commonName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    title="Sao chép tọa độ GPS"
                    className="inline-flex items-center gap-1 font-mono tabular-nums text-[#195334]/85 hover:text-[#DA251D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D] rounded"
                  >
                    <span>{HERITAGE_CONFIG.site.coordinates.label}</span>
                    {copiedGps ? (
                      <Check className="w-3 h-3 text-[#15803D]" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                  {copiedGps && (
                    <span className="text-[11px] font-semibold text-[#15803D]">
                      Đã sao chép
                    </span>
                  )}
                </div>
              </header>

              {/* 2. Tab thông tin ngắn (Địa chỉ mới / Phân biệt Tà Thiết) */}
              <div className="border-t border-[#195334]/12 pt-3.5">
                <div
                  role="tablist"
                  aria-label="Thông tin hành chính và phân biệt di tích"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#EAF3E4]"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={infoTab === 'address'}
                    onClick={() => setInfoTab('address')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#DA251D] ${
                      infoTab === 'address'
                        ? 'bg-[#FFFFFF] text-[#143D28] shadow-xs'
                        : 'text-[#456854] hover:text-[#143D28]'
                    }`}
                  >
                    Địa chỉ mới
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={infoTab === 'distinction'}
                    onClick={() => setInfoTab('distinction')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#DA251D] ${
                      infoTab === 'distinction'
                        ? 'bg-[#FFFFFF] text-[#C81E1E] shadow-xs'
                        : 'text-[#456854] hover:text-[#143D28]'
                    }`}
                  >
                    Phân biệt Tà Thiết
                  </button>
                </div>

                <div className="mt-2.5 min-h-[68px]">
                  <AnimatePresence mode="wait">
                    {infoTab === 'address' ? (
                      <motion.div
                        key="tab-address"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                        className="space-y-1"
                      >
                        <p className="flex items-start gap-1.5 text-[13.5px] font-semibold text-[#143D28] leading-snug">
                          <MapPin className="w-4 h-4 text-[#DA251D] shrink-0 mt-0.5" />
                          <span>{HERITAGE_CONFIG.site.newAddress}</span>
                        </p>
                        <p className="pl-5.5 text-xs leading-relaxed text-[#456854]">
                          {HERITAGE_CONFIG.site.historicalAddressNote}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tab-distinction"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                        className="rounded-lg border border-[#DA251D]/20 bg-[#FEF2F2]/60 p-3"
                      >
                        <p className="text-xs leading-relaxed text-[#143D28]">
                          {HERITAGE_CONFIG.site.distinctionNote}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 3. Thanh mốc năm lịch sử bấm chọn */}
              <div className="border-t border-[#195334]/12 pt-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#143D28]">
                    Mốc lịch sử trọng tâm
                  </span>
                  <span className="text-[#456854] tabular-nums">
                    1960 – 1975
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {HERITAGE_CONFIG.milestones.map((milestone) => {
                    const isActive = milestone.id === activeMilestone.id;
                    return (
                      <button
                        key={milestone.id}
                        type="button"
                        onClick={() => onSelectMilestone(milestone.id)}
                        className={`px-2.5 py-1.5 min-h-[34px] rounded-lg text-xs font-semibold tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#DA251D] ${
                          isActive
                            ? 'bg-[#195334] text-[#FFFDF8] shadow-xs'
                            : 'bg-[#EAF3E4] text-[#195334] hover:bg-[#D9EAD0]'
                        }`}
                      >
                        {milestone.year}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-[#195334]/12 bg-[#F3F8EF] px-3.5 py-2.5 min-h-[78px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeMilestone.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16 }}
                      className="text-[13px] leading-relaxed text-[#143D28]"
                    >
                      <span className="font-bold text-[#DA251D] tabular-nums mr-1.5">
                        {activeMilestone.year}:
                      </span>
                      {activeMilestone.summary}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* 4. Lưới 2x2 mở nhanh 4 tệp tư liệu số hóa */}
              <div className="border-t border-[#195334]/12 pt-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#143D28]">
                    Kho tư liệu số hóa
                  </span>
                  <span className="text-[#456854]">Bấm để mở</span>
                </div>
                {renderMediaGrid(false)}
              </div>

              {/* Chân bảng gọn gàng */}
              <footer className="mt-auto pt-2.5 border-t border-[#195334]/10 flex items-center justify-between text-[11px] text-[#456854]">
                <span>{HERITAGE_CONFIG.project.program}</span>
                <span className="tabular-nums">
                  Năm học {HERITAGE_CONFIG.project.academicYear}
                </span>
              </footer>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==================== MOBILE FLOATING GLASS DOCK (< 1024px) ==================== */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          {isHudCollapsed ? (
            <motion.div
              key="mobile-dock-collapsed"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <button
                type="button"
                onClick={onToggleHudCollapse}
                className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-[#195334] text-[#FFFDF8] text-sm font-semibold shadow-[0_10px_28px_-8px_rgba(20,61,40,0.55)] border border-[#FFCD00]/55 active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D]"
              >
                <BookOpenText className="w-4 h-4 text-[#FFCD00]" />
                <span>Hiện tư liệu</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.section
              key="mobile-dock-expanded"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 28 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Khay tư liệu nhanh trên di động"
              className="pointer-events-auto mx-auto max-w-xl rounded-2xl bg-[#FFFDF8]/96 backdrop-blur-xl border border-[#1B5A37]/20 shadow-[0_-12px_36px_-14px_rgba(20,61,40,0.34)] p-3.5 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] text-[#456854] truncate">
                    <span className="font-bold text-[#DA251D]">
                      {HERITAGE_CONFIG.project.brand}
                    </span>{' '}
                    · {HERITAGE_CONFIG.project.group} ·{' '}
                    {HERITAGE_CONFIG.site.coordinates.label}
                  </p>
                  <h2 className="mt-0.5 font-serif text-base font-bold text-[#143D28] truncate">
                    {HERITAGE_CONFIG.site.commonName} — Đak Nhau
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onToggleHudCollapse}
                  className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[40px] rounded-xl bg-[#EAF3E4] text-[#143D28] hover:bg-[#D9EAD0] text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D]"
                >
                  <span>Ẩn thẻ</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chỉ dẫn lần đầu trên di động — tự ẩn ngay khi người dùng tương tác */}
              <AnimatePresence>
                {showFirstVisitGuide && (
                  <CurvedGuideArrow
                    direction="down"
                    label="Bấm chọn tệp tư liệu bên dưới"
                    className="py-0.5"
                  />
                )}
              </AnimatePresence>

              {/* Mốc năm lịch sử */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                  {HERITAGE_CONFIG.milestones.map((milestone) => {
                    const isActive = milestone.id === activeMilestone.id;
                    return (
                      <button
                        key={milestone.id}
                        type="button"
                        onClick={() => onSelectMilestone(milestone.id)}
                        className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-semibold tabular-nums whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#195334] text-[#FFFDF8]'
                            : 'bg-[#EAF3E4] text-[#195334]'
                        }`}
                      >
                        {milestone.year}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs leading-relaxed text-[#143D28]/90 line-clamp-2">
                  <span className="font-bold text-[#DA251D] tabular-nums mr-1">
                    {activeMilestone.year}:
                  </span>
                  {activeMilestone.summary}
                </p>
              </div>

              {/* Lưới 2x2 mở 4 tệp nhúng */}
              {renderMediaGrid(true)}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
