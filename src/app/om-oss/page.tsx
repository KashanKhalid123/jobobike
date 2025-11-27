'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Om JOBOBIKE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            JOBOBIKE - Pålitelige el-sykler
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Company Introduction */}
        <section className="mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            JOBOBIKE har spesialisert seg på produksjon av el-sykler i over 20 år, med fokus på kvalitet og innovasjon, noe som gjør oss til det mest pålitelige valget for deg.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            JOBOBIKE har vært til stede i el-sykkelmarkedet i to tiår. Vi har produsert sykler for velkjente verdensomspennende klientmerker. Å hjelpe andre til å lykkes har resultert i vår egen suksess. I dag er vi et av de ledende selskapene i el-sykkelbransjen.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Dessuten er vår livslange kundeservice alltid med deg.
          </p>
        </section>

        {/* Factory & Production */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Vår fabrikk</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kina produksjonsbase</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>50,000㎡ production facility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>3 assembly lines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>300,000+ bikes annual production capacity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>16 QC testing equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>35 R&D professionals</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Europeiske operasjoner</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>Established in Poland in 2019</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>6,000㎡ facility near Warsaw</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>2 assembly lines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>50+ skilled staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#12b190] mr-2">✓</span>
                  <span>30,000+ bikes annual capacity</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quality & Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Kvalitet og sertifiseringer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#12b190] transition-colors">
              <div className="text-4xl font-bold text-[#12b190] mb-4">ISO9001</div>
              <p className="text-gray-700">Kvalitetsstyringssystem sertifisert</p>
            </div>
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#12b190] transition-colors">
              <div className="text-4xl font-bold text-[#12b190] mb-4">EN15194</div>
              <p className="text-gray-700">Europeisk el-sykkel sikkerhetsstandard</p>
            </div>
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#12b190] transition-colors">
              <div className="text-4xl font-bold text-[#12b190] mb-4">40+</div>
              <p className="text-gray-700">Patenter og innovasjoner</p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Vårt engasjement</h2>
          <div className="bg-[#12b190] text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Innovasjon</h3>
                <p className="leading-relaxed">
                  Vi investerer kontinuerlig i forskning og utvikling for å skape banebrytende el-sykler som kombinerer stil, ytelse og bærekraft.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Kvalitet</h3>
                <p className="leading-relaxed">
                  Hver JOBOBIKE gjennomgår streng kvalitetskontroll med 16 QC testpunkter for å sikre de høyeste standardene.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Service</h3>
                <p className="leading-relaxed">
                  Med 300+ partnere over hele Europa og livslang kundeservice, er vi alltid her for å støtte din reise.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Bærekraft</h3>
                <p className="leading-relaxed">
                  Vi er forpliktet til å skape miljøvennlige transportløsninger som reduserer karbonutslipp og fremmer sunnere livsstil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#12b190] mb-2">20+</div>
              <p className="text-gray-700 font-medium">Års erfaring</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#12b190] mb-2">300+</div>
              <p className="text-gray-700 font-medium">Partnere i Europa</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#12b190] mb-2">50,000+</div>
              <p className="text-gray-700 font-medium">Sykler solgt</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#12b190] mb-2">100,000+</div>
              <p className="text-gray-700 font-medium">Fornøyde kunder</p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bli med i JOBOBIKE-familien
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Opplev den perfekte blandingen av innovasjon, kvalitet og service. Med JOBOBIKE kjøper du ikke bare en el-sykkel - du blir med i et fellesskap dedikert til bærekraftig og hyggelig transport.
          </p>
          <a
            href="/cycle"
            className="inline-block bg-[#12b190] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0fa080] transition-colors"
          >
            Utforsk våre el-sykler
          </a>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;