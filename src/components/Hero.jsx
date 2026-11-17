import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full">
        <img
          src="/assets/hero-banner-4k.jpg"
          alt="GlobalHealthAI - Know Your Symptoms. Understand the Possibilities. Dr Pratap Madhukar"
          className="w-full h-auto object-cover block select-none"
          style={{ width: '100%', borderRadius: 0, objectFit: 'cover' }}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
