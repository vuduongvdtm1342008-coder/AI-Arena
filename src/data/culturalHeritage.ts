export interface HeritagePeriod {
  id: string;
  name: string;
  dynasty: string;
  era: string;
  characteristics: string;
  significance: string;
  silhouette: string;
}

export const HERITAGE_PERIODS: HeritagePeriod[] = [
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh (Cổ Chéo)',
    dynasty: 'Thời Lý - Trần - Lê',
    era: 'Thế kỷ XI - XVIII',
    characteristics: 'Hai vạt áo giao nhau chéo trước ngực, buộc vạt bên phải (Hữu nhị), phom dáng rộng phóng khoáng, tay thụng hoặc tay thường.',
    significance: 'Một trong những dạng cổ áo lâu đời nhất của người Việt cổ, biểu tượng của sự uy nghiêm và cốt cách kẻ sĩ Đông Kinh.',
    silhouette: 'Cross-collar layered robe'
  },
  {
    id: 'vien-linh',
    name: 'Áo Viên Lĩnh (Cổ Tròn)',
    dynasty: 'Thời Lý - Trần - Lê',
    era: 'Thế kỷ XI - XVIII',
    characteristics: 'Cổ tròn ôm khít cổ, cài khuy bên vai phải, phom dáng tôn nghiêm, thường đi kèm bổ tử hoặc vải dệt hoa văn long phụng.',
    significance: 'Thường phục và lễ phục của quan lại, hoàng tộc thời Lê sơ và Lê trung hưng.',
    silhouette: 'Round-collar court robe'
  },
  {
    id: 'ngu-than',
    name: 'Áo Ngũ Thân Lập Lĩnh (Tay Chẽn / Tay Thụngth)',
    dynasty: 'Thời Chúa Nguyễn - Triều Nguyễn',
    era: '1744 (Chúa Nguyễn Phúc Khoát) - 1837 (Vua Minh Mạng) - TK XX',
    characteristics: '5 thân áo (4 thân ngoài tượng trưng Tứ thân phụ mẫu, 1 thân con bên trong tượng trưng cho người mặc), cổ đứng cài 5 hạt khuy (Nhân - Lễ - Nghĩa - Trí - Tín).',
    significance: 'Trang phục chuẩn mực thống nhất toàn cõi Việt Nam, tiền thân trực tiếp của Áo Dài hiện đại.',
    silhouette: 'Five-panel standing collar'
  },
  {
    id: 'ao-dai',
    name: 'Áo Dài Truyền Thống & Tân Thời',
    dynasty: 'Thế kỷ XX - Nay',
    era: 'Thập niên 1930 (Lemur Cát Tường) đến Hiện đại',
    characteristics: 'Hai tà trước sau buông dài, chiết eo hoặc suông tơ tằm, cổ cao/cổ thuyền/cổ bèo cách điệu, kết hợp quần lụa suông rộng.',
    significance: 'Quốc phục đại diện cho vẻ đẹp uyển chuyển, thanh tao và hiện đại của người phụ nữ và nam giới Việt.',
    silhouette: 'Two-flap slender tunic'
  },
  {
    id: 'tu-than-ba-ba',
    name: 'Áo Tứ Thân & Áo Bà Ba',
    dynasty: 'Đồng bằng Bắc Bộ & Tây Nam Bộ',
    era: 'Dân gian truyền thống trường tồn',
    characteristics: 'Tứ thân: 4 vạt áo buộc chéo trước bụng, đi kèm yếm, bao sáp, nón quai thao. Bà ba: xẻ tà hai bên hông, cài khuy giữa ngực, tay dài cổ tròn.',
    significance: 'Hơi thở dân dã, chân chất, phóng khoáng của cư dân miền sông nước đồng bằng.',
    silhouette: 'Four-panel folk & southern peasant tunic'
  },
  {
    id: 'tho-cam-ethnic',
    name: 'Thổ Cẩm Dân Tộc (H\'Mông, Thái, Chăm, Khmer)',
    dynasty: 'Các tộc người bản địa Việt Nam',
    era: 'Di sản hàng ngàn năm',
    characteristics: 'Dệt sợi lanh thủ công, nhuộm chàm tự nhiên, hoa văn hình học, sáp ong, hạt cườm bạc, sắc màu rực rỡ tượng trưng cho thiên nhiên vũ trụ.',
    significance: 'Kho báu văn hóa dệt may với chiều sâu tín ngưỡng và kỹ thuật tạo tác vô giá.',
    silhouette: 'Brocade ethnic weave & geometric embroidery'
  }
];

export interface TabooRule {
  id: string;
  category: 'ROYAL_HIERARCHY' | 'SACRED_EXPOSURE' | 'INCORRECT_FASTENING' | 'ICONOGRAPHY_MISPLACEMENT';
  title: string;
  severity: 'RED' | 'YELLOW';
  description: string;
  example: string;
  historicalContext: string;
  solution: string;
}

export const CULTURAL_TABOOS: TabooRule[] = [
  {
    id: 'taboo-fastening-left',
    category: 'INCORRECT_FASTENING',
    title: 'Mặc ngược vạt áo (Tả nhậm - Trái đè Phải)',
    severity: 'RED',
    description: 'Áo Giao Lĩnh / Ngũ Thân vắt vạt Trái đè lên Phải. Đây là quy cách tối kỵ của cổ nhân, chỉ dùng cho Tử phục (người đã mất).',
    example: 'Giao Lĩnh hoặc Ngũ Thân bị cài ngược vạt từ trái sang phải.',
    historicalContext: 'Trong cổ lễ Á Đông và truyền thống Việt Nam, người sống luôn cài tà theo quy tắc "Hữu nhị" (Vạt Phải đè vạt Trái). Ngược lại là tập tục của người khuất hoặc dị tộc.',
    solution: 'Khóa chặt quy cách: Luôn vắt vạt áo từ PHẢI sang TRÁI (Hữu nhị) để giữ sinh khí và tôn trọng truyền thống.'
  },
  {
    id: 'taboo-royal-5claws',
    category: 'ROYAL_HIERARCHY',
    title: 'Lạm dụng biểu tượng Hoàng gia & Phẩm cấp triều đình',
    severity: 'RED',
    description: 'Sử dụng hoa văn Rồng 5 móng (Ngũ trảo kim long - chỉ dành riêng cho Hoàng đế) hoặc áo Nhật Bình / Mũ Mão triều hội để đi bar, quẩy festival, phối quần rách.',
    example: 'Mũ Mão đại triều phối với áo thun, hoặc thêu rồng 5 móng đi sự kiện giải trí bình dân.',
    historicalContext: 'Thời phong kiến, phẩm phục hoàng gia đại diện cho thiên mệnh và quốc gia. Mũ miện triều nghi có phẩm cấp nghiêm ngặt, không thể dùng bừa bãi trong bối cảnh đời thường giễu nhại.',
    solution: 'Chuyển sang hoa văn Vân Mây (mây cuộn), Hoa Cúc, Bách Hoa, Rồng 4 móng (dành cho vương công hoặc dân gian), hoặc giữ trang phục trong bối cảnh biểu diễn nghệ thuật/nghi lễ trang trọng.'
  },
  {
    id: 'taboo-sacred-exposure',
    category: 'SACRED_EXPOSURE',
    title: 'Cắt xẻ hở hang tại chốn linh thiêng (Chùa, Đình, Miếu)',
    severity: 'RED',
    description: 'Mặc Áo Yếm đơn độc không khoác ngoài, áo tà xẻ quá cao không có quần lụa, hoặc áo mỏng xuyên thấu khi đến chốn thờ tự tâm linh.',
    example: 'Mặc áo yếm hở lưng hoặc chân váy siêu ngắn đi lễ chùa đầu năm.',
    historicalContext: 'Không gian tâm linh người Việt đề cao sự thanh tịnh, kín đáo. Cổ nhân khi đi lễ luôn mặc áo Ngũ thân tay chẽn hoặc khoác áo tứ thân buộc vạt chỉn chu.',
    solution: 'Luôn khoác thêm Áo Giao Lĩnh, Ngũ Thân hoặc Áo Tứ Thân mỏng bên ngoài; phối quần suông dài che kín gót.'
  },
  {
    id: 'taboo-iconography-mismatch',
    category: 'ICONOGRAPHY_MISPLACEMENT',
    title: 'Tráo đổi biểu tượng văn hóa cọc cạch (Regional Misplacement)',
    severity: 'YELLOW',
    description: 'Ghép phụ kiện biểu tượng của vùng này với trang phục mang căn tính đặc thù vùng khác thiếu sự hiểu biết.',
    example: 'Đội Khăn xếp (Mấn) gấm Cố đô Huế khi mặc Áo Bà Ba Nam Bộ dạo chợ nổi, hoặc đeo kiềng bạc Kinh Bắc với thổ cẩm Khmer.',
    historicalContext: 'Mỗi miền đất có hệ sinh thái trang phục thích ứng với khí hậu và lịch sử địa phương. Sự pha trộn tùy tiện làm nhạt nhòa bản sắc nguyên bản.',
    solution: 'Lựa chọn phụ kiện đồng bộ theo mạch văn hóa địa phương (Áo Bà Ba đi cùng khăn rằng; Ngũ Thân Huế đi cùng mấn lụa/guốc mộc; Kinh Bắc đi cùng nón quai thao).'
  }
];

export interface NguHanhElement {
  element: 'KIM' | 'MOC' | 'THUY' | 'HOA' | 'THO';
  name: string;
  colors: string[];
  meaning: string;
  supporting: 'THUY' | 'HOA' | 'MOC' | 'THO' | 'KIM'; // sinh
  opposing: 'MOC' | 'THO' | 'HOA' | 'KIM' | 'THUY'; // khắc
}

export const NGU_HANH_SYSTEM: Record<string, NguHanhElement> = {
  KIM: {
    element: 'KIM',
    name: 'Kim (Kim loại / Bạch kim)',
    colors: ['Trắng', 'Bạc', 'Ghi xám', 'Ánh kim'],
    meaning: 'Sự thuần khiết, thanh cao, sắc sảo và hiện đại.',
    supporting: 'THUY',
    opposing: 'MOC'
  },
  MOC: {
    element: 'MOC',
    name: 'Mộc (Cây cỏ / Sinh khí)',
    colors: ['Xanh lục', 'Xanh rêu', 'Xanh bơ', 'Xanh ngọc'],
    meaning: 'Sự sinh sôi, tươi mới, hòa hợp với đất trời đại ngàn.',
    supporting: 'HOA',
    opposing: 'THO'
  },
  THUY: {
    element: 'THUY',
    name: 'Thủy (Nước / Biển sâu)',
    colors: ['Đen', 'Xanh lam', 'Xanh navy', 'Xanh bảo lam'],
    meaning: 'Sự uyên bác, tĩnh lặng, mềm mại và chiều sâu trí tuệ.',
    supporting: 'MOC',
    opposing: 'HOA'
  },
  HOA: {
    element: 'HOA',
    name: 'Hỏa (Lửa / Mặt trời)',
    colors: ['Đỏ đô', 'Hồng phấn', 'Tím cố đô', 'Đỏ thẫm'],
    meaning: 'Nhiệt huyết, quyền quý, hân hoan may mắn và thịnh vượng.',
    supporting: 'THO',
    opposing: 'KIM'
  },
  THO: {
    element: 'THO',
    name: 'Thổ (Đất mẹ / Trầm tích)',
    colors: ['Vàng đồng', 'Nâu đất', 'Be kem', 'Cam đất'],
    meaning: 'Sự vững chãi, khiêm nhường, nuôi dưỡng và cội nguồn.',
    supporting: 'KIM',
    opposing: 'THUY'
  }
};
