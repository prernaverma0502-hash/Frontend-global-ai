import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Mic,
  Camera
} from 'lucide-react';

export default function SymptomSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleVoice = () => {
    setIsListening(true);
    setSearchTerm('Cough and fever');
    setTimeout(() => setIsListening(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Check symptoms safely on GlobalHealthAI: https://globalhealthai.org');
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <div id="search-section" className="relative z-20 max-w-[1380px] mx-auto px-3 sm:px-5 lg:px-6 -mt-5 sm:-mt-6">
      <div className="flex flex-col lg:flex-row items-center gap-2.5 sm:gap-3 w-full">

        {/* Main Search Bar with embedded orange button */}
        <form
          onSubmit={handleSubmit}
          className="relative flex-1 w-full bg-white rounded-full border border-blue-200/90 shadow-sm hover:shadow-md hover:border-blue-300 focus-within:border-[#1677E8] focus-within:shadow-md transition-all p-1.5 pl-4 sm:pl-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5 flex-1 mr-2 min-w-0">
            <Search className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-[#1d6fd8] shrink-0 stroke-[2.3]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What symptom are you worried about? e.g. cough, headache, stomach pain ..."
              className="w-full text-xs sm:text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Orange Check a Symptom Button */}
          <button
            type="submit"
            className="flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs sm:text-[13px] font-bold shadow-xs transition-all shrink-0 cursor-pointer active:scale-98"
          >
            <span>Check a Symptom</span>
            <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* 3 Companion Action Buttons: Voice Search, Upload Report, Share (WhatsApp) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto justify-center sm:justify-start">

          {/* Voice Search */}
          <button
            type="button"
            onClick={handleVoice}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 shadow-2xs text-[#0f2d59] font-bold text-xs transition-all cursor-pointer ${
              isListening ? 'ring-2 ring-blue-400 bg-blue-50' : ''
            }`}
          >
            <Mic className="w-4 h-4 text-[#1d6fd8] shrink-0" />
            <span className="whitespace-nowrap">{isListening ? 'Listening...' : 'Voice Search'}</span>
          </button>

          {/* Upload Report */}
          <label className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 shadow-2xs text-[#0f2d59] font-bold text-xs cursor-pointer transition-all">
            <Camera className="w-4 h-4 text-[#1d6fd8] shrink-0" />
            <span className="whitespace-nowrap">{uploaded ? 'Uploaded ✓' : 'Upload Report'}</span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={() => {
                setUploaded(true);
                setTimeout(() => setUploaded(false), 3000);
              }}
            />
          </label>

          {/* Share (WhatsApp) */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-blue-200 hover:border-emerald-400 hover:bg-emerald-50/50 shadow-2xs text-[#0f2d59] font-bold text-xs transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25D366] fill-current shrink-0">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.544-1.785-.738-2.91-2.55-2.998-2.668-.088-.118-.724-.963-.724-1.836 0-.873.456-1.302.618-1.478.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.005.253-.042.395.3.144.348.49 1.196.534 1.285.044.089.073.192.015.309-.059.118-.088.192-.176.295-.088.103-.186.23-.265.31-.088.088-.18.184-.077.361.103.177.458.756.983 1.224.675.602 1.244.788 1.421.876.176.089.279.074.382-.044.103-.118.442-.515.559-.692.118-.176.236-.147.397-.088.162.059 1.026.484 1.202.572.176.089.294.133.338.206.044.074.044.428-.1 1.033z" />
            </svg>
            <span className="whitespace-nowrap">Share (WhatsApp)</span>
          </button>

        </div>

      </div>
    </div>
  );
}
