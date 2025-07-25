'use client'

import React from 'react';
import { SearchInput } from "@/components/ui/search-input";
import { QrCodeIcon } from "lucide-react";
import { FilterSlider, FilterOption } from "@/components/Sliders/SliderFIlter";
import HeaderUser from '@/components/navigation/user/HeaderUser';

interface FixedHeaderContainerUserProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  userFilters: FilterOption[];
  onScanQR: () => void;
  children: React.ReactNode;
}

export default function FixedHeaderContainerUser({
  searchQuery,
  onSearch,
  selectedFilters,
  onFilterChange,
  userFilters,
  onScanQR,
  children
}: FixedHeaderContainerUserProps) {
  return (
    <div className="flex flex-col h-full bg-background-cream">
    <HeaderUser/>
      {/* Header con información de la tienda fijo */}
      <div className="fixed top-[85px] left-0 right-0 z-50 bg-background-cream border-b border-gray-100">
        <div className='flex items-center justify-between w-full px-4 py-3'>
          <div className='flex flex-col items-start justify-start'>
            <p className='text-sm text-black font-bold text-[21px]'>Heinigers Hofladen</p>
            <p className='text-sm text-gray-500 text-[14px]'>Grundhof 3, 8305 Dietlikon • ⭐ 4.8</p>
          </div>
          <div className='flex items-center justify-end'>
            <button className='bg-white text-black px-4 py-2 rounded-md  hover:bg-gray-50 transition-colors'>
              Kontakt
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de búsqueda y filtros fijo */}
      <div className="fixed top-[160px] left-0 right-0 z-40 bg-background-cream border-b border-gray-100">
        {/* Barra de búsqueda y botón QR */}
        <div className="p-4 flex gap-4 items-center justify-center bg-background-cream border-b border-gray-100">
          <SearchInput 
            placeholder="Produkte suchen..." 
            className="flex-1 max-w-[260px] h-[54px]"
            value={searchQuery}
            onChange={onSearch}
          />
          <button 
            onClick={onScanQR}
            className="bg-brand-500 cursor-pointer text-white px-4 py-3 flex items-center text-[18px] font-semibold gap-2 rounded-[30px] w-[124px] h-[54px] hover:bg-brand-600 transition-colors"
          >
            <QrCodeIcon className="w-6 h-6" />
            <span className="text-[16px]">Scan</span>
          </button>
        </div>

        {/* Filtros de categorías */}
        <div className="bg-background-cream">
          <FilterSlider
            filters={userFilters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            showCount={true}
            multiSelect={true}
          />
        </div>
      </div>

      {/* Contenido scrolleable con padding para los elementos fijos */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: '230px', paddingBottom: '100px' }}>
        {children}
      </div>
    </div>
  );
} 