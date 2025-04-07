// loading.tsx
'use client';

import React from 'react';

export default function Loading({message}: {message?: string}) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[60px] gap-4">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-12 h-12 rounded-full border-4 border-t-lightpurple border-r-[#6759FF20] border-b-[#6759FF40] border-l-[#6759FF60] animate-spin"></div>
      </div>
      {message && <p className="mt-2 text-center text-lg font-semibold text-lightpurple">{message}</p>}
    </div>
  );
}