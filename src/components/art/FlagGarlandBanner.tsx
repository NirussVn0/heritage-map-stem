'use client';

import { motion, useReducedMotion } from 'motion/react';

interface FlagPoint {
  id: string;
  x: number;
  y: number;
  angle: number;
}

/**
 * Tính vị trí đều nhau và góc nghiêng tự nhiên của các lá cờ Tổ quốc
 * dọc theo một nhịp dây võng parabol bậc hai giữa (x0, y0) và (x2, y2).
 */
function generateGarlandFlags(
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  x2: number,
  y2: number,
  count: number,
  prefix: string
): FlagPoint[] {
  const flags: FlagPoint[] = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const inv = 1 - t;
    const x = inv * inv * x0 + 2 * inv * t * cx + t * t * x2;
    const y = inv * inv * y0 + 2 * inv * t * cy + t * t * y2;
    const dx = 2 * inv * (cx - x0) + 2 * t * (x2 - cx);
    const dy = 2 * inv * (cy - y0) + 2 * t * (y2 - cy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    flags.push({ id: `${prefix}-${i}`, x, y, angle });
  }
  return flags;
}

const LEFT_SPAN_FLAGS = generateGarlandFlags(0, 6, 240, 44, 480, 8, 9, 'l');
const CENTER_SPAN_FLAGS = generateGarlandFlags(480, 8, 720, 46, 960, 8, 9, 'c');
const RIGHT_SPAN_FLAGS = generateGarlandFlags(960, 8, 1200, 44, 1440, 6, 9, 'r');

const ALL_FLAGS: FlagPoint[] = [
  ...LEFT_SPAN_FLAGS,
  ...CENTER_SPAN_FLAGS,
  ...RIGHT_SPAN_FLAGS,
];

/**
 * Dải cờ Tổ quốc Việt Nam (cờ đỏ sao vàng) treo cong phấp phới dọc mép trên trang,
 * tạo không khí rực rỡ, trang trọng như cổng trại Ngày hội STEM/STEAM.
 */
export function FlagGarlandBanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-x-0 top-0 z-30 h-[50px] sm:h-[58px] overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="vnFlagRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E62B22" />
            <stop offset="65%" stopColor="#DA251D" />
            <stop offset="100%" stopColor="#BA1B15" />
          </linearGradient>
          <filter id="flagSoftShadow" x="-15%" y="-10%" width="130%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.4"
              floodColor="#143D28"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        {/* Dây treo chính 3 nhịp cong mềm mại */}
        <path
          d="M 0 6 Q 240 44 480 8 Q 720 46 960 8 Q 1200 44 1440 6"
          fill="none"
          stroke="#194D32"
          strokeWidth="2.1"
          strokeOpacity="0.65"
        />
        {/* Dây chỉ vàng lễ hội mảnh song song */}
        <path
          d="M 0 8 Q 240 46 480 10 Q 720 48 960 10 Q 1200 46 1440 8"
          fill="none"
          stroke="#F5B82E"
          strokeWidth="0.9"
          strokeOpacity="0.7"
        />

        {/* Điểm nơ thắt nhỏ tại các chốt dây */}
        {[480, 960].map((knotX) => (
          <g key={knotX} transform={`translate(${knotX}, 8)`}>
            <circle r="3.4" fill="#F5B82E" stroke="#194D32" strokeWidth="1" />
          </g>
        ))}

        {/* Hàng lá cờ đỏ sao vàng */}
        <g filter="url(#flagSoftShadow)">
          {ALL_FLAGS.map((flag, idx) => {
            const swayAmp = idx % 2 === 0 ? 2.4 : -2.4;
            return (
              <g
                key={flag.id}
                transform={`translate(${flag.x.toFixed(1)}, ${flag.y.toFixed(1)}) rotate(${flag.angle.toFixed(1)})`}
              >
                <motion.g
                  style={{ originX: '0px', originY: '0px' }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { rotate: [0, swayAmp, 0, -swayAmp * 0.7, 0] }
                  }
                  transition={{
                    duration: 3.8 + (idx % 4) * 0.45,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (idx % 5) * 0.18,
                  }}
                >
                  {/* Lá cờ đỏ hình chữ nhật chuẩn tỷ lệ 3:2 */}
                  <rect
                    x="-15"
                    y="1.5"
                    width="30"
                    height="20"
                    rx="1.2"
                    fill="url(#vnFlagRed)"
                    stroke="#B31914"
                    strokeWidth="0.45"
                  />
                  {/* Ngôi sao vàng 5 cánh chuẩn ở chính giữa */}
                  <polygon
                    points="0,5.3 1.55,9.7 6.2,9.8 2.5,12.6 3.85,17.0 0,14.3 -3.85,17.0 -2.5,12.6 -6.2,9.8 -1.55,9.7"
                    fill="#FFCD00"
                  />
                </motion.g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
