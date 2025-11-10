"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TechnicalSpecifications({ product }: { product: any }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="w-full">
      <div className="bg-white w-full px-0 py-8">
        <div className="px-6 lg:px-8 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
            Tekniske Spesifikasjoner
          </h2>
          <div className="w-full h-px bg-black"></div>
        </div>

        <div className="bg-white px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT SPECS COLUMN */}
            <div className="space-y-0">
              {/* GENERAL INFORMATION Section */}
              {product.tekniskeSpesifikasjoner?.generelt && (
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
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Modell" value={product.tekniskeSpesifikasjoner?.generelt?.modell} />
                        <SpecRow label="Ramme Type" value={product.tekniskeSpesifikasjoner?.generelt?.rammeType} />
                        <SpecRow label="Ramme Materiale" value={product.tekniskeSpesifikasjoner?.generelt?.rammeMateriale} />
                        <SpecRow label="Vekt" value={product.tekniskeSpesifikasjoner?.generelt?.vekt} />
                        <SpecRow label="Maks Last" value={product.tekniskeSpesifikasjoner?.generelt?.maksLast} />
                        <SpecRow label="Anbefalt Høyde" value={product.tekniskeSpesifikasjoner?.generelt?.anbefalteHøyde} />
                        <SpecRow label="Sammenleggbar" value={product.tekniskeSpesifikasjoner?.generelt?.sammenleggbar} />
                        <SpecRow label="Dimensjoner (Utbrettet)" value={product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.utbrettet} />
                        {product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.sammenlagt !== "N/A" && (
                          <SpecRow label="Dimensjoner (Sammenlagt)" value={product.tekniskeSpesifikasjoner?.generelt?.dimensjoner?.sammenlagt} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MOTOR & POWER Section */}
              {product.tekniskeSpesifikasjoner?.motor && (
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
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Motor Type" value={product.tekniskeSpesifikasjoner?.motor?.type} />
                        <SpecRow label="Effekt" value={product.tekniskeSpesifikasjoner?.motor?.effekt} />
                        <SpecRow label="Topp Effekt" value={product.tekniskeSpesifikasjoner?.motor?.toppEffekt} />
                        <SpecRow label="Dreiemoment" value={product.tekniskeSpesifikasjoner?.motor?.dreiemoment} />
                        <SpecRow label="Plassering" value={product.tekniskeSpesifikasjoner?.motor?.plassering} />
                        <SpecRow label="Dreiemoment Sensor" value={product.tekniskeSpesifikasjoner?.motor?.dreiemomentSensor} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BATTERY & CHARGING Section */}
              {product.tekniskeSpesifikasjoner?.batteri && (
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
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Batteri Type" value={product.tekniskeSpesifikasjoner?.batteri?.type} />
                        <SpecRow label="Spenning" value={product.tekniskeSpesifikasjoner?.batteri?.spenning} />
                        <SpecRow label="Kapasitet" value={product.tekniskeSpesifikasjoner?.batteri?.kapasitet} />
                        <SpecRow label="Energi (Wh)" value={product.tekniskeSpesifikasjoner?.batteri?.kapasitetWh} />
                        <SpecRow label="Avtakbar" value={product.tekniskeSpesifikasjoner?.batteri?.avtakbar} />
                        <SpecRow label="Ladetid" value={product.tekniskeSpesifikasjoner?.batteri?.ladetid} />
                        <SpecRow label="Batteri Levetid" value={product.tekniskeSpesifikasjoner?.batteri?.batteriLevetid} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PERFORMANCE Section */}
              {product.tekniskeSpesifikasjoner?.ytelse && (
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
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Maks Fart" value={product.tekniskeSpesifikasjoner?.ytelse?.maksFart} />
                        <SpecRow label="Rekkevidde (Ren Elektrisk)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.renElektrisk} />
                        <SpecRow label="Rekkevidde (Pedal Assistanse)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.pedalAssistanse} />
                        <SpecRow label="Rekkevidde (Kombinert)" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.kombinert} />
                        <SpecRow label="Stigningsevne" value={product.tekniskeSpesifikasjoner?.ytelse?.stigningsevne} />
                        <SpecRow label="Svingradius" value={product.tekniskeSpesifikasjoner?.ytelse?.svingradius} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WHEELS & BRAKES Section */}
              {(product.tekniskeSpesifikasjoner?.hjul || product.tekniskeSpesifikasjoner?.bremser) && (
                <div className="border-b border-gray-200">
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
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Hjul Størrelse" value={product.tekniskeSpesifikasjoner?.hjul?.størrelse} />
                        <SpecRow label="Dekk Type" value={product.tekniskeSpesifikasjoner?.hjul?.dekkType} />
                        <SpecRow label="Dekk Størrelse" value={product.tekniskeSpesifikasjoner?.hjul?.dekkStørrelse} />
                        <SpecRow label="Felg Materiale" value={product.tekniskeSpesifikasjoner?.hjul?.felgMateriale} />
                        <SpecRow label="Bremse Type" value={product.tekniskeSpesifikasjoner?.bremser?.type} />
                        <SpecRow label="Foran Bremse" value={product.tekniskeSpesifikasjoner?.bremser?.foran} />
                        <SpecRow label="Bak Bremse" value={product.tekniskeSpesifikasjoner?.bremser?.bak} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GEARING Section */}
              {product.tekniskeSpesifikasjoner?.giring && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("gearing")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">GIRING</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "gearing" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "gearing" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Giring Type" value={product.tekniskeSpesifikasjoner?.giring?.type} />
                        <SpecRow label="Girskifter" value={product.tekniskeSpesifikasjoner?.giring?.girskifter} />
                        <SpecRow label="Antall Gir" value={product.tekniskeSpesifikasjoner?.giring?.gir} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ELECTRICAL SYSTEM Section */}
              {product.tekniskeSpesifikasjoner?.elektrisk && (
                <div>
                  <button
                    onClick={() => toggleAccordion("electrical")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">ELEKTRISK SYSTEM</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "electrical" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "electrical" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Display" value={product.tekniskeSpesifikasjoner?.elektrisk?.display} />
                        <SpecRow label="Lys Foran" value={product.tekniskeSpesifikasjoner?.elektrisk?.lys?.foran} />
                        <SpecRow label="Lys Bak" value={product.tekniskeSpesifikasjoner?.elektrisk?.lys?.bak} />
                        <SpecRow label="Lys Type" value={product.tekniskeSpesifikasjoner?.elektrisk?.lys?.type} />
                        <SpecRow label="Horn" value={product.tekniskeSpesifikasjoner?.elektrisk?.horn} />
                        <SpecRow label="Gasspedal" value={product.tekniskeSpesifikasjoner?.elektrisk?.gasspedal} />
                        <SpecRow label="Assistanse Nivåer" value={product.tekniskeSpesifikasjoner?.elektrisk?.assistanseNivåer} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT SPECS COLUMN */}
            <div className="space-y-0">

              {/* COMFORT Section */}
              {product.tekniskeSpesifikasjoner?.komfort && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("comfort")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">KOMFORT</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "comfort" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "comfort" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Demping Foran" value={product.tekniskeSpesifikasjoner?.komfort?.demping?.foran} />
                        <SpecRow label="Demping Bak" value={product.tekniskeSpesifikasjoner?.komfort?.demping?.bak} />
                        <SpecRow label="Demping Type" value={product.tekniskeSpesifikasjoner?.komfort?.demping?.type} />
                        <SpecRow label="Sete Type" value={product.tekniskeSpesifikasjoner?.komfort?.sete?.type} />
                        <SpecRow label="Sete Justerbar" value={product.tekniskeSpesifikasjoner?.komfort?.sete?.justerbar} />
                        <SpecRow label="Sete Materiale" value={product.tekniskeSpesifikasjoner?.komfort?.sete?.materiale} />
                        <SpecRow label="Styre Type" value={product.tekniskeSpesifikasjoner?.komfort?.styre?.type} />
                        <SpecRow label="Styre Justerbar" value={product.tekniskeSpesifikasjoner?.komfort?.styre?.justerbar} />
                        <SpecRow label="Styre Materiale" value={product.tekniskeSpesifikasjoner?.komfort?.styre?.materiale} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SAFETY Section */}
              {product.tekniskeSpesifikasjoner?.sikkerhet && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("safety")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">SIKKERHET</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "safety" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "safety" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Reflekser" value={product.tekniskeSpesifikasjoner?.sikkerhet?.reflekser} />
                        <SpecRow label="Bjelle" value={product.tekniskeSpesifikasjoner?.sikkerhet?.bjelle} />
                        <SpecRow label="Vann Motstand" value={product.tekniskeSpesifikasjoner?.sikkerhet?.vannMotstand} />
                        <SpecRow label="Sertifiseringer" value={product.tekniskeSpesifikasjoner?.sikkerhet?.sertifisering?.join(", ")} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CONNECTIVITY Section */}
              {product.tekniskeSpesifikasjoner?.tilkobling && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("connectivity")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">TILKOBLING</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "connectivity" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "connectivity" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="App" value={product.tekniskeSpesifikasjoner?.tilkobling?.app} />
                        <SpecRow label="Bluetooth" value={product.tekniskeSpesifikasjoner?.tilkobling?.bluetooth} />
                        <SpecRow label="GPS" value={product.tekniskeSpesifikasjoner?.tilkobling?.gps} />
                        <SpecRow label="USB" value={product.tekniskeSpesifikasjoner?.tilkobling?.usb} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ACCESSORIES Section */}
              {product.tekniskeSpesifikasjoner?.tilbehør && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("accessories")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">TILBEHØR</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "accessories" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "accessories" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        <SpecRow label="Sidestøtte" value={product.tekniskeSpesifikasjoner?.tilbehør?.sidestøtte} />
                        <SpecRow label="Skjermer" value={product.tekniskeSpesifikasjoner?.tilbehør?.skjermer} />
                        <SpecRow label="Bagasjebrett" value={product.tekniskeSpesifikasjoner?.tilbehør?.bagasjebrett} />
                        <SpecRow label="Kurv" value={product.tekniskeSpesifikasjoner?.tilbehør?.kurv} />
                        <SpecRow label="Flaskeholder" value={product.tekniskeSpesifikasjoner?.tilbehør?.flaskeholder} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SIZE Section */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion("size")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">STØRRELSE</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "size" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "size" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        {product.availableSizes.map((size: string, index: number) => (
                          <SpecRow key={index} label={`Størrelse ${index + 1}`} value={size} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WHAT'S IN THE BOX Section */}
              {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
                <div>
                  <button
                    onClick={() => toggleAccordion("box")}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-black uppercase">HVA ER I ESKEN</span>
                    <ChevronDown 
                      className={`text-black transition-transform duration-200 ${
                        openAccordion === "box" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "box" && (
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-y-2 text-sm">
                        {product.whatsInTheBox.map((item, index) => (
                          <div key={index} className="flex items-start py-1">
                            <span className="text-gray-600 mr-4">•</span>
                            <span className="text-black">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for specification rows
function SpecRow({ label, value }: { label: string; value?: string | number | boolean }) {
  if (!value && value !== false) return null;
  
  const displayValue = typeof value === 'boolean' ? (value ? 'Ja' : 'Nei') : String(value);
  
  return (
    <div className="flex justify-between items-start py-1">
      <span className="text-gray-600 mr-4 min-w-0 flex-shrink">{label}</span>
      <span className="text-black text-right font-medium">{displayValue}</span>
    </div>
  );
}