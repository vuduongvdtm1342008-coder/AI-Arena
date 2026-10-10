import React, { useState } from 'react';
import { X, Check, Copy, Download, Share2, Sparkles, ShieldCheck, QrCode } from 'lucide-react';
import { OutfitComposition, ColorHarmonyResult, CulturalRespectResult } from '../utils/culturalChecker';

interface LookbookCardModalProps {
  composition: OutfitComposition | null;
  harmony: ColorHarmonyResult | null;
  respect: CulturalRespectResult | null;
  onClose: () => void;
}

export const LookbookCardModal: React.FC<LookbookCardModalProps> = ({
  composition,
  harmony,
  respect,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!composition) return null;

  const handleCopySummary = () => {
    const text = `[LOOKBOOK CARD · KINH KỲ TÂN THỜI]
Áo chính: ${composition.main.vietnameseName} (${composition.main.historicalPeriod})
Khoác ngoài: ${composition.outer?.vietnameseName || 'Không'}
Lớp lót: ${composition.underlayer?.vietnameseName || 'Không'}
Phần dưới: ${composition.bottom.vietnameseName}
Giày: ${composition.footwear.vietnameseName}
Phụ kiện: ${composition.accessory?.vietnameseName || 'Không'}
Quy cách vạt: ${composition.fastening === 'RIGHT_OVER_LEFT' ? 'Hữu Nhị (Phải đè Trái)' : 'Tả Nhậm'}
Hài hòa Ngũ hành: ${harmony?.ratingText || 'Tương hợp'} (${harmony?.score}/100)
Tôn trọng văn hóa: ${respect?.label || 'An toàn'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 transition-colors z-10 cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Card Header & Brand Ribbon */}
        <div className="p-6 pb-4 border-b border-stone-200/80 bg-white">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-mono uppercase tracking-widest text-[10px]">THẺ LOOKBOOK DI SẢN · VOL. 2026</span>
            <span className="font-semibold text-stone-800">Kinh Kỳ Tân Thời</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {composition.main.vietnameseName}
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Niên đại: {composition.main.historicalPeriod} · Bối cảnh: {composition.context.toUpperCase()}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-5 text-xs text-stone-700">
          {/* 3D Mannequin Visual Snapshot */}
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-stone-900 border border-stone-200 shadow-inner flex items-center justify-center">
            <img
              src={
                composition.main.id === 'm-ngu-than-pink-silk'
                  ? '/src/assets/images/mannequin_3d_ngu_than_coquette_1791631937588.jpg'
                  : composition.main.id === 'm-ngu-than-blue-brocade' || composition.context === 'formal'
                  ? '/src/assets/images/mannequin_3d_neo_formal_1791631946655.jpg'
                  : composition.outer?.id === 'o-nhat-binh-modern' || composition.context === 'concept'
                  ? '/src/assets/images/mannequin_3d_avant_garde_nhat_binh_1791631955854.jpg'
                  : '/src/assets/images/mannequin_3d_giao_linh_1791631925017.jpg'
              }
              alt="Mô phỏng 3D Lookbook"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-stone-950/80 backdrop-blur-xs text-amber-200 text-[10px] px-2 py-0.5 rounded font-mono">
              3D Simulation Render · Clo3D Engine
            </div>
          </div>

          {/* Garments breakdown definition list */}
          <div className="space-y-2 bg-white p-4 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Cấu Trúc Lớp Y Phục (Layering Stack)
            </span>
            <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-100">
              <span className="text-stone-500">Áo chính:</span>
              <span className="col-span-2 font-medium text-stone-900">{composition.main.vietnameseName}</span>
            </div>
            {composition.outer && composition.outer.id !== 'o-none' && (
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-100">
                <span className="text-stone-500">Áo khoác:</span>
                <span className="col-span-2 font-medium text-stone-900">{composition.outer.vietnameseName}</span>
              </div>
            )}
            {composition.underlayer && (
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-100">
                <span className="text-stone-500">Lớp lót:</span>
                <span className="col-span-2 font-medium text-stone-900">{composition.underlayer.vietnameseName}</span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-100">
              <span className="text-stone-500">Phần dưới:</span>
              <span className="col-span-2 font-medium text-stone-900">{composition.bottom.vietnameseName}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-100">
              <span className="text-stone-500">Giày / Guốc:</span>
              <span className="col-span-2 font-medium text-stone-900">{composition.footwear.vietnameseName}</span>
            </div>
            {composition.accessory && (
              <div className="grid grid-cols-3 gap-1 py-1">
                <span className="text-stone-500">Phụ kiện:</span>
                <span className="col-span-2 font-medium text-stone-900">{composition.accessory.vietnameseName}</span>
              </div>
            )}
          </div>

          {/* Cultural & Harmony Audit Strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                Tôn Trọng Văn Hóa
              </span>
              <span className="font-semibold text-stone-900 block text-xs">
                {respect?.label}
              </span>
              <span className="text-[10px] text-stone-500 mt-0.5 block">
                {composition.fastening === 'RIGHT_OVER_LEFT' ? '✓ Hữu Nhị (Chuẩn sinh khí)' : '⚠ Tối kỵ Tả Nhậm'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                Bảng Màu Ngũ Hành
              </span>
              <span className="font-semibold text-stone-900 block text-xs">
                {harmony?.score}/100 · {harmony?.ratingText}
              </span>
              <span className="text-[10px] text-stone-500 mt-0.5 block truncate">
                Chủ đạo: {harmony?.dominantElement}
              </span>
            </div>
          </div>

          {/* Simulated QR Code & Provenance stamp */}
          <div className="p-3.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-stone-900 block text-xs">Thẻ Xác Thực Di Sản Gen Z</span>
              <span className="text-[11px] text-stone-500 block">Quét để xem tài liệu lịch sử & ảnh thực tế</span>
            </div>
            <div className="w-12 h-12 bg-stone-900 text-white rounded p-1 flex items-center justify-center shrink-0">
              <QrCode className="w-9 h-9" />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopySummary}
            className="px-4 py-2 text-xs font-medium text-stone-800 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Đã sao chép thẻ' : 'Sao chép văn bản'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
