"use client";
import React, { useState } from "react";

interface Section {
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    title: "Levering",
    content: `Alle bestillinger sendes innen 3 virkedager etter registrert betaling, med unntak av forhåndsbestillinger. Dersom levering forsinkes grunnet force majeure, helligdager eller andre forhold utenfor vår kontroll, informeres kunden via nettsiden eller kundeservice.`,
  },
  {
    title: "Angrerett",
    content: `Du har 14 dagers angrerett fra bestillingsdato i henhold til angrerettloven. For å benytte angreretten må varen returneres i original stand og emballasje. Kjøper dekker returfrakten.`,
  },
  {
    title: "Retur og bytte",
    content: `• Retur må avtales med kundeservice før varen sendes.

• Varen skal være ubrukt, komplett og uten skader.

• For el-sykler må testkjøringsavstand ikke overstige 10 km.

• Dersom retur skyldes produksjonsfeil, dekker vi frakt tur/retur.

• Ved retur av andre årsaker enn produksjonsfeil, dekker kjøper fraktkostnader begge veier.

• Dersom varen viser tydelige tegn på bruk, skade eller mangler deler, kan det trekkes opptil 20 % i behandlingsgebyr samt fraktkostnader.

Returadresse:
Gromadzka 505-806 Sokołów, Polen`,
  },
  {
    title: "Inspeksjon ved mottak",
    content: `Kunden skal kontrollere varen innen 3 virkedager etter mottak. Eventuelle skader eller feil må meldes umiddelbart. Etter 3 dager anses varen som levert i god stand.`,
  },
  {
    title: "Produktendringer",
    content: `Spesifikasjoner og detaljer kan endres uten forvarsel for å forbedre kvalitet, ytelse eller sikkerhet. Mindre forskjeller mellom produktbilder og faktisk produkt gir ikke grunnlag for reklamasjon eller retur.`,
  },
  {
    title: "Deler og slitasje",
    content: `Normale slitedeler (dekk, lagre, kjeder, bremser, batterier osv.) dekkes ikke av garanti. Ved behov for utskiftning kan deler kjøpes direkte fra oss.`,
  },
  {
    title: "Reklamasjon",
    content: `Ved dokumentert produksjonsfeil innen garantiperioden reparerer eller erstatter vi produktet uten kostnad. Garantien bortfaller dersom produktet har vært utsatt for feilbruk, uaktsomhet, kollisjon, vannskade, endring av deler eller annen modifikasjon.`,
  },
  {
    title: "Slik går du frem ved retur eller reklamasjon",
    content: `1. Kontakt kundeservice på e-post og oppgi ordrenummer, beskrivelse av problemet og eventuelle bilder.

2. Vent på bekreftelse og returinstruksjon før varen sendes.

3. Pakk produktet forsvarlig i original emballasje.

Vi behandler saken så snart varen er mottatt, og gir beskjed om videre prosess (reparasjon, erstatning eller refusjon).`,
  },
];

const ReturPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-20 pt-36">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
          Garanti & Retur
        </h1>
        <p className="text-center text-gray-500 text-sm mb-10">
          Sist oppdatert: 26. september 2025
        </p>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {index + 1}. {section.title}
                </span>
                <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReturPage;
