import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, RotateCcw, Sparkles, Shirt } from 'lucide-react';
import { QUIZ_QUESTIONS, routeQuizToOutfits, QuizResult } from '../data/quizQuestions';
import { CuratedOutfit } from '../data/outfitsCatalog';

interface DiscoveryQuizProps {
  onLoadOutfitToStudio: (outfit: CuratedOutfit) => void;
  onViewOutfitDetails: (outfit: CuratedOutfit) => void;
}

export const DiscoveryQuiz: React.FC<DiscoveryQuizProps> = ({
  onLoadOutfitToStudio,
  onViewOutfitDetails,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    occasion: 'formal',
    region: 'north',
    vibe: 'streetwear',
    css: '50/50 Modern Mix',
    palette: 'ngu-hanh',
  });
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const computedResult = routeQuizToOutfits(answers);
      setResult(computedResult);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-medium text-amber-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kết Quả Định Tuyến Phong Cách Gen Z</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
            Bản Phối Di Sản Chuẩn Gu Của Bạn
          </h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto">
            Dựa trên bối cảnh xuất hiện, vùng miền khí hậu và tiêu chuẩn đậm chất di sản mà bạn lựa chọn.
          </p>
        </div>

        {/* Primary Recommended Outfit Showcase */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            <div className="md:col-span-5 bg-stone-100 relative min-h-[320px] aspect-[3/4] md:aspect-auto">
              {result.primaryOutfit.featuredImage ? (
                <img
                  src={result.primaryOutfit.featuredImage}
                  alt={result.primaryOutfit.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  Phối bản đề xuất
                </div>
              )}
              <div className="absolute top-4 left-4 bg-stone-900/90 text-white px-3 py-1 text-xs font-medium rounded">
                CSS: {result.cssLevel}
              </div>
            </div>

            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-stone-800">{result.primaryOutfit.groupName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{result.primaryOutfit.occasion}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  {result.primaryOutfit.name}
                </h3>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-700 space-y-1.5">
                  <span className="font-semibold text-stone-900 block">Công thức trang phục:</span>
                  <p>{result.primaryOutfit.garmentFormula}</p>
                </div>

                <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
                  <div>
                    <strong className="text-stone-900 font-medium">Lời khuyên phối đồ: </strong>
                    {result.stylingAdvice}
                  </div>
                  <div>
                    <strong className="text-stone-900 font-medium">Bảo đảm văn hóa: </strong>
                    {result.culturalNote}
                  </div>
                </div>

                {/* Color swatches */}
                <div className="pt-1">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1.5">Bảng màu Ngũ hành</span>
                  <div className="flex items-center gap-2">
                    {result.primaryOutfit.palette.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-stone-600">
                        <span
                          className="w-4 h-4 rounded-full border border-stone-200 shadow-2xs inline-block"
                          style={{ backgroundColor: c }}
                        />
                      </div>
                    ))}
                    <span className="text-xs text-stone-500 italic ml-2">({result.primaryOutfit.nguHanhHarmony})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  onClick={() => onLoadOutfitToStudio(result.primaryOutfit)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Shirt className="w-4 h-4" />
                  Đưa Vào Phòng Phối Đồ Ngay
                </button>
                <button
                  onClick={() => onViewOutfitDetails(result.primaryOutfit)}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-colors cursor-pointer"
                >
                  Xem Thẻ Di Sản
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-2.5 text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 ml-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Thăm dò lại
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Matched Outfits */}
        {result.matchedOutfits.length > 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider">
              Các Gợi Ý Thay Thế Phù Hợp Tiếp Theo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.matchedOutfits.slice(1, 4).map((alt) => (
                <div
                  key={alt.id}
                  className="bg-white p-4 rounded-lg border border-stone-200 hover:border-stone-400 transition-colors flex flex-col justify-between space-y-3 cursor-pointer"
                  onClick={() => onLoadOutfitToStudio(alt)}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span>{alt.groupName}</span>
                      <span className="font-mono text-stone-400">{alt.culturalStrictness}</span>
                    </div>
                    <h5 className="font-serif font-semibold text-stone-900 text-sm">{alt.name}</h5>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">{alt.garmentFormula}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500 text-[11px]">{alt.occasion}</span>
                    <span className="text-stone-900 font-medium hover:underline">Phối thử →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Quiz Form Steps
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="uppercase tracking-widest font-mono">
            Bước {currentQuestion.step} / {QUIZ_QUESTIONS.length}
          </span>
          <span className="font-medium text-stone-700">{currentQuestion.focusArea}</span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 transition-all duration-300"
            style={{ width: `${(currentQuestion.step / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 pt-3">
          {currentQuestion.question}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {currentQuestion.description}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          return (
            <div
              key={option.id}
              onClick={() => handleSelectOption(currentQuestion.id, option.value)}
              className={`p-4 sm:p-5 rounded-lg border transition-all cursor-pointer flex items-start gap-4 ${
                isSelected
                  ? 'bg-white border-stone-900 shadow-sm ring-1 ring-stone-900'
                  : 'bg-white border-stone-200 hover:border-stone-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              <div className="space-y-1">
                <div className="text-sm font-semibold text-stone-900">{option.label}</div>
                <div className="text-xs text-stone-600 leading-relaxed">{option.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentStepIndex === 0
              ? 'text-stone-300 cursor-not-allowed'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          {isLastQuestion ? 'Xem Bản Phối Đề Xuất' : 'Tiếp Theo'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
