'use client';

import React from 'react';
import Link from 'next/link';

const AfterSalesService = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-32 md:mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-600">
            <Link href="/" className="hover:text-[#12b190]">Hjem</Link>
            <span className="mx-2">&gt;</span>
          
            <span className="text-gray-900">Ettersalgsservice</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Ettersalgsservice
        </h1>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1: About Delivery */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              I. Om levering
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Alle bestillinger vil bli sendt innen 3 dager på virkedager etter vellykket betaling, unntatt forsålgsbestillinger. Hvis leveringen må forsinkes på grunn av force majeure eller andre spesielle omstendigheter, som helligdager, skal leveringstiden være underlagt sidevarsel eller kundeservicevarsel; forsålgsbestillingen skal være underlagt det bestillingen viser etter at bestillingen er lagt inn.
            </p>
          </section>

          {/* Section 2: Customers */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              II. Kunder
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kunder må inspisere varene innen 3 virkedager etter mottak av våre produkter. Hvis produktet blir funnet å være skadet eller defekt i kvalitet, må vedlikeholdsskjemaet sendes til vårt selskap i tide. Hvis det er sant, vil vårt selskap tilby gratis vedlikeholdsdeler. I tilfelle alvorlig skade skal de to partene forhandle om en løsning. Produktet vil bli betraktet som normalt hvis det overskrider 3 dager.
            </p>
          </section>

          {/* Section 3: About Return and Exchange */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              III. Om retur og bytte
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For å gi kunder som velger våre produkter en bedre opplevelse, tilbyr vi derfor en 20-dagers grunn løs retur- og byttetjeneste (20 dager refererer til 20 naturlige dager fra fakturadatoen). Hvis du ikke er fornøyd med produktet, kan du søke om produktretur eller bytte. Du kan kontakte kundeservice for refusjon eller bytte (slitedelene på el-sykkelen er ikke betydelig slitt, vi krever at testkøringsavstanden ikke skal være mer enn 10 km).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vennligst behold emballasjekartongen i minst 20 dager for å pakke produktet sikkert for retur.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hvis varene returneres eller byttes på grunn av ikke-kvalitetsproblemer, skal kjøperen bære frakten frem og tilbake, og må sørge for at alle deler er komplette og uten skade. Hvis deler mangler eller el-sykkelen blir skadet under returprosessen, må kjøperen betale tapet av delene. Hvis du vil kansellere kjøpet etter å ha lagt inn en bestilling online og før frakt, kan kjøperen oppfylle ovennevnte betingelser, JOBOBIKE vil refundere etter å ha trukket fra frakten. Hvis den returnerte el-sykkelen har tydelige tegn på bruk eller tap, vil JOBOBIKE refundere etter å ha trukket fra frakten og 20% av el-sykkelgebyret som behandlingsgebyr. Hvis returen eller byttet skyldes kvalitetsproblemer, vil JOBOBIKE bære frakten frem og tilbake.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Retur- og byttetjenesten gjelder ikke for skader forvoldt av ulykke, feilbruk, misbruk eller uaktsomhet, modifikasjon av rammen eller deler av kunden vil gjøre retur- og byttetjenesten ugyldig.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              I alle tilfeller anbefaler vi ikke retur av varer. At kunden legger inn en bestilling betyr at kjøper og selger kommer til enighet.
            </p>
          </section>

          {/* Section 4: About Parameters */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              IV. Om parametere
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vårt selskap prøver å gjøre det du ser er det du får. For å gi forbrukere en bytteopplevelse oppgraderer vi alltid ytelsen, konfigurasjonen og påliteligheten til produktet. Hvis sidebeskrivelsen ikke kan fylles opp til produktoppgradering, vennligst se det faktiske produktet. Vi lover at det oppgraderte produktet ikke vil påvirke kjøreopplevelsen din og sikre at ytelsen til el-sykkelen vil være bedre enn den gamle versjonen. Derfor vil nyanser ikke bli brukt som grunnlag for beskrivelsesavvik.
            </p>
          </section>

          {/* Section 5: About parts */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              V. Om deler
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vi leverer deler og tilbehør når som helst og garanterer at lageret er tilstrekkelig. Normal slitasje på alle slitedelene (inkludert men ikke begrenset til dekk, lagre, kjeder, batteri, etc.) dekkes ikke av garantien. Når slitedelene må byttes, kan kunder kjøpe nye deler fra oss.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AfterSalesService;