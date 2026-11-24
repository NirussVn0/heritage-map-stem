import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Merriweather } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Heritage Map — Căn cứ Nửa Lon | Nhóm 12D3 THPT Cẩm Mỹ',
  description:
    'Bản đồ số tương tác di tích Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ (Căn cứ Nửa Lon) – Dự án STEM/STEAM Nhóm 12D3, Trường THPT Cẩm Mỹ (2026–2027).',
  openGraph: {
    title: 'Heritage Map — Căn cứ Nửa Lon',
    description:
      'Bản đồ số tương tác di tích Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ (Căn cứ Nửa Lon) – Nhóm 12D3, Trường THPT Cẩm Mỹ.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heritage Map — Căn cứ Nửa Lon',
    description:
      'Hành trình kết nối quá khứ và hiện tại — Dự án STEM/STEAM Nhóm 12D3, Trường THPT Cẩm Mỹ.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EAF3E4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${merriweather.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-[#EAF3E4] text-[#143D28] antialiased selection:bg-[#3B8E58]/25 selection:text-[#143D28]"
      >
        {children}
      </body>
    </html>
  );
}
