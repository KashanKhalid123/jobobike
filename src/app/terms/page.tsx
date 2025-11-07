'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface AccordionItem {
  id: string
  title: string
  content: string
}

const TermsOfService: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const accordionItems: AccordionItem[] = [
    {
      id: 'parter',
      title: '1. Parter',
      content: `Disse vilkårene gjelder mellom JALUT AI INNOSCRIBE (org.nr 932806517) og kunden («du/deg»). Ved å handle på sykkellageret.no aksepterer du disse vilkårene.`
    },
    {
      id: 'bestilling',
      title: '2. Bestilling',
      content: `Når du legger inn en bestilling, mottar du en ordrebekreftelse på e-post. 

Du vil også motta en digital bruksanvisning for produktet på e-post.

Bestillingen er bindende når du har mottatt ordrebekreftelsen.
`
    },
    {
      id: 'betaling',
      title: '3. Betaling',
      content: `Vi tilbyr betaling med Vipps, Visa, Mastercard og Klarna.

Beløpet trekkes når du fullfører bestillingen.`
    },
    {
      id: 'levering',
      title: '4. Levering',
      content: `Estimert leveringstid er 7–14 virkedager.

Vi leverer kun innen Norge.

Fraktkostnad vises før betaling.`
    },
    {
      id: 'angrerett',
      title: '5. Angrerett',
      content: `Du har 14 dagers angrerett etter Angrerettloven.

Varen må være ubrukt og i original emballasje.

Returfrakt betales av kunden.`
    },

    {
      id: 'personvern',
      title: '7. Personvern',
      content: `Vi behandler personopplysninger i samsvar med vår personvernerklæring og gjeldende lover (GDPR).`
    },
    {
      id: 'retur',
      title: '8. Retur',
      content: `Retur må alltid avtales med oss på forhånd. Når vi har bekreftet at returen oppfyller våre retningslinjer, vil du motta nødvendig informasjon som returadresse og videre prosedyre.

Vi tilbyr 14 dagers angrerett fra den dagen du mottar varen, i tråd med angrerettloven.
• Produktet må returneres i original stand og emballasje.
• Kunden dekker returkostnader med mindre annet er avtalt.
• Ved feil eller mangler dekkes returkostnadene av oss.

For å avtale retur, kontakt oss på support@jobobike.no med ordrenummer og informasjon om varen du ønsker å returnere.`
    },
    {
      id: 'reklamasjon',
      title: '9. Reklamasjon',
      content: `Du har 2 års reklamasjonsrett etter Forbrukerkjøpsloven.

Reklamasjonen gjelder feil som ikke skyldes normal slitasje eller feil bruk.

Reklamasjon må alltid avtales med oss på forhånd. Når vi har bekreftet at reklamasjonen oppfyller våre retningslinjer, vil du motta nødvendig informasjon som returadresse og videre prosedyre.

• Produktet må returneres i original stand og emballasje.
• Kunden dekker returkostnader med mindre annet er avtalt.
• Ved feil eller mangler dekkes returkostnadene av oss.

For å avtale reklamasjon, kontakt oss på support@jobobike.no med ordrenummer og informasjon om varen du ønsker å reklamere.`
    }
  ]

  return (
    <div className="min-h-screen mt-32 md:mt-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 py-3 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Hjem
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium">Vilkår</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2">
            Kjøpsvilkår
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center">
            Vennligst les disse vilkårene nøye før du handler hos oss
          </p>
        </div>
      </div>

      {/* Accordion Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-sm">
          {accordionItems.map((item, index) => (
            <div
              key={item.id}
              className={`border-b border-gray-200 ${index === accordionItems.length - 1 ? 'border-b-0' : ''}`}
            >
              <button
                className="w-full px-4 md:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={openAccordion === item.id}
                aria-controls={`accordion-content-${item.id}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openAccordion === item.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>

              {openAccordion === item.id && (
                <div
                  id={`accordion-content-${item.id}`}
                  className="px-4 md:px-6 pb-6 pt-2 animate-fade-in"
                >
                  <div className="prose prose-gray max-w-none">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default TermsOfService