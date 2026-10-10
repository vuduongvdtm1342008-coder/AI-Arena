import { WardrobeItem } from '../data/wardrobeItems';
import { NGU_HANH_SYSTEM } from '../data/culturalHeritage';

export interface OutfitComposition {
  underlayer?: WardrobeItem;
  main: WardrobeItem;
  outer?: WardrobeItem;
  bottom: WardrobeItem;
  footwear: WardrobeItem;
  accessory?: WardrobeItem;
  hair?: WardrobeItem;
  fastening: 'RIGHT_OVER_LEFT' | 'LEFT_OVER_RIGHT'; // Hữu nhị (correct) vs Tả nhậm (taboo)
  context: 'formal' | 'casual' | 'temple' | 'concept'; // Event context
}

export interface ValidationIssue {
  id: string;
  type: 'RED' | 'YELLOW';
  title: string;
  message: string;
  historicalCitation: string;
  autoFixAction?: string;
  autoFixDescription?: string;
}

export interface ColorHarmonyResult {
  score: number; // 0 - 100
  ratingText: string;
  dominantElement: string;
  supportingElement?: string;
  elementCounts: Record<string, number>;
  harmonyRelationship: string;
  explanation: string;
}

export interface CulturalRespectResult {
  status: 'GREEN' | 'YELLOW' | 'RED';
  label: string;
  score: number; // 0 - 100
  issues: ValidationIssue[];
}

export function checkCulturalRespect(comp: OutfitComposition): CulturalRespectResult {
  const issues: ValidationIssue[] = [];

  // 1. CHECK FASTENING (TABOO SỐ 1: VẮT VẠT ÁO)
  if (comp.fastening === 'LEFT_OVER_RIGHT') {
    issues.push({
      id: 'fastening-taboo',
      type: 'RED',
      title: 'Tối kỵ vạt áo: Vạt Trái đè Phải (Tả Nhậm - Tử Phục)',
      message: 'Áo truyền thống đang bị vắt vạt Trái đè lên Phải. Theo cổ lễ nghìn năm của người Việt, đây là quy cách chỉ dùng cho người đã khuất (Tử phục).',
      historicalCitation: 'Sử liệu ghi nhận: Người sống cài tà "Hữu nhị" (Phải đè Trái) tượng trưng cho dương khí, sự sinh sôi và lễ tiết Á Đông.',
      autoFixAction: 'FIX_FASTENING',
      autoFixDescription: 'Đảo vạt áo sang Phải đè Trái (Hữu nhị chuẩn cổ)'
    });
  }

  // 2. CHECK ROYAL HIERARCHY (TABOO SỐ 2: PHẨM CẤP TRIỀU ĐÌNH)
  const isRoyalItemEquipped = comp.accessory?.isRoyalRestricted || comp.main?.isRoyalRestricted;
  if (isRoyalItemEquipped && (comp.context === 'casual' || comp.bottom?.id === 'b-skirt-skort-short' || comp.footwear?.id === 'f-sneaker-white-chunky')) {
    issues.push({
      id: 'royal-misuse',
      type: 'RED',
      title: 'Lỗi sai lệch phẩm cấp: Mũ Mão / Biểu tượng Hoàng tộc bừa bãi',
      message: 'Mũ Mão Triều đình hoặc phẩm phục hoàng gia không thể phối cùng trang phục đường phố casual hoặc giày thể thao đế thô trong đời thường.',
      historicalCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ quy định phẩm phục triều đình chỉ dành cho Lễ thiết triều, phạm quy sẽ bị hặc tội thất lễ.',
      autoFixAction: 'FIX_ROYAL',
      autoFixDescription: 'Chuyển sang Khăn xếp (Mấn) gấm đồng màu hoặc bỏ mũ mão triều nghi'
    });
  }

  // 3. CHECK SACRED EXPOSURE (TABOO SỐ 3: HỞ HANG CHỐN TÂM LINH)
  if (comp.context === 'temple' || comp.context === 'formal') {
    // Underlayer exposed without proper outer or main
    if (comp.bottom?.id === 'b-skirt-skort-short') {
      issues.push({
        id: 'exposure-skort-temple',
        type: 'RED',
        title: 'Phạm quy thuần phong mỹ tục: Váy ngắn tại chốn linh thiêng',
        message: 'Không gian chùa chiền, đình làng hoặc lễ nghi tôn nghiêm đòi hỏi trang phục kín đáo che kín gối.',
        historicalCitation: 'Quy ước chốn cửa Phật và Đình làng từ xưa: Y phục phải đoan trang tề chỉnh, tà áo che thân.',
        autoFixAction: 'FIX_BOTTOM_FORMAL',
        autoFixDescription: 'Đổi sang Quần suông lụa trắng hoặc Quần tây dài'
      });
    }

    if (comp.underlayer?.isExposed && (!comp.outer || comp.outer.id === 'o-none') && comp.main?.id.includes('yem')) {
      issues.push({
        id: 'exposure-yem-temple',
        type: 'RED',
        title: 'Cắt xẻ hở hang: Mặc Yếm đơn độc khi đi lễ Chùa / Lễ nghi',
        message: 'Áo Yếm là lớp nội y truyền thống, khi xuất hiện tại chốn tâm linh bắt buộc phải có áo khoác ngoài phủ kín vai và lưng.',
        historicalCitation: 'Phụ nữ Bắc Bộ xưa mặc yếm luôn khoác Áo Tứ Thân cài kín vạt hoặc khoác Giao Lĩnh khi ra đường và lễ bái.',
        autoFixAction: 'ADD_OUTERWEAR',
        autoFixDescription: 'Khoác thêm Áo Giao Lĩnh hoặc Áo Tứ Thân chỉn chu bên ngoài'
      });
    }
  }

  // 4. REGIONAL ICONOGRAPHY MISMATCH (CẢNH BÁO VÀNG: GHÉP CỌC CẠCH VÙNG MIỀN)
  const isSouthernMain = comp.main?.region === 'Nam Bộ';
  const isHueAccessory = comp.accessory?.id === 'a-man-gam-xanh' || comp.accessory?.id === 'a-mao-trieu-dinh-royal';
  if (isSouthernMain && isHueAccessory) {
    issues.push({
      id: 'regional-mismatch',
      type: 'YELLOW',
      title: 'Lưu ý bản sắc: Tráo đổi phụ kiện Cố đô với Áo Bà Ba Nam Bộ',
      message: 'Mấn gấm cung đình Huế mang tính nghi lễ miền Trung, khi phối cùng Áo Bà Ba dân dã miệt vườn Nam Bộ có thể gây cọc cạch về mặt thẩm mỹ bản địa.',
      historicalCitation: 'Áo Bà Ba Nam Bộ gắn liền với Khăn rằng quấn cổ hoặc nón lá lá buông bình dị.',
      autoFixAction: 'FIX_REGIONAL_ACCESSORY',
      autoFixDescription: 'Đổi sang Khăn rằng Nam Bộ hoặc Nón lá mộc mạc'
    });
  }

  // Determine overall status
  const hasRed = issues.some(i => i.type === 'RED');
  const hasYellow = issues.some(i => i.type === 'YELLOW');

  let status: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
  let label = 'An toàn · Đúng chuẩn mực văn hóa';
  let score = 98;

  if (hasRed) {
    status = 'RED';
    label = 'Cảnh báo đỏ: Vi phạm quy chuẩn cổ lễ';
    score = 35;
  } else if (hasYellow) {
    status = 'YELLOW';
    label = 'Lưu ý vàng: Sáng tạo cần cân nhắc bối cảnh';
    score = 78;
  }

  return { status, label, score, issues };
}

export function calculateColorHarmony(items: (WardrobeItem | undefined)[]): ColorHarmonyResult {
  const validItems = items.filter((it): it is WardrobeItem => !!it && it.hexColor !== 'transparent');
  const elementCounts: Record<string, number> = { KIM: 0, MOC: 0, THUY: 0, HOA: 0, THO: 0 };

  validItems.forEach(item => {
    if (elementCounts[item.nguHanh] !== undefined) {
      elementCounts[item.nguHanh]++;
    }
  });

  // Find dominant
  let dominant = 'THUY';
  let maxCount = -1;
  Object.entries(elementCounts).forEach(([elem, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = elem;
    }
  });

  const dominantObj = NGU_HANH_SYSTEM[dominant] || NGU_HANH_SYSTEM.THUY;
  const supportingElem = dominantObj.supporting;
  const opposingElem = dominantObj.opposing;

  const hasSupporting = (elementCounts[supportingElem] || 0) > 0;
  const hasOpposing = (elementCounts[opposingElem] || 0) > 0;

  let score = 85;
  let harmonyRelationship = 'Hài hòa đồng điệu';
  let explanation = `Màu chủ đạo thuộc hành ${dominantObj.name}. `;

  if (hasSupporting && !hasOpposing) {
    score = 96;
    harmonyRelationship = `Tương sinh tương hỗ (${dominantObj.element} sinh ${supportingElem})`;
    explanation += `Bản phối có sự tương sinh hoàn hảo với hành phụ trợ, tạo luồng sinh khí cân bằng, vừa quý phái vừa hiện đại.`;
  } else if (hasOpposing) {
    score = 76;
    harmonyRelationship = `Tương phản năng động (${dominantObj.element} - ${opposingElem})`;
    explanation += `Có sự tương phản giữa hai hành, tạo cảm giác phá cách sắc sảo theo chuẩn mực Color-block thời trang Gen Z.`;
  } else {
    score = 90;
    harmonyRelationship = `Đồng hành thuần khiết`;
    explanation += `Tập trung vào sắc thái đồng tông, tôn vinh phom dáng tối giản và chất liệu vải tự nhiên.`;
  }

  let ratingText = 'Rất hài hòa';
  if (score >= 95) ratingText = 'Tuyệt tác tương sinh';
  else if (score >= 85) ratingText = 'Hài hòa thanh lịch';
  else ratingText = 'Tương phản cá tính';

  return {
    score,
    ratingText,
    dominantElement: dominantObj.name,
    supportingElement: hasSupporting ? NGU_HANH_SYSTEM[supportingElem]?.name : undefined,
    elementCounts,
    harmonyRelationship,
    explanation
  };
}
