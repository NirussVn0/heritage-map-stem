'use client';

import { motion, useReducedMotion } from 'motion/react';

interface CurvedGuideArrowProps {
  label: string;
  direction?: 'right' | 'down';
  className?: string;
}

/**
 * Mũi tên dẫn hướng SVG nét đứt cong mềm mại chỉ vào cụm 4 nút mở tư liệu
 * ở lần đầu vào trang và tự ẩn ngay khi người dùng tương tác.
 */
export function CurvedGuideArrow({
  label,
  direction = 'right',
  className = '',
}: CurvedGuideArrowProps) {
  const prefersReducedMotion = useReducedMotion();

  if (direction === 'down') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none select-none flex items-center justify-center gap-1.5 ${className}`}
        aria-hidden="true"
      >
        <span className="px-2.5 py-1 rounded-lg bg-[#FFFDF8]/95 border border-[#DA251D]/30 text-[11.5px] font-semibold text-[#B91C1C] shadow-sm whitespace-nowrap">
          {label}
        </span>
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 26"
          fill="none"
          className="shrink-0"
        >
          <motion.path
            d="M4 4 C 14 4, 20 10, 20 22"
            stroke="#DA251D"
            strokeWidth="1.8"
            strokeDasharray="3.5 3.5"
            strokeLinecap="round"
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />
          <motion.path
            d="M15.5 17.5 L20 23 L24.5 17.5"
            stroke="#DA251D"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.75 }}
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none select-none flex items-center gap-1.5 ${className}`}
      aria-hidden="true"
    >
      <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF8]/96 backdrop-blur-md border border-[#DA251D]/35 shadow-[0_8px_20px_-8px_rgba(20,61,40,0.3)]">
        <span className="block text-xs font-semibold text-[#B91C1C] whitespace-nowrap">
          {label}
        </span>
      </div>
      <svg
        width="56"
        height="30"
        viewBox="0 0 56 30"
        fill="none"
        className="shrink-0"
      >
        <motion.path
          d="M3 20 C 18 24, 34 20, 50 11"
          stroke="#DA251D"
          strokeWidth="1.85"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <motion.path
          d="M43 9.5 L51.5 10.5 L47.5 18"
          stroke="#DA251D"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.85 }}
        />
      </svg>
    </motion.div>
  );
}
