import { CURATED_OUTFITS, CuratedOutfit } from './outfitsCatalog';

export interface QuizOption {
  id: string;
  label: string;
  subtitle: string;
  metaBadge?: string;
  value: string;
}

export interface QuizQuestion {
  step: number;
  id: string;
  question: string;
  focusArea: string;
  description: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    step: 1,
    id: 'occasion',
    question: 'Hôm nay bạn xuất hiện ở đâu?',
    focusArea: 'Bối cảnh & Sự kiện',
    description: 'Bối cảnh quyết định tính quy chuẩn và phom dáng trang phục để vừa cuốn hút vừa tôn trọng thuần phong mỹ tục.',
    options: [
      {
        id: 'occ-formal',
        label: 'A. Lễ nghi trang trọng',
        subtitle: 'Lễ tốt nghiệp, lễ chùa/cúng đình, đám cưới, sự kiện ngoại giao, giỗ chạp gia tộc.',
        value: 'formal'
      },
      {
        id: 'occ-casual',
        label: 'B. Đi chơi · Nhập hội Gen Z',
        subtitle: 'Cà phê trò chuyện, triển lãm nghệ thuật, check-in phố cổ, quẩy festival nhạc Indie.',
        value: 'casual'
      },
      {
        id: 'occ-concept',
        label: 'C. Chụp hình Concept · Biểu diễn nghệ thuật',
        subtitle: 'Bộ ảnh Editorial nghệ thuật, trình diễn sân khấu, sàn diễn Fashion Show sáng tạo.',
        value: 'concept'
      }
    ]
  },
  {
    step: 2,
    id: 'region',
    question: 'Tọa độ địa lý / Thời tiết khu vực của bạn?',
    focusArea: 'Vùng miền & Khí hậu thích ứng',
    description: 'Chất liệu truyền thống Việt Nam được dệt để thích ứng linh hoạt với vi khí hậu từng vùng địa lý.',
    options: [
      {
        id: 'reg-north',
        label: 'A. Miền Bắc (Thu đông / Hè hanh)',
        subtitle: 'Ưu tiên chất liệu Gấm, Dạ, Đũi dệt thô mộc, phối layering áo khoác Outerwear giữ ấm.',
        value: 'north'
      },
      {
        id: 'reg-central',
        label: 'B. Miền Trung (Nắng gió · Cố đô cổ kính)',
        subtitle: 'Ưu tiên lụa tơ tằm sa Vạn Phúc, sắc tím Cố đô, vàng hoàng cung, chất liệu nhẹ và thoáng khí.',
        value: 'central'
      },
      {
        id: 'reg-south',
        label: 'C. Miền Nam (Nắng ấm quanh năm · Miệt vườn)',
        subtitle: 'Ưu tiên Lãnh Mỹ A, Đũi tự nhiên, Tơ tằm mỏng, dáng tà xẻ thoải mái, dễ di chuyển.',
        value: 'south'
      }
    ]
  },
  {
    step: 3,
    id: 'vibe',
    question: 'Vibe cá nhân của bạn hôm nay là gì?',
    focusArea: 'Phong cách cá tính Gen Z',
    description: 'Thời trang là cách bạn đối thoại với thế giới xung quanh qua ngôn ngữ thị giác.',
    options: [
      {
        id: 'vib-minimalist',
        label: 'A. Minimalist Neo-Classic',
        subtitle: 'Tối giản, thanh lịch, đường nét tinh tế, giữ phom dáng chuẩn mực không phô trương.',
        value: 'minimalist'
      },
      {
        id: 'vib-streetwear',
        label: 'B. Streetwear Cultural Fusion',
        subtitle: 'Cá tính đường phố, phối Sneaker, Chunky Boots, Denim, Blazer, dây xích kim loại.',
        value: 'streetwear'
      },
      {
        id: 'vib-y2k',
        label: 'C. Y2K / Harajuku Ethnic',
        subtitle: 'Táo bạo, nổi bật, phụ kiện kim loại metallic, phối màu tương phản cao, Layering thổ cẩm.',
        value: 'avant-garde'
      },
      {
        id: 'vib-coquette',
        label: 'D. Coquette Soft-Girl Cổ Phong',
        subtitle: 'Nữ tính, thơ mộng, gam màu pastel kẹo ngọt, tơ lụa mềm mại, nơ satin bay bổng.',
        value: 'coquette'
      }
    ]
  },
  {
    step: 4,
    id: 'css',
    question: 'Mức độ "Đậm chất di sản" bạn mong muốn?',
    focusArea: 'Cultural Strictness Score (CSS)',
    description: 'Xác định tỷ lệ giao thoa giữa cấu trúc cổ phục và chi tiết hiện đại của bộ trang phục.',
    options: [
      {
        id: 'css-100',
        label: 'A. Chuẩn Cổ 100%',
        subtitle: 'Giữ trọn vẹn quy chuẩn cắt may, tỷ lệ thân áo, vạt áo Hữu nhị, màu sắc và phụ kiện cung đình/dân gian.',
        value: '100% Chuẩn Cổ'
      },
      {
        id: 'css-50',
        label: 'B. Modern Mix 50/50',
        subtitle: 'Giữ phom dáng áo truyền thống (Giao Lĩnh/Ngũ Thân/Bà Ba), phối phần dưới (quần tây/váy xếp li/giày) đương đại.',
        value: '50/50 Modern Mix'
      },
      {
        id: 'css-20',
        label: 'C. Experimental 20/80',
        subtitle: 'Chỉ lấy họa tiết hoa văn, vạt chéo hoặc điểm nhấn Việt phục làm điểm xuyết trên outfit hoàn toàn hiện đại.',
        value: '20/80 Experimental'
      }
    ]
  },
  {
    step: 5,
    id: 'palette',
    question: 'Bảng màu yêu thích của bạn?',
    focusArea: 'Ngũ Hành & Hệ sắc thái',
    description: 'Màu sắc phản chiếu năng lượng Ngũ Hành tương sinh tương hợp và thẩm mỹ đương đại.',
    options: [
      {
        id: 'pal-nguhanh',
        label: 'A. Màu Ngũ Hành truyền thống',
        subtitle: 'Đỏ son (Hỏa), Vàng đồng (Thổ), Xanh lục (Mộc), Trắng bạch (Kim), Đen huyền (Thủy).',
        value: 'ngu-hanh'
      },
      {
        id: 'pal-pastel',
        label: 'B. Màu Pastel & Muted Neutral',
        subtitle: 'Kem be, Hồng phấn thạch, Xanh bơ nhạt, Ghi xám mờ mộng mơ, Lụa ngọc bích.',
        value: 'pastel'
      },
      {
        id: 'pal-cyber',
        label: 'C. Cyberpunk / Neon / Darkwear',
        subtitle: 'Đen tuyền tuyệt đối, Bạc ánh kim metallic phản quang, Đỏ cyber, Xanh cyan điện ảnh.',
        value: 'cyber'
      }
    ]
  }
];

export interface QuizResult {
  matchedOutfits: CuratedOutfit[];
  primaryOutfit: CuratedOutfit;
  cssLevel: '100% Chuẩn Cổ' | '50/50 Modern Mix' | '20/80 Experimental';
  stylingAdvice: string;
  culturalNote: string;
  recommendedGarments: string[];
}

export function routeQuizToOutfits(answers: Record<string, string>): QuizResult {
  const occasion = answers['occasion'] || 'casual';
  const region = answers['region'] || 'north';
  const vibe = answers['vibe'] || 'streetwear';
  const css = answers['css'] || '50/50 Modern Mix';
  const palette = answers['palette'] || 'ngu-hanh';

  // Filter outfits scoring algorithm
  const scored = CURATED_OUTFITS.map(outfit => {
    let score = 0;

    // Vibe match (highest weight)
    if (outfit.group === vibe) score += 40;

    // Strictness match
    if (outfit.culturalStrictness === css) score += 30;

    // Occasion match
    if (occasion === 'formal' && (outfit.occasion.includes('Lễ tốt nghiệp') || outfit.occasion.includes('Cưới') || outfit.occasion.includes('trang trọng') || outfit.culturalStrictness === '100% Chuẩn Cổ')) {
      score += 25;
    } else if (occasion === 'casual' && (outfit.occasion.includes('Dạo phố') || outfit.occasion.includes('Cà phê') || outfit.occasion.includes('Check-in') || outfit.occasion.includes('Concert'))) {
      score += 25;
    } else if (occasion === 'concept' && (outfit.group === 'avant-garde' || outfit.occasion.includes('Concept') || outfit.occasion.includes('Art') || outfit.occasion.includes('Runway'))) {
      score += 25;
    }

    // Hero demo outfits slight tie-break boost
    if (outfit.isHeroDemo) score += 5;

    return { outfit, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const matchedOutfits = scored.slice(0, 4).map(s => s.outfit);
  const primaryOutfit = matchedOutfits[0] || CURATED_OUTFITS[0];

  let stylingAdvice = '';
  let culturalNote = '';

  if (vibe === 'streetwear') {
    stylingAdvice = 'Sự kết hợp giữa cổ phục Giao Lĩnh / Ngũ Thân với phom quần Cargo, Jeans Raw hoặc Giày Chunky Sneaker tạo nên dáng vẻ tràn đầy nội lực thế hệ mới.';
    culturalNote = 'Giữ chuẩn tà áo Hữu nhị (Phải đè Trái) và không dùng hoa văn rồng 5 móng triều nghi vào bối cảnh đường phố.';
  } else if (vibe === 'minimalist') {
    stylingAdvice = 'Đường nét thanh thoát của áo Ngũ Thân tay chẽn hoặc áo Dài kết hợp cùng quần âu may đo và giày Loafer tạo nên sự trang trọng vừa vặn cho các cột mốc trọng đại.';
    culturalNote = 'Áo Ngũ Thân đại diện cho Ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín, là nếp sống tao nhã chuẩn mực của người Việt.';
  } else if (vibe === 'coquette') {
    stylingAdvice = 'Chất liệu tơ tằm hồng phấn, lụa Vạn Phúc mềm mại phối hợp chân váy xếp li dài và nơ satin mang đến nét thơ mộng cổ phong ngọt ngào.';
    culturalNote = 'Khi diện áo Yếm, nếu đến chốn tôn nghiêm cần luôn khoác áo Ngũ Thân hoặc Giao Lĩnh bên ngoài để giữ sự chỉn chu.';
  } else {
    stylingAdvice = 'Bản phối thử nghiệm giải phóng cấu trúc cổ điển, biến các đường nét áo Nhật Bình và thổ cẩm thành tác phẩm nghệ thuật vị lai.';
    culturalNote = 'Sáng tạo tôn trọng bản sắc: Hiểu rõ nguồn gốc để phá cách có chiều sâu thay vì ghép chắp vá vô thức.';
  }

  const recommendedGarments = [
    primaryOutfit.baseGarment,
    primaryOutfit.studioPreset.bottomId.includes('cargo') ? 'Quần Cargo Pants' : primaryOutfit.studioPreset.bottomId.includes('skirt') ? 'Chân váy xếp li dài' : 'Quần Tây Âu Slim-fit',
    primaryOutfit.palette[0]
  ];

  return {
    matchedOutfits,
    primaryOutfit,
    cssLevel: (css as any) || '50/50 Modern Mix',
    stylingAdvice,
    culturalNote,
    recommendedGarments
  };
}
