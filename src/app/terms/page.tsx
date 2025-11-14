'use client';

import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16 mt-32 md:mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">
            Kjøpsvilkår
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Vennligst les disse vilkårene nøye før du handler hos oss
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Parter og vilkår */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Parter og vilkår</h2>
          <p className="text-gray-700 leading-relaxed">
            Disse vilkårene gjelder mellom JALUT AI INNOSCRIBE (org.nr 932806517) og kunden («du/deg»). Ved å handle på sykkellageret.no aksepterer du disse vilkårene.
          </p>
        </section>

        {/* Bestilling og betaling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bestilling og betaling</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Når du legger inn en bestilling, mottar du en ordrebekreftelse og digital bruksanvisning på e-post. Bestillingen er bindende når du har mottatt ordrebekreftelsen.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi tilbyr betaling med Vipps, Visa, Mastercard og Klarna. Beløpet trekkes når du fullfører bestillingen.
          </p>
        </section>

        {/* Levering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Levering</h2>
          <p className="text-gray-700 leading-relaxed">
            Estimert leveringstid er 7–14 virkedager. Vi leverer kun innen Norge. Fraktkostnad vises før betaling.
          </p>
        </section>

        {/* Angrerett og retur */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Angrerett og retur</h2>
          <p className="text-gray-700 leading-relaxed">
            Du har 14 dagers angrerett etter Angrerettloven. Varen må være ubrukt og i original emballasje. Returfrakt betales av kunden.
          </p>
        </section>

        {/* Garanti & Reklamasjon */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Garanti & Reklamasjon</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Du har 2 års reklamasjonsrett etter Forbrukerkjøpsloven. Reklamasjonen gjelder feil som ikke skyldes normal slitasje eller feil bruk.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Reklamasjon må alltid avtales med oss på forhånd. Når vi har bekreftet at reklamasjonen oppfyller våre retningslinjer, vil du motta nødvendig informasjon som returadresse og videre prosedyre.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Produktet må returneres i original stand og emballasje.</li>
            <li>Kunden dekker returkostnader med mindre annet er avtalt.</li>
            <li>Ved feil eller mangler dekkes returkostnadene av oss.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            For å avtale reklamasjon, kontakt oss på support@jobobike.no med ordrenummer og informasjon om varen du ønsker å reklamere.
          </p>
        </section>

        {/* Personvern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Personvern</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi behandler personopplysninger i samsvar med vår personvernerklæring og gjeldende lover (GDPR).
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsOfService