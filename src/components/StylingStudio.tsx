import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Wand2,
  Lock,
  Unlock,
  Eye,
  Sliders,
  Palette,
  Maximize2,
  ZoomIn,
  Camera,
  Layers,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import {
  WARDROBE_ITEMS,
  WardrobeItem,
  GarmentLayerType
} from '../data/wardrobeItems';
import {
  checkCulturalRespect,
  calculateColorHarmony,
  OutfitComposition,
  ValidationIssue
} from '../utils/culturalChecker';
import { CuratedOutfit, CURATED_OUTFITS } from '../data/outfitsCatalog';

interface StylingStudioProps {
  initialOutfit?: CuratedOutfit | null;
  onOpenLookbook: (comp: OutfitComposition, harmony: any, respect: any) => void;
}

export const StylingStudio: React.FC<StylingStudioProps> = ({
  initialOutfit,
  onOpenLookbook
}) => {
  // Event context
  const [eventContext, setEventContext] = useState<'formal' | 'casual' | 'temple' | 'concept'>('casual');

  // Fastening state: Hữu nhị (Phải đè Trái - Correct) vs Tả nhậm (Trái đè Phải - Taboo)
  const [fastening, setFastening] = useState<'RIGHT_OVER_LEFT' | 'LEFT_OVER_RIGHT'>('RIGHT_OVER_LEFT');

  // 3D Viewport controls
  const [cameraAngle, setCameraAngle] = useState<'full' | 'front' | 'perspective' | 'detail'>('full');
  const [lightingMode, setLightingMode] = useState<'museum' | 'studio' | 'warm' | 'cyber'>('museum');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Layer visibility toggles (for layer isolation inspector)
  const [visibleLayers, setVisibleLayers] = useState<Record<GarmentLayerType, boolean>>({
    hair: true,
    accessory: true,
    outer: true,
    main: true,
    underlayer: true,
    bottom: true,
    footwear: true
  });

  // Active layer selection tab in wardrobe drawer
  const [activeLayerTab, setActiveLayerTab] = useState<GarmentLayerType>('main');

  // Currently equipped wardrobe items
  const [equippedItems, setEquippedItems] = useState<{
    underlayer?: WardrobeItem;
    main: WardrobeItem;
    outer?: WardrobeItem;
    bottom: WardrobeItem;
    footwear: WardrobeItem;
    accessory?: WardrobeItem;
    hair?: WardrobeItem;
  }>(() => {
    if (initialOutfit) {
      const p = initialOutfit.studioPreset;
      return {
        underlayer: WARDROBE_ITEMS.find((i) => i.id === p.underlayerId),
        main: WARDROBE_ITEMS.find((i) => i.id === p.mainId) || WARDROBE_ITEMS.find((i) => i.id === 'm-giao-linh-black-linen')!,
        outer: WARDROBE_ITEMS.find((i) => i.id === p.outerId),
        bottom: WARDROBE_ITEMS.find((i) => i.id === p.bottomId) || WARDROBE_ITEMS.find((i) => i.id === 'b-cargo-olive')!,
        footwear: WARDROBE_ITEMS.find((i) => i.id === p.footwearId) || WARDROBE_ITEMS.find((i) => i.id === 'f-sneaker-white-chunky')!,
        accessory: WARDROBE_ITEMS.find((i) => i.id === p.accessoryId),
        hair: WARDROBE_ITEMS.find((i) => i.id === p.hairId)
      };
    }

    return {
      underlayer: WARDROBE_ITEMS.find((i) => i.id === 'u-turtleneck-grey'),
      main: WARDROBE_ITEMS.find((i) => i.id === 'm-giao-linh-black-linen')!,
      outer: WARDROBE_ITEMS.find((i) => i.id === 'o-none'),
      bottom: WARDROBE_ITEMS.find((i) => i.id === 'b-cargo-olive')!,
      footwear: WARDROBE_ITEMS.find((i) => i.id === 'f-sneaker-white-chunky')!,
      accessory: WARDROBE_ITEMS.find((i) => i.id === 'a-pendant-khanh-tho'),
      hair: WARDROBE_ITEMS.find((i) => i.id === 'h-modern-textured-crop')
    };
  });

  // Determine current 3D mannequin visual representation
  const active3DMannequinImage = useMemo(() => {
    // 1. If equipped main is Giao Linh or streetwear vibe:
    if (equippedItems.main.id === 'm-giao-linh-black-linen' || equippedItems.main.vibe === 'streetwear') {
      return '/src/assets/images/mannequin_3d_giao_linh_1791631925017.jpg';
    }
    // 2. If equipped main is Ngu Than Pink Silk or Coquette vibe:
    if (equippedItems.main.id === 'm-ngu-than-pink-silk' || equippedItems.main.vibe === 'coquette') {
      return '/src/assets/images/mannequin_3d_ngu_than_coquette_1791631937588.jpg';
    }
    // 3. If equipped main is Ngu Than Brocade or Minimalist / Formal:
    if (equippedItems.main.id === 'm-ngu-than-blue-brocade' || equippedItems.main.vibe === 'minimalist' || eventContext === 'formal') {
      return '/src/assets/images/mannequin_3d_neo_formal_1791631946655.jpg';
    }
    // 4. If avant-garde, Nhat Binh, Vien Linh or concept:
    if (equippedItems.outer?.id === 'o-nhat-binh-modern' || equippedItems.main.vibe === 'avant-garde' || eventContext === 'concept') {
      return '/src/assets/images/mannequin_3d_avant_garde_nhat_binh_1791631955854.jpg';
    }

    return '/src/assets/images/mannequin_3d_giao_linh_1791631925017.jpg';
  }, [equippedItems, eventContext]);

  // Composition object for validator
  const currentComposition: OutfitComposition = useMemo(
    () => ({
      ...equippedItems,
      fastening,
      context: eventContext
    }),
    [equippedItems, fastening, eventContext]
  );

  // Real-time Cultural Respect Check
  const culturalRespect = useMemo(
    () => checkCulturalRespect(currentComposition),
    [currentComposition]
  );

  // Real-time Color Harmony Check
  const colorHarmony = useMemo(
    () =>
      calculateColorHarmony([
        equippedItems.underlayer,
        equippedItems.main,
        equippedItems.outer,
        equippedItems.bottom,
        equippedItems.footwear,
        equippedItems.accessory
      ]),
    [equippedItems]
  );

  // Equip item handler
  const handleEquipItem = (item: WardrobeItem) => {
    setEquippedItems((prev) => ({
      ...prev,
      [item.layer]: item
    }));
  };

  // Toggle layer visibility
  const toggleLayerVisibility = (layer: GarmentLayerType) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Auto-Fix cultural taboo issues
  const handleAutoFix = (issue: ValidationIssue) => {
    if (issue.autoFixAction === 'FIX_FASTENING') {
      setFastening('RIGHT_OVER_LEFT');
    } else if (issue.autoFixAction === 'FIX_ROYAL') {
      const safeAccessory = WARDROBE_ITEMS.find((i) => i.id === 'a-man-gam-xanh');
      setEquippedItems((prev) => ({ ...prev, accessory: safeAccessory }));
    } else if (issue.autoFixAction === 'FIX_BOTTOM_FORMAL') {
      const formalBottom = WARDROBE_ITEMS.find((i) => i.id === 'b-pants-silk-white');
      if (formalBottom) setEquippedItems((prev) => ({ ...prev, bottom: formalBottom }));
    } else if (issue.autoFixAction === 'ADD_OUTERWEAR') {
      const modestOuter = WARDROBE_ITEMS.find((i) => i.id === 'o-nhat-binh-modern');
      if (modestOuter) setEquippedItems((prev) => ({ ...prev, outer: modestOuter }));
    } else if (issue.autoFixAction === 'FIX_REGIONAL_ACCESSORY') {
      const southernAcc = WARDROBE_ITEMS.find((i) => i.id === 'a-khan-rang-nam-bo');
      if (southernAcc) setEquippedItems((prev) => ({ ...prev, accessory: southernAcc }));
    }
  };

  // Filter items in catalog drawer by layer tab
  const drawerItems = useMemo(
    () => WARDROBE_ITEMS.filter((i) => i.layer === activeLayerTab),
    [activeLayerTab]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Studio Utility Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-mono">
            Phòng Phối Đồ 3D Tương Tác Thời Gian Thực
          </div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900">
            3D Digital Fashion Studio & Giám Sát Cổ Lễ
          </h2>
        </div>

        {/* Context Selector & Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-md text-xs">
            <span className="text-stone-500 px-2 font-medium">Bối cảnh:</span>
            <button
              onClick={() => setEventContext('casual')}
              className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                eventContext === 'casual' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dạo Phố
            </button>
            <button
              onClick={() => setEventContext('formal')}
              className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                eventContext === 'formal' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lễ Nghi / Cưới
            </button>
            <button
              onClick={() => setEventContext('temple')}
              className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                eventContext === 'temple' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lễ Chùa / Đình
            </button>
            <button
              onClick={() => setEventContext('concept')}
              className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                eventContext === 'concept' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Concept Art
            </button>
          </div>

          <button
            onClick={() => onOpenLookbook(currentComposition, colorHarmony, culturalRespect)}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ml-auto"
          >
            <Share2 className="w-3.5 h-3.5" />
            Xuất Lookbook Card
          </button>
        </div>
      </div>

      {/* Main Studio Grid: 3D Mannequin Viewport (6 Cols) vs Controls & Closet (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Full Photorealistic 3D Mannequin Simulation Viewport */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-sm">
          {/* Viewport Top Header & Camera Angles */}
          <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
            <div className="flex items-center gap-1.5 font-medium text-stone-700">
              <Camera className="w-3.5 h-3.5 text-stone-500" />
              <span>Góc nhìn 3D:</span>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded text-xs">
              <button
                onClick={() => setCameraAngle('full')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  cameraAngle === 'full' ? 'bg-white text-stone-900 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Toàn Thân
              </button>
              <button
                onClick={() => setCameraAngle('front')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  cameraAngle === 'front' ? 'bg-white text-stone-900 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Chính Diện
              </button>
              <button
                onClick={() => setCameraAngle('perspective')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  cameraAngle === 'perspective' ? 'bg-white text-stone-900 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Nghiêng 45°
              </button>
              <button
                onClick={() => setCameraAngle('detail')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  cameraAngle === 'detail' ? 'bg-white text-stone-900 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cận Cảnh Khuy
              </button>
            </div>
          </div>

          {/* 3D Simulation Stage */}
          <div
            className={`relative rounded-xl overflow-hidden aspect-[3/4] flex items-center justify-center border border-stone-200/90 shadow-inner transition-all duration-300 ${
              lightingMode === 'museum'
                ? 'bg-gradient-to-b from-stone-900 to-stone-950'
                : lightingMode === 'studio'
                ? 'bg-gradient-to-b from-stone-200 to-stone-300'
                : lightingMode === 'warm'
                ? 'bg-gradient-to-b from-amber-950 to-stone-950'
                : 'bg-gradient-to-b from-slate-950 via-zinc-900 to-black'
            }`}
          >
            {/* The Actual 3D Mannequin Visual Render */}
            <div
              className={`w-full h-full relative transition-transform duration-500 ease-out ${
                cameraAngle === 'detail'
                  ? 'scale-150 -translate-y-12'
                  : cameraAngle === 'perspective'
                  ? 'scale-105 rotate-1'
                  : cameraAngle === 'front'
                  ? 'scale-100'
                  : 'scale-100'
              }`}
            >
              <img
                src={active3DMannequinImage}
                alt="3D Mannequin Simulation"
                className="w-full h-full object-cover object-top filter contrast-[1.03] transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Fastening Error Watermark Banner if user toggles Tả Nhậm (Mặc ngược) */}
              {fastening === 'LEFT_OVER_RIGHT' && (
                <div className="absolute inset-0 bg-red-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-30 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-red-600/30 border border-red-400 flex items-center justify-center">
                    <ShieldAlert className="w-7 h-7 text-red-200 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold block text-red-100">
                      CẢNH BÁO TỐI KỴ CỔ LỄ: TẢ NHẬM
                    </span>
                    <p className="text-xs text-red-200 max-w-xs mt-1 leading-relaxed">
                      Vạt Trái đè Phải là quy cách cài tà chỉ dùng cho người đã khuất (Tử phục). Người sống tuyệt đối không mặc tà áo ngược.
                    </p>
                  </div>
                  <button
                    onClick={() => setFastening('RIGHT_OVER_LEFT')}
                    className="px-4 py-2 bg-white text-stone-900 rounded-md font-bold text-xs hover:bg-stone-100 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-red-700" />
                    Đảo vạt áo sang Hữu Nhị chuẩn cổ
                  </button>
                </div>
              )}

              {/* Lighting overlay tone */}
              <div
                className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                  lightingMode === 'museum'
                    ? 'bg-amber-500/5 mix-blend-color-burn'
                    : lightingMode === 'warm'
                    ? 'bg-amber-600/10 mix-blend-color'
                    : lightingMode === 'cyber'
                    ? 'bg-cyan-500/10 mix-blend-overlay'
                    : 'bg-transparent'
                }`}
              />

              {/* Interactive 3D Callout Hotspots */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Hotspot 1: Head / Turban / Hair (Top) */}
                <div
                  className="absolute top-[8%] left-[50%] -translate-x-1/2 pointer-events-auto cursor-pointer group"
                  onClick={() => setActiveHotspot(activeHotspot === 'hair' ? null : 'hair')}
                >
                  <div className="w-5 h-5 rounded-full bg-white/90 text-stone-900 text-[10px] font-bold flex items-center justify-center shadow-lg border border-stone-300 hover:scale-110 transition-transform">
                    1
                  </div>
                  {/* Tooltip */}
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-stone-900/95 backdrop-blur-sm text-white rounded text-[11px] shadow-xl pointer-events-none text-center">
                    <span className="font-semibold block text-amber-200">
                      {equippedItems.accessory?.vietnameseName || equippedItems.hair?.vietnameseName}
                    </span>
                    <span className="text-[10px] text-stone-300 block">
                      {equippedItems.accessory?.material || 'Tóc & Trang sức'}
                    </span>
                  </div>
                </div>

                {/* Hotspot 2: Main Garment Collar & Fastening (Chest) */}
                <div
                  className="absolute top-[28%] left-[48%] -translate-x-1/2 pointer-events-auto cursor-pointer group"
                  onClick={() => setActiveHotspot(activeHotspot === 'collar' ? null : 'collar')}
                >
                  <div
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg border transition-transform hover:scale-110 ${
                      fastening === 'RIGHT_OVER_LEFT'
                        ? 'bg-emerald-500 text-white border-white'
                        : 'bg-red-600 text-white border-white animate-bounce'
                    }`}
                  >
                    2
                  </div>
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-2.5 bg-stone-900/95 backdrop-blur-sm text-white rounded text-[11px] shadow-xl pointer-events-none text-left space-y-1">
                    <span className="font-semibold block text-amber-200">
                      {equippedItems.main.vietnameseName}
                    </span>
                    <div className="text-[10px] text-stone-300">
                      Vạt áo: {fastening === 'RIGHT_OVER_LEFT' ? '✓ Hữu Nhị (Phải đè Trái)' : '⚠ Tả Nhậm (Mặc ngược)'}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Chất liệu: {equippedItems.main.material}
                    </div>
                  </div>
                </div>

                {/* Hotspot 3: Bottom Trousers / Skirt (Lower Body) */}
                <div
                  className="absolute top-[65%] left-[45%] -translate-x-1/2 pointer-events-auto cursor-pointer group"
                  onClick={() => setActiveHotspot(activeHotspot === 'bottom' ? null : 'bottom')}
                >
                  <div className="w-5 h-5 rounded-full bg-white/90 text-stone-900 text-[10px] font-bold flex items-center justify-center shadow-lg border border-stone-300 hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-stone-900/95 backdrop-blur-sm text-white rounded text-[11px] shadow-xl pointer-events-none text-center">
                    <span className="font-semibold block text-amber-200">
                      {equippedItems.bottom.vietnameseName}
                    </span>
                    <span className="text-[10px] text-stone-300 block">
                      {equippedItems.bottom.material}
                    </span>
                  </div>
                </div>

                {/* Hotspot 4: Footwear (Base) */}
                <div
                  className="absolute bottom-[8%] left-[50%] -translate-x-1/2 pointer-events-auto cursor-pointer group"
                  onClick={() => setActiveHotspot(activeHotspot === 'footwear' ? null : 'footwear')}
                >
                  <div className="w-5 h-5 rounded-full bg-white/90 text-stone-900 text-[10px] font-bold flex items-center justify-center shadow-lg border border-stone-300 hover:scale-110 transition-transform">
                    4
                  </div>
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-stone-900/95 backdrop-blur-sm text-white rounded text-[11px] shadow-xl pointer-events-none text-center">
                    <span className="font-semibold block text-amber-200">
                      {equippedItems.footwear.vietnameseName}
                    </span>
                    <span className="text-[10px] text-stone-300 block">
                      {equippedItems.footwear.material}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3D Viewport Controls Badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 bg-stone-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-300 text-[10px] uppercase">3D Fashion Engine</span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="truncate max-w-[140px] sm:max-w-xs">{equippedItems.main.vietnameseName}</span>
              </div>

              {/* Lighting Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLightingMode('museum')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${lightingMode === 'museum' ? 'bg-amber-800 text-white' : 'text-stone-400 hover:text-white'}`}
                  title="Triển Lãm Di Sản"
                >
                  Bảo tàng
                </button>
                <button
                  onClick={() => setLightingMode('studio')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${lightingMode === 'studio' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'}`}
                  title="Studio Ánh Sáng Tự Nhiên"
                >
                  Studio
                </button>
                <button
                  onClick={() => setLightingMode('cyber')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${lightingMode === 'cyber' ? 'bg-cyan-800 text-white' : 'text-stone-400 hover:text-white'}`}
                  title="Cyberpunk Darkwear"
                >
                  Cyber
                </button>
              </div>
            </div>
          </div>

          {/* Layer Isolation Inspector (Xem bóc tách từng lớp) */}
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5 text-xs">
                <Layers className="w-3.5 h-3.5 text-stone-600" />
                Kiểm tra cấu trúc phân tầng (Bóc tách lớp 3D):
              </span>
              <span className="text-[10px] text-stone-500">Bấm để ẩn/hiện lớp</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { layer: 'outer' as GarmentLayerType, name: 'Áo khoác', equipped: equippedItems.outer && equippedItems.outer.id !== 'o-none' },
                { layer: 'main' as GarmentLayerType, name: 'Áo chính', equipped: true },
                { layer: 'underlayer' as GarmentLayerType, name: 'Lớp lót', equipped: !!equippedItems.underlayer },
                { layer: 'bottom' as GarmentLayerType, name: 'Quần / Váy', equipped: true },
                { layer: 'footwear' as GarmentLayerType, name: 'Giày', equipped: true },
                { layer: 'accessory' as GarmentLayerType, name: 'Phụ kiện', equipped: !!equippedItems.accessory },
              ].map((l) => (
                <button
                  key={l.layer}
                  onClick={() => toggleLayerVisibility(l.layer)}
                  className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                    visibleLayers[l.layer]
                      ? 'bg-white border-stone-300 text-stone-800 shadow-2xs'
                      : 'bg-stone-200 border-stone-200 text-stone-400 line-through'
                  }`}
                >
                  {visibleLayers[l.layer] ? <Eye className="w-3 h-3 text-stone-700" /> : <Eye className="w-3 h-3 text-stone-400" />}
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cultural & Harmony Checker + Interactive Wardrobe Drawer */}
        <div className="lg:col-span-6 space-y-5">
          {/* Real-time Cultural Respect Meter (Thước đo tôn trọng văn hóa) */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {culturalRespect.status === 'GREEN' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : culturalRespect.status === 'YELLOW' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse" />
                )}
                <h3 className="font-serif font-semibold text-stone-900 text-sm">
                  Thước Đo Tôn Trọng Văn Hóa (Cultural Respect Meter)
                </h3>
              </div>

              <div
                className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                  culturalRespect.status === 'GREEN'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : culturalRespect.status === 'YELLOW'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {culturalRespect.label}
              </div>
            </div>

            {/* Cultural Meter Progress Bar */}
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  culturalRespect.status === 'GREEN'
                    ? 'bg-emerald-600'
                    : culturalRespect.status === 'YELLOW'
                    ? 'bg-amber-500'
                    : 'bg-red-600'
                }`}
                style={{ width: `${culturalRespect.score}%` }}
              />
            </div>

            {/* Active Issues / Taboo Warnings List */}
            {culturalRespect.issues.length > 0 ? (
              <div className="space-y-3 pt-2">
                {culturalRespect.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                      issue.type === 'RED'
                        ? 'bg-red-50/70 border-red-200 text-red-900'
                        : 'bg-amber-50/70 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        {issue.type === 'RED' ? '🚫 ' : '⚠️ '}
                        {issue.title}
                      </span>
                      {issue.autoFixAction && (
                        <button
                          onClick={() => handleAutoFix(issue)}
                          className="px-2.5 py-1 bg-stone-900 text-white rounded text-[11px] font-semibold hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Wand2 className="w-3 h-3" />
                          Sửa chuẩn ngay
                        </button>
                      )}
                    </div>

                    <p className="leading-relaxed">{issue.message}</p>
                    <p className="italic text-[11px] text-stone-600 border-t border-stone-200/60 pt-1.5">
                      📖 Căn cứ sử học: {issue.historicalCitation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 pt-1">
                ✓ Phối bản an toàn, đúng quy cách cắt may tà Hữu Nhị và phù hợp thuần phong mỹ tục tại bối cảnh{' '}
                <strong className="text-stone-800">{eventContext}</strong>.
              </p>
            )}
          </div>

          {/* Color Harmony Bar (Đánh giá bảng màu Ngũ Hành) */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-stone-700" />
                <h3 className="font-serif font-semibold text-stone-900 text-sm">
                  Đánh Giá Bảng Màu Ngũ Hành (Color Harmony)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-stone-800">
                {colorHarmony.score}/100 · {colorHarmony.ratingText}
              </span>
            </div>

            {/* Harmony Progress Bar */}
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${colorHarmony.score}%` }}
              />
            </div>

            <div className="text-xs text-stone-600 space-y-1">
              <div>
                <strong className="text-stone-900 font-medium">Mối tương quan: </strong>
                {colorHarmony.harmonyRelationship}
              </div>
              <p className="leading-relaxed">{colorHarmony.explanation}</p>
            </div>
          </div>

          {/* Wardrobe Closet Drawer & Layer Selectors */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Kho Trang Phục 3D</div>
              <h3 className="font-serif font-semibold text-stone-900 text-sm">
                Chọn Các Lớp Trang Phục (Virtual Closet)
              </h3>
            </div>

            {/* Layer Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto text-xs">
              {[
                { key: 'main', label: 'Áo Chính' },
                { key: 'underlayer', label: 'Lớp Lót' },
                { key: 'outer', label: 'Áo Khoác' },
                { key: 'bottom', label: 'Quần / Váy' },
                { key: 'footwear', label: 'Giày / Guốc' },
                { key: 'accessory', label: 'Phụ Kiện' },
                { key: 'hair', label: 'Tóc / Makeup' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveLayerTab(tab.key as GarmentLayerType)}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    activeLayerTab === tab.key
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Items Grid with Visual Previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {drawerItems.map((item) => {
                const isEquipped = equippedItems[item.layer]?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleEquipItem(item)}
                    className={`p-3 rounded-lg border text-xs space-y-2 transition-all cursor-pointer ${
                      isEquipped
                        ? 'border-stone-900 bg-[#FAF8F5] ring-1 ring-stone-900 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    {/* Visual Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* 3D Color/Fabric Swatch */}
                        <div
                          className="w-5 h-5 rounded-md border border-stone-300 shadow-2xs shrink-0 flex items-center justify-center text-[9px] font-bold text-white/90"
                          style={{ backgroundColor: item.hexColor }}
                        >
                          {item.nguHanh[0]}
                        </div>
                        <span className="font-semibold text-stone-900 truncate max-w-[140px]">
                          {item.vietnameseName}
                        </span>
                      </div>
                      {isEquipped && (
                        <span className="text-[10px] font-bold text-stone-900 uppercase bg-stone-200 px-1.5 py-0.5 rounded">
                          Đang mặc
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span>{item.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>Chất liệu: {item.material}</span>
                    </div>

                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.isRoyalRestricted && (
                      <span className="text-[10px] text-red-600 font-medium block">
                        ⚠ Phẩm phục hoàng gia / Lễ triều nghi
                      </span>
                    )}
                    {item.isExposed && (
                      <span className="text-[10px] text-amber-700 font-medium block">
                        ⚠ Cần áo khoác khi đi lễ Chùa
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
