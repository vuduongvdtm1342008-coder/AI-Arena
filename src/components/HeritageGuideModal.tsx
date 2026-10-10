import React from 'react';
import { X, BookOpen, Layers, CheckCircle2, AlertOctagon } from 'lucide-react';
import { CuratedOutfit } from '../data/outfitsCatalog';
import { HERITAGE_PERIODS, CULTURAL_TABOOS } from '../data/culturalHeritage';

interface HeritageGuideModalProps {
  outfit?: CuratedOutfit | null;
  periodId?: string | null;
  onClose: () => void;
  onLoadOutfitToStudio?: (outfit: CuratedOutfit) => void;
}

export const HeritageGuideModal: React.FC<HeritageGuideModalProps> = ({
  outfit,
  periodId,
  onClose,
  onLoadOutfitToStudio
}) => {
  const period = periodId ? HERITAGE_PERIODS.find((p) => p.id === periodId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 transition-colors z-10 cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {outfit ? (
          <div>
            {/* Outfit Featured Header */}
            <div className="p-6 border-b border-stone-200/80 bg-white">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span>{outfit.groupName}</span>
                <span aria-hidden="true">·</span>
                <span>Mức độ di sản: {outfit.culturalStrictness}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {outfit.name}
              </h3>
            </div>

            <div className="p-6 space-y-5 text-xs text-stone-700">
              {outfit.featuredImage && (
                <div className="rounded-lg overflow-hidden aspect-[16/9] bg-stone-100 border border-stone-200">
                  <img
                    src={outfit.featuredImage}
                    alt={outfit.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                <span className="font-semibold text-stone-900 block text-xs">
                  Thành tố & Công thức phối đồ:
                </span>
                <p className="leading-relaxed text-stone-700">{outfit.garmentFormula}</p>
                <div className="pt-2 text-stone-500">
                  <strong>Bối cảnh phù hợp:</strong> {outfit.occasion}
                </div>
              </div>

              {outfit.heritageNote && (
                <div className="p-4 bg-[#F5F2EB] rounded-lg border border-stone-300 text-stone-800 space-y-1.5 leading-relaxed">
                  <span className="font-serif font-bold text-stone-900 block text-xs uppercase tracking-wider">
                    Kiến Thức & Ghi Chú Di Sản:
                  </span>
                  <p>{outfit.heritageNote}</p>
                </div>
              )}

              {/* Ngũ Hành Harmony Swatch */}
              <div className="p-4 bg-white rounded-lg border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900 block">Bảng màu & Ngũ Hành:</span>
                  <span className="text-stone-500">{outfit.nguHanhHarmony}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {outfit.palette.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-stone-200 inline-block shadow-2xs"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-end gap-3">
              {onLoadOutfitToStudio && (
                <button
                  onClick={() => {
                    onLoadOutfitToStudio(outfit);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  Nạp Vào Phòng Phối Đồ
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : period ? (
          <div>
            <div className="p-6 border-b border-stone-200/80 bg-white">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span>{period.era}</span>
                <span aria-hidden="true">·</span>
                <span>{period.dynasty}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {period.name}
              </h3>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700 leading-relaxed">
              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-1">
                <span className="font-semibold text-stone-900 block">Đặc trưng cấu trúc cắt may:</span>
                <p>{period.characteristics}</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-1">
                <span className="font-semibold text-stone-900 block">Giá trị văn hóa & Lịch sử:</span>
                <p>{period.significance}</p>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-950 space-y-1">
                <span className="font-semibold block">Lưu ý khi phối đồ thế hệ trẻ:</span>
                <p>
                  Luôn duy trì quy tắc vắt tà Phải đè Trái (Hữu nhị). Không sử dụng các biểu tượng phẩm phục triều đình (như hoa văn rồng 5 móng) vào trang phục thường nhật.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
