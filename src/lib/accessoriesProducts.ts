// lib/accessoriesProducts.ts

export interface AccessoryProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  originalPrice?: number;
  price: number;
  discount?: string;
  currency: string;
  image: string;
  images: string[];
  category: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
  compatibility: string[];
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  colorImages?: { [color: string]: string };
  colorStock?: { [color: string]: boolean };
}

export const accessoriesProducts: AccessoryProduct[] = [
  {
    id: "1",
    slug: "jobobike-front-rack",
    name: "Front Bagasjebrett",
    description: "Lettvekts aluminium front bagasjebrett med holdbar matt svart pulverlakkering, rustfritt og perfekt for alle værforhold.",
    fullDescription: "JOBOBIKE front bagasjebrett er laget av lettvekts aluminium med holdbar, matt svart pulverlakkering. Det er rustfritt, noe som gjør det perfekt for alle værforhold. Uansett om du reiser i røft terreng eller i byen – JOBOBIKE bagasjebrettet er garantert ikke å falle ned ved plutselig svinging eller hard bremsing.",
    originalPrice: 799,
    price: 479.4,
    discount: "40%",
    currency: "kr",
    image: "/images/front-rack/front-1.png",
    images: [
      "/images/front-rack/front-1.png",
      "/images/front-rack/front-2.png",
    ],
    category: ["Bagasjebrett & Bærere"],
    specifications: [
      { label: "Materiale", value: "Aluminiumlegering" },
      { label: "Overflate", value: "Matt svart pulverlakkering" },
      { label: "Vektkapasitet", value: "15 kg" },
      { label: "Montering", value: "Frontgaffel-montering" }
    ],
    features: [
      "Rustfri konstruksjon",
      "Lettvekts aluminiumdesign",
      "Holdbar matt svart finish",
      "Sikkert monteringssystem",
      "Ytelse i all slags vær"
    ],
    compatibility: [
      "Eddy X",
      "Viva",
      "Henry",
      "Transer",
      "Romer",
      "Romer Pro",
      "Ace",
      "Ace Pro"
    ],
    inStock: true
  },
  {
    id: "2",
    slug: "jobobike-basket-with-wooden",
    name: "Kurv med Tre Håndtak",
    description: "Stilig integrert kurv med tre håndtak, perfekt for å bære dagligvarer og personlige eiendeler på elsykkelen din.",
    fullDescription: "JOBOBIKE-kurven med tre håndtak kombinerer funksjonalitet med elegant design. Den er laget av holdbare materialer med et vakkert trehåndtak som gir et eksklusivt preg. Kurven kan monteres både på front- og bakbagasjebrett. Den integrerte designen sørger for rask og enkel installasjon uten behov for ekstra festebraketter eller spesialverktøy.",
    originalPrice: 999,
    price: 599.4,
    discount: "40%",
    currency: "kr",
    image: "/images/basket/basket-1.png",
    images: [
      "/images/basket/basket-1.png",
      "/images/basket/basket-2.png",
    ],
    category: ["Kurver & Oppbevaring"],
    specifications: [
      { label: "Materiale", value: "Aluminiumlegering med trehåndtak" },
      { label: "Overflate", value: "Matt svart" },
      { label: "Kapasitet", value: "20 liter" },
      { label: "Montering", value: "Kompatibel med front- og bakbagasjebrett" }
    ],
    features: [
      "Elegant trehåndtak",
      "Integrert monteringssystem",
      "Rask og enkel installasjon",
      "Værbestandige materialer",
      "Romslig kapasitet på 20 liter"
    ],
    compatibility: [
      "Eddy X",
      "Sam",
      "Viva",
      "Henry",
      "Transer",
      "Mover",
      "Romer",
      "Romer Pro"
    ],
    inStock: true
  },
  {
    id: "3",
    slug: "jobobike-cover-bag-sam",
    name: "Dekselveske",
    description: "Vanntett dekselveske som beskytter din sammenleggbare sykkel mot støv, vann og riper. Spesielt designet for JOBOBIKE Sam.",
    fullDescription: "Denne vanntette dekselvesken er spesielt utviklet for å beskytte din sammenleggbare JOBOBIKE Sam mot støv, vann og riper. Det slitesterke materialet gir langvarig beskyttelse, mens den kompakte utformingen gjør det enkelt å oppbevare og transportere sykkelen. Perfekt både til reise og lagring hjemme eller på jobb.",
    originalPrice: 899,
    price: 539.4,
    discount: "40%",
    currency: "kr",
    image: "/images/Thermal/thermal-bag-1.png",
    images: [
      "/images/Thermal/thermal-bag-1.png",
      "/images/Thermal/thermal-bag-2.png",
      "/images/Thermal/thermal-bag-3.png",
    ],
    category: ["Beskyttelse & Oppbevaring"],
    specifications: [
      { label: "Materiale", value: "600D Oxford-stoff" },
      { label: "Vannmotstand", value: "IPX4" },
      { label: "Størrelse", value: "85 cm x 43 cm x 72 cm" },
      { label: "Vekt", value: "1,2 kg" }
    ],
    features: [
      "Vanntett beskyttelse",
      "Støv- og ripebestandig",
      "Forsterket bærehåndtak",
      "Kompakt når den pakkes sammen",
      "Enkel å rengjøre"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true
  },
  {
    id: "4",
    slug: "jobobike-lock",
    name: "Lås",
    description: "Robust sykkellås som gir maksimal sikkerhet for elsykkelen din, med tyverisikring og værbestandig konstruksjon.",
    fullDescription: "JOBOBIKE-låsen gir førsteklasses sikkerhet for elsykkelen din. Den er laget i herdet stål med både anti-pirk og anti-bor-beskyttelse, slik at sykkelen din forblir trygg ved parkering. Den værbestandige konstruksjonen fungerer godt i regn, snø og skitt, og den kompakte størrelsen gjør den enkel å ta med seg.",
    originalPrice: 599,
    price: 359.4,
    discount: "40%",
    currency: "kr",
    image: "/images/lock/lock-1.png",
    images: [
      "/images/lock/lock-1.png",
      "/images/lock/lock-2.png",
    ],
    category: ["Sikkerhet"],
    specifications: [
      { label: "Materiale", value: "Herdet stål" },
      { label: "Sikkerhetsnivå", value: "Nivå 9" },
      { label: "Lengde", value: "120 cm" },
      { label: "Diameter", value: "12 mm" }
    ],
    features: [
      "Herdet stålkonstruksjon",
      "Sylinder med anti-pirk-beskyttelse",
      "Motstandsdyktig mot boring",
      "Værbestandig belegg",
      "Leveres med 3 nøkler"
    ],
    compatibility: ["All models"],
    inStock: true
  },
  {
    id: "5",
    slug: "jobobike-phone-holder-waterproof",
    name: "Telefonholder (Vanntett Deksel)",
    description: "Sikker telefonholder med vanntett deksel, slik at du kan bruke telefonen til navigasjon samtidig som den er beskyttet mot vær og vind.",
    fullDescription: "Hold telefonen tilgjengelig og beskyttet med JOBOBIKE telefonholder. Det vanntette dekselet gir full berøringsskjerm-funksjonalitet samtidig som det beskytter mot regn, sprut og støv. Det sikre festesystemet sørger for at telefonen sitter stabilt selv på ujevne veier, noe som gjør den ideell til GPS-navigasjon under sykling.",
    originalPrice: 299,
    price: 179.4,
    discount: "40%",
    currency: "kr",
    image: "/images/holder/holder-3.jpg",
    images: [
      "/images/holder/holder-3.jpg",
      "/images/holder/holder-2.jpg",
      "/images/holder/holder-1.jpg",
    ],
    category: ["Elektronikk & Holdere"],
    specifications: [
      { label: "Kompatibilitet", value: "Telefoner opptil 6,7 tommer" },
      { label: "Vannmotstand", value: "IPX6" },
      { label: "Montering", value: "Styrefeste" },
      { label: "Rotasjon", value: "360° rotasjon" }
    ],
    colors: ["Svart", "Blå", "Rød"],
    colorImages: {
      "Rød": "/images/holder/holder-1.jpg",
      "Svart": "/images/holder/holder-3.jpg",
      "Blå": "/images/holder/holder-2.jpg"
    },
    colorStock: {
      "Svart": true,
      "Blå": false,
      "Rød": true
    },
    features: [
      "Vanntett deksel med berøringsskjerm",
      "360° justerbar visningsvinkel",
      "Sikker låsemekanisme",
      "Hurtig utløsningssystem",
      "Universell telefonkompatibilitet"
    ],
    compatibility: ["All models"],
    inStock: true
  },
  {
    id: "6",
    slug: "jobobike-bicycle-mirror",
    name: "Sykkelspeil",
    description: "Høykvalitets bakspeil som gir utmerket sikt og økt sikkerhet når du sykler på elsykkelen.",
    fullDescription: "JOBOBIKE sykkelspeil forbedrer sikkerheten ved å gi et bredt synsfelt bakover med splintfritt glass. Den justerbare armen gjør at du enkelt kan finne riktig vinkel, og det robuste festesystemet holder speilet stabilt selv på humpete underlag. Et elegant design som passer godt sammen med sykkelens utseende.",
    originalPrice: 599,
    price: 359.4,
    discount: "40%",
    currency: "kr",
    image: "/images/mirror/mirror-1.png",
    images: [
      "/images/mirror/mirror-1.png",
      "/images/mirror/mirror-2.png",
    ],
    category: ["Sikkerhet & Synlighet"],
    specifications: [
      { label: "Speilstørrelse", value: "80 mm diameter" },
      { label: "Materiale", value: "Splintfritt glass" },
      { label: "Montering", value: "Styrefeste" },
      { label: "Justering", value: "Multi-vinkel justering" }
    ],
    features: [
      "Splintfritt speilglass",
      "Bredt synsfelt",
      "Justerbar posisjonering",
      "Robust monteringsbrakett",
      "Enkel installasjon"
    ],
    compatibility: ["All models"],
    inStock: true
  },
  {
    id: "7",
    slug: "jobobike-helmet",
    name: "Sykkelhjelm",
    description: "CE EN 1078- og CPSC-sertifisert sykkelhjelm med støtbestandig konstruksjon og optimal ventilasjon for komfortable turer.",
    fullDescription: "JOBOBIKE sykkelhjelm er testet og sertifisert etter CE EN 1078 i Europa og CPSC i USA. Det støtbestandige PC-skallet på utsiden kombinert med en støtabsorberende EPS-innmat gir maksimal beskyttelse ved fall. Hjelmen har optimal ventilasjon, justerbart strammesystem og avtakbare puter for økt komfort på lange turer.",
    originalPrice: 599,
    price: 359.4,
    discount: "40%",
    currency: "kr",
    image: "/images/helmet/helmet-1.png",
    images: [
      "/images/helmet/helmet-1.png",
      "/images/helmet/helmet-2.png",
    ],
    category: ["Sikkerhet & Synlighet"],
    specifications: [
      { label: "Sertifisering", value: "CE EN 1078, CPSC" },
      { label: "Materiale", value: "PC-skall + EPS-skum" },
      { label: "Vekt", value: "280 g" },
      { label: "Ventilasjon", value: "18 luftventiler" }
    ],
    features: [
      "Dobbel sikkerhetssertifisering",
      "Støtbestandig konstruksjon",
      "Optimal ventilasjon",
      "Justerbart tilpasningshjul",
      "Avtakbar innvendig polstring",
      "Reflekterende detaljer"
    ],
    compatibility: [
      "Transer",
      "Triker",
      "Eddy X",
      "Viva",
      "Henry",
      "Lyon Pro",
      "Luxe",
      "Astra",
      "Dyno",
      "Dyno GT"
    ],
    inStock: true,
    sizes: ["S (52–56 cm)", "M (56–60 cm)", "L (60–64 cm)"],
    colors: ["Svart", "Blå"],
    colorImages: {
      "Svart": "/images/helmet/helmet-1.png",
      "Blå": "/images/helmet/helmet-2.png"
    }
  },
  {
    id: "8",
    slug: "jobobike-bottle-holder",
    name: "Flaskeholder",
    description: "Holdbar flaskeholder i aluminium som holder vannflasken din sikkert på plass under turen. Enkel å montere og kompatibel med de fleste flaskestørrelser.",
    fullDescription: "Hold deg hydrert på turene dine med JOBOBIKE flaskeholder. Den er laget av lett aluminiumslegering og har et sikkert grep som holder flasken godt fast, selv på ujevnt underlag. Det universelle monteringssystemet passer til alle JOBOBIKE-rammer, og det stilrene designet matcher sykkelens estetikk.",
    originalPrice: 159,
    price: 95.4,
    discount: "40%",
    currency: "kr",
    image: "/images/bottle/bottle-1.png",
    images: [
      "/images/bottle/bottle-1.png",
      "/images/bottle/bottle-2.png",
    ],
    category: ["Tilbehør"],
    specifications: [
      { label: "Materiale", value: "Aluminiumslegering" },
      { label: "Overflate", value: "Matt svart" },
      { label: "Flaskekapasitet", value: "500–750 ml" },
      { label: "Montering", value: "Rammemontering" }
    ],
    features: [
      "Lett aluminiums-konstruksjon",
      "Sikkert grep rundt flasken",
      "Passer de fleste standardflasker",
      "Enkel montering",
      "Stilrent utseende"
    ],
    compatibility: ["All models"],
    inStock: true
  },

  // 3. Integrated Front Basket
  {
    id: "acc-integrated-basket-001",
    slug: "integrated-front-basket",
    name: "Integrert Frontkurv",
    description: "Integrert kurv spesielt designet for elsykler. Monteres direkte på front- eller bakbagasjebrett uten ekstra utstyr. Rask og enkel installasjon.",
    fullDescription: "Denne integrerte kurven er spesielt utviklet for elsykler og kan monteres direkte på front- eller bakbagasjebrett uten behov for ekstra frontbagasjebrett. Installasjonen er rask og enkel. Kurven er laget av aluminiumslegering og har en matt svart pulverlakk som gir utmerket rustbeskyttelse. Den er godt egnet for alle værforhold og har lang levetid. Designet kombinerer moderne urban stil med naturlige tre-detaljer.",
    originalPrice: 1099,
    price: 659.4,
    discount: "40%",
    currency: "kr",
    image: "/images/Integrated-basket/bak.jpg",
    images: [
      "/images/Integrated-basket/bak.jpg",
      "/images/Integrated-basket/bak1.jpg",
    ],
    category: ["Kurver", "Oppbevaring", "Last"],
    specifications: [
      { label: "Materiale", value: "Aluminiumslegering med tredetaljer" },
      { label: "Overflate", value: "Matt svart pulverlakk" },
      { label: "Bunnmål", value: "30 x 19,5 cm" },
      { label: "Toppmål", value: "36,5 x 26,5 cm" },
      { label: "Høyde", value: "14 cm" },
      { label: "Lastekapasitet", value: "25 kg" },
      { label: "Montering", value: "Direkte montering på bagasjebrett (ingen ekstra frontbrett nødvendig)" },
      { label: "Installasjon", value: "Verktøyfri hurtigmontering" }
    ],
    features: [
      "Ingen ekstra frontbagasjebrett nødvendig",
      "Rask, verktøyfri installasjon",
      "Aluminiumsramme med holdbar pulverlakk",
      "Rustbestandig i all slags vær",
      "Naturlige tre-detaljer",
      "Sikker og stabil montering",
      "Lastekapasitet på 25 kg",
      "Romslig og praktisk innvendig volum"
    ],
    compatibility: [
      "Eddy X",
      "Viva",
      "Henry",
      "Transer"
    ],
    inStock: true,
  },

  // 7. Phone Holder (Shockproof)
  {
    id: "acc-phone-holder-shockproof-001",
    slug: "phone-holder-shockproof",
    name: "Støtsikker Telefonholder",
    description: "Universell støtsikker telefonholder med antiskli-silikonputer og 360° rotasjon. Verktøyfri installasjon, passer telefoner fra 4,8\" til 7,0\".",
    fullDescription: "Sikre telefonen din på hver tur med denne støtsikre, universelle elsykkel-telefonholderen. Den er bygget for å tåle røffe veier og daglig pendling, med antiskli-klemme, 360° justerbar visning og et hurtig-installasjonssystem – helt uten verktøy. Holderen er kompatibel med telefoner som er 132–182 mm lange (ca. 4,8\" til 7,0\") og kan monteres på styre med diameter opptil 46 mm. Full silikonpolstring beskytter telefonen mot riper og støt, mens låseklemmen gir ekstra godt grep og stabilitet under turen.",
    originalPrice: 399,
    price: 239.4,
    discount: "40%",
    currency: "kr",
    image: "/images/holder-shock/h.jpg",
    images: [
      "/images/holder-shock/h.jpg",
      "/images/holder-shock/h1.jpg",
    ],
    category: ["Telefonholdere", "Tilbehør", "Navigasjon"],
    specifications: [
      { label: "Telefonsstørrelse", value: "132–182 mm (4,8\"–7,0\")" },
      { label: "Styrerørdiameter", value: "Opptil 46 mm" },
      { label: "Rotasjon", value: "360° justerbar" },
      { label: "Installasjon", value: "Verktøyfri hurtigmontering" },
      { label: "Polstring", value: "Full silikonbeskyttelse" },
      { label: "Grepssystem", value: "Antiskli-silikonputer + låseklemme" },
      { label: "Sikkerhetsfunksjon", value: "Låseklips for ekstra stabilitet" },
      { label: "Materiale", value: "Plast av høy kvalitet med silikonpolstring" }
    ],
    features: [
      "Passer de fleste telefoner fra 4,8\" til 7,0\"",
      "Bred styrekompatibilitet (opptil 46 mm)",
      "Antiskli-silikonputer for bedre grep",
      "Låseklemme som hindrer risting",
      "360° rotasjon for fleksibel visning",
      "Verktøyfri montering",
      "Full silikonpolstring for beskyttelse",
      "Sikkerhetslås-klips",
      "Robust og slitesterk konstruksjon"
    ],
    compatibility: ["All models"],
    inStock: true,
  },

  // 11. Water Bottle Holder (JOBOBIKE Logo)
  {
    id: "acc-bottle-holder-logo-001",
    slug: "water-bottle-holder-jobobike-logo",
    name: "Logo Flaskeholder",
    description: "Premium flaskeholder med JOBOBIKE-logo. Solid konstruksjon med sikkert grep for standard vannflasker.",
    fullDescription: "En premium flaskeholder med tydelig JOBOBIKE-logo. Laget av materialer av høy kvalitet med en slitesterk svart finish. Holderen gir sikkert grep rundt standard vannflasker, samtidig som den tilfører elsykkelen et gjennomført og eksklusivt uttrykk. Enkel å montere på rammen med medfølgende skruer.",
    originalPrice: 259,
    price: 155.4,
    discount: "40%",
    currency: "kr",
    image: "/images/bottle-logo/b.jpg",
    images: [
      "/images/bottle-logo/b.jpg",
    ],
    category: ["Tilbehør", "Hydrering", "Flaskeholdere"],
    specifications: [
      { label: "Materiale", value: "Plast-/komposittmateriale av høy kvalitet" },
      { label: "Flaskekompatibilitet", value: "Standardflasker på 500–750 ml" },
      { label: "Montering", value: "Rammefeste med bolter" },
      { label: "Merking", value: "JOBOBIKE-logo" },
      { label: "Vekt", value: "Ca. 70 g" },
      { label: "Monteringsutstyr", value: "Monteringsskruer inkludert" }
    ],
    features: [
      "Tydelig JOBOBIKE-logo",
      "Slitesterk svart finish",
      "Sikkert feste for flasken",
      "Passer standard 500–750 ml vannflasker",
      "Enkel montering på rammen",
      "Værbestandige materialer",
      "Stilrent og moderne design"
    ],
    compatibility: [
      "Transer",
      "Sam",
      "Henry",
      "Dyno",
      "Dyno GT",
      "Astra",
      "Luxe",
      "Lyon Pro"
    ],
    inStock: true,
  },

  // 12. Magnet Water Bottle Holder
  {
    id: "acc-bottle-holder-magnet-001",
    slug: "magnet-water-bottle-holder",
    name: "Magnetisk Flaskeholder",
    description: "Innovativ magnetisk flaskeholder for rask tilgang. Sterkt magnetfeste med enkel enhåndsbetjening.",
    fullDescription: "En revolusjonerende magnetisk flaskeholder som gjør det mulig å ta flasken raskt med én hånd mens du sykler. Kraftige magneter holder flasken sikkert på plass, men slipper den enkelt når du trenger den. Ideell for syklister som trenger hyppig tilgang til drikke uten å stoppe. Kompatibel med spesielle magnetiske vannflasker eller flasker med magnetadapter.",
    originalPrice: 459,
    price: 275.4,
    discount: "40%",
    currency: "kr",
    image: "/images/magnet-holder/magnet-holder.png.png",
    images: [
      "/images/magnet-holder/magnet-holder.png.png",
    ],
    category: ["Tilbehør", "Hydrering", "Flaskeholdere", "Magnetisk"],
    specifications: [
      { label: "Type", value: "Magnetisk festesystem" },
      { label: "Montering", value: "Rammefeste med bolter" },
      { label: "Magnetstyrke", value: "Kraftige neodym-magneter" },
      { label: "Flaskekompatibilitet", value: "Magnetiske flasker eller flasker med adapter" },
      { label: "Betjening", value: "Enhånds hurtigfrigjøring" },
      { label: "Vektkapasitet", value: "Opptil 1 kg" },
      { label: "Materiale", value: "Forsterket polymer med magneter" }
    ],
    features: [
      "Sterkt magnetisk grep",
      "Rask og enkel enhåndsbetjening",
      "Lett å ta flasken ut og sette den tilbake",
      "Kompatibel med magnetiske flasker og adaptere",
      "Stabil og sikker ramme-montering",
      "Værbestandig konstruksjon",
      "Reduserer distraksjoner under sykling",
      "Universell kompatibilitet"
    ],
    compatibility: ["All models"],
    inStock: true,
  },

  // 13. Single Side Pannier Bag
  {
    id: "acc-pannier-single-001",
    slug: "single-side-pannier-bag",
    name: "Ensidig Sykkelveske",
    description: "Vanntett enkel sideveske til bakre bagasjebrett. Perfekt til daglig pendling og handleposer.",
    fullDescription: "En allsidig, vanntett enkel sideveske som festes til det bakre bagasjebrettet. Vesken har reflekterende detaljer for økt synlighet og flere rom for organisert oppbevaring. Ideell for pendlere som ønsker moderat lastekapasitet uten å bruke doble sidevesker. Hurtigfeste-systemet gjør det enkelt å ta vesken av og på sykkelen.",
    originalPrice: 799,
    price: 479.4,
    discount: "40%",
    currency: "kr",
    image: "/images/pannier/pannier-1.png",
    images: [
      "/images/pannier/pannier-1.png",
      "/images/pannier/pannier-2.png",
      "/images/pannier/pannier-3.png",
    ],
    category: ["Vesker", "Sidevesker", "Oppbevaring", "Last"],
    specifications: [
      { label: "Kapasitet", value: "Ca. 15–20 liter" },
      { label: "Materiale", value: "Vanntett tekstil" },
      { label: "Montering", value: "Hurtigfeste-kroker til bagasjebrett" },
      { label: "Rom", value: "Hovedrom + flere mindre lommer" },
      { label: "Lukking", value: "Rulletopp eller glidelås (modellavhengig)" },
      { label: "Reflekselementer", value: "Reflekterende detaljer for bedre synlighet" },
      { label: "Bærehåndtak", value: "Integrert håndtak" },
      { label: "Skulderstropp", value: "Avtakbar/justerbar skulderstropp (avhengig av modell)" }
    ],
    features: [
      "Vanntett konstruksjon",
      "Hurtig av- og påmontering",
      "Reflekterende striper for økt sikkerhet",
      "Flere rom for organisert oppbevaring",
      "Integrert bærehåndtak",
      "Kompatibel med de fleste bakre bagasjebrett",
      "Solid og slitesterkt materiale",
      "Perfekt for daglig pendling og handleturer"
    ],
    compatibility: [
      "Transer",
      "Mover",
      "Romer",
      "Romer Pro",
      "Romer C",
      "Viva",
      "Viva ST",
      "Henry",
      "Lyon Pro",
      "Luxe",
      "Dyno",
      "Dyno GT",
      "Astra"
    ],
    inStock: true,
  },

  // 14. Double Side Pannier Bag
  {
    id: "acc-pannier-double-001",
    slug: "double-side-pannier-bag",
    name: "Dobbel Sykkelveske Sett",
    description: "Vanntett dobbelt sideveskesett med maksimal lastekapasitet. Ideell for turer, storhandel og tung last.",
    fullDescription: "Et komplett dobbelt sideveskesystem for deg som trenger mye lastekapasitet. Settet består av to romslige vesker som festes på hver sin side av det bakre bagasjebrettet, noe som gir balansert vektfordeling og maksimal lagringsplass. Vanntett konstruksjon med rulletopp-lukking, reflekterende detaljer og hurtigfeste gjør dette perfekt for langturer, storhandel eller transport av utstyr.",
    originalPrice: 1399,
    price: 839.4,
    discount: "40%",
    currency: "kr",
    image: "/images/double-bag/d.jpg",
    images: [
      "/images/double-bag/d.jpg",
      "/images/double-bag/d1.jpg",
    ],
    category: ["Vesker", "Sidevesker", "Oppbevaring", "Last", "Tursykling"],
    specifications: [
      { label: "Total kapasitet", value: "Ca. 40–50 liter (20–25 liter per side)" },
      { label: "Materiale", value: "Vanntett 600D polyester" },
      { label: "Montering", value: "Hurtigfeste-kroker til bagasjebrett" },
      { label: "Rom", value: "Flere lommer og rom på hver side" },
      { label: "Lukking", value: "Rulletopp med spenner" },
      { label: "Reflekselementer", value: "3M reflekterende striper" },
      { label: "Bærehåndtak", value: "Forsterkede håndtak på begge vesker" },
      { label: "Skulderstropper", value: "Avtakbare og justerbare" }
    ],
    features: [
      "Komplett sett med to vesker",
      "40–50 liters total lagringskapasitet",
      "Fullt vanntett konstruksjon",
      "Hurtig og enkel av- og påmontering",
      "Balansert vektfordeling på begge sider",
      "3M-reflekser for økt synlighet",
      "Forsterkede håndtak og stropper",
      "Flere rom og lommer for organisering",
      "Rulletopp-lukking som beskytter mot vann",
      "Perfekt for langturer, pendling og tung last"
    ],
    compatibility: [
      "Transer",
      "Mover",
      "Romer",
      "Romer Pro",
      "Romer C",
      "Viva",
      "Viva ST",
      "Henry",
      "Lyon Pro",
      "Luxe",
      "Dyno",
      "Dyno GT",
      "Astra"
    ],
    inStock: true,
  },

  // 15. Canopy
  {
    id: "acc-canopy-001",
    slug: "bike-canopy",
    name: "Værtak",
    description: "Værbeskyttende canopy til lastesykler. Skjermer både rytter og last mot regn, sol og vind.",
    fullDescription: "JOBOBIKE Canopy gir omfattende værbeskyttelse for fører og last på lastesykler. Den robuste konstruksjonen beskytter mot regn, sterk sol og vind, og gjør helårsbruk langt mer komfortabel. Canopyen har solid aluminiumsramme, vanntett duk, enkel montering og kan justeres i høyde og vinkel. Perfekt for bud- og leveringskjøring, transport av barn eller for deg som sykler mye i all slags vær.",
    originalPrice: 2999,
    price: 1799.4,
    discount: "40%",
    currency: "kr",
    image: "/images/canopy/c.jpg",
    images: [
      "/images/canopy/c.jpg",
      "/images/canopy/c1.jpg",
    ],
    category: ["Værbeskyttelse", "Last", "Tilbehør"],
    specifications: [
      { label: "Rammemateriale", value: "Aluminiumslegering" },
      { label: "Dukmateriale", value: "Vanntett PVC/polyester" },
      { label: "UV-beskyttelse", value: "UPF 50+" },
      { label: "Vanntetthet", value: "IPX5" },
      { label: "Mål", value: "Ca. 140 cm x 90 cm" },
      { label: "Montering", value: "Sykkelspesifikke braketter på ramme/plattform" },
      { label: "Justerbarhet", value: "Justerbar høyde og vinkel" },
      { label: "Vekt", value: "Ca. 3–4 kg" }
    ],
    features: [
      "Full værbeskyttelse for rytter og last",
      "UPF 50+ UV-beskyttelse",
      "Vanntett og vindtett duk",
      "Solid aluminiumsramme",
      "Justerbar høyde og vinkel",
      "Enkel montering og demontering",
      "Gjennomsiktig frontpanel for god sikt",
      "Kan delvis foldes sammen ved behov",
      "Komfort året rundt"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
  },

  // 16. Monkey Bar
  {
    id: "acc-monkey-bar-001",
    slug: "monkey-bar",
    name: "Barnestyre",
    description: "Fremre styrebøyle for barn som passasjer. Gir en trygg og komfortabel plassering for yngre passasjerer.",
    fullDescription: "JOBOBIKE Monkey Bar er en frontmontert styrebøyle som gjør det mulig å frakte et barn trygt på lastesykkelen. Barnet får et sikkert område å holde seg fast i, plassert foran føreren for maksimal kontroll og mulighet for kommunikasjon. Bøylen har polstrede håndtak, justerbar posisjon og solid konstruksjon for høy sikkerhet og komfort.",
    originalPrice: 2499,
    price: 1499.4,
    discount: "40%",
    currency: "kr",
    image: "/images/monkey-bar/m.jpg",
    images: [
      "/images/monkey-bar/m.jpg",
    ],
    category: ["Barnetransport", "Sikkerhet", "Last", "Tilbehør"],
    specifications: [
      { label: "Materiale", value: "Stålrør med polstring" },
      { label: "Overflate", value: "Pulverlakkert" },
      { label: "Grepmateriale", value: "Myk skumpolstring" },
      { label: "Montering", value: "Ramme-/plattform-klemfeste" },
      { label: "Vektkapasitet", value: "Barn opptil ca. 25 kg" },
      { label: "Justerbarhet", value: "Justerbar høyde og bredde" },
      { label: "Anbefalt alder", value: "Ca. 2–7 år" }
    ],
    features: [
      "Sikker frontmontert bøyle for barn",
      "Polstrede, myke håndtak",
      "Justerbar høyde og bredde",
      "Solid stålkonstruksjon",
      "Foreldre har barnet i synsfeltet hele tiden",
      "Enkel montering",
      "Øker komfort og trygghet for barnet",
      "Kompatibel med Captain Chair"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
  },

  // 17. Captain Chair
  {
    id: "acc-captain-chair-001",
    slug: "captain-chair",
    name: "Kaptein Stol",
    description: "Premium barnesete med full ryggstøtte og sikkerhetssele. Gir trygg og komfortabel sitteplass for unge passasjerer.",
    fullDescription: "JOBOBIKE Captain Chair er en premium sitteplass for barn på lastesykkel. Setet har høy ryggstøtte, myk polstring, integrert sikkerhetssele og fotstøtter for trygg og behagelig transport. Det er designet for å fungere sammen med Monkey Bar for maksimal sikkerhet og komfort. Materialene er slitesterke og værbestandige for langvarig bruk.",
    originalPrice: 2799,
    price: 1679.4,
    discount: "40%",
    currency: "kr",
    image: "/images/chair/ch.jpg",
    images: [
      "/images/chair/ch.jpg",
    ],
    category: ["Barnetransport", "Sitteplass", "Sikkerhet", "Last"],
    specifications: [
      { label: "Materiale", value: "Skum med høy tetthet og vanntett trekk" },
      { label: "Ryggstøtte", value: "Full, ergonomisk ryggstøtte" },
      { label: "Sikkerhetssele", value: "Integrert 5-punkts sele" },
      { label: "Fotstøtter", value: "Justerbare fotstøtter inkludert" },
      { label: "Vektkapasitet", value: "Ca. 25–30 kg" },
      { label: "Anbefalt alder", value: "Ca. 1–7 år" },
      { label: "Montering", value: "Montering på lasteplattform" },
      { label: "Polstring", value: "Værbestandig og komfortabel pute" }
    ],
    features: [
      "Full ryggstøtte for ekstra komfort",
      "Integrert 5-punkts sikkerhetssele",
      "Tykk og behagelig skumpolstring",
      "Vanntett og værbestandig materiale",
      "Justerbare fotstøtter",
      "Designet for bruk sammen med Monkey Bar",
      "Enkel montering på plattform",
      "Robust og holdbar konstruksjon",
      "Avtakbar pute for enklere rengjøring"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
  },

  // 18. Armrest
  {
    id: "acc-armrest-001",
    slug: "armrest",
    name: "Armlene",
    description: "Komfortable armlener til lasteområdet. Gir ekstra støtte og trygghet for passasjerer.",
    fullDescription: "JOBOBIKE Armrest-settet gir ekstra komfort og sikkerhet for passasjerer på lasteområdet. De polstrede armlenene monteres på sidene av lasteplattformen og gir passasjerene noe å hvile armene på og holde i under turen. Spesielt nyttig når man frakter voksne eller større barn, eller ved lengre turer.",
    originalPrice: 699,
    price: 419.4,
    discount: "40%",
    currency: "kr",
    image: "/images/arm/a1.jpg",
    images: [
      "/images/arm/a1.jpg",
      "/images/arm/a2.jpg",
    ],
    category: ["Komfort", "Last", "Tilbehør", "Sitteplass"],
    specifications: [
      { label: "Materiale", value: "Skumpolstring med vinyltrekk" },
      { label: "Montering", value: "Klem- eller boltmontering på plattform" },
      { label: "Antall", value: "Selges som par (venstre og høyre)" },
      { label: "Justerbarhet", value: "Høydejusterbare" },
      { label: "Polstring", value: "Værbestandig skum" },
      { label: "Trekk", value: "Vanntett vinyl" }
    ],
    features: [
      "Selges som par (venstre og høyre armstøtte)",
      "Myk og komfortabel polstring",
      "Værbestandig og lett å tørke av",
      "Høydejusterbare fester",
      "Gir ekstra trygghet for passasjerer",
      "Enkle å montere",
      "Øker komforten på lengre turer",
      "Laget av slitesterke materialer"
    ],
    compatibility: ["Transer"],
    inStock: false,
  },

  // 19. Safety Belt
  {
    id: "acc-safety-belt-001",
    slug: "safety-belt",
    name: "Sikkerhetsbelte",
    description: "Justerbar sikkerhetsstropp til å sikre last eller passasjerer på bakre bagasjebrett. Et viktig sikkerhetstilbehør.",
    fullDescription: "JOBOBIKE Safety Belt er et viktig sikkerhetstilbehør for å sikre bagasje eller ekstra utstyr på bagasjebrettet. Stroppen har justerbar lengde, hurtigspenne og slitesterk rem som tåler utendørs bruk. Egner seg godt til å feste vesker, esker eller som ekstra sikring ved bruk av seter eller puter på bagasjebrettet.",
    originalPrice: 249,
    price: 149.4,
    discount: "40%",
    currency: "kr",
    image: "/images/belt/bel.jpg",
    images: [
      "/images/belt/bel.jpg",
    ],
    category: ["Sikkerhet", "Last", "Tilbehør"],
    specifications: [
      { label: "Materiale", value: "Nylonrem i kraftig kvalitet" },
      { label: "Spennetype", value: "Hurtigutløsende plastspenne" },
      { label: "Lengde", value: "Justerbar, opptil ca. 150 cm" },
      { label: "Bredde", value: "Ca. 25–38 mm" },
      { label: "Vektkapasitet", value: "Egnet for lett til middels last" },
      { label: "Værbestandighet", value: "Motstandsdyktig mot vann og UV-stråling" }
    ],
    features: [
      "Solid nylonkonstruksjon",
      "Hurtigspenne gjør den enkel å bruke",
      "Justerbar lengde for fleksibel bruk",
      "Vann- og UV-bestandig",
      "Sikrer last eller passasjerutstyr",
      "Kompatibel med alle standard bagasjebrett",
      "Lett og enkel å ta med",
      "Viktig ekstra sikkerhetstilbehør"
    ],
    compatibility: [
      "Transer",
      "Mover",
      "Romer",
      "Romer Pro",
      "Romer C",
      "Viva",
      "Viva ST",
      "Henry",
      "Lyon Pro",
      "Luxe",
      "Dyno",
      "Dyno GT",
      "Astra"
    ],
    inStock: true,
  },

  // 20. Cushion
  {
    id: "acc-cushion-001",
    slug: "rear-rack-cushion",
    name: "Bagasjebrett Pute",
    description: "Komfortabel pute til bakre bagasjebrett for passasjerer. Vanntett og polstret for ekstra komfort.",
    fullDescription: "Gjør det bakre bagasjebrettet om til en komfortabel sitteplass med JOBOBIKE Rear Rack Cushion. Denne polstrede puten har vanntett trekk, antisklibunn og justerbare festestropper. Perfekt for å gi venner eller familie en ekstra sitteplass, eller for å gjøre lasteområdet mer behagelig. Puten er værbestandig og enkel å rengjøre.",
    originalPrice: 449,
    price: 269.4,
    discount: "40%",
    currency: "kr",
    image: "/images/cushion/cs.jpg",
    images: [
      "/images/cushion/cs.jpg",
    ],
    category: ["Komfort", "Sitteplass", "Tilbehør"],
    specifications: [
      { label: "Materiale", value: "Skum med høy tetthet og vanntett trekk" },
      { label: "Mål", value: "Ca. 35 cm x 25 cm x 5 cm" },
      { label: "Trekk", value: "Vanntett vinyl/PU-lær" },
      { label: "Underside", value: "Antiskli-struktur" },
      { label: "Feste", value: "Justerbare stropper" },
      { label: "Vektkapasitet", value: "Egnet for voksne opptil ca. 100 kg" },
      { label: "Værbestandighet", value: "Vanntett og UV-bestandig" }
    ],
    features: [
      "Tykk skumpolstring for høy komfort",
      "Vanntett og værbestandig overflate",
      "Antisklibunn som hindrer at puten sklir",
      "Justerbare festestropper",
      "Enkel å montere og ta av",
      "Lett å rengjøre med en fuktig klut",
      "Gjør bagasjebrettet egnet som passasjersete",
      "Robust og slitesterk konstruksjon"
    ],
    compatibility: ["All models with rear rack"],
    inStock: false,
  },

{
    id: "jobobike-cover-bag-sam",
    slug: "jobobike-cover-bag-for-sam",
    name: "Sammenleggbar Sykkel Deksel Bag",
    description: "Vanntett dekkpose som beskytter sykkelen mot støv, vann og riper. Passer til JOBOBIKE Sam.",
    fullDescription: "Beskytt din JOBOBIKE Sam med denne vanntette dekkposen designet spesielt for sammenleggbare elsykler. Perfekt for oppbevaring av den sammenleggede sykkelen når du trenger å ta den med inn på kontoret eller oppbevare den trygt. Denne slitesterke posen beskytter elsykkelen mot støv, vann og riper under transport eller lagring. Enten du pendler til jobb, reiser eller bare oppbevarer sykkelen hjemme, holder denne posen Sam-en i perfekt stand. Ideell for å holde den sammenleggede sykkelen beskyttet i bilens bagasjerom eller når du bærer den innendørs.",
    price: 65.00,
    currency: "€",
    image: "/images/bikebag/bag-1.jpg",
    images: [
      "/images/bikebag/bag-1.jpg",
      "/images/bikebag/bag-2.jpg",
    ],
    category: ["Tilbehør", "Vesker & Oppbevaring"],
    specifications: [
      { label: "Kompatibilitet", value: "JOBOBIKE Sam" },
      { label: "Materiale", value: "Vanntett stoff" },
      { label: "Beskyttelse", value: "Støv, vann og ripebeskyttelse" },
      { label: "Type", value: "Sammenleggbar sykkel dekkpose" }
    ],
    colors: ["Svart"],
    colorImages: {
      "Svart": "/images/accessories/cover-bag-sam-1.jpg"
    },
    colorStock: {
      "Svart": true
    },
    features: [
      "Vanntett beskyttelse",
      "Designet spesielt for JOBOBIKE Sam",
      "Beskytter mot støv, vann og riper",
      "Enkel å bruke og oppbevare",
      "Slitesterk konstruksjon",
      "Perfekt for transport og lagring"
    ],
    compatibility: ["JOBOBIKE Sam"],
    inStock: true
},

  // 21. Loading-Bearing Plate
  {
    id: "acc-loading-plate-001",
    slug: "loading-bearing-plate",
    name: "Lastebærende Plate",
    description: "Ekstra solid lasteplate til lastesykler. Øker lastekapasiteten og gir en flat, stabil lasteflate.",
    fullDescription: "JOBOBIKE Loading-Bearing Plate er en kraftig lasteplate utviklet for krevende transportoppgaver. Den forsterkede platen monteres på lasteplattformen og gir en stabil, flat overflate til større kolli, esker eller utstyr. Den er laget av robuste materialer som tåler høy vekt, og er ideell for bud- og leveringskjøring, profesjonell bruk eller når du trenger maksimal lastekapasitet.",
    originalPrice: 1199,
    price: 719.4,
    discount: "40%",
    currency: "kr",
    image: "/images/plate/p.jpg",
    images: [
      "/images/plate/p.jpg",
    ],
    category: ["Last", "Tilbehør", "Tung last"],
    specifications: [
      { label: "Materiale", value: "Forsterket stål eller aluminium" },
      { label: "Tilpassede mål", value: "Tilpasset plattform for Transer/Mover" },
      { label: "Lastekapasitet", value: "Opptil 100 kg" },
      { label: "Overflate", value: "Antiskli-struktur" },
      { label: "Montering", value: "Boltmontert på lasteplattform" },
      { label: "Overflatebehandling", value: "Pulverlakkert for værbestandighet" },
      { label: "Tykkelse", value: "Ca. 3–5 mm" }
    ],
    features: [
      "Kraftig og forsterket konstruksjon",
      "Flat og stabil lasteflate",
      "Antiskli-overflate som holder lasten på plass",
      "Værbestandig pulverlakk",
      "Boltmontering for sikker festing",
      "Kompatibel med annet laste- og setetilbehør",
      "Ideell for profesjonell bruk og leveranser",
      "Øker lastekapasiteten betydelig"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
  }
];

// Helper function to get product by slug
export const getAccessoryBySlug = (slug: string): AccessoryProduct | undefined => {
  return accessoriesProducts.find(product => product.slug === slug);
};

// Helper function to get products by category (matches any of the provided categories)
export const getAccessoriesByCategory = (categories: string[]): AccessoryProduct[] => {
  return accessoriesProducts.filter(product =>
    product.category.some(cat => categories.includes(cat))
  );
};
