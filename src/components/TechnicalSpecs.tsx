"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TechnicalSpecifications({ product }: { product: any }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="mt-16 -mx-6 lg:-mx-8">
      <div className="bg-white w-full px-6 py-8 lg:px-8 lg:py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2 ">
          Tekniske Spesifikasjoner
        </h2>
        <div className="w-full h-px bg-black mb-8"></div>

        <div className="w-full   space-y-0 items-start">
          {/* GENERAL INFORMATION Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("general")}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-black uppercase">GENERELL INFORMASJON</span>
              <ChevronDown 
                className={`text-black transition-transform duration-200 ${
                  openAccordion === "general" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "general" && (
              <div className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <SpecRow label="Modell" value={product.tekniskeSpesifikasjoner?.generelt?.modell} />
                  <SpecRow label="Ramme Type" value={product.tekniskeSpesifikasjoner?.generelt?.rammeType} />
                  <SpecRow label="Ramme Materiale" value={product.tekniskeSpesifikasjoner?.generelt?.rammeMateriale} />
                  <SpecRow label="Vekt" value={product.tekniskeSpesifikasjoner?.generelt?.vekt} />
                  <SpecRow label="Maks Last" value={product.tekniskeSpesifikasjoner?.generelt?.maksLast} />
                  <SpecRow label="Anbefalt Høyde" value={product.tekniskeSpesifikasjoner?.generelt?.anbefalteHøyde} />
                  <SpecRow label="Sammenleggbar" value={product.tekniskeSpesifikasjoner?.generelt?.sammenleggbar ? "Ja" : "Nei"} />
                  <SpecRow label="Dimensjoner (Utbrettet)" value={product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.utbrettet} />
                  {product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.sammenlagt !== "N/A" && (
                    <SpecRow label="Dimensjoner (Sammenlagt)" value={product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.sammenlagt} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MOTOR & POWER Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("motor")}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-black uppercase">MOTOR & KRAFT</span>
              <ChevronDown 
                className={`text-black transition-transform duration-200 ${
                  openAccordion === "motor" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "motor" && (
              <div className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <SpecRow label="Motor Type" value={product.tekniskeSpesifikasjoner?.motor?.type} />
                  <SpecRow label="Effekt" value={product.tekniskeSpesifikasjoner?.motor?.effekt} />
                  <SpecRow label="Topp Effekt" value={product.tekniskeSpesifikasjoner?.motor?.toppEffekt} />
                  {product.tekniskeSpesifikasjoner?.motor?.dreiemoment && (
                    <SpecRow label="Dreiemoment" value={product.tekniskeSpesifikasjoner?.motor?.dreiemoment} />
                  )}
                  <SpecRow label="Plassering" value={product.tekniskeSpesifikasjoner?.motor?.plassering} />
                  <SpecRow label="Dreiemoment Sensor" value={product.tekniskeSpesifikasjoner?.motor?.dreiemomentSensor ? "Ja" : "Nei"} />
                </div>
              </div>
            )}
          </div>

          {/* BATTERY & CHARGING Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("battery")}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-black uppercase">BATTERI & LADING</span>
              <ChevronDown 
                className={`text-black transition-transform duration-200 ${
                  openAccordion === "battery" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "battery" && (
              <div className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <SpecRow label="Batteri Type" value={product.tekniskeSpesifikasjoner?.batteri?.type} />
                  <SpecRow label="Spenning" value={product.tekniskeSpesifikasjoner?.batteri?.spenning} />
                  <SpecRow label="Kapasitet" value={product.tekniskeSpesifikasjoner?.batteri?.kapasitet} />
                  <SpecRow label="Energi (Wh)" value={product.tekniskeSpesifikasjoner?.batteri?.kapasitetWh} />
                  <SpecRow label="Avtakbar" value={product.tekniskeSpesifikasjoner?.batteri?.avtakbar ? "Ja" : "Nei"} />
                  <SpecRow label="Ladetid" value={product.tekniskeSpesifikasjoner?.batteri?.ladetid} />
                  <SpecRow label="Batteri Levetid" value={product.tekniskeSpesifikasjoner?.batteri?.batteriLevetid} />
                </div>
              </div>
            )}
          </div>

          {/* PERFORMANCE Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("performance")}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-black uppercase">YTELSE</span>
              <ChevronDown 
                className={`text-black transition-transform duration-200 ${
                  openAccordion === "performance" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "performance" && (
              <div className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <SpecRow label="Maks Fart" value={product.tekniskeSpesifikasjoner?.ytelse?.maksFart} />
                  <SpecRow label="Rekkevidde (Ren Elektrisk)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.renElektrisk} />
                  <SpecRow label="Rekkevidde (Pedal Assistanse)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.pedalAssistanse} />
                  <SpecRow label="Rekkevidde (Kombinert)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.kombinert} />
                  <SpecRow label="Stigningsevne" value={product.tekniskeSpesifikasjoner?.ytelse?.stigningsevne} />
                  {product.tekniskeSpesifikasjoner?.ytelse?.svingradius && (
                    <SpecRow label="Svingradius" value={product.tekniskeSpesifikasjoner?.ytelse?.svingradius} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* WHEELS & BRAKES Section */}
          <div>
            <button
              onClick={() => toggleAccordion("wheels")}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-black uppercase">HJUL & BREMSER</span>
              <ChevronDown 
                className={`text-black transition-transform duration-200 ${
                  openAccordion === "wheels" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "wheels" && (
              <div className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <SpecRow label="Hjul Størrelse" value={product.tekniskeSpesifikasjoner?.hjul?.størrelse} />
                  <SpecRow label="Dekk Type" value={product.tekniskeSpesifikasjoner?.hjul?.dekkType} />
                  <SpecRow label="Dekk Størrelse" value={product.tekniskeSpesifikasjoner?.hjul?.dekkStørrelse} />
                  {product.tekniskeSpesifikasjoner?.hjul?.felgMateriale && (
                    <SpecRow label="Felg Materiale" value={product.tekniskeSpesifikasjoner?.hjul?.felgMateriale} />
                  )}
                  <SpecRow label="Bremse Type" value={product.tekniskeSpesifikasjoner?.bremser?.type} />
                  <SpecRow label="Foran Bremse" value={product.tekniskeSpesifikasjoner?.bremser?.foran} />
                  <SpecRow label="Bak Bremse" value={product.tekniskeSpesifikasjoner?.bremser?.bak} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for specification rows
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-1">
      <span className="text-gray-600 mr-4 min-w-0 flex-shrink">{label}</span>
      <span className="text-black text-right font-medium">{value}</span>
    </div>
  );
}
