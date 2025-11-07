// lib/accessoriesProducts.ts

export interface AccessoryProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
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
}

export const accessoriesProducts: AccessoryProduct[] = [
  {
    id: "1",
    slug: "jobobike-front-rack",
    name: "JOBOBIKE Front Bagasjebrett",
    description: "Lettvekts aluminium front bagasjebrett med holdbar matt svart pulverlakkering, rustfritt og perfekt for alle værforhold.",
    fullDescription: "JOBOBIKE front bagasjebrett er laget av lettvekts aluminium med holdbar, matt svart pulverlakkering. Det er rustfritt, noe som gjør det perfekt for alle værforhold. Uansett om du reiser i røft terreng eller i byen - JOBOBIKE bagasjebrettet er garantert ikke å falle ned ved plutselig svinging eller hard bremsing.",
    price: 773,
    currency: "kr",
    image: "/images/front-rack/front-1.png",
    images: [
      "/images/front-rack/front-1.png",
      "/images/front-rack/front-2.png",
     
     
    ],
    category: ["Bagasjebrett & Bærere"],
    specifications: [
      { label: "Materiale", value: "Aluminium Legering" },
      { label: "Finish", value: "Matt Svart Pulverlakkering" },
      { label: "Vektkapasitet", value: "15kg" },
      { label: "Montering", value: "Front Gaffel Montering" }
    ],
    features: [
      "Rustfri konstruksjon",
      "Lettvekts aluminium design",
      "Holdbar matt svart finish",
      "Sikkert monteringssystem",
      "All-vær ytelse"
    ],
    compatibility: [
      "JOBOBIKE Robin",
      "JOBOBIKE Robin ST",
      "JOBOBIKE Transer",
      "JOBOBIKE Commuter",
      "JOBOBIKE Linda",
      "JOBOBIKE Lyon",
      "JOBOBIKE Eddy",
      "JOBOBIKE Eddy X"
    ],
    inStock: true
  },
  {
    id: "2",
    slug: "jobobike-basket-with-wooden",
    name: "JOBOBIKE Kurv med Tre Håndtak",
    description: "Stilig integrert kurv med tre håndtak, perfekt for å bære dagligvarer og personlige gjenstander på el-sykkelen din.",
    fullDescription: "JOBOBIKE kurven med tre håndtak kombinerer funksjonalitet med elegant design. Laget av holdbare materialer med et vakkert tre håndtak aksent, kan den monteres på både front og bak bagasjebrett. Den integrerte designen sikrer rask og enkel installasjon uten ekstra maskinvare.",
    price: 773,
    currency: "kr",
    image: "/images/basket/basket-1.png",
    images: [
      "/images/basket/basket-1.png",
      "/images/basket/basket-2.png",
     
    ],
    category: ["Kurver & Oppbevaring"],
    specifications: [
      { label: "Materiale", value: "Aluminium Legering med Tre Håndtak" },
      { label: "Finish", value: "Matt Svart" },
      { label: "Kapasitet", value: "20L" },
      { label: "Montering", value: "Front/Bak Bagasjebrett Kompatibel" }
    ],
    features: [
      "Elegant tre håndtak",
      "Integrert monteringssystem",
      "Rask installasjon",
      "Værbestandig",
      "Romslig 20L kapasitet"
    ],
    compatibility: [
      "JOBOBIKE Robin",
      "JOBOBIKE Transer",
      "JOBOBIKE Commuter",
      "JOBOBIKE Linda",
      "JOBOBIKE Lyon",
      "JOBOBIKE Eddy",
      "JOBOBIKE Sam"
    ],
    inStock: true
  },
  {
    id: "3",
    slug: "jobobike-cover-bag-sam",
    name: "JOBOBIKE Deksel Veske for Sam",
    description: "Vanntett deksel veske som beskytter din sammenleggbare sykkel mot støv, vann og skraper. Spesielt designet for JOBOBIKE Sam.",
    fullDescription: "Denne vanntette deksel vesken er spesielt designet for å beskytte din JOBOBIKE Sam sammenleggbare sykkel mot støv, vann og skraper. Det holdbare materialet sikrer langvarig beskyttelse, mens den kompakte designen gjør det enkelt å oppbevare og transportere sykkelen din. Perfekt for reise og oppbevaring.",
    price: 3091,
    currency: "kr",
    image: "/images/Thermal/thermal-bag-1.png",
    images: [
      "/images/Thermal/thermal-bag-1.png",
      "/images/Thermal/thermal-bag-2.png",
      "/images/Thermal/thermal-bag-3.png",
     
    ],
    category: ["Beskyttelse & Oppbevaring"],
    specifications: [
      { label: "Materiale", value: "600D Oxford Stoff" },
      { label: "Vannmotstand", value: "IPX4" },
      { label: "Størrelse", value: "85cm x 43cm x 72cm" },
      { label: "Vekt", value: "1.2kg" }
    ],
    features: [
      "Vanntett beskyttelse",
      "Støv og ripebestandig",
      "Forsterket bærehåndtak",
      "Kompakt oppbevaring",
      "Lett å rengjøre"
    ],
    compatibility: ["JOBOBIKE Sam"],
    inStock: true
  },
  {
    id: "4",
    slug: "jobobike-lock",
    name: "JOBOBIKE Lås",
    description: "Robust sykkel lås som gir maksimal sikkerhet for el-sykkelen din med tyverisikring og værbestandig konstruksjon.",
    fullDescription: "JOBOBIKE Låsen tilbyr premium sikkerhet for din elektriske sykkel. Med herdet stål konstruksjon med anti-dirk og anti-bor beskyttelse, sikrer denne låsen at sykkelen din forblir trygg. Den værbestandige designen fungerer i alle forhold, og den kompakte størrelsen gjør den lett å bære.",
    price: 773,
    currency: "kr",
    image : "/images/lock/lock-1.png",
    images: [
      "/images/lock/lock-1.png",
      "/images/lock/lock-2.png",
      
    ],
    category: ["Sikkerhet"],
    specifications: [
      { label: "Materiale", value: "Herdet Stål" },
      { label: "Sikkerhetsnivå", value: "Nivå 9" },
      { label: "Lengde", value: "120cm" },
      { label: "Diameter", value: "12mm" }
    ],
    features: [
      "Herdet stål konstruksjon",
      "Anti-dirk sylinder",
      "Anti-bor beskyttelse",
      "Værbestandig belegg",
      "Inkluderer 3 nøkler"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "5",
    slug: "jobobike-phone-holder-waterproof",
    name: "JOBOBIKE Telefon Holder (Vanntett Deksel)",
    description: "Sikker telefon holder med vanntett deksel, lar deg bruke telefonen til navigasjon mens den beskyttes mot elementene.",
    fullDescription: "Hold telefonen din tilgjengelig og beskyttet med JOBOBIKE Telefon Holder. Det vanntette dekselet tillater full berøringsskjerm funksjonalitet mens det beskytter mot regn og støv. Det sikre monteringssystemet sikrer at telefonen din forblir på plass selv i røft terreng, noe som gjør den perfekt for GPS navigasjon.",
    price: 2178,
    currency: "kr",
    image: "/images/holder/holder-2.png",
    images: [
      "/images/holder/holder-2.png",
      "/images/holder/holder-1.png",
      "/images/holder/holder-3.png",
      
    ],
    category: ["Elektronikk & Holdere"],
    specifications: [
      { label: "Kompatibilitet", value: "Telefoner opptil 6.7 tommer" },
      { label: "Vannmotstand", value: "IPX6" },
      { label: "Montering", value: "Styrefeste" },
      { label: "Rotasjon", value: "360°" }
    ],
    colors: ["Svart", "Blå", "Rød"],
    colorImages: {
      "Rød": "/images/holder/holder-1.png",
      "Svart": "/images/holder/holder-2.png",
      "Blå": "/images/holder/holder-3.png"
    },
    features: [
      "Vanntett berøringsskjerm deksel",
      "360° rotasjon",
      "Sikker låsemekanisme",
      "Hurtig utløsningssystem",
      "Universal telefon kompatibilitet"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "6",
    slug: "jobobike-bicycle-mirror",
    name: "JOBOBIKE Sykkel Speil",
    description: "Høykvalitets bakspeil som gir utmerket sikt og sikkerhet mens du kjører el-sykkelen din.",
    fullDescription: "JOBOBIKE Sykkel Speilet forbedrer kjøresikkerheten din med et bredt synsfelt og splintfritt glass. Den justerbare armen lar deg finne den perfekte visningsvinkelen, mens det robuste monteringssystemet holder det sikkert selv på humpete veier. Den elegante designen kompletterer sykkelens estetikk.",
    price: 1019,
    currency: "kr",
    image:"/images/mirror/mirror-1.png",
    images: [
      "/images/mirror/mirror-1.png",
      "/images/mirror/mirror-2.png",
      
    ],
    category: ["Sikkerhet & Synlighet"],
    specifications: [
      { label: "Speil Størrelse", value: "80mm diameter" },
      { label: "Materiale", value: "Splintfritt Glass" },
      { label: "Montering", value: "Styrefeste" },
      { label: "Justering", value: "Multi-vinkel" }
    ],
    features: [
      "Splintfritt speil glass",
      "Bred visningsvinkel",
      "Justerbar posisjonering",
      "Robust monteringsbrakkett",
      "Enkel installasjon"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "7",
    slug: "jobobike-helmet",
    name: "JOBOBIKE Sykkel Hjelm",
    description: "CE EN 1078 og CPSC sertifisert sikkerhetshjelm med støtbestandig konstruksjon og optimal ventilasjon for komfortabel kjøring.",
    fullDescription: "JOBOBIKE sykkel hjelmen ble testet for sikkerhet av CE EN 1078 i Europa og CPSC i USA. Støtbestandig PC materiale på utsiden og en støtabsorberende EPS unibody på innsiden gir maksimal beskyttelse. Hjelmen har optimal ventilasjon, justerbart tilpasningssystem og avtakbar polstring for komfort under lange turer.",
    price: 1757,
    currency: "kr",
    image:"/images/helmet/helmet-1.png",
    images: [
      "/images/helmet/helmet-1.png",
      "/images/helmet/helmet-2.png",
      
    ],
    category: ["Sikkerhet & Synlighet"],
    specifications: [
      { label: "Sertifisering", value: "CE EN 1078, CPSC" },
      { label: "Materiale", value: "PC Skall + EPS Skum" },
      { label: "Vekt", value: "280g" },
      { label: "Ventilasjon", value: "18 Luftventiler" }
    ],
    features: [
      "Dobbel sikkerhetssertifisering",
      "Støtbestandig konstruksjon",
      "Optimalt ventilasjonssystem",
      "Justerbar tilpasningshjul",
      "Avtakbar polstring",
      "Reflekterende elementer"
    ],
    compatibility: ["Universal"],
    inStock: true,
    sizes: ["S (52-56cm)", "M (56-60cm)", "L (60-64cm)"],
    colors: ["Svart", "Blå" ],
    colorImages: {
      "Svart": "/images/helmet/helmet-1.png",
      "Blå": "/images/helmet/helmet-2.png"
    }
  },
  {
    id: "8",
    slug: "jobobike-bottle-holder",
    name: "JOBOBIKE Flaskeholder",
    description: "Holdbar aluminium flaskeholder som sikkert holder vannflasken din under turer, lett å installere og kompatibel med de fleste flasker.",
    fullDescription: "Hold deg hydrert på turene dine med JOBOBIKE Flaskeholder. Laget av lettvekts aluminium med sikker grep design, holder den flasker fast på plass selv i røft terreng. Det universelle monteringssystemet passer alle JOBOBIKE rammer, og den elegante designen matcher sykkelens estetikk.",
    price: 457,
    currency: "kr",
    image:"/images/bottle/bottle-1.png",
    images: [
      "/images/bottle/bottle-1.png",
      "/images/bottle/bottle-2.png",
     
    ],
    category: ["Tilbehør"],
    specifications: [
      { label: "Materiale", value: "Aluminium Legering" },
      { label: "Finish", value: "Matt Svart" },
      { label: "Flaskekapasitet", value: "500-750ml" },
      { label: "Montering", value: "Rammemontering" }
    ],
    features: [
      "Lettvekts aluminium konstruksjon",
      "Sikker grep design",
      "Universal flaskekompatibilitet",
      "Enkel installasjon",
      "Elegant utseende"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
 


  // 3. Integrated Front Basket
  {
    id: "acc-integrated-basket-001",
    slug: "integrated-front-basket",
    name: "JOBOBIKE Integrert Front Kurv",
    description: "Integrert kurv spesielt designet for el-sykler. Monteres direkte på front eller bak bagasjebrett uten ekstra maskinvare. Rask og enkel installasjon.",
    fullDescription: "Integrert kurv, spesielt designet for el-sykler. Den kan monteres direkte på front eller bak bagasjebrett på el-sykkelen uten behov for ekstra front bagasjebrett. Installasjonen er rask og enkel. Kurven er laget av aluminium legering og har holdbar matt svart pulverlakkering for utmerket rustmotstand. Dette gjør den egnet for alle værforhold og sikrer lang levetid. Kurvens design kombinerer moderne urban stil med naturlige tre elementer.",
    price: 2986,
    currency: "kr",
    image: "/images/Integrated-basket/bak.jpg",
    images: [
     "/images/Integrated-basket/bak.jpg",
      "/images/Integrated-basket/bak1.jpg",
    ],
    category: ["Kurver", "Oppbevaring", "Last"],
    specifications: [
      { label: "Material", value: "Aluminum alloy with wood accents" },
      { label: "Finish", value: "Matte black powder coating" },
      { label: "Base Dimensions", value: "30 x 19.5 cm" },
      { label: "Top Dimensions", value: "36.5 x 26.5 cm" },
      { label: "Height", value: "14 cm" },
      { label: "Load Capacity", value: "25 kg" },
      { label: "Mounting", value: "Direct rack mount (no additional rack needed)" },
      { label: "Installation", value: "Tool-free quick install" }
    ],
    features: [
      "No additional front rack required - mounts directly",
      "Quick and easy tool-free installation",
      "Aluminum alloy with durable powder coating",
      "Rustproof for all weather conditions",
      "Natural wood elements for aesthetic appeal",
      "Secure mounting - won't come loose during turns or braking",
      "25 kg load capacity",
      "Spacious interior for everyday items"
    ],
    compatibility: [
      "Romer",
      "Romer Pro",
      "Linda",
      "Eddy X",
      "Viva",
      "Henry",
      "Commuter",
      "Transer"
    ],
    inStock: true,
    colors: ["Svart"]
  },

 
  // 7. Phone Holder (Shockproof)
  {
    id: "acc-phone-holder-shockproof-001",
    slug: "phone-holder-shockproof",
    name: "JOBOBIKE Støtsikker Telefon Holder",
    description: "Universal støtsikker telefon holder med anti-skli silikon puter og 360° rotasjon. Verktøyfri installasjon, passer telefoner 4.8\"-7.0\".",
    fullDescription: "Sikre telefonen din på hver tur med denne støtsikre, universelle el-sykkel telefon holderen. Bygget for å håndtere røffe veier og daglige pendlerturer, har den en anti-skli klemme, 360° justerbar visning, og et hurtig-installasjonssystem – ingen verktøy nødvendig. Kompatibel med telefoner 132–182mm lange (ca 4.8\" til 7.0\") og monteres på styre opptil 46mm i diameter. Full silikon polstring beskytter telefonen din mot riper og støt, mens sikkerhetslås klemmen forbedrer grep og stabilitet under turer.",
    price: 1546,
    currency: "kr",
    image: "/images/holder-shock/h.jpg",
    images: [
     "/images/holder-shock/h.jpg",
     "/images/holder-shock/h1.jpg",
    ],
    category: ["Telefon Holdere", "Tilbehør", "Navigasjon"],
    specifications: [
      { label: "Phone Size", value: "132-182mm (4.8\"-7.0\")" },
      { label: "Handlebar Diameter", value: "Up to 46mm" },
      { label: "Rotation", value: "360° adjustable" },
      { label: "Installation", value: "Tool-free quick install" },
      { label: "Padding", value: "Full silicone protection" },
      { label: "Grip System", value: "Anti-slip silicone pads + locking clamp" },
      { label: "Safety Feature", value: "Lock clip for enhanced stability" },
      { label: "Material", value: "High-grade plastic with silicone padding" }
    ],
    features: [
      "Fits most phones 4.8\" to 7.0\"",
      "Wide handlebar compatibility (up to 46mm)",
      "Anti-slip silicone pads prevent phone movement",
      "Locking clamp prevents shaking on rough terrain",
      "360° rotation for optimal viewing angle",
      "Tool-free installation - quick and easy setup",
      "Full silicone padding protects from scratches and shocks",
      "Safety lock clip for enhanced stability",
      "Durable construction for daily use"
    ],
    compatibility: ["All models"],
    inStock: true,
    colors: ["Svart"]
  },

  

  // 11. Water Bottle Holder (JOBOBIKE Logo)
  {
    id: "acc-bottle-holder-logo-001",
    slug: "water-bottle-holder-jobobike-logo",
    name: "JOBOBIKE Logo Water Bottle Holder",
    description: "Premium water bottle holder with JOBOBIKE branding. Durable construction with secure grip for standard bottles.",
    fullDescription: "Premium water bottle holder featuring the JOBOBIKE logo. Made from high-quality materials with a durable black finish. Provides secure retention for standard water bottles while adding a branded touch to your e-bike. Easy installation with included mounting hardware.",
    price: 667,
    currency: "kr",
    image: "/images/bottle-logo/b.jpg",
    images: [
      "/images/bottle-logo/b.jpg",
    ],
    category: ["Accessories", "Hydration", "Bottle Holders"],
    specifications: [
      { label: "Material", value: "High-grade plastic/composite" },
      { label: "Bottle Compatibility", value: "Standard 500-750ml bottles" },
      { label: "Mounting", value: "Frame bolt-on" },
      { label: "Branding", value: "JOBOBIKE logo" },
      { label: "Weight", value: "~70g" },
      { label: "Hardware", value: "Mounting screws included" }
    ],
    features: [
      "Features JOBOBIKE branding",
      "Durable black finish",
      "Secure bottle retention mechanism",
      "Fits standard 500-750ml water bottles",
      "Easy frame mounting",
      "Weather-resistant materials",
      "Stylish branded design"
    ],
    compatibility: [
      "Transer",
      "Linda",
      "Sam",
      "Commuter",
      "Henry",
      "Dyno",
      "Dyno GT",
      "Astra",
      "Luxe",
      "Lyon Pro"
    ],
    inStock: true,
    colors: ["Svart"]
  },

  // 12. Magnet Water Bottle Holder
  {
    id: "acc-bottle-holder-magnet-001",
    slug: "magnet-water-bottle-holder",
    name: "Magnetic Water Bottle Holder",
    description: "Innovative magnetic water bottle holder for quick access. Strong magnetic grip with easy one-hand operation.",
    fullDescription: "Revolutionary magnetic water bottle holder that allows quick, one-handed access to your water bottle while riding. Features powerful magnets that securely hold your bottle in place, yet release easily when needed. Perfect for riders who need frequent hydration without stopping. Compatible with special magnetic water bottles or magnetic bottle adapters.",
    price: 1264,
    currency: "kr",
    image: "/images/magnet-holder/magnet-holder.png.png",
    images: [
     "/images/magnet-holder/magnet-holder.png.png",
    ],
    category: ["Accessories", "Hydration", "Bottle Holders", "Magnetic"],
    specifications: [
      { label: "Type", value: "Magnetic mounting system" },
      { label: "Mounting", value: "Frame bolt-on" },
      { label: "Magnetic Strength", value: "High-power neodymium magnets" },
      { label: "Bottle Compatibility", value: "Magnetic bottles or with adapter" },
      { label: "Operation", value: "One-hand quick release" },
      { label: "Weight Capacity", value: "Up to 1kg" },
      { label: "Material", value: "Reinforced polymer with magnets" }
    ],
    features: [
      "Powerful magnetic grip holds bottle securely",
      "One-handed quick access while riding",
      "Easy to grab and replace without looking",
      "Compatible with magnetic water bottles",
      "Sturdy frame mounting",
      "Weather-resistant construction",
      "Reduces distraction while maintaining hydration",
      "Universal compatibility with all models"
    ],
    compatibility: ["All models"],
    inStock: true,
    colors: ["Svart", "Gr�"]
  },

  // 13. Single Side Pannier Bag
  {
    id: "acc-pannier-single-001",
    slug: "single-side-pannier-bag",
    name: "Single Side Pannier Bag",
    description: "Waterproof single-side pannier bag for rear rack. Perfect for daily commuting and grocery shopping.",
    fullDescription: "Versatile single-side pannier bag designed to attach to your rear rack. Features waterproof construction, reflective strips for safety, and multiple compartments for organized storage. Ideal for commuters who need moderate cargo capacity without the bulk of double panniers. Quick-release mounting system allows easy attachment and removal.",
    price: 2319,
    currency: "kr",
    image:"/images/pannier/pannier-1.png",
    images: [
      "/images/pannier/pannier-1.png",
      "/images/pannier/pannier-2.png",
      "/images/pannier/pannier-3.png",
    ],
    category: ["Bags", "Panniers", "Storage", "Cargo"],
    specifications: [
      { label: "Capacity", value: "~15-20L" },
      { label: "Material", value: "Waterproof fabric" },
      { label: "Mounting", value: "Quick-release rack hooks" },
      { label: "Compartments", value: "Main compartment + pockets" },
      { label: "Closure", value: "Roll-top or zipper" },
      { label: "Reflective Elements", value: "Yes" },
      { label: "Carry Handle", value: "Integrated" },
      { label: "Shoulder Strap", value: "Optional/removable" }
    ],
    features: [
      "Waterproof construction protects contents",
      "Quick-release mounting for easy on/off",
      "Reflective strips enhance visibility",
      "Multiple compartments for organization",
      "Integrated carry handle",
      "Compatible with all rear racks",
      "Durable, tear-resistant material",
      "Perfect for daily commuting"
    ],
    compatibility: ["All models with rear rack"],
    inStock: true,
    colors: ["Bl�"]
  },

  // 14. Double Side Pannier Bag
  {
    id: "acc-pannier-double-001",
    slug: "double-side-pannier-bag",
    name: "Double Side Pannier Bag Set",
    description: "Waterproof double pannier bag set for maximum cargo capacity. Ideal for touring, shopping, and heavy loads.",
    fullDescription: "Complete double-sided pannier bag system for serious cargo needs. Features two spacious bags that attach to both sides of your rear rack, providing balanced weight distribution and maximum storage capacity. Waterproof construction with roll-top closures, reflective safety elements, and quick-release mounting. Perfect for bike touring, large shopping trips, or transporting equipment.",
    price: 4180,
    currency: "kr",
    image: "/images/double-bag/d.jpg",
    images: [
     "/images/double-bag/d.jpg",
     "/images/double-bag/d1.jpg",
    ],
    category: ["Bags", "Panniers", "Storage", "Cargo", "Touring"],
    specifications: [
      { label: "Total Capacity", value: "~40-50L (20-25L per side)" },
      { label: "Material", value: "Waterproof 600D polyester" },
      { label: "Mounting", value: "Quick-release rack hooks" },
      { label: "Compartments", value: "Multiple pockets each side" },
      { label: "Closure", value: "Roll-top + buckle closure" },
      { label: "Reflective Elements", value: "3M reflective strips" },
      { label: "Carry Handles", value: "Reinforced handles on both bags" },
      { label: "Shoulder Straps", value: "Removable and adjustable" }
    ],
    features: [
      "Complete set - two bags for both sides",
      "40-50L total storage capacity",
      "Fully waterproof with sealed seams",
      "Quick-release mounting system",
      "Balanced weight distribution",
      "3M reflective strips for night visibility",
      "Reinforced carry handles and shoulder straps",
      "Multiple compartments and pockets",
      "Roll-top closure with secure buckles",
      "Ideal for touring and heavy cargo"
    ],
    compatibility: ["All models with rear rack"],
    inStock: true,
    colors: ["Svart"]
  },

  // 15. Canopy
  {
    id: "acc-canopy-001",
    slug: "bike-canopy",
    name: "JOBOBIKE Canopy",
    description: "Weather protection canopy for cargo bikes. Shields rider and cargo from rain, sun, and wind.",
    fullDescription: "The JOBOBIKE Canopy provides comprehensive weather protection for cargo bike riders. This durable canopy shields you and your cargo from rain, harsh sun, and wind, making year-round riding more comfortable. Features a sturdy aluminum frame with waterproof fabric cover, easy installation, and adjustable positioning. Perfect for delivery riders, parents transporting children, or anyone who rides in all weather conditions.",
    price: 9099,
    currency: "kr",
    image: "/images/canopy/c.jpg",
    images: [
      "/images/canopy/c.jpg",
      "/images/canopy/c1.jpg",
    ],
    category: ["Weather Protection", "Cargo", "Accessories"],
    specifications: [
      { label: "Frame Material", value: "Aluminum alloy" },
      { label: "Cover Material", value: "Waterproof PVC/polyester" },
      { label: "UV Protection", value: "UPF 50+" },
      { label: "Waterproof Rating", value: "IPX5" },
      { label: "Dimensions", value: "Approx. 140cm x 90cm" },
      { label: "Mounting", value: "Frame-specific brackets" },
      { label: "Adjustability", value: "Height and angle adjustable" },
      { label: "Weight", value: "~3-4 kg" }
    ],
    features: [
      "Complete weather protection from rain, sun, and wind",
      "UPF 50+ UV protection",
      "Waterproof and windproof fabric",
      "Sturdy aluminum frame construction",
      "Adjustable height and angle",
      "Easy installation with included hardware",
      "Transparent front panel for visibility",
      "Foldable design for storage",
      "Year-round riding comfort"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
    colors: ["Svart"]
  },

  // 16. Monkey Bar
  {
    id: "acc-monkey-bar-001",
    slug: "monkey-bar",
    name: "JOBOBIKE Monkey Bar",
    description: "Front handlebar attachment for child passenger. Safe and comfortable seating position for young riders.",
    fullDescription: "The JOBOBIKE Monkey Bar is a front-mounted handlebar attachment that allows you to safely transport a child on your cargo bike. This innovative accessory provides a secure holding bar for children to grip while riding, positioned in front of the rider for maximum supervision and interaction. Features padded grips, adjustable positioning, and sturdy construction to ensure safety and comfort.",
    price: 7729,
    currency: "kr",
    image: "/images/monkey-bar/m.jpg",
    images: [
      "/images/monkey-bar/m.jpg",
      
    ],
    category: ["Child Transport", "Safety", "Cargo", "Accessories"],
    specifications: [
      { label: "Material", value: "Steel tube with padding" },
      { label: "Finish", value: "Powder-coated" },
      { label: "Grip Material", value: "Soft foam padding" },
      { label: "Mounting", value: "Frame clamp system" },
      { label: "Weight Capacity", value: "Suitable for children up to ~25kg" },
      { label: "Adjustability", value: "Height and width adjustable" },
      { label: "Age Range", value: "Approximately 2-7 years" }
    ],
    features: [
      "Safe front-mounted handlebar for children",
      "Padded foam grips for comfort",
      "Adjustable height and width",
      "Sturdy steel construction with powder coating",
      "Allows parent to supervise child while riding",
      "Easy installation with frame clamps",
      "Enhances riding experience for parent and child",
      "Compatible with captain chair and safety accessories"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
    colors: ["Svart"]
  },

  // 17. Captain Chair
  {
    id: "acc-captain-chair-001",
    slug: "captain-chair",
    name: "JOBOBIKE Captain Chair",
    description: "Premium child seat with full back support and safety harness. Comfortable and secure seating for young passengers.",
    fullDescription: "The JOBOBIKE Captain Chair is a premium child seating solution for cargo bikes. Features a full backrest, comfortable cushioning, integrated safety harness, and footrests for secure and comfortable transport of children. Designed to work seamlessly with the Monkey Bar for the ultimate family riding experience. High-quality construction ensures durability and safety for years of use.",
    price: 8607,
    currency: "kr",
    image: "/images/chair/ch.jpg",
    images: [
      "/images/chair/ch.jpg",
    ],
    category: ["Child Transport", "Seating", "Safety", "Cargo"],
    specifications: [
      { label: "Material", value: "High-density foam with waterproof cover" },
      { label: "Backrest", value: "Full back support" },
      { label: "Safety Harness", value: "5-point harness system" },
      { label: "Footrests", value: "Adjustable footrests included" },
      { label: "Weight Capacity", value: "Up to 25-30kg" },
      { label: "Age Range", value: "Approximately 1-7 years" },
      { label: "Mounting", value: "Cargo platform mounting" },
      { label: "Cushion", value: "Weather-resistant padded cushion" }
    ],
    features: [
      "Full back support for comfort and safety",
      "Integrated 5-point safety harness",
      "High-density foam cushioning",
      "Waterproof and weather-resistant cover",
      "Adjustable footrests for growing children",
      "Compatible with Monkey Bar handlebar",
      "Easy installation on cargo platform",
      "Durable construction for long-term use",
      "Removable cushion for cleaning"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
    colors: ["Svart"]
  },

  // 18. Armrest
  {
    id: "acc-armrest-001",
    slug: "armrest",
    name: "JOBOBIKE Armrest",
    description: "Comfortable armrests for cargo bike seating. Adds extra comfort and security for passengers.",
    fullDescription: "The JOBOBIKE Armrest set provides additional comfort and security for cargo bike passengers. These padded armrests attach to the sides of the cargo platform, giving passengers something to hold onto and lean against during the ride. Particularly useful when transporting adults or older children, or when using the cargo area for extended trips.",
    price: 2073,
    currency: "kr",
    image: "/images/arm/a1.jpg",
    images: [
      "/images/arm/a1.jpg",
      "/images/arm/a2.jpg",
    ],
    category: ["Comfort", "Cargo", "Accessories", "Seating"],
    specifications: [
      { label: "Material", value: "Padded foam with vinyl cover" },
      { label: "Mounting", value: "Clamp or bolt-on system" },
      { label: "Quantity", value: "Pair (left and right)" },
      { label: "Adjustability", value: "Height adjustable" },
      { label: "Padding", value: "Weather-resistant foam" },
      { label: "Cover Material", value: "Waterproof vinyl" }
    ],
    features: [
      "Sold as a pair (left and right)",
      "Comfortable padded construction",
      "Weather-resistant vinyl cover",
      "Height adjustable for different riders",
      "Provides extra security for passengers",
      "Easy installation with clamp system",
      "Adds comfort for longer rides",
      "Durable materials for outdoor use"
    ],
    compatibility: ["Transer"],
    inStock: true,
    colors: ["Svart"]
  },

  // 19. Safety Belt
  {
    id: "acc-safety-belt-001",
    slug: "safety-belt",
    name: "JOBOBIKE Safety Belt",
    description: "Adjustable safety belt for securing cargo or passengers on rear rack. Essential safety accessory.",
    fullDescription: "The JOBOBIKE Safety Belt is an essential safety accessory for securing cargo or passengers on your rear rack. Features adjustable length, quick-release buckle, and durable webbing that can withstand outdoor conditions. Perfect for securing bags, boxes, or providing additional safety for rear-mounted child seats.",
    price: 527,
    currency: "kr",
    image: "/images/belt/bel.jpg",
    images: [
     "/images/belt/bel.jpg",
    ],
    category: ["Safety", "Cargo", "Accessories"],
    specifications: [
      { label: "Material", value: "Heavy-duty nylon webbing" },
      { label: "Buckle Type", value: "Quick-release plastic buckle" },
      { label: "Length", value: "Adjustable, ~150cm max" },
      { label: "Width", value: "~25-38mm webbing" },
      { label: "Weight Capacity", value: "Suitable for light to medium loads" },
      { label: "Weather Resistance", value: "Water and UV resistant" }
    ],
    features: [
      "Heavy-duty nylon webbing construction",
      "Quick-release buckle for easy use",
      "Adjustable length fits various cargo sizes",
      "Water and UV resistant materials",
      "Secures cargo or provides additional passenger safety",
      "Compatible with all rear rack systems",
      "Lightweight and portable",
      "Essential safety accessory"
    ],
    compatibility: ["All models with rear rack"],
    inStock: true,
    colors: ["Svart"]
  },

  // 20. Cushion
  {
    id: "acc-cushion-001",
    slug: "rear-rack-cushion",
    name: "JOBOBIKE Rear Rack Cushion",
    description: "Comfortable cushion for rear rack passenger seating. Waterproof and padded for extended comfort.",
    fullDescription: "Transform your rear rack into a comfortable passenger seat with the JOBOBIKE Rear Rack Cushion. This padded cushion features waterproof covering, anti-slip bottom, and secure attachment straps. Perfect for giving friends a ride or creating a comfortable seating area on your cargo rack. The cushion is weather-resistant and easy to clean.",
    price: 1405,
    currency: "kr",
    image: "/images/cushion/cs.jpg",
    images: [
      "/images/cushion/cs.jpg",
    ],
    category: ["Comfort", "Seating", "Accessories"],
    specifications: [
      { label: "Material", value: "High-density foam with waterproof cover" },
      { label: "Dimensions", value: "Approx. 35cm x 25cm x 5cm thick" },
      { label: "Cover Material", value: "Waterproof vinyl/PU leather" },
      { label: "Bottom", value: "Anti-slip texture" },
      { label: "Attachment", value: "Adjustable straps" },
      { label: "Weight Capacity", value: "Suitable for adults up to 100kg" },
      { label: "Weather Resistance", value: "Waterproof and UV resistant" }
    ],
    features: [
      "High-density foam padding for comfort",
      "Waterproof and weather-resistant cover",
      "Anti-slip bottom keeps cushion in place",
      "Adjustable straps for secure attachment",
      "Easy to install and remove",
      "Easy to clean - just wipe down",
      "Suitable for rear rack passenger seating",
      "Durable construction for long-term use"
    ],
    compatibility: ["All models with rear rack"],
    inStock: true,
    colors: ["Svart"]
  },

  // 21. Loading-Bearing Plate
  {
    id: "acc-loading-plate-001",
    slug: "loading-bearing-plate",
    name: "JOBOBIKE Loading-Bearing Plate",
    description: "Heavy-duty loading platform extension for cargo bikes. Increases cargo capacity and provides flat loading surface.",
    fullDescription: "The JOBOBIKE Loading-Bearing Plate is a heavy-duty platform extension designed for serious cargo needs. This reinforced plate mounts to your cargo bike's platform, providing a stable, flat surface for transporting larger items, boxes, or equipment. Made from durable materials that can handle significant weight, it's perfect for delivery riders, business use, or anyone who needs maximum cargo capacity.",
    price: 3478,
    currency: "kr",
    image: "/images/plate/p.jpg",
    images: [
      "/images/plate/p.jpg",
    ],
    category: ["Cargo", "Accessories", "Heavy Duty"],
    specifications: [
      { label: "Material", value: "Reinforced steel or aluminum" },
      { label: "Dimensions", value: "Custom fit for Transer/Mover platform" },
      { label: "Load Capacity", value: "Up to 100kg" },
      { label: "Surface", value: "Anti-slip textured surface" },
      { label: "Mounting", value: "Bolt-on platform mount" },
      { label: "Finish", value: "Powder-coated for weather resistance" },
      { label: "Thickness", value: "~3-5mm" }
    ],
    features: [
      "Heavy-duty construction for maximum load capacity",
      "Flat, stable platform for larger cargo items",
      "Anti-slip surface keeps items secure",
      "Weather-resistant powder coating",
      "Bolt-on installation for secure mounting",
      "Compatible with other cargo accessories",
      "Ideal for delivery and business use",
      "Significantly increases cargo capacity"
    ],
    compatibility: ["Transer", "Mover"],
    inStock: true,
    colors: ["Svart"]
  }
];

// Helper function to get product by slug
export const getAccessoryBySlug = (slug: string): AccessoryProduct | undefined => {
  return accessoriesProducts.find(product => product.slug === slug);
};

// Helper function to get products by category
export const getAccessoriesByCategory = (category: string[]): AccessoryProduct[] => {
  return accessoriesProducts.filter(product => product.category === category);
};

