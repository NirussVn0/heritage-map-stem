'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Compass,
  ExternalLink,
  Layers,
  Map as MapIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Navigation,
  X,
} from 'lucide-react';
import {
  HERITAGE_CONFIG,
  type VectorLandmark,
} from '@/src/config/heritage.config';
import {
  buildCoordinateMapsEmbedUrl,
  normalizeEmbedUrl,
} from '@/src/utils/embedUrl';

export type MapLayerMode = 'google' | 'vector';

interface MapStageProps {
  isHudCollapsed: boolean;
  onToggleHudCollapse: () => void;
  onUserInteract: () => void;
}

export function MapStage({
  isHudCollapsed,
  onToggleHudCollapse,
  onUserInteract,
}: MapStageProps) {
  const [mapMode, setMapMode] = useState<MapLayerMode>('google');
  const [googleTileType, setGoogleTileType] = useState<'m' | 'k'>('m');
  const [loadedMapUrl, setLoadedMapUrl] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] =
    useState<VectorLandmark | null>(HERITAGE_CONFIG.landmarks[0]);

  const customMyMaps = normalizeEmbedUrl(HERITAGE_CONFIG.links.myMapsEmbedUrl);
  const hasCustomMyMaps = Boolean(customMyMaps?.embedUrl);
  const activeGoogleEmbedUrl =
    customMyMaps?.embedUrl ??
    buildCoordinateMapsEmbedUrl(
      HERITAGE_CONFIG.site.coordinates.lat,
      HERITAGE_CONFIG.site.coordinates.lng,
      googleTileType,
      15
    );

  const iframeLoaded = loadedMapUrl === activeGoogleEmbedUrl;

  const directMapsUrl =
    HERITAGE_CONFIG.links.myMapsDirectUrl.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${HERITAGE_CONFIG.site.coordinates.lat},${HERITAGE_CONFIG.site.coordinates.lng}`;

  return (
    <section
      aria-label="Không gian bản đồ di tích Căn cứ Nửa Lon"
      onPointerDown={onUserInteract}
      className="relative h-full w-full select-none"
    >
      {/* Khung bản đồ trắng ngà sắc nét, nổi bật trên nền cây xanh lễ hội */}
      <div className="relative h-full w-full rounded-2xl border border-[#1B5A37]/20 bg-[#FFFDF8]/92 backdrop-blur-sm p-1.5 shadow-[0_18px_40px_-20px_rgba(20,61,40,0.34)]">
        <div className="relative h-full w-full rounded-xl border border-[#2C7A4D]/22 overflow-hidden bg-[#E8F1E3]">
          {/* THANH CÔNG CỤ GỌN MẮT PHÍA TRÊN BẢN ĐỒ */}
          <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            {/* Chuyển chế độ Google Maps / Địa hình Đak Nhau */}
            <div className="pointer-events-auto inline-flex items-center gap-1 p-1 rounded-xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#1B5A37]/16 shadow-[0_8px_22px_-12px_rgba(20,61,40,0.3)]">
              <button
                type="button"
                onClick={() => {
                  onUserInteract();
                  setMapMode('google');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D] ${
                  mapMode === 'google'
                    ? 'bg-[#195334] text-[#FFFDF8] shadow-xs'
                    : 'text-[#195334]/80 hover:text-[#195334] hover:bg-[#195334]/8'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{hasCustomMyMaps ? 'Google My Maps' : 'Google Maps'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onUserInteract();
                  setMapMode('vector');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D] ${
                  mapMode === 'vector'
                    ? 'bg-[#195334] text-[#FFFDF8] shadow-xs'
                    : 'text-[#195334]/80 hover:text-[#195334] hover:bg-[#195334]/8'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Địa hình Đak Nhau</span>
              </button>

              {mapMode === 'google' && !hasCustomMyMaps && (
                <button
                  type="button"
                  onClick={() => {
                    onUserInteract();
                    setGoogleTileType((prev) => (prev === 'm' ? 'k' : 'm'));
                  }}
                  title="Chuyển lớp Đường bộ / Vệ tinh"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs font-medium text-[#195334]/85 hover:text-[#195334] hover:bg-[#195334]/8 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-l border-[#195334]/12 ml-0.5 pl-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D]"
                >
                  <Layers className="w-3.5 h-3.5 shrink-0 text-[#DA251D]" />
                  <span>{googleTileType === 'm' ? 'Vệ tinh' : 'Đường bộ'}</span>
                </button>
              )}
            </div>

            {/* Nút Mở Google Maps & Phóng toàn màn hình */}
            <div className="pointer-events-auto inline-flex items-center gap-1.5">
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onUserInteract}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-xl text-xs font-semibold bg-[#FFFDF8]/95 text-[#195334] border border-[#1B5A37]/16 hover:border-[#DA251D]/45 hover:text-[#DA251D] backdrop-blur-md shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA251D]"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Mở Google Maps</span>
                <span className="sm:hidden">Maps</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onUserInteract();
                  onToggleHudCollapse();
                }}
                title={
                  isHudCollapsed
                    ? 'Hiện bảng tư liệu'
                    : 'Xem bản đồ toàn màn hình'
                }
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-xl text-xs font-semibold bg-[#195334] text-[#FFFDF8] hover:bg-[#236B43] shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B82E]"
              >
                {isHudCollapsed ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Hiện bảng</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Toàn màn hình</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CHẾ ĐỘ 1: GOOGLE MAPS TRỰC TIẾP (KHÔNG CHE, KHÔNG MŨI TÊN TĨNH) */}
          {mapMode === 'google' && (
            <div className="relative h-full w-full">
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#E8F1E3] text-[#195334]/80">
                  <Navigation className="w-5 h-5 animate-pulse text-[#DA251D]" />
                  <p className="text-xs font-medium">
                    Đang tải bản đồ tọa độ {HERITAGE_CONFIG.site.coordinates.label}…
                  </p>
                </div>
              )}
              <iframe
                key={activeGoogleEmbedUrl}
                src={activeGoogleEmbedUrl}
                title="Bản đồ Google Maps — Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ (Căn cứ Nửa Lon)"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedMapUrl(activeGoogleEmbedUrl)}
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          )}

          {/* CHẾ ĐỘ 2: BẢN ĐỒ ĐỊA HÌNH VECTOR ĐAK NHAU XANH TƯƠI */}
          {mapMode === 'vector' && (
            <div className="relative h-full w-full bg-[#E8F2E2] overflow-hidden">
              <svg
                viewBox="0 0 1000 700"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="geodeticGreenGrid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 80 0 L 0 0 0 80"
                      fill="none"
                      stroke="#195334"
                      strokeOpacity="0.08"
                      strokeWidth="0.9"
                    />
                  </pattern>
                  <radialGradient id="dakNhauForest" cx="52%" cy="50%" r="58%">
                    <stop offset="0%" stopColor="#CBE5BE" stopOpacity="0.88" />
                    <stop offset="65%" stopColor="#E1F0D7" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#F1F7EC" stopOpacity="0.95" />
                  </radialGradient>
                </defs>

                <rect width="1000" height="700" fill="#EFF7E9" />
                <rect width="1000" height="700" fill="url(#dakNhauForest)" />
                <rect width="1000" height="700" fill="url(#geodeticGreenGrid)" />

                {/* Đường đồng mức địa hình đồi rừng xanh */}
                <g
                  fill="none"
                  stroke="#1E603B"
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                >
                  <path d="M120 120 C 260 60, 420 110, 560 150 C 710 190, 860 130, 960 220" />
                  <path d="M80 210 C 230 155, 390 195, 530 240 C 680 285, 815 245, 955 320" />
                  <path d="M50 320 C 210 280, 360 295, 515 345 C 665 395, 795 360, 960 440" />
                  <path d="M90 450 C 260 410, 420 420, 565 470 C 700 515, 825 490, 940 560" />
                  <path d="M160 585 C 320 535, 495 555, 650 600 C 760 630, 860 615, 950 660" />
                  <ellipse cx="520" cy="350" rx="145" ry="96" strokeDasharray="3 4" />
                  <ellipse cx="520" cy="350" rx="92" ry="60" />
                  <ellipse cx="270" cy="135" rx="110" ry="64" strokeDasharray="3 5" />
                </g>

                {/* Suối Đak Nhau xanh biếc */}
                <path
                  d="M190 45 C 240 130, 305 180, 385 245 C 455 300, 480 390, 565 450 C 640 505, 725 560, 845 675"
                  fill="none"
                  stroke="#3E91A8"
                  strokeOpacity="0.52"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Tuyến hành lang liên kết di tích */}
                <path
                  d="M270 135 Q310 205 345 255 T520 350 Q610 415 695 485"
                  fill="none"
                  stroke="#DA251D"
                  strokeOpacity="0.62"
                  strokeWidth="2.2"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />

                {/* Nhãn vĩ độ / kinh độ trắc địa */}
                <g
                  fill="#195334"
                  fillOpacity="0.48"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  <text x="24" y="94">12.0200°N</text>
                  <text x="24" y="354">11.9892°N</text>
                  <text x="24" y="594">11.9400°N</text>
                  <text x="492" y="684">107.2086°E</text>
                </g>

                {/* Hoa gió chỉ hướng Bắc */}
                <g transform="translate(918, 108)" opacity="0.65">
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill="#FFFDF8"
                    fillOpacity="0.55"
                    stroke="#195334"
                    strokeWidth="0.9"
                  />
                  <path d="M0 -20 L5 0 L0 -4 L-5 0 Z" fill="#DA251D" />
                  <path d="M0 20 L4 0 L0 4 L-4 0 Z" fill="#195334" />
                  <text
                    x="0"
                    y="-27"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#195334"
                  >
                    B
                  </text>
                </g>
              </svg>

              {/* CÁC ĐIỂM GHIM ĐỊA DANH TƯƠNG TÁC */}
              <div className="absolute inset-0 z-10">
                {HERITAGE_CONFIG.landmarks.map((landmark) => {
                  const isSelected = selectedLandmark?.id === landmark.id;
                  const leftPct = `${(landmark.x / 1000) * 100}%`;
                  const topPct = `${(landmark.y / 700) * 100}%`;

                  return (
                    <button
                      key={landmark.id}
                      type="button"
                      onClick={() => {
                        onUserInteract();
                        setSelectedLandmark(landmark);
                      }}
                      style={{ left: leftPct, top: topPct }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer focus-visible:outline-none"
                    >
                      <span className="relative flex items-center justify-center">
                        {landmark.isPrimary && (
                          <>
                            <span className="absolute h-12 w-12 rounded-full bg-[#DA251D]/20 animate-ping" />
                            <span className="absolute h-8 w-8 rounded-full border border-[#DA251D]/45" />
                          </>
                        )}
                        <span
                          className={`relative flex items-center justify-center rounded-full transition-transform duration-150 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-[#DA251D] group-focus-visible:ring-offset-2 ${
                            landmark.isPrimary
                              ? 'h-9 w-9 bg-[#DA251D] text-[#FFFDF8] shadow-md'
                              : isSelected
                                ? 'h-8 w-8 bg-[#195334] text-[#FFFDF8] shadow-sm'
                                : 'h-7 w-7 bg-[#FFFDF8] text-[#195334] border border-[#195334]/35 shadow-xs'
                          }`}
                        >
                          <MapPin
                            className={
                              landmark.isPrimary ? 'w-4 h-4' : 'w-3.5 h-3.5'
                            }
                          />
                        </span>
                      </span>

                      <span
                        className={`mt-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors shadow-xs border ${
                          landmark.isPrimary
                            ? 'bg-[#DA251D] text-[#FFFDF8] border-[#DA251D]'
                            : isSelected
                              ? 'bg-[#195334] text-[#FFFDF8] border-[#195334]'
                              : 'bg-[#FFFDF8]/95 text-[#195334] border-[#195334]/20'
                        }`}
                      >
                        {landmark.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* THẺ THÔNG TIN KHI BẤM ĐỊA DANH */}
              <AnimatePresence mode="wait">
                {selectedLandmark && (
                  <motion.div
                    key={selectedLandmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-16 left-3 sm:left-4 z-20 w-[calc(100%-1.5rem)] max-w-xs rounded-xl bg-[#FFFDF8]/96 backdrop-blur-md border border-[#195334]/18 p-3.5 shadow-[0_14px_34px_-16px_rgba(20,61,40,0.36)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold text-[#DA251D]">
                          {selectedLandmark.subtitle}
                        </p>
                        <h3 className="mt-0.5 font-serif text-sm font-bold text-[#143D28] leading-snug">
                          {selectedLandmark.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedLandmark(null)}
                        aria-label="Đóng thẻ thông tin địa danh"
                        className="p-1 rounded-lg text-[#143D28]/60 hover:text-[#143D28] hover:bg-[#195334]/10 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-[#2C4F3B]">
                      {selectedLandmark.description}
                    </p>

                    {selectedLandmark.isPrimary && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#195334]/10 flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-mono tabular-nums text-[#195334]/80">
                          {HERITAGE_CONFIG.site.coordinates.label}
                        </span>
                        <a
                          href={directMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#DA251D] hover:underline whitespace-nowrap"
                        >
                          <span>Chỉ đường</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
