"use client";

export default function TechnicalSpecifications({ product }: { product: any }) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <SpecRow label="Modell" value={product.tekniskeSpesifikasjoner?.generelt?.modell} />
            <SpecRow label="Ramme" value={product.tekniskeSpesifikasjoner?.generelt?.rammeMateriale} />
            <SpecRow label="Vekt" value={product.tekniskeSpesifikasjoner?.generelt?.vekt} />
            <SpecRow label="Maks Last" value={product.tekniskeSpesifikasjoner?.generelt?.maksLast} />
            <SpecRow label="Anbefalt Høyde" value={product.tekniskeSpesifikasjoner?.generelt?.anbefalteHøyde} />
            {product.availableSizes && product.availableSizes.length === 1 && (
              <SpecRow label="Størrelse" value={product.availableSizes[0]} />
            )}
            <SpecRow label="Sammenleggbar" value={product.tekniskeSpesifikasjoner?.generelt?.sammenleggbar} />
            <SpecRow label="Motor" value={product.tekniskeSpesifikasjoner?.motor?.effekt} />
            <SpecRow label="Dreiemoment" value={product.tekniskeSpesifikasjoner?.motor?.dreiemoment} />
            <SpecRow label="Batteri" value={product.tekniskeSpesifikasjoner?.batteri?.kapasitetWh} />
            <SpecRow label="Ladetid" value={product.tekniskeSpesifikasjoner?.batteri?.ladetid} />
            <SpecRow label="Maks Fart" value={product.tekniskeSpesifikasjoner?.ytelse?.maksFart} />
            <SpecRow label="Rekkevidde" value={product.tekniskeSpesifikasjoner?.ytelse?.rekkevidde?.kombinert} />
            <SpecRow label="Hjul" value={product.tekniskeSpesifikasjoner?.hjul?.størrelse} />
            <SpecRow label="Bremser" value={product.tekniskeSpesifikasjoner?.bremser?.type} />
            <SpecRow label="Giring" value={product.tekniskeSpesifikasjoner?.giring?.gir} />
            <SpecRow label="Display" value={product.tekniskeSpesifikasjoner?.elektrisk?.display} />
            <SpecRow label="Lys" value={product.tekniskeSpesifikasjoner?.elektrisk?.lys?.type} />
            <SpecRow label="Demping" value={product.tekniskeSpesifikasjoner?.komfort?.demping?.type} />
            <SpecRow label="Vann Motstand" value={product.tekniskeSpesifikasjoner?.sikkerhet?.vannMotstand} />
            <SpecRow label="Sertifiseringer" value={product.tekniskeSpesifikasjoner?.sikkerhet?.sertifisering?.join(", ")} />
          </div>

          {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-black uppercase mb-4">HVA ER I ESKEN</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {product.whatsInTheBox.map((item: string, index: number) => (
                  <div key={index} className="flex items-start py-1">
                    <span className="text-gray-600 mr-4">•</span>
                    <span className="text-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
