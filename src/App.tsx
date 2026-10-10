import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { DiscoveryQuiz } from './components/DiscoveryQuiz';
import { StylingStudio } from './components/StylingStudio';
import { CatalogueView } from './components/CatalogueView';
import { LookbookCardModal } from './components/LookbookCardModal';
import { HeritageGuideModal } from './components/HeritageGuideModal';
import { CuratedOutfit, CURATED_OUTFITS } from './data/outfitsCatalog';
import { OutfitComposition, ColorHarmonyResult, CulturalRespectResult } from './utils/culturalChecker';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'studio' | 'catalog'>('explore');

  // Currently loaded outfit preset for the studio
  const [selectedStudioOutfit, setSelectedStudioOutfit] = useState<CuratedOutfit | null>(null);

  // Modal states
  const [lookbookData, setLookbookData] = useState<{
    composition: OutfitComposition | null;
    harmony: ColorHarmonyResult | null;
    respect: CulturalRespectResult | null;
  } | null>(null);

  const [activeHeritageOutfit, setActiveHeritageOutfit] = useState<CuratedOutfit | null>(null);
  const [activeHeritagePeriodId, setActiveHeritagePeriodId] = useState<string | null>(null);

  const handleOpenStudio = (outfit?: CuratedOutfit) => {
    if (outfit) {
      setSelectedStudioOutfit(outfit);
    }
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLookbook = (
    composition: OutfitComposition,
    harmony: ColorHarmonyResult,
    respect: CulturalRespectResult
  ) => {
    setLookbookData({ composition, harmony, respect });
  };

  const handleCloseLookbook = () => {
    setLookbookData(null);
  };

  const handleViewOutfitDetails = (outfit: CuratedOutfit) => {
    setActiveHeritageOutfit(outfit);
    setActiveHeritagePeriodId(null);
  };

  const handleSelectPeriod = (periodId: string) => {
    setActiveHeritagePeriodId(periodId);
    setActiveHeritageOutfit(null);
  };

  const handleCloseHeritageModal = () => {
    setActiveHeritageOutfit(null);
    setActiveHeritagePeriodId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-amber-900/10 selection:text-amber-900">
      {/* Strict 3-zone Top Bar Contract */}
      <TopBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <HeroSection
            onStartQuiz={() => {
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudio={handleOpenStudio}
            onOpenCatalog={() => {
              setActiveTab('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPeriod={handleSelectPeriod}
          />
        )}

        {activeTab === 'quiz' && (
          <DiscoveryQuiz
            onLoadOutfitToStudio={handleOpenStudio}
            onViewOutfitDetails={handleViewOutfitDetails}
          />
        )}

        {activeTab === 'studio' && (
          <StylingStudio
            initialOutfit={selectedStudioOutfit}
            onOpenLookbook={handleOpenLookbook}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogueView
            onLoadOutfitToStudio={handleOpenStudio}
            onViewOutfitDetails={handleViewOutfitDetails}
          />
        )}
      </main>

      {/* Editorial Curatorial Footer */}
      <footer className="border-t border-stone-200/90 bg-white py-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            <div>
              <span className="font-serif text-lg font-semibold text-stone-900 block mb-1">
                Kinh Kỳ Tân Thời
              </span>
              <p className="text-stone-600 max-w-md">
                Dự án nghiên cứu & ứng dụng Việt phục di sản vào phong cách sống của thế hệ Z Việt Nam. 
                Tôn vinh cội nguồn qua ngôn ngữ thời trang hiện đại.
              </p>
            </div>

            <div className="flex items-center gap-6 font-medium text-stone-700">
              <button
                onClick={() => setActiveTab('explore')}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                Khám Phá
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                Thăm Dò
              </button>
              <button
                onClick={() => setActiveTab('studio')}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                Phòng Phối Đồ
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                100 Bản Phối
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-stone-400">
            <p>
              Tư liệu lịch sử căn cứ theo Khâm Định Đại Nam Hội Điển Sự Lệ & nghiên cứu trang phục cổ truyền thời Lý - Trần - Lê - Nguyễn.
            </p>
            <p className="font-mono">
              © 2026 Kinh Kỳ Tân Thời · Di Sản & Đương Đại
            </p>
          </div>
        </div>
      </footer>

      {/* Lookbook Export Modal */}
      {lookbookData && (
        <LookbookCardModal
          composition={lookbookData.composition}
          harmony={lookbookData.harmony}
          respect={lookbookData.respect}
          onClose={handleCloseLookbook}
        />
      )}

      {/* Heritage Guide & Accession Detail Modal */}
      {(activeHeritageOutfit || activeHeritagePeriodId) && (
        <HeritageGuideModal
          outfit={activeHeritageOutfit}
          periodId={activeHeritagePeriodId}
          onClose={handleCloseHeritageModal}
          onLoadOutfitToStudio={handleOpenStudio}
        />
      )}
    </div>
  );
}
