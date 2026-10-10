import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, Sparkles, Shirt, Layers } from 'lucide-react';
import { CURATED_OUTFITS, CuratedOutfit } from '../data/outfitsCatalog';

interface CatalogueViewProps {
  onLoadOutfitToStudio: (outfit: CuratedOutfit) => void;
  onViewOutfitDetails: (outfit: CuratedOutfit) => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onLoadOutfitToStudio,
  onViewOutfitDetails
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCss, setSelectedCss] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const groups = [
    { key: 'all', label: 'Tất Cả (100 Bộ)', count: 100 },
    { key: 'streetwear', label: 'Streetwear & Techwear (25)', count: 25 },
    { key: 'minimalist', label: 'Minimalist & Elegant (25)', count: 25 },
    { key: 'coquette', label: 'Coquette & Soft-Girl (25)', count: 25 },
    { key: 'avant-garde', label: 'High-Fashion & Concept (25)', count: 25 }
  ];

  const filteredOutfits = useMemo(() => {
    return CURATED_OUTFITS.filter((item) => {
      // Group filter
      if (selectedGroup !== 'all' && item.group !== selectedGroup) return false;

      // CSS filter
      if (selectedCss !== 'all' && item.culturalStrictness !== selectedCss) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchFormula = item.garmentFormula.toLowerCase().includes(q);
        const matchOccasion = item.occasion.toLowerCase().includes(q);
        const matchGarment = item.baseGarment.toLowerCase().includes(q);
        if (!matchName && !matchFormula && !matchOccasion && !matchGarment) return false;
      }

      return true;
    });
  }, [selectedGroup, selectedCss, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-mono">
          Catalogue Phối Đồ Gen Z · Tuyển Tập 100 Bản Phối
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
          Toàn Bộ 100 Bộ Phối Việt Phục Đương Đại
        </h2>
        <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
          Hệ thống 100 bản phối được định danh cụ thể theo 4 trường phái thẩm mỹ Gen Z, ghi rõ thành tố phối, 
          bối cảnh ứng dụng và tỷ lệ tương thích văn hóa (CSS).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 pt-2">
        {/* Style Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-lg overflow-x-auto text-xs">
          {groups.map((g) => (
            <button
              key={g.key}
              onClick={() => setSelectedGroup(g.key)}
              className={`px-3.5 py-2 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroup === g.key
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Search Input & Secondary Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên outfit, kiểu áo, bối cảnh (Giao Lĩnh, Cargo, Tốt nghiệp...)"
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-md text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Đậm chất di sản (CSS):</span>
            <select
              value={selectedCss}
              onChange={(e) => setSelectedCss(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-md text-xs text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="100% Chuẩn Cổ">100% Chuẩn Cổ</option>
              <option value="50/50 Modern Mix">50/50 Modern Mix</option>
              <option value="20/80 Experimental">20/80 Experimental</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
        <span>Hiển thị <strong className="text-stone-900">{filteredOutfits.length}</strong> / 100 bản phối</span>
        <span>Click "Thử phối ngay" để nạp vào phòng phối đồ</span>
      </div>

      {/* Outfits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOutfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white border border-stone-200 rounded-lg p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-stone-400">#{outfit.overallIndex.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                  {outfit.culturalStrictness}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-900/80 font-medium block">
                  {outfit.groupName}
                </span>
                <h4 className="font-serif font-semibold text-stone-900 text-base leading-snug">
                  {outfit.name}
                </h4>
              </div>

              <div className="p-2.5 bg-[#FAF8F5] rounded border border-stone-200/60 text-xs text-stone-700 space-y-1">
                <span className="font-medium text-stone-900 block text-[11px]">Công thức phối:</span>
                <p className="leading-relaxed">{outfit.garmentFormula}</p>
              </div>

              <div className="text-xs text-stone-500">
                <strong className="text-stone-700 font-medium">Bối cảnh: </strong>
                {outfit.occasion}
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {outfit.palette.map((c, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-stone-200 inline-block"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewOutfitDetails(outfit)}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => onLoadOutfitToStudio(outfit)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Shirt className="w-3 h-3" />
                  Thử phối
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
