// components/EbikeFinder/ResultsDisplay.tsx
'use client';

import { useState } from 'react';
import { type BikeWithScore, type UserPreferences } from './calculatorLogic';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '../AddToCartButton';
import { PRODUCTS_DATA } from '@/lib/productData';

interface ResultsDisplayProps {
  recommendations: BikeWithScore[];
  userPreferences: UserPreferences;
  onReset: () => void;
}

export default function ResultsDisplay({ 
  recommendations, 
  userPreferences, 
  onReset 
}: ResultsDisplayProps) {
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const toggleCompare = (bikeId: string | number) => {
    const id = String(bikeId);
    setSelectedForCompare(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : prev.length < 3 
          ? [...prev, id]
          : prev
    );
  };

  const topRecommendation = recommendations[0];
  const alternatives = recommendations.slice(1, 4);

  if (!topRecommendation) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-2xl">
        <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Ingen perfekt match funnet
        </h3>
        <p className="text-gray-400 mb-8">
          Vi fant ingen el-sykler som matcher alle dine kriterier. Prøv å justere preferansene dine.
        </p>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Prøv igjen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Din profil
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-600 block">Høyde</span>
            <span className="font-semibold text-gray-900">{userPreferences.height} cm</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-600 block">Terreng</span>
            <span className="font-semibold text-gray-900">{userPreferences.terrain}</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-600 block">Avstand</span>
            <span className="font-semibold text-gray-900">{userPreferences.distancePerTrip} km</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-600 block">Budsjett</span>
            <span className="font-semibold text-[#12b190]">{userPreferences.budget.toLocaleString()} NOK</span>
          </div>
        </div>
      </div>

      {/* Top Recommendation */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-[#12b190]">
        <div className="bg-gradient-to-r from-[#12b190] to-[#0f9a7a] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block bg-white text-[#12b190] px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-sm">
                BESTE MATCH
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {topRecommendation.name}
              </h3>
              <p className="text-green-100">{topRecommendation.brand}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {topRecommendation.matchScore}%
              </div>
              <div className="text-green-100 text-sm">Match</div>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              {topRecommendation.image ? (
                <div className="relative h-64 md:h-80 bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                  <Image 
                    src={topRecommendation.image} 
                    alt={topRecommendation.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                  <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-3">Hvorfor dette er perfekt for deg:</h4>
                <ul className="space-y-2">
                  {topRecommendation.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#12b190] mr-2">✓</span>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                {topRecommendation.motor_watt && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">Motor</div>
                    <div className="font-bold text-gray-900">{topRecommendation.motor_watt}W</div>
                  </div>
                )}
                {topRecommendation.range_km && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">Rekkevidde</div>
                    <div className="font-bold text-gray-900">{topRecommendation.range_km} km</div>
                  </div>
                )}
                {topRecommendation.weight_kg && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">Vekt</div>
                    <div className="font-bold text-gray-900">{topRecommendation.weight_kg} kg</div>
                  </div>
                )}
                {topRecommendation.battery_Ah && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">Batteri</div>
                    <div className="font-bold text-gray-900">{topRecommendation.battery_Ah} Ah</div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <div className="text-2xl md:text-3xl font-bold text-[#12b190] mb-4">
                  {topRecommendation.price.toLocaleString()} NOK
                </div>
                 <div className="flex gap-3">
                  <Link 
                    href={topRecommendation.link || `/products/${topRecommendation.id}`}
                    className="flex-1"
                  >
                    <button className="w-full bg-gradient-to-r from-[#12b190] to-[#0f9a7a] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                      Se detaljer
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Options */}
      {alternatives.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
            Andre gode alternativer
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {alternatives.map((bike) => (
              <div key={bike.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                <div className="relative">
                  {bike.image ? (
                    <div className="relative h-48 bg-gray-50">
                      <Image 
                        src={bike.image} 
                        alt={bike.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full font-bold text-[#12b190] shadow-sm border border-gray-200">
                    {bike.matchScore}%
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-base md:text-lg text-gray-900 mb-1">{bike.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{bike.brand}</p>

                  <div className="space-y-1 mb-4">
                    {bike.matchReasons.slice(0, 2).map((reason, index) => (
                      <div key={index} className="flex items-start text-xs">
                        <span className="text-[#12b190] mr-2 text-sm">✓</span>
                        <span className="text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {bike.range_km && (
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-600">Rekkevidde</div>
                        <div className="font-semibold text-gray-900 text-sm">{bike.range_km}km</div>
                      </div>
                    )}
                    {bike.motor_watt && (
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-600">Motor</div>
                        <div className="font-semibold text-gray-900 text-sm">{bike.motor_watt}W</div>
                      </div>
                    )}
                  </div>

                  <div className="text-xl font-bold text-[#12b190] mb-4">
                    {bike.price.toLocaleString()} NOK
                  </div>

                  <div className="flex gap-2">
                    <Link 
                      href={bike.link || `/products/${bike.id}`}
                      className="flex-1"
                    >
                      <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200">
                        Se
                      </button>
                    </Link>
                   <AddToCartButton product={{
                     id: bike.id,
                     name: bike.name,
                     price: bike.price,
                     originalPrice: bike.price,
                     image: bike.image || ''
                   }} className='border rounded-xl text-white bg-[#12b190] hover:bg-[#0f9a7a]'/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
        <button
          onClick={onReset}
          className="px-6 py-3 border-2 border-gray-300 bg-white rounded-xl font-medium text-gray-700 hover:border-[#12b190] hover:text-[#12b190] transition-all"
        >
          Start på nytt
        </button>
        {selectedForCompare.length >= 2 && (
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Sammenlign valgte ({selectedForCompare.length})
          </button>
        )}
      </div>
    </div>
  );
}