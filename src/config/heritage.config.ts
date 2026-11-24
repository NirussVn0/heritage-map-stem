/**
 * HERITAGE MAP — NGUỒN DỮ LIỆU & CẤU HÌNH DUY NHẤT (Single Source of Truth)
 * Nhóm 12D3 – Trường THPT Cẩm Mỹ (Năm học 2026–2027)
 *
 * HƯỚNG DẪN CẬP NHẬT LINK TỆP NHÚNG:
 * - Dán link Google Drive (/file/d/.../view), Google Docs, Google Slides, YouTube hoặc Canva
 *   vào các trường trong mục `links` bên dưới.
 * - Hệ thống sẽ TỰ ĐỘNG chuyển đổi sang định dạng `/preview` hoặc `/embed` để hiển thị trực tiếp
 *   trong Popup Modal mà không cần sửa mã giao diện.
 */

export type MediaSlotId = 'pdf' | 'video' | 'english' | 'solutions';

export interface TimelineMilestone {
  id: string;
  year: string;
  summary: string;
}

export interface VectorLandmark {
  id: string;
  name: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  coordinatesLabel?: string;
  isPrimary?: boolean;
  /** Vị trí tương đối trên hệ tọa độ SVG 0..1000 x 0..700 */
  x: number;
  y: number;
}

export interface PdfPageOutline {
  pageNumber: string;
  title: string;
  details: string;
}

export interface VideoSegment {
  timestamp: string;
  title: string;
  summary: string;
}

export interface ConservationSolution {
  index: string;
  title: string;
  who: string;
  how: string;
  impact: string;
}

export interface HeritageLinks {
  /**
   * Link Google My Maps tùy chỉnh (VD: https://www.google.com/maps/d/embed?mid=...)
   * Nếu để trống "", hệ thống tự động nhúng bản đồ Google Maps chuẩn tại tọa độ 11.989232, 107.208597.
   */
  myMapsEmbedUrl: string;
  /**
   * Link mở trực tiếp vị trí di tích trên ứng dụng/web Google Maps
   */
  myMapsDirectUrl: string;
  /**
   * 1. Link tệp Hồ sơ di sản (PDF 4 trang) — hỗ trợ Google Drive / Docs / PDF trực tiếp
   */
  heritageProfilePdfUrl: string;
  /**
   * 2. Link Video giới thiệu (3–5 phút) — hỗ trợ YouTube (watch/youtu.be) hoặc Google Drive MP4
   */
  introVideoUrl: string;
  /**
   * 3. Link tệp English Guide — hỗ trợ Google Drive (PDF/Docs/Slides/Audio/Video) hoặc Canva
   */
  englishGuideFileUrl: string;
  /**
   * 4. Link tệp Kế hoạch 3 giải pháp bảo tồn — hỗ trợ Google Drive (PDF/Docs/Slides) hoặc Canva
   */
  conservationPlanFileUrl: string;
}

export interface MediaItemConfig {
  id: MediaSlotId;
  title: string;
  shortSubtitle: string;
  modalCategory: string;
  configKey: keyof Pick<
    HeritageLinks,
    | 'heritageProfilePdfUrl'
    | 'introVideoUrl'
    | 'englishGuideFileUrl'
    | 'conservationPlanFileUrl'
  >;
  acceptedFormatsHint: string;
}

export const HERITAGE_CONFIG = {
  project: {
    brand: 'HERITAGE MAP',
    tagline: 'Hành trình kết nối quá khứ và hiện tại',
    group: 'Nhóm 12D3',
    school: 'Trường THPT Cẩm Mỹ',
    academicYear: '2026–2027',
    program: 'Ngày hội STEM/STEAM',
  },

  site: {
    officialName: 'Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ',
    commonName: 'Căn cứ Nửa Lon',
    newAddress: 'Thôn 5, xã Đak Nhau, tỉnh Đồng Nai',
    historicalAddressNote:
      'Thuộc xã Đak Nhau, huyện Bù Đăng, tỉnh Bình Phước cũ trước khi điều chỉnh địa giới hành chính.',
    coordinates: {
      lat: 11.989232,
      lng: 107.208597,
      label: '11.989232, 107.208597',
    },
    distinctionTitle: 'Lưu ý phân biệt với Căn cứ Tà Thiết',
    distinctionNote:
      'Cần phân biệt rõ với Căn cứ Tà Thiết (xã Lộc Thành, tỉnh Đồng Nai – thuộc huyện Lộc Ninh, tỉnh Bình Phước cũ), là nơi Bộ Tư lệnh Miền chuyển sở chỉ huy về từ đầu năm 1973.',
  },

  /**
   * CÁC ĐƯỜNG DẪN TÍCH HỢP (Dán link Google Drive / YouTube / My Maps vào đây)
   */
  links: {
    // Dán link Google My Maps tại đây (để trống "" sẽ dùng Google Maps tọa độ chuẩn 11.989232, 107.208597)
    myMapsEmbedUrl: '',

    // Link Google Maps chính xác của Căn cứ Nửa Lon
    myMapsDirectUrl: 'https://maps.app.goo.gl/YS1StcxGXEmGnUeU6',

    // Dán link Google Drive PDF Hồ sơ di sản (4 trang)
    heritageProfilePdfUrl:
      'https://drive.google.com/file/d/1kPzbSpw3taPtad5v9LMFyQqUNfL3rViB/view?usp=sharing',

    // Dán link YouTube hoặc Google Drive Video giới thiệu (3–5 phút)
    introVideoUrl: '',

    // Dán link tệp English Guide (Google Drive PDF/Docs/Slides/Video hoặc Canva)
    englishGuideFileUrl: '',

    // Dán link tệp Kế hoạch 3 giải pháp bảo tồn (Google Drive PDF/Docs/Slides hoặc Canva)
    conservationPlanFileUrl: '',
  } satisfies HeritageLinks,

  milestones: [
    {
      id: '1960',
      year: '1960',
      summary:
        'Giữa năm 1960, Đội vũ trang tuyên truyền mở đường (Khu 10) do đ/c Phạm Thuận (Ba Thu) chỉ huy đặt nền móng Căn cứ Nửa Lon tại vùng rừng Đak Nhau.',
    },
    {
      id: '1960-1965',
      year: '1960–1965',
      summary:
        'Điểm mở đầu hành lang chiến lược nối hậu phương miền Bắc (Đoàn 559) với chiến trường miền Nam.',
    },
    {
      id: '1964-1965',
      year: '1964–1965',
      summary:
        'Phát triển thành tổng kho hậu cần chiến lược phục vụ Chiến dịch Phước Long – Đồng Xoài; gắn với kỳ tích đồng bào S\'tiêng Sóc Bom Bo giã gạo xuyên đêm, gùi 5 tấn gạo trong 3 ngày 3 đêm.',
    },
    {
      id: '1973',
      year: '1973',
      summary:
        'Đầu năm 1973, Bộ Tư lệnh Miền chuyển sở chỉ huy về Sóc Tà Thiết.',
    },
    {
      id: '1974-1975',
      year: '1974–1975',
      summary:
        'Giải phóng Bù Đăng (14/12/1974, mở thông Đường 14) và giải phóng thị xã Phước Long (06/01/1975).',
    },
  ] satisfies TimelineMilestone[],

  landmarks: [
    {
      id: 'nua-lon',
      name: 'Căn cứ Nửa Lon (Thôn 5, Đak Nhau)',
      shortLabel: 'Thôn 5, Đak Nhau',
      subtitle: 'Tọa độ di tích trung tâm',
      description:
        'Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ tại Thôn 5, xã Đak Nhau, tỉnh Đồng Nai — điểm đầu hành lang chiến lược Bắc – Nam.',
      coordinatesLabel: '11.989232, 107.208597',
      isPrimary: true,
      x: 520,
      y: 350,
    },
    {
      id: 'tran-binh',
      name: 'Khu vực Trần Bình',
      shortLabel: 'Trần Bình',
      subtitle: 'Điểm tham chiếu địa bàn Đak Nhau',
      description:
        'Khu dân cư và trục giao thông liên kết vùng rừng Đak Nhau, gắn với tuyến khảo sát hiện trạng cảnh quan di tích.',
      x: 345,
      y: 255,
    },
    {
      id: 'soc-bom-bo',
      name: 'Sóc Bom Bo',
      shortLabel: 'Sóc Bom Bo',
      subtitle: 'Hậu phương tình quân dân S\'tiêng',
      description:
        'Gắn liền kỳ tích đồng bào S\'tiêng giã gạo xuyên đêm, gùi 5 tấn gạo trong 3 ngày 3 đêm tiếp tế cho Chiến dịch Phước Long – Đồng Xoài (1964–1965).',
      x: 695,
      y: 485,
    },
    {
      id: 'bu-gia-map',
      name: 'VQG Bù Gia Mập',
      shortLabel: 'VQG Bù Gia Mập',
      subtitle: 'Không gian sinh thái liên kết tuyến',
      description:
        'Vườn quốc gia Bù Gia Mập ở phía bắc vùng đệm, định hướng kết nối tuyến tham quan lịch sử – sinh thái cùng Sóc Bom Bo và Căn cứ Nửa Lon.',
      x: 270,
      y: 135,
    },
  ] satisfies VectorLandmark[],

  mediaItems: [
    {
      id: 'pdf',
      title: 'Hồ sơ di sản',
      shortSubtitle: 'Tệp PDF · 4 trang',
      modalCategory: 'Tư liệu số hóa · Hồ sơ PDF',
      configKey: 'heritageProfilePdfUrl',
      acceptedFormatsHint: 'Google Drive PDF, Google Docs hoặc đường dẫn PDF trực tiếp',
    },
    {
      id: 'video',
      title: 'Video giới thiệu',
      shortSubtitle: 'Phim tư liệu · 3–5 phút',
      modalCategory: 'Tư liệu số hóa · Video',
      configKey: 'introVideoUrl',
      acceptedFormatsHint: 'YouTube (watch / youtu.be) hoặc Google Drive MP4',
    },
    {
      id: 'english',
      title: 'English Guide',
      shortSubtitle: 'Tệp thuyết minh Anh ngữ',
      modalCategory: 'Tư liệu số hóa · English Guide',
      configKey: 'englishGuideFileUrl',
      acceptedFormatsHint: 'Google Drive (PDF / Docs / Slides / Video) hoặc Canva',
    },
    {
      id: 'solutions',
      title: '3 Giải pháp bảo tồn',
      shortSubtitle: 'Kế hoạch đủ 3 vế',
      modalCategory: 'Tư liệu số hóa · Giải pháp bảo tồn',
      configKey: 'conservationPlanFileUrl',
      acceptedFormatsHint: 'Google Drive (PDF / Docs / Slides) hoặc Canva',
    },
  ] satisfies MediaItemConfig[],

  previewContent: {
    pdfPages: [
      {
        pageNumber: 'Trang 1',
        title: 'Thông tin chung & Địa chỉ hành chính mới',
        details:
          'Định danh Căn cứ Quân ủy và Bộ Tư lệnh Miền Đông Nam Bộ (Căn cứ Nửa Lon) tại Thôn 5, xã Đak Nhau, tỉnh Đồng Nai; tọa độ GPS 11.989232, 107.208597 và ghi chú đối chiếu địa giới hành chính cũ.',
      },
      {
        pageNumber: 'Trang 2',
        title: 'Lịch sử hình thành & Địa lí hành lang chiến lược',
        details:
          'Từ nền móng Đội vũ trang tuyên truyền Khu 10 (giữa năm 1960) đến điểm mở đầu hành lang Bắc – Nam (Đoàn 559), tổng kho hậu cần Chiến dịch Phước Long – Đồng Xoài và phân biệt rõ với Căn cứ Tà Thiết (1973).',
      },
      {
        pageNumber: 'Trang 3',
        title: 'Giá trị văn hóa S\'tiêng & Thực trạng hiện nay',
        details:
          'Khắc họa biểu tượng "Nửa Lon" thấm đẫm tình quân dân với đồng bào S\'tiêng Sóc Bom Bo; phản ánh thực trạng dấu tích thực địa đang dần thu hẹp giữa các vườn điều, cao su.',
      },
      {
        pageNumber: 'Trang 4',
        title: 'Danh mục nguồn tài liệu kiểm chứng',
        details:
          'Tổng hợp tư liệu đối chiếu từ 5 nguồn chính thống nhằm bảo đảm độ tin cậy lịch sử – địa lí cho sản phẩm số hóa STEM/STEAM.',
      },
    ] satisfies PdfPageOutline[],

    verifiedSources: [
      'Cổng Thông tin điện tử tỉnh Đồng Nai',
      'Cục Di sản Văn hóa (Bộ Văn hóa, Thể thao và Du lịch)',
      'Báo Đồng Nai',
      'Báo Quân đội nhân dân',
      'Giáo trình Lịch sử địa phương',
    ],

    videoSegments: [
      {
        timestamp: '0:00',
        title: 'Chào hỏi & Giới thiệu dự án',
        summary: 'Nhóm 12D3 – Trường THPT Cẩm Mỹ mở đầu hành trình Heritage Map.',
      },
      {
        timestamp: '0:20',
        title: 'Vị trí địa lí & Địa giới mới',
        summary: 'Định vị Thôn 5, xã Đak Nhau, tỉnh Đồng Nai trên bản đồ số và lưu ý phân biệt Tà Thiết.',
      },
      {
        timestamp: '1:00',
        title: 'Lịch sử & Các mốc sự kiện',
        summary: 'Tái hiện giai đoạn 1960–1975 từ Đội mở đường Khu 10 đến giải phóng Phước Long.',
      },
      {
        timestamp: '2:00',
        title: 'Văn hóa & Tình quân dân S\'tiêng',
        summary: 'Câu chuyện chiếc lon gạo và kỳ tích đồng bào Sóc Bom Bo giã gạo xuyên đêm.',
      },
      {
        timestamp: '2:50',
        title: 'Thực trạng & 3 giải pháp bảo tồn',
        summary: 'Phân tích thực trạng vườn điều/cao su và trình bày kế hoạch bảo tồn đủ 3 vế.',
      },
      {
        timestamp: '3:30',
        title: 'Điểm nhấn tiếng Anh & Lời kết',
        summary: 'Thông điệp lan tỏa di sản tới thế hệ trẻ qua mã QR bản đồ số.',
      },
    ] satisfies VideoSegment[],

    englishFileSummary: {
      heading: 'Tệp thuyết minh tiếng Anh (English Guide)',
      description:
        'Khu vực này nhúng trực tiếp tệp English Guide của Nhóm 12D3 (PDF, Google Docs, Slide trình chiếu hoặc Video thuyết minh tiếng Anh) khi bạn dán liên kết vào trường `englishGuideFileUrl` trong tệp cấu hình.',
      keyTopics: [
        'Giới thiệu Nhóm 12D3 – Trường THPT Cẩm Mỹ và tên di tích Nửa Lon Base tại Thôn 5, xã Đak Nhau, tỉnh Đồng Nai.',
        'Khái quát mốc giữa năm 1960 (Đội Khu 10 – đ/c Phạm Thuận / Ba Thu) và vai trò tổng kho hậu cần giai đoạn 1964–1965.',
        'Ý nghĩa biểu tượng "Nửa Lon" gắn kết bộ đội với đồng bào S\'tiêng và thông điệp số hóa bảo tồn di sản.',
      ],
    },

    conservationSolutions: [
      {
        index: '01',
        title: 'Quảng bá di sản số',
        who: 'Nhóm 12D3 và Trường THPT Cẩm Mỹ',
        how: 'Chia sẻ bản đồ số, video và English Guide qua mã QR trên các kênh truyền thông được phép; kết nối tuyến tham quan Sóc Bom Bo – Vườn quốc gia Bù Gia Mập.',
        impact:
          'Lan tỏa giá trị di tích rộng rãi, giúp người xem tra cứu dễ dàng trên điện thoại.',
      },
      {
        index: '02',
        title: 'Nâng cao ý thức & Giáo dục truyền thống',
        who: 'Đoàn trường, giáo viên Lịch sử và học sinh',
        how: 'Tổ chức ngoại khóa, hội kể chuyện lịch sử, số hóa lời kể nhân chứng, cựu chiến binh và đề xuất lắp bảng chỉ dẫn tại hiện trường.',
        impact:
          'Khắc phục tình trạng dấu tích thực địa mai một, lưu giữ ký ức lịch sử cho thế hệ trẻ.',
      },
      {
        index: '03',
        title: 'Bảo vệ cảnh quan & Môi trường di tích',
        who: 'Chính quyền địa phương, cơ quan văn hóa và cộng đồng dân cư xã Đak Nhau',
        how: 'Khoanh vùng xác định ranh giới pháp lý bảo vệ di tích, kiểm soát canh tác vườn điều/cao su không xâm lấn vùng lõi và vệ sinh môi trường cảnh quan.',
        impact:
          'Gìn giữ không gian lịch sử – sinh thái bền vững cho địa phương.',
      },
    ] satisfies ConservationSolution[],
  },
} as const;
