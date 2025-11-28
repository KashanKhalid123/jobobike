'use client';

import React from 'react';

const ReturPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 pt-36 md:mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">
            Kjøpsvilkår & Garanti
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Sist oppdatert: 27. november 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Parter og vilkår */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Parter og vilkår</h2>
          <p className="text-gray-700 leading-relaxed">
            Disse vilkårene gjelder mellom JALUT AI LAUNCHLABS (org.nr 931 361 414) og kunden («du/deg»). Ved å handle på sykkellageret.no aksepterer du disse vilkårene.
          </p>
        </section>

        {/* Bestilling, betaling og levering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bestilling, betaling og levering</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Når du legger inn en bestilling, mottar du en ordrebekreftelse og digital bruksanvisning på e-post. Bestillingen er bindende når du har mottatt ordrebekreftelsen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vi tilbyr betaling med Vipps, Visa, Mastercard og Klarna. Beløpet trekkes når du fullfører bestillingen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Estimert leveringstid er 7–14 virkedager. Vi leverer kun innen Norge. Fraktkostnad vises før betaling.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Kunden skal kontrollere varen innen 3 virkedager etter mottak. Eventuelle skader eller feil må meldes umiddelbart til <strong>support@jobobike.no</strong>. Etter 3 dager anses varen som levert i god stand.
          </p>
        </section>

        {/* Retur & Angrerett */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Retur & Angrerett</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Retur må alltid avtales med oss før varen sendes.</strong> Når vi har bekreftet at returen oppfyller våre retningslinjer, sender vi returadresse og videre instruksjoner.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Angrerett (14 dager)</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Du har 14 dagers angrerett fra dagen du mottar varen, i tråd med angrerettloven.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">For at angreretten skal gjelde må:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Varen være i <strong>original stand og original emballasje.</strong></li>
            <li>Varen være <strong>ubrukt, komplett og uten skader.</strong></li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Kostnader</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li><strong>Produksjonsfeil:</strong> Selger dekker frakt tur/retur.</li>
            <li><strong>Andre årsaker:</strong> Ved reparasjoner som ikke dekkes av garantien dekker kjøper frakt begge veier.</li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Slik avtaler du retur</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kontakt oss på <strong>support@jobobike.no</strong> med ordrenummer og informasjon om varen du ønsker å returnere.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Returadresse</h4>
            <p className="text-gray-700">
              Gromadzka 505-806<br />
              Sokołów, Polen
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <em>Merk: Send aldri varer til denne adressen før du har fått bekreftelse fra oss.</em>
            </p>
          </div>
        </section>

        {/* Garanti & Reklamasjon */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Garanti & Reklamasjon</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vi følger gjeldende norske lover og forbrukerrettigheter for el-sykler. Dette innebærer:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li><strong>2–5 års reklamasjonsrett</strong> avhengig av komponent og forventet levetid, i tråd med forbrukerkjøpsloven.</li>
            <li>Feil som skyldes <strong>produksjon, materialer eller fabrikasjon</strong> dekkes av garantien.</li>
            <li>Feil som skyldes <strong>uhell, manglende vedlikehold, feilbruk, uforsvarlig lagring eller modifisering</strong> dekkes ikke.</li>
            <li>Batterier dekkes for <strong>fabrikasjonsfeil</strong>, men normal kapasitetsreduksjon over tid regnes ikke som en mangel.</li>
            <li>Normale slitedeler (dekk, lagre, kjeder, bremser osv.) dekkes ikke av garanti. Ved behov for utskiftning kan deler kjøpes direkte fra oss.</li>
            <li>Garanti og reklamasjon gjelder kun når sykkelen er brukt i henhold til produsentens spesifikasjoner.</li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Slik melder du en garantisak:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Kontakt oss på <strong>support@jobobike.no</strong> med ordrenummer, beskrivelse av feilen og bilder/video som dokumentasjon.</li>
            <li>Vent på bekreftelse og returinstruksjon før varen sendes.</li>
            <li>Pakk produktet forsvarlig i original emballasje.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vi behandler saken så snart varen er mottatt, og gir beskjed om videre prosess (reparasjon, erstatning eller refusjon).
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Returadresse for garantisaker</h4>
            <p className="text-gray-700">
              Gromadzka 505-806<br />
              Sokołów, Polen
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <em>Merk: Send aldri varer til denne adressen før du har fått bekreftelse fra oss.</em>
            </p>
          </div>
        </section>

        {/* Produktendringer og personvern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produktendringer og personvern</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Spesifikasjoner og detaljer kan endres uten forvarsel for å forbedre kvalitet, ytelse eller sikkerhet. Mindre forskjeller mellom produktbilder og faktisk produkt gir ikke grunnlag for reklamasjon eller retur.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi behandler personopplysninger i samsvar med vår personvernerklæring og gjeldende lover (GDPR).
          </p>
        </section>

      </div>
    </div>
  );
};

export default ReturPage;
