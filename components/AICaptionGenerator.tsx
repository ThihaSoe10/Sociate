import React, { useState } from 'react';
import { generateCaption } from '../services/geminiService';
import { Language } from '../types';

interface AICaptionGeneratorProps {
  language: Language;
}

export const AICaptionGenerator: React.FC<AICaptionGeneratorProps> = ({ language }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const result = await generateCaption(topic, language, tone);
    setGeneratedContent(result);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Copied to clipboard!');
  };

  const tones = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Funny', label: 'Funny' },
    { value: 'Excited', label: 'Excited' },
    { value: 'Emotional', label: 'Emotional' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-secondary-50 text-secondary-500 flex items-center justify-center">
            <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === Language.MYANMAR ? 'AI စာရေးလက်ထောက်' : 'AI Caption Writer'}
            </h3>
            <p className="text-sm text-gray-500">
              {language === Language.MYANMAR 
                ? 'ဆိုရှယ်မီဒီယာအတွက် စာသားများကို Gemini AI ဖြင့် ဖန်တီးပါ။' 
                : 'Generate engaging social media posts powered by Gemini.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === Language.MYANMAR ? 'ခေါင်းစဉ်' : 'What is your post about?'}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder={language === Language.MYANMAR ? 'ဥပမာ - ကော်ဖီဆိုင်အသစ်ဖွင့်ပွဲ...' : 'e.g., New coffee shop opening...'}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === Language.MYANMAR ? 'လေသံ' : 'Tone'}
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    tone === t.value
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                {language === Language.MYANMAR ? 'ဖန်တီးနေသည်...' : 'Generating...'}
              </>
            ) : (
              <>
                <i className="fa-solid fa-bolt"></i>
                {language === Language.MYANMAR ? 'စာသားဖန်တီးမည်' : 'Generate Caption'}
              </>
            )}
          </button>
        </div>
      </div>

      {generatedContent && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              {language === Language.MYANMAR ? 'ရလဒ်' : 'Generated Result'}
            </h4>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                title="Copy"
              >
                <i className="fa-regular fa-copy"></i>
              </button>
              <button className="text-gray-500 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors" title="Save Draft">
                <i className="fa-regular fa-bookmark"></i>
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className={`whitespace-pre-wrap text-gray-700 leading-relaxed ${language === Language.MYANMAR ? 'font-burmese' : ''}`}>
              {generatedContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
