import React from 'react';
import { Sparkles, Shirt, BookOpen, Compass, Layers } from 'lucide-react';

interface TopBarProps {
  activeTab: 'explore' | 'quiz' | 'studio' | 'catalog';
  onSelectTab: (tab: 'explore' | 'quiz' | 'studio' | 'catalog') => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('explore')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors whitespace-nowrap shrink-0">
              Kinh Kỳ Tân Thời
            </span>
          </button>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('explore')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative ${
                activeTab === 'explore'
                  ? 'text-stone-900 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Khám Phá
              {activeTab === 'explore' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('quiz')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'text-stone-900 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Thăm Dò Phong Cách
              {activeTab === 'quiz' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('studio')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'text-stone-900 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              Phòng Phối Đồ
              {activeTab === 'studio' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('catalog')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'text-stone-900 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Tuyển Tập 100 Bộ
              {activeTab === 'catalog' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('studio')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              Phối Đồ Ngay
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation ribbon */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-stone-200/50 text-xs font-medium text-stone-600 overflow-x-auto">
          <button
            onClick={() => onSelectTab('explore')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'explore' ? 'text-stone-900 font-bold border-b border-stone-900' : ''
            }`}
          >
            Khám Phá
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz' ? 'text-stone-900 font-bold border-b border-stone-900' : ''
            }`}
          >
            Thăm Dò
          </button>
          <button
            onClick={() => onSelectTab('studio')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'studio' ? 'text-stone-900 font-bold border-b border-stone-900' : ''
            }`}
          >
            Phòng Phối Đồ
          </button>
          <button
            onClick={() => onSelectTab('catalog')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'catalog' ? 'text-stone-900 font-bold border-b border-stone-900' : ''
            }`}
          >
            Tuyển Tập 100 Bộ
          </button>
        </div>
      </div>
    </header>
  );
};
