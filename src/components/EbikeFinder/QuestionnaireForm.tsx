// components/EbikeFinder/QuestionnaireForm.tsx
'use client';

import { useState } from 'react';
import { type UserPreferences } from './calculatorLogic';

// Add custom CSS for range sliders
const rangeSliderStyles = `
  .range-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 4px;
    background: #e5e7eb;
    outline: none;
  }
  
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #12b190;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .range-slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #12b190;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    border: none;
  }
`;

interface QuestionnaireFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

export default function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<Partial<UserPreferences>>({
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    usageType: [],
    terrain: 'flat',
    distancePerTrip: '5-15',
    rangeRequirement: 50,
    budget: 25000,
    weightPreference: 'medium',
    motorPreference: 'Not sure',
    comfortLevel: 'normal',
    extraNeeds: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleChange = (field: keyof UserPreferences, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: 'usageType' | 'extraNeeds', value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage === totalPages && isFormValid()) {
      onSubmit(formData as UserPreferences);
    }
  };

  const isFormValid = () => {
    return formData.usageType && formData.usageType.length > 0;
  };

  const nextPage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: rangeSliderStyles }} />
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Step {currentPage} of {totalPages}</span>
          <span className="text-sm font-medium text-[#12b190]">{Math.round((currentPage / totalPages) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[#12b190] to-[#0f9a7a] h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Page 1: Personal Info */}
      {currentPage === 1 && (
        <div className="space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Tell us about yourself</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input 
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
                min="16"
                max="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input 
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
                min="140"
                max="220"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input 
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
                min="40"
                max="200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Budget (NOK)</label>
            <div className="relative">
              <div className="w-full h-2 bg-gray-200 rounded-lg">
                <div 
                  className="h-2 bg-gradient-to-r from-[#12b190] to-[#0f9a7a] rounded-lg transition-all duration-200"
                  style={{ width: `${((formData.budget! - 10000) / (60000 - 10000)) * 100}%` }}
                />
              </div>
              <input 
                type="range"
                value={formData.budget}
                onChange={(e) => handleChange('budget', Number(e.target.value))}
                className="absolute top-0 w-full range-slider cursor-pointer bg-transparent"
                min="10000"
                max="60000"
                step="1000"
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-2">
              <span>10,000</span>
              <span className="font-bold text-[#12b190] text-sm sm:text-base">{(formData.budget || 25000).toLocaleString()} NOK</span>
              <span>60,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Page 2: Usage & Terrain */}
      {currentPage === 2 && (
        <div className="space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">How will you use it?</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Usage Type (Select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Commuting', 'Off-road', 'City', 'Touring', 'Family', 'Sport'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleMultiSelect('usageType', type)}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.usageType?.includes(type)
                      ? 'border-[#12b190] bg-[#12b190] text-white shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#12b190] hover:text-[#12b190]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Terrain</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Flat', 'Small hills', 'Hilly', 'Mountain'].map(terrain => (
                <button
                  key={terrain}
                  type="button"
                  onClick={() => handleChange('terrain', terrain)}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.terrain === terrain
                      ? 'border-[#12b190] bg-[#12b190] text-white shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#12b190] hover:text-[#12b190]'
                  }`}
                >
                  {terrain}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Distance per trip</label>
            <select 
              value={formData.distancePerTrip}
              onChange={(e) => handleChange('distancePerTrip', e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
            >
              <option value="<5">Less than 5 km</option>
              <option value="5-15">5-15 km</option>
              <option value="15-30">15-30 km</option>
              <option value="30+">30+ km</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Range Required (km)</label>
            <div className="relative">
              <div className="w-full h-2 bg-gray-200 rounded-lg">
                <div 
                  className="h-2 bg-gradient-to-r from-[#12b190] to-[#0f9a7a] rounded-lg transition-all duration-200"
                  style={{ width: `${((formData.rangeRequirement! - 20) / (150 - 20)) * 100}%` }}
                />
              </div>
              <input 
                type="range"
                value={formData.rangeRequirement}
                onChange={(e) => handleChange('rangeRequirement', Number(e.target.value))}
                className="absolute top-0 w-full range-slider cursor-pointer bg-transparent"
                min="20"
                max="150"
                step="5"
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-2">
              <span>20 km</span>
              <span className="font-bold text-[#12b190] text-sm sm:text-base">{formData.rangeRequirement} km</span>
              <span>150 km</span>
            </div>
          </div>
        </div>
      )}

      {/* Page 3: Preferences */}
      {currentPage === 3 && (
        <div className="space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Final preferences</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Comfort Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Sporty', 'Normal', 'Extra comfort'].map(comfort => (
                <button
                  key={comfort}
                  type="button"
                  onClick={() => handleChange('comfortLevel', comfort)}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.comfortLevel === comfort
                      ? 'border-[#12b190] bg-[#12b190] text-white shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#12b190] hover:text-[#12b190]'
                  }`}
                >
                  {comfort}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Weight Preference</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Light', 'Medium', 'Heavy'].map(weight => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => handleChange('weightPreference', weight.toLowerCase())}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.weightPreference === weight.toLowerCase()
                      ? 'border-[#12b190] bg-[#12b190] text-white shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#12b190] hover:text-[#12b190]'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Motor Preference</label>
            <select 
              value={formData.motorPreference}
              onChange={(e) => handleChange('motorPreference', e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] transition-all"
            >
              <option value="Not sure">Not sure / No preference</option>
              <option value="Front hub">Front hub</option>
              <option value="Rear hub">Rear hub</option>
              <option value="Mid-drive">Mid-drive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Extra Features (Optional)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Luggage rack', 'Child seat', 'Foldable', 'Off-road tires'].map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleMultiSelect('extraNeeds', feature)}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.extraNeeds?.includes(feature)
                      ? 'border-[#12b190] bg-[#12b190] text-white shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#12b190] hover:text-[#12b190]'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
        {currentPage > 1 && (
          <button
            type="button"
            onClick={prevPage}
            className="px-4 md:px-6 py-3 border-2 border-gray-300 bg-white rounded-xl font-medium text-gray-700 hover:border-[#12b190] hover:text-[#12b190] transition-all"
          >
            ← Previous
          </button>
        )}
        
        {currentPage < totalPages ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextPage();
            }}
            className="ml-auto px-6 md:px-8 py-3 bg-gradient-to-r from-[#12b190] to-[#0f9a7a] text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isFormValid()}
            className="ml-auto px-6 md:px-8 py-3 bg-gradient-to-r from-[#12b190] to-[#0f9a7a] text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            Find My E-Bike
          </button>
        )}
      </div>
    </form>
    </>
  );
}