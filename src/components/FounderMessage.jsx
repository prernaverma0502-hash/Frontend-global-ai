import React, { useState } from 'react';
import { Play, Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FounderMessage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-8 bg-slate-50/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Founder Card */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl shadow-xl overflow-hidden text-white border border-blue-800/50">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Left: Doctor / Founder Image with Play Button (5 cols) */}
            <div className="md:col-span-4 lg:col-span-3.5 relative h-64 sm:h-72 md:h-full min-h-[260px] bg-slate-800 flex items-center justify-center overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80"
                alt="Dr Pratap Madhukar - Founder"
                className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent"></div>

              {/* Play Button Overlay */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 hover:bg-white text-blue-900 flex items-center justify-center shadow-2xl transition-all duration-200 transform group-hover:scale-110 cursor-pointer"
                aria-label="Play Founder Message Video"
              >
                <Play className="w-6 h-6 fill-blue-900 ml-1 text-blue-900" />
              </button>

              {/* Badge */}
              <div className="absolute bottom-3 left-3 bg-blue-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-700/50 text-[11px] font-semibold text-blue-200 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>38 Years Clinical Practice</span>
              </div>
            </div>

            {/* Right: Message & Quote (7 cols) */}
            <div className="md:col-span-8 lg:col-span-8.5 p-6 sm:p-8 lg:p-10 relative flex flex-col justify-center">
              
              {/* Decorative Quote Icon in background */}
              <div className="absolute top-4 right-6 text-blue-500/15 pointer-events-none select-none">
                <Quote className="w-24 h-24 stroke-[1]" />
              </div>

              <div className="relative z-10 space-y-4">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 border border-blue-700 text-blue-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>A Message from the Founder</span>
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                  &ldquo;My goal is to help people understand their symptoms with clarity, clinical perspective and practical guidance, so they can take timely, appropriate care and make better health decisions.&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="pt-2 flex items-center gap-3 border-t border-blue-800/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      — Dr Pratap Madhukar
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-200 font-medium">
                      Physician & Clinical Editor • Founder, GlobalHealthAI
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Video modal placeholder if playing */}
        {isPlaying && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsPlaying(false)}
          >
            <div className="bg-slate-900 p-6 rounded-2xl max-w-lg w-full text-center border border-slate-700 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Founder Video Briefing</h3>
              <p className="text-sm text-slate-300">
                Dr Pratap Madhukar explains the vision behind GlobalHealthAI: making clinically safe, red-flag aware symptom triage accessible for every family.
              </p>
              <div className="p-8 bg-slate-800 rounded-xl text-slate-400 text-xs flex flex-col items-center gap-2">
                <Play className="w-10 h-10 text-orange-400 animate-bounce" />
                <span>[Video Player Demo — 3:45 min Clinical Overview]</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
