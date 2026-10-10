import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { CURATED_OUTFITS, CuratedOutfit } from '../data/outfitsCatalog';
import { HERITAGE_PERIODS } from '../data/culturalHeritage';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onOpenStudio: (outfit?: CuratedOutfit) => void;
  onOpenCatalog: () => void;
  onSelectPeriod: (periodId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onOpenStudio,
  onOpenCatalog,
  onSelectPeriod,
}) => {
  const heroDemos = CURATED_OUTFITS.filter((o) => o.isHeroDemo);

  return (
    <div className="space-y-16">
      {/* Editorial Marquee Hero */}
      <section className="relative pt-6 sm:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Curatorial Header Decker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-3">
            <span>Việt Phục Đương Đại</span>
            <span aria-hidden="true">·</span>
            <span>Di Sản Triều Lý · Trần · Lê · Nguyễn Đến Thế Kỷ XXI</span>
            <span aria-hidden="true">·</span>
            <span>Gen Z Cultural Fusion</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Editorial Manifesto & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-5">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-serif font-medium tracking-tight text-stone-900 leading-[1.15] text-balance">
                  Định hình phong cách Việt phục đương đại cho thế hệ trẻ
                </h1>

                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  Cầu nối giữa chiều sâu cổ lễ nghìn năm và nhịp thở hiện đại của Gen Z. Khám phá 
                  hơn 100 bản phối Giao Lĩnh, Viên Lĩnh, Ngũ Thân, Tứ Thân và Thổ cẩm với bộ quy chuẩn văn hóa 
                  ngăn ngừa sai lệch thời gian thực.
                </p>
              </div>

              {/* Action Suite */}
              <div className="pt-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onStartQuiz}
                    className="px-6 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Compass className="w-4 h-4" />
                    Thăm Dò Phong Cách (Quiz 5 Bước)
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenStudio()}
                    className="px-5 py-3 text-sm font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors cursor-pointer"
                  >
                    Vào Phòng Phối Đồ Trực Quan
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-stone-500 pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Bộ kiểm tra Taboo & Phẩm cấp chuẩn cổ</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Hài hòa màu sắc Ngũ Hành</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[340px]">
                <img
                  src="/src/assets/images/viet_heritage_hero_1791627760782.jpg"
                  alt="Việt phục đương đại Gen Z tại Hà Nội"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-widest text-amber-200 font-mono">Bản phối tiêu điểm 2026</span>
                  <p className="font-serif text-lg sm:text-xl font-medium mt-0.5">
                    Áo Giao Lĩnh Indigo & Ngũ Thân Sa Vạn Phúc giữa lòng Phố Cổ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Utility Ribbon */}
          <div className="mt-10 py-3.5 px-5 bg-white border border-stone-200 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-600">
            <div>
              <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">Cột mốc di sản</span>
              <span className="font-semibold text-stone-800">Lý · Trần · Lê · Nguyễn</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">Quy chuẩn cắt may</span>
              <span className="font-semibold text-stone-800">Khóa tà Hữu Nhị (Phải đè Trái)</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">Hệ thống bản phối</span>
              <span className="font-semibold text-stone-800">100 bộ phối phân chia 4 Vibe</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">Hỗ trợ ứng dụng</span>
              <span className="font-semibold text-stone-800">Tốt nghiệp, dạo phố, lễ chùa, gala</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Featured Outfits Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Bộ Sưu Tập Tiêu Điểm</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
              3 Bản phối mô phỏng đặc sắc nhất
            </h2>
          </div>
          <button
            onClick={onOpenCatalog}
            className="text-xs font-semibold text-stone-900 hover:text-amber-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Xem trọn bộ 100 phối bản</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {heroDemos.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  {outfit.featuredImage ? (
                    <img
                      src={outfit.featuredImage}
                      alt={outfit.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      Không có hình ảnh
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium rounded">
                    {outfit.culturalStrictness}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{outfit.groupName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{outfit.occasion}</span>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-stone-900 leading-snug">
                    {outfit.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {outfit.garmentFormula}
                  </p>

                  {outfit.heritageNote && (
                    <div className="p-3 bg-[#FAF8F5] rounded border border-stone-200/70 text-xs text-stone-700 leading-relaxed">
                      <span className="font-semibold text-stone-900 block mb-1">Ghi chú di sản:</span>
                      {outfit.heritageNote}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1">
                    {outfit.palette.map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-stone-200 inline-block"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenStudio(outfit)}
                    className="px-3.5 py-1.5 text-xs font-medium text-stone-900 hover:text-white hover:bg-stone-900 border border-stone-300 hover:border-stone-900 rounded transition-all cursor-pointer"
                  >
                    Thử phối bộ này
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Periods Foundation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Kho Tàng Cổ Phục</div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
            6 Dòng trang phục mục tiêu trong hệ thống
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Tìm hiểu đặc trưng cấu trúc, niên đại và ý nghĩa biểu tượng của từng phom dáng trang phục truyền thống.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HERITAGE_PERIODS.map((period) => (
            <div
              key={period.id}
              className="bg-white p-5 rounded-lg border border-stone-200 hover:border-stone-400 transition-colors cursor-pointer space-y-2.5"
              onClick={() => onSelectPeriod(period.id)}
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-stone-600">{period.era}</span>
                <span className="text-amber-800 font-medium">{period.dynasty}</span>
              </div>

              <h4 className="text-base font-serif font-semibold text-stone-900">
                {period.name}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {period.characteristics}
              </p>

              <div className="pt-2 text-xs text-stone-500 border-t border-stone-100 flex items-center justify-between">
                <span className="italic">{period.silhouette}</span>
                <span className="text-stone-800 font-medium hover:underline">Chi tiết →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
