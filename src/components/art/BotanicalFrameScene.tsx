'use client';

import { motion, useReducedMotion } from 'motion/react';

const SUNLIT_MOTES = [
  { id: 'f1', cx: 192, cy: 762, r: 2.6, driftX: -7, duration: 4.5, delay: 0 },
  { id: 'f2', cx: 214, cy: 750, r: 2.0, driftX: 6, duration: 5.1, delay: 0.9 },
  { id: 'f3', cx: 204, cy: 738, r: 2.2, driftX: -4, duration: 4.1, delay: 1.7 },
  { id: 'f4', cx: 226, cy: 766, r: 1.8, driftX: 8, duration: 5.4, delay: 0.4 },
  { id: 'f5', cx: 180, cy: 748, r: 1.9, driftX: -6, duration: 4.8, delay: 2.0 },
  { id: 'f6', cx: 740, cy: 764, r: 2.2, driftX: 5, duration: 5.6, delay: 1.1 },
  { id: 'f7', cx: 1210, cy: 756, r: 2.3, driftX: -6, duration: 4.9, delay: 0.6 },
] as const;

/**
 * Không gian cây xanh rực rỡ như cổng trại Ngày hội STEM bao quanh toàn trang web:
 * - Nền trời xanh nắng nhẹ chuyển sang sắc cỏ rừng Đak Nhau tươi mát
 * - Hàng cây tán rộng, khóm tre đung đưa bao quanh viền trái, phải và cạnh dưới
 * - Cảnh Chiến sĩ mũ tai bèo – Người dân nón lá – Nửa lon gạo hòa tự nhiên vào
 *   thảm cỏ và hàng cây xanh ở cạnh dưới (không đóng hộp popup đè lên bản đồ).
 */
export function BotanicalFrameScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Nền thiên nhiên sáng trong, tràn ánh nắng lễ hội */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF0] via-[#E6F3DF] to-[#CFE6C3]" />

      {/* Quầng nắng ấm dịu ở phía trên */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[920px] h-[340px] rounded-full bg-[#FFF7D6]/65 blur-3xl" />

      {/* LỚP SVG CÂY XANH BAO QUANH 2 BÊN & ĐỒI CỎ + CẢNH NỬA LON Ở CẠNH DƯỚI */}
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full block"
      >
        <defs>
          <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8CC780" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4F9A60" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B8A55" />
            <stop offset="100%" stopColor="#1B5A37" />
          </linearGradient>
          <linearGradient id="meadowBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#266F45" />
            <stop offset="100%" stopColor="#14442A" />
          </linearGradient>
          <radialGradient id="lonWarmHalo" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#FFE17D" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#F5B82E" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F5B82E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lonGoldBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5CA63" />
            <stop offset="55%" stopColor="#D69A32" />
            <stop offset="100%" stopColor="#9C6919" />
          </linearGradient>
        </defs>

        {/* ===== HÀNG CÂY RỪNG XANH BAO QUANH CẠNH TRÁI ===== */}
        <g opacity="0.95">
          {/* Tán cây lớp sâu góc trên trái */}
          <circle cx="18" cy="128" r="76" fill="#4FA366" fillOpacity="0.48" />
          <circle cx="-10" cy="245" r="88" fill="#2F7F4E" fillOpacity="0.58" />
          <circle cx="20" cy="400" r="74" fill="#3E915B" fillOpacity="0.5" />
          <circle cx="-8" cy="560" r="96" fill="#256B41" fillOpacity="0.62" />

          {/* Khóm tre xanh vươn cao bên trái đung đưa nhẹ */}
          <motion.g
            style={{ originX: '34px', originY: '790px' }}
            animate={
              prefersReducedMotion ? undefined : { rotate: [-0.9, 1.3, -0.9] }
            }
            transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M26 795 Q16 540 34 115"
              fill="none"
              stroke="#1E603B"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M48 795 Q42 580 62 215"
              fill="none"
              stroke="#2C7A4D"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            {/* Đốt tre sáng */}
            <path
              d="M21 620 L31 620 M21 470 L31 470 M24 320 L34 320 M44 640 L52 640 M47 490 L55 490 M52 340 L60 340"
              stroke="#DDF0CE"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            {/* Tán lá tre mềm hai bên */}
            <path d="M31 200 Q72 178 105 196 Q70 212 31 200 Z" fill="#3B8E58" />
            <path d="M29 245 Q-8 232 -28 252 Q2 260 29 245 Z" fill="#246B43" />
            <path d="M56 310 Q96 290 124 308 Q88 322 56 310 Z" fill="#4BA468" />
            <path d="M28 380 Q68 362 96 378 Q62 392 28 380 Z" fill="#2C7A4D" />
            <path d="M50 475 Q92 456 118 474 Q82 486 50 475 Z" fill="#59B374" />
            <path d="M26 570 Q66 552 92 568 Q56 582 26 570 Z" fill="#338252" />
          </motion.g>
        </g>

        {/* ===== HÀNG CÂY RỪNG XANH BAO QUANH CẠNH PHẢI ===== */}
        <g opacity="0.95">
          <circle cx="1424" cy="136" r="78" fill="#4FA366" fillOpacity="0.48" />
          <circle cx="1448" cy="270" r="92" fill="#2F7F4E" fillOpacity="0.56" />
          <circle cx="1420" cy="430" r="76" fill="#3E915B" fillOpacity="0.5" />
          <circle cx="1446" cy="595" r="96" fill="#256B41" fillOpacity="0.62" />

          {/* Khóm tre xanh vươn cao bên phải */}
          <motion.g
            style={{ originX: '1406px', originY: '790px' }}
            animate={
              prefersReducedMotion ? undefined : { rotate: [1.0, -1.2, 1.0] }
            }
            transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M1414 795 Q1422 540 1404 120"
              fill="none"
              stroke="#1E603B"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M1392 795 Q1396 580 1378 230"
              fill="none"
              stroke="#2C7A4D"
              strokeWidth="4.6"
              strokeLinecap="round"
            />
            <path
              d="M1408 610 L1418 610 M1408 460 L1418 460 M1405 310 L1415 310 M1387 635 L1395 635 M1384 480 L1392 480"
              stroke="#DDF0CE"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <path d="M1407 205 Q1364 184 1332 202 Q1368 218 1407 205 Z" fill="#3B8E58" />
            <path d="M1384 320 Q1344 300 1316 318 Q1352 332 1384 320 Z" fill="#4BA468" />
            <path d="M1410 415 Q1370 398 1344 414 Q1378 428 1410 415 Z" fill="#2C7A4D" />
            <path d="M1390 520 Q1348 502 1324 520 Q1360 534 1390 520 Z" fill="#59B374" />
          </motion.g>
        </g>

        {/* ===== DẢI ĐỒI CỎ & HÀNG CÂY XANH TƯƠI DỌC CẠNH DƯỚI TRANG ===== */}
        {/* Đồi cây xanh lớp xa */}
        <path
          d="M 0 742 Q 190 695 390 732 T 810 726 T 1220 718 L 1440 734 L 1440 820 L 0 820 Z"
          fill="url(#hillFar)"
        />
        {/* Đồi cỏ xanh lớp giữa */}
        <path
          d="M 0 756 Q 230 722 465 752 T 960 748 T 1440 744 L 1440 820 L 0 820 Z"
          fill="url(#hillNear)"
        />
        {/* Cụm bụi cây tròn thân thiện chạy dọc cạnh dưới */}
        <g fill="#2C7E4D" opacity="0.88">
          <circle cx="72" cy="776" r="46" />
          <circle cx="330" cy="792" r="42" />
          <circle cx="545" cy="798" r="38" />
          <circle cx="880" cy="794" r="44" />
          <circle cx="1145" cy="790" r="48" />
          <circle cx="1360" cy="772" r="54" />
        </g>
        <g fill="#4FA669" opacity="0.72">
          <circle cx="110" cy="788" r="34" />
          <circle cx="430" cy="804" r="32" />
          <circle cx="720" cy="802" r="36" />
          <circle cx="1015" cy="798" r="34" />
          <circle cx="1285" cy="786" r="40" />
        </g>
        {/* Thảm cỏ chân trang */}
        <path
          d="M 0 784 Q 360 766 720 782 T 1440 778 L 1440 820 L 0 820 Z"
          fill="url(#meadowBase)"
        />

        {/* Những bông hoa dại vàng nhỏ rải rác trên thảm cỏ */}
        {[
          [94, 792],
          [348, 796],
          [620, 798],
          [912, 794],
          [1185, 792],
          [1330, 788],
        ].map(([fx, fy]) => (
          <g key={`${fx}-${fy}`} transform={`translate(${fx}, ${fy})`}>
            <circle r="3.4" fill="#FFE066" />
            <circle r="1.4" fill="#E67E22" />
          </g>
        ))}

        {/* ===== CẢNH CHIẾN SĨ MŨ TAI BÈO – NGƯỜI DÂN NÓN LÁ – NỬA LON GẠO HÒA VÀO HÀNG CÂY CẠNH DƯỚI ===== */}
        <g transform="translate(88, 706)">
          {/* Hào quang nắng ấm tỏa từ chiếc lon gạo */}
          <circle cx="114" cy="74" r="56" fill="url(#lonWarmHalo)" />

          {/* Khóm lá tre nhỏ phía sau ôm lấy hai nhân vật */}
          <path
            d="M22 98 Q18 52 34 18 M198 98 Q204 54 188 22"
            fill="none"
            stroke="#164A2E"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path d="M32 34 Q54 24 68 32 Q50 40 32 34 Z" fill="#4BA468" />
          <path d="M190 36 Q168 26 154 34 Q172 42 190 36 Z" fill="#4BA468" />

          {/* CHIẾN SĨ ĐỘI MŨ TAI BÈO (Bên trái, hòa tự nhiên trên đồi cỏ) */}
          <g transform="translate(38, 18)">
            {/* Mũ tai bèo mềm đặc trưng */}
            <path
              d="M12 20 C16 10, 34 9, 39 18 C45 19, 48 22, 44 25 C36 27, 18 27, 10 25 C7 24, 9 20, 12 20 Z"
              fill="#1E5636"
            />
            <path d="M17 17 C20 10, 32 10, 35 17 Z" fill="#2A7047" />
            {/* Đầu & khăn rằn đỏ ấm */}
            <circle cx="27" cy="29" r="7.2" fill="#143D28" />
            <path
              d="M20 35 Q28 38.5 35 35 L33 40.5 Q27 42.5 19 39.5 Z"
              fill="#DA251D"
            />
            {/* Thân áo quân phục */}
            <path
              d="M15 41 C18 37.5, 34 37.5, 38 43 L48 57 C50 59, 48 63, 44 62 L35 55 L36 78 L12 78 L12 55 C12 48, 13 44, 15 41 Z"
              fill="#17492E"
            />
            <path
              d="M19 41 L34 68"
              stroke="#F5CA63"
              strokeWidth="1.4"
              strokeOpacity="0.85"
            />
            <path
              d="M36 50 L56 59 C58 60, 57 63.5, 54 63.5 L34 57 Z"
              fill="#1F5C3A"
            />
          </g>

          {/* NGƯỜI DÂN ĐỊA PHƯƠNG ĐỘI NÓN LÁ (Bên phải) */}
          <g transform="translate(132, 16)">
            {/* Nón lá vàng nắng nổi bật trên nền xanh */}
            <path
              d="M34 6 L8 26 Q33 30 58 25 Z"
              fill="#F3D68C"
              stroke="#A37222"
              strokeWidth="1.1"
            />
            <path
              d="M34 6 L21 27 M34 6 L34 28 M34 6 L46 26 M17 20 Q33 23 49 19"
              stroke="#B8832A"
              strokeWidth="0.75"
              strokeOpacity="0.75"
              fill="none"
            />
            <circle cx="31" cy="32" r="6.8" fill="#143D28" />
            <circle cx="39" cy="33" r="3.2" fill="#143D28" />
            {/* Áo bà ba & đường dệt thổ cẩm S'tiêng */}
            <path
              d="M19 43 C23 39, 38 39, 42 44 C45 50, 46 64, 45 80 L18 80 L19 58 L8 61 C6 62, 5 59, 7 57 L19 43 Z"
              fill="#16462C"
            />
            <path d="M22 54 L42 54" stroke="#DA251D" strokeWidth="1.7" />
            <path d="M22 57 L42 57" stroke="#FFCD00" strokeWidth="1.1" />
            <path
              d="M20 50 L2 59 C0 60, 1 63.5, 4 63.5 L22 56 Z"
              fill="#215F3D"
            />
          </g>

          {/* CHIẾC LON GẠO ("NỬA LON") ẤM ÁP NỔI BẬT Ở CHÍNH GIỮA */}
          <g transform="translate(100, 62)">
            <ellipse
              cx="14"
              cy="31"
              rx="16"
              ry="3.8"
              fill="#0E2E1D"
              fillOpacity="0.45"
            />
            <rect
              x="4"
              y="8"
              width="20"
              height="21"
              rx="2.6"
              fill="url(#lonGoldBody)"
              stroke="#7A4F10"
              strokeWidth="0.9"
            />
            {/* Vạch ngấn Nửa Lon */}
            <line
              x1="4.5"
              y1="18.5"
              x2="23.5"
              y2="18.5"
              stroke="#FFFDF8"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />
            <ellipse
              cx="14"
              cy="8"
              rx="10"
              ry="3.1"
              fill="#9C6919"
              stroke="#7A4F10"
              strokeWidth="0.8"
            />
            {/* Gạo trắng tinh khôi */}
            <path d="M6 8 Q14 0 22 8 Q14 10.6 6 8 Z" fill="#FFFDF8" />
          </g>

          {/* Nhãn tinh tế in thẳng trên thảm cỏ (không phải khung popup) */}
          <text
            x="236"
            y="95"
            fill="#E7F6DC"
            fontSize="12.5"
            fontWeight="600"
            letterSpacing="0.01em"
          >
            Biểu tượng Căn cứ Nửa Lon · Tình quân dân S&apos;tiêng (1960)
          </text>
        </g>

        {/* Đốm nắng vàng bay nhẹ trên hàng cây */}
        {SUNLIT_MOTES.map((mote) => (
          <motion.circle
            key={mote.id}
            cx={mote.cx}
            cy={mote.cy}
            r={mote.r}
            fill="#FFE37D"
            initial={{ opacity: 0.2, y: 0, x: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.55 }
                : {
                    opacity: [0.15, 0.92, 0.15],
                    y: [4, -26, -40],
                    x: [0, mote.driftX, mote.driftX * 0.5],
                  }
            }
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
