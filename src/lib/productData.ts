

// src/lib/productData.ts
export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  discount: string;
  image: string;
  images: string[];
  features: string[];
  badge?: string;
  category: string[];
  rating: number;
  reviewCount: number;
  specifications: {
    motor: string;
    battery: string;
    range: string;
    speed: string;
    weight: string;
    wheelSize: string;
    foldable: boolean;
    brakes?: string;
    frame?: string;
    drivetrain?: string;
  };
  // NEW: Comprehensive technical specifications
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: string;
      rammeType: string;
      rammeMateriale: string;
      sammenleggbar: boolean;
      dimensjoner: {
        utbrettet: string;
        sammenlagt: string;
      };
      vekt: string;
      maksLast: string;
      anbefalteHøyde: string;
    };
    motor: {
      type: string;
      effekt: string;
      toppEffekt: string;
      dreiemoment?: string;
      plassering: string;
      dreiemomentSensor?: boolean;
    };
    batteri: {
      type: string;
      spenning: string;
      kapasitet: string;
      kapasitetWh: string;
      avtakbar: boolean;
      ladetid: string;
      batteriLevetid: string;
    };
    ytelse: {
      maksFart: string;
      rekkevidde: {
        renElektrisk: string;
        pedalAssistanse: string;
        kombinert: string;
      };
      stigningsevne: string;
      svingradius?: string;
    };
    hjul: {
      størrelse: string;
      dekkType: string;
      dekkStørrelse: string;
      felgMateriale?: string;
    };
    bremser: {
      foran: string;
      bak: string;
      type: string;
    };
    giring: {
      type: string;
      gir?: string;
      girskifter?: string;
    };
    elektrisk: {
      display: string;
      lys: {
        foran: boolean;
        bak: boolean;
        type?: string;
      };
      horn: boolean;
      gasspedal: boolean;
      assistanseNivåer: string;
    };
    komfort: {
      demping: {
        foran: boolean;
        bak: boolean;
        type?: string;
      };
      sete: {
        type: string;
        justerbar: boolean;
        materiale?: string;
      };
      styre: {
        type: string;
        justerbar: boolean;
        materiale?: string;
      };
    };
    sikkerhet: {
      reflekser: boolean;
      bjelle: boolean;
      vannMotstand: string;
      sertifisering?: string[];
    };
    tilkobling: {
      app: boolean;
      gps?: boolean;
      bluetooth?: boolean;
      usb?: boolean;
    };
    tilbehør: {
      sidestøtte: boolean;
      skjermer: boolean;
      bagasjebrett: boolean;
      kurv: boolean;
      flaskeholder: boolean;
    };
  };
  description: string;
  keyFeatures: string[];
  availableColors: string[];
  availableSizes: string[];
  whatsInTheBox: string[];
}

export const PRODUCTS_DATA: ProductCard[] = [  
  // 1. JOBOBIKE Luxe
{
  id: "luxe-001",
  name: "JOBOBIKE Luxe",
  slug: "jobobike-luxe",
  originalPrice: 2299,
  price: 2099,
  discount: "9%",
  image: "/images/luxe/luxe-1.png",
  images: [
    "/images/luxe/luxe-1.png",
    "/images/luxe/luxe-2.png",
  ],
  features: [
    "Karbon drivrem system",
    "Intern 8-trinns giring",
    "Hydrauliske bremser",
    "Smart App tilkobling via Bluetooth",
    "Automatisk bremselys sensing"
  ],
  badge: "Smart Tech",
  category: ["Pendler"],
  rating: 4.8,
  reviewCount: 89,
  specifications: {
    motor: "250W Mid-Drive, 90Nm",
    battery: "36V 15Ah (540Wh)",
    range: "90km",
    speed: "25 km/h",
    weight: "24kg",
    wheelSize: "27.5\"",
    foldable: false,
    brakes: "Hydraulic disc brakes",
    frame: "Aluminum alloy",
    drivetrain: "Internal 8-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Luxe",
      rammeType: "Høy urban ramme",
      rammeMateriale: "Aluminiumslegering",
      sammenleggbar: false,
      dimensjoner: {
        utbrettet: "180cm x 110cm x 65cm",
        sammenlagt: "N/A"
      },
      vekt: "24kg",
      maksLast: "120kg",
      anbefalteHøyde: "165-195cm"
    },
    motor: {
      type: "Midtmotor",
      effekt: "250W",
      toppEffekt: "400W",
      dreiemoment: "90Nm",
      plassering: "Senter",
      dreiemomentSensor: true
    },
    batteri: {
      type: "Lithium-ion med BMS",
      spenning: "36V",
      kapasitet: "15Ah",
      kapasitetWh: "540Wh",
      avtakbar: true,
      ladetid: "4-6 timer",
      batteriLevetid: "800-1000 ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h",
      rekkevidde: {
        renElektrisk: "45km",
        pedalAssistanse: "90km",
        kombinert: "65km"
      },
      stigningsevne: "15°",
      svingradius: "2.5m"
    },
    hjul: {
      størrelse: "27.5\"",
      dekkType: "Bydekk",
      dekkStørrelse: "27.5\" x 2.1\"",
      felgMateriale: "Aluminiumslegering"
    },
    bremser: {
      foran: "Hydraulisk skivebrems",
      bak: "Hydraulisk skivebrems",
      type: "Hydraulisk skive"
    },
    giring: {
      type: "Intern navgiring",
      gir: "8-trinns",
      girskifter: "Gripskift"
    },
    elektrisk: {
      display: "Bluetooth LCD-skjerm",
      lys: {
        foran: true,
        bak: true,
        type: "LED med automatisk bremselys"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer + auto"
    },
    komfort: {
      demping: {
        foran: false,
        bak: false,
        type: "Stiv"
      },
      sete: {
        type: "Komfortsadel",
        justerbar: true,
        materiale: "Syntetisk lær"
      },
      styre: {
        type: "Bystyre",
        justerbar: true,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX5",
      sertifisering: ["EN15194", "CE"]
    },
    tilkobling: {
      app: true,
      gps: false,
      bluetooth: true,
      usb: true
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: true,
      kurv: false,
      flaskeholder: false
    }
  },
  description: "JOBOBIKE Luxe er en premium smart by-elsykkel som kombinerer teknologi og eleganse. Med et vedlikeholdsfritt karbon drivrem system og intern 8-trinns giring, tilbyr den en jevn, stille og vedlikeholdsfri kjøreopplevelse. Den integrerte Bluetooth-appen gir sanntidsovervåking av kjøredata og personlige innstillinger, noe som gjør pendling smartere og mer avslappet.",
  keyFeatures: [
    "Karbon drivrem - vedlikeholdsfritt opptil 30 000 km",
    "Smart App-integrasjon for sanntids dataovervåking",
    "Intern 8-trinns giring for jevn giring",
    "Hydrauliske bremser for all-vær ytelse",
    "Automatisk bremselys sensing funksjon",
    "27,5\" store dekk med punkteringsbeskyttelse og reflekterende striper",
    "5 nivåer elektrisk assistanse pluss automatisk modus",
    "Hurtigutløser design for enkel tilbehørsinstallasjon"
  ],
  availableColors: ["Silver Gray", "Snow White"],
  availableSizes: ["One Size"],
  whatsInTheBox: [
    "JOBOBIKE Luxe el-sykkel",
    "36V 15Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front- og baklys",
    "Sidestøtte",
    "Bjelle"
  ]
},

// 2. JOBOBIKE Robin
{
  id: "robin-001",
  name: "JOBOBIKE Robin",
  slug: "jobobike-robin",
  originalPrice: 1699,
  price: 1399,
  discount: "18%",
  image: "/images/robin/robin-1.png",
  images: [
    "/images/robin/robin-1.png",
    "/images/robin/robin-2.png",
    "/images/robin/robin-3.png",
  ],
  features: [
    "26\" x 4,0\" fatbike dekk",
    "80mm RST hydraulisk demping",
    "Kraftig Bafang 250W motor med 80Nm dreiemoment",
    "All-terreng kapasitet",
    "USB ladeport"
  ],
  badge: "All-Terrain",
  category: ["Fatbike"],
  rating: 4.7,
  reviewCount: 156,
  specifications: {
    motor: "250W Bafang Hub, 80Nm",
    battery: "48V 13Ah (624Wh)",
    range: "65km",
    speed: "25 km/h",
    weight: "32kg",
    wheelSize: "26\"",
    foldable: false,
    brakes: "Hydraulic disc brakes",
    frame: "6061 Aluminum alloy",
    drivetrain: "Shimano 7-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Robin",
      rammeType: "Høy ramme / Gjennomgående tilgjengelig",
      rammeMateriale: "6061 Aluminiumslegering",
      sammenleggbar: false,
      dimensjoner: {
        utbrettet: "190cm x 120cm x 75cm",
        sammenlagt: "N/A"
      },
      vekt: "32kg",
      maksLast: "150kg",
      anbefalteHøyde: "160-200cm"
    },
    motor: {
      type: "Bakhjulsmotor",
      effekt: "250W",
      toppEffekt: "500W",
      dreiemoment: "80Nm",
      plassering: "Bakhjul",
      dreiemomentSensor: false
    },
    batteri: {
      type: "Lithium-ion med BMS",
      spenning: "48V",
      kapasitet: "13Ah",
      kapasitetWh: "624Wh",
      avtakbar: true,
      ladetid: "6-8 timer",
      batteriLevetid: "800-1000 ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h",
      rekkevidde: {
        renElektrisk: "40km",
        pedalAssistanse: "65km",
        kombinert: "55km"
      },
      stigningsevne: "20°",
      svingradius: "3m"
    },
    hjul: {
      størrelse: "26\"",
      dekkType: "Fatbike dekk",
      dekkStørrelse: "26\" x 4.0\"",
      felgMateriale: "Aluminiumslegering bred felg"
    },
    bremser: {
      foran: "Hydraulisk skivebrems",
      bak: "Hydraulisk skivebrems",
      type: "Hydraulisk skive"
    },
    giring: {
      type: "Ekstern girkasse",
      gir: "7-trinns Shimano",
      girskifter: "Shimano vrigrep"
    },
    elektrisk: {
      display: "Farget LCD med USB-port",
      lys: {
        foran: true,
        bak: true,
        type: "LED 60 LUX foran, bremselys bak"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer"
    },
    komfort: {
      demping: {
        foran: true,
        bak: false,
        type: "RST hydraulisk demping 80mm"
      },
      sete: {
        type: "Velo lær komfortsadel",
        justerbar: true,
        materiale: "Lær"
      },
      styre: {
        type: "Terrengsykkel styre 720mm",
        justerbar: false,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX4",
      sertifisering: ["EN15194", "CE", "TUV"]
    },
    tilkobling: {
      app: false,
      gps: false,
      bluetooth: false,
      usb: true
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: false,
      kurv: false,
      flaskeholder: false
    }
  },
  description: "JOBOBIKE Robin er den mest kraftige og dynamiske fatbike el-sykkelen i serien. Skapt for eventyr, utmerker den seg på humpete skogsstier, fjell og til og med snødekket terreng der vanlige sykler ikke kan gå. Med 26\" x 4,0\" fatbike dekk og RST hydraulisk demping, leverer Robin eksepsjonelt grep og stabilitet på alle terreng.",
  keyFeatures: [
    "26\" x 4,0\" CST/Kenda fatbike dekk med punkteringsteknologi",
    "80mm RST hydraulisk demping med returjustering",
    "Bafang 250W børsteløs motor med 80Nm dreiemoment",
    "48V 13Ah (624Wh) batteri med BMS beskyttelse",
    "Hydrauliske skivebremser for all-vær bremsekraft",
    "Farget LCD-skjerm med USB ladeport",
    "Shimano 7-trinns for terrengtilpasning",
    "Høy ramme og gjennomgående ramme tilgjengelig"
  ],
  availableColors: ["Black-Red", "Gray-Green"],
  availableSizes: ["High Frame", "Step-Through"],
  whatsInTheBox: [
    "JOBOBIKE Robin el-sykkel",
    "48V 13Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front LED-lys (60 LUX)",
    "Bakre bremselys",
    "Sidestøtte",
    "Bjelle"
  ]
},

// 3. JOBOBIKE Robin Pro
{
  id: "robin-pro-001",
  name: "JOBOBIKE Robin Pro",
  slug: "jobobike-robin-pro",
  originalPrice: 2099,
  price: 1799,
  discount: "14%",
  image: "/images/robin-pro/robin-pro-1.png",
  images: [
    "/images/robin-pro/robin-pro-1.png",
  ],
  features: [
    "Utvidet rekkevidde 48V 20Ah batteri",
    "26\" x 4,0\" fatbike dekk",
    "80mm RST hydraulisk demping",
    "90km rekkevidde på en lading",
    "Premium all-terreng ytelse"
  ],
  badge: "Extended Range",
  category: ["Fatbike" , "Pendler"],
  rating: 4.9,
  reviewCount: 98,
  specifications: {
    motor: "250W Bafang Hub, 80Nm",
    battery: "48V 20Ah (960Wh)",
    range: "90km",
    speed: "25 km/h",
    weight: "34kg",
    wheelSize: "26\"",
    foldable: false,
    brakes: "Hydraulic disc brakes",
    frame: "6061 Aluminum alloy",
    drivetrain: "Shimano 7-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Robin Pro",
      rammeType: "Høy ramme / Gjennomgående tilgjengelig",
      rammeMateriale: "6061 Aluminiumslegering",
      sammenleggbar: false,
      dimensjoner: {
        utbrettet: "190cm x 120cm x 75cm",
        sammenlagt: "N/A"
      },
      vekt: "34kg",
      maksLast: "150kg",
      anbefalteHøyde: "160-200cm"
    },
    motor: {
      type: "Bakhjulsmotor",
      effekt: "250W",
      toppEffekt: "500W",
      dreiemoment: "80Nm",
      plassering: "Bakhjul",
      dreiemomentSensor: false
    },
    batteri: {
      type: "Lithium-ion med BMS",
      spenning: "48V",
      kapasitet: "20Ah",
      kapasitetWh: "960Wh",
      avtakbar: true,
      ladetid: "8-10 timer",
      batteriLevetid: "800-1000 ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h",
      rekkevidde: {
        renElektrisk: "50km",
        pedalAssistanse: "90km",
        kombinert: "70km"
      },
      stigningsevne: "20°",
      svingradius: "3m"
    },
    hjul: {
      størrelse: "26\"",
      dekkType: "Fatbike dekk",
      dekkStørrelse: "26\" x 4.0\"",
      felgMateriale: "Aluminiumslegering bred felg"
    },
    bremser: {
      foran: "Hydraulisk skivebrems",
      bak: "Hydraulisk skivebrems",
      type: "Hydraulisk skive"
    },
    giring: {
      type: "Ekstern girkasse",
      gir: "7-trinns Shimano",
      girskifter: "Shimano vrigrep"
    },
    elektrisk: {
      display: "Farget LCD med USB-port",
      lys: {
        foran: true,
        bak: true,
        type: "LED 60 LUX foran, bremselys bak"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer"
    },
    komfort: {
      demping: {
        foran: true,
        bak: false,
        type: "RST hydraulisk demping 80mm"
      },
      sete: {
        type: "Velo lær komfortsadel",
        justerbar: true,
        materiale: "Lær"
      },
      styre: {
        type: "Terrengsykkel styre 720mm",
        justerbar: false,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX4",
      sertifisering: ["EN15194", "CE", "TUV"]
    },
    tilkobling: {
      app: false,
      gps: false,
      bluetooth: false,
      usb: true
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: false,
      kurv: false,
      flaskeholder: false
    }
  },
  description: "JOBOBIKE Robin Pro er den oppgraderte versjonen av den populære Robin fatbike el-sykkelen, med et utvidet rekkevidde 48V 20Ah (960Wh) batteri som leverer opptil 90km på en lading. Perfekt for lengre eventyr på skogsstier, fjell og utfordrende terreng der standard sykler ikke kan gå.",
  keyFeatures: [
    "Utvidet 48V 20Ah (960Wh) batteri for 90km rekkevidde",
    "26\" x 4,0\" CST/Kenda fatbike dekk med punkteringsteknologi",
    "80mm RST hydraulisk demping med returjustering",
    "Bafang 250W børsteløs motor med 80Nm dreiemoment",
    "Hydrauliske skivebremser for overlegen bremsekraft",
    "Farget LCD-skjerm med USB ladeport",
    "Shimano 7-trinns giring",
    "Tilgjengelig i flere premium farger"
  ],
  availableColors: ["Black-Red", "Grey-Green", "Black-Gold", "Black-Blue"],
  availableSizes: ["High Frame", "Step-Through"],
  whatsInTheBox: [
    "JOBOBIKE Robin Pro el-sykkel",
    "48V 20Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front LED-lys (60 LUX)",
    "Bakre bremselys",
    "Sidestøtte",
    "Bjelle"
  ]
},

// 4. JOBOBIKE Romer
{
  id: "romer-001",
  name: "JOBOBIKE Romer",
  slug: "jobobike-romer",
  originalPrice: 1999,
  price: 1799,
  discount: "10%",
  image: "/images/romer/romer-1.png",
  images: [
    "/images/romer/romer-1.png",
    "/images/romer/romer-2.png",
    "/images/romer/romer-3.png",
    "/images/romer/romer-4.png",
    "/images/romer/romer-5.png",
  ],
  features: [
    "Sammenleggbart design for enkel transport",
    "20\" fatbike dekk for stabilitet",
    "Gjennomgående ramme",
    "Kompatibel med ulike tilbehør",
    "150km rekkevidde i øko-modus"
  ],
  badge: "Utility",
  category: ["Sammenleggbar" , "Fatbike"],
  rating: 4.6,
  reviewCount: 112,
  specifications: {
    motor: "250W Hub, 80Nm",
    battery: "48V 13Ah (624Wh)",
    range: "65-150km",
    speed: "25 km/h",
    weight: "30kg",
    wheelSize: "20\"",
    foldable: true,
    brakes: "Mechanical disc brakes",
    frame: "Double-layer aluminum alloy",
    drivetrain: "Shimano 7-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Romer",
      rammeType: "Gjennomgående sammenleggbar",
      rammeMateriale: "Dobbeltlags aluminiumslegering",
      sammenleggbar: true,
      dimensjoner: {
        utbrettet: "165cm x 110cm x 70cm",
        sammenlagt: "106cm x 60cm x 86cm"
      },
      vekt: "30kg",
      maksLast: "150kg",
      anbefalteHøyde: "160cm+"
    },
    motor: {
      type: "Bakhjulsmotor",
      effekt: "250W",
      toppEffekt: "450W",
      dreiemoment: "80Nm",
      plassering: "Bakhjul",
      dreiemomentSensor: false
    },
    batteri: {
      type: "LG Lithium-ion med BMS",
      spenning: "48V",
      kapasitet: "13Ah",
      kapasitetWh: "624Wh",
      avtakbar: true,
      ladetid: "6-8 timer",
      batteriLevetid: "800-1000 ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h",
      rekkevidde: {
        renElektrisk: "45km",
        pedalAssistanse: "150km",
        kombinert: "65km"
      },
      stigningsevne: "18°",
      svingradius: "2.2m"
    },
    hjul: {
      størrelse: "20\"",
      dekkType: "Fatbike dekk",
      dekkStørrelse: "20\" x 4.0\"",
      felgMateriale: "Aluminiumslegering"
    },
    bremser: {
      foran: "Mekanisk skivebrems",
      bak: "Mekanisk skivebrems",
      type: "Tektro mekanisk skive"
    },
    giring: {
      type: "Ekstern girkasse",
      gir: "7-trinns Shimano",
      girskifter: "Shimano vrigrep"
    },
    elektrisk: {
      display: "LCD-skjerm",
      lys: {
        foran: true,
        bak: true,
        type: "LED med vanntett kabling"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer"
    },
    komfort: {
      demping: {
        foran: false,
        bak: false,
        type: "Stiv med fatbike dekk demping"
      },
      sete: {
        type: "Komfortsadel",
        justerbar: true,
        materiale: "Syntetisk lær"
      },
      styre: {
        type: "Sammenleggbart styre",
        justerbar: true,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX4",
      sertifisering: ["EN15194", "CE"]
    },
    tilkobling: {
      app: false,
      gps: false,
      bluetooth: false,
      usb: false
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: true,
      kurv: true,
      flaskeholder: false
    }
  },
  description: "JOBOBIKE Romer er en allsidig nyttesykkel designet for maksimal praktisk bruk. Med sitt sammenleggbare design og gjennomgående ramme, er den perfekt for pendlere som trenger enkel transport og oppbevaring. Den doble rammen gir ekstra styrke samtidig som den beskytter batteriet, og den er kompatibel med ulike tilbehør som tilhengere, barneseter og kurver.",
  keyFeatures: [
    "Sammenleggbart design - kompakt oppbevaring på 106cm x 60cm x 86cm",
    "20\" fatbike dekk for stabil, komfortabel kjøring på alle terreng",
    "Gjennomgående ramme for enkel på- og avstigning",
    "Dobbel ramme for ekstra styrke og batteribeskyttelse",
    "Kompatibel med tilhenger, barnesete og lastetilbehør",
    "250W motor med 80Nm dreiemoment",
    "Opptil 150km rekkevidde i øko-modus",
    "Rustbestandige sammenleggbare pedaler"
  ],
  availableColors: ["Mint Cream", "Dark Olive"],
  availableSizes: ["One Size"],
  whatsInTheBox: [
    "JOBOBIKE Romer el-sykkel",
    "48V 13Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front- og baklys",
    "Sammenleggbare pedaler",
    "Sidestøtte",
    "Skjermer",
    "Bjelle"
  ]
},

// 5. JOBOBIKE Romer Pro
{
  id: "romer-pro-001",
  name: "JOBOBIKE Romer Pro",
  slug: "jobobike-romer-pro",
  originalPrice: 2199,
  price: 1999,
  discount: "9%",
  image: "/images/romer-pro/romer-1.png",
  images: [
    "/images/romer-pro/romer-1.png",
  ],
  features: [
    "Hydrauliske skivebremser",
    "Dreiemoment sensor teknologi",
    "Dempet setepinne",
    "Sammenleggbart nyttedesign",
    "Forbedret lastekapasitet"
  ],
  badge: "Pro Utility",
  category: ["Lastesykkel" , "Sammenleggbar"],
  rating: 4.8,
  reviewCount: 87,
  specifications: {
    motor: "250W Bafang Hub, 80Nm",
    battery: "48V 15Ah (720Wh)",
    range: "70-160km",
    speed: "25 km/h",
    weight: "31kg",
    wheelSize: "20\"",
    foldable: true,
    brakes: "Hydraulic disc brakes",
    frame: "Double-layer aluminum alloy",
    drivetrain: "Shimano 7-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Romer Pro",
      rammeType: "Gjennomgående sammenleggbar",
      rammeMateriale: "Dobbeltlags aluminiumslegering",
      sammenleggbar: true,
      dimensjoner: {
        utbrettet: "165cm x 110cm x 70cm",
        sammenlagt: "106cm x 60cm x 86cm"
      },
      vekt: "31kg",
      maksLast: "150kg",
      anbefalteHøyde: "160cm+"
    },
    motor: {
      type: "Bakhjulsmotor",
      effekt: "250W",
      toppEffekt: "500W",
      dreiemoment: "80Nm",
      plassering: "Bakhjul",
      dreiemomentSensor: true
    },
    batteri: {
      type: "LG Lithium-ion med BMS",
      spenning: "48V",
      kapasitet: "15Ah",
      kapasitetWh: "720Wh",
      avtakbar: true,
      ladetid: "6-8 timer",
      batteriLevetid: "800-1000 ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h",
      rekkevidde: {
        renElektrisk: "50km",
        pedalAssistanse: "160km",
        kombinert: "70km"
      },
      stigningsevne: "18°",
      svingradius: "2.2m"
    },
    hjul: {
      størrelse: "20\"",
      dekkType: "Fatbike dekk",
      dekkStørrelse: "20\" x 4.0\"",
      felgMateriale: "Aluminiumslegering"
    },
    bremser: {
      foran: "Hydraulisk skivebrems",
      bak: "Hydraulisk skivebrems",
      type: "Tektro hydraulisk skive"
    },
    giring: {
      type: "Ekstern girkasse",
      gir: "7-trinns Shimano",
      girskifter: "Shimano vrigrep"
    },
    elektrisk: {
      display: "Avansert LCD-skjerm",
      lys: {
        foran: true,
        bak: true,
        type: "LED med vanntett kabling"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer"
    },
    komfort: {
      demping: {
        foran: false,
        bak: true,
        type: "Dempet setepinne"
      },
      sete: {
        type: "Premium komfortsadel",
        justerbar: true,
        materiale: "Syntetisk lær"
      },
      styre: {
        type: "Sammenleggbart styre",
        justerbar: true,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX4",
      sertifisering: ["EN15194", "CE"]
    },
    tilkobling: {
      app: false,
      gps: false,
      bluetooth: false,
      usb: true
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: true,
      kurv: true,
      flaskeholder: false
    }
  },
  description: "JOBOBIKE Romer Pro er den oppgraderte versjonen av den populære Romer nyttesykkelen. Den har hydrauliske skivebremser for overlegen bremsekraft, en dreiemoment sensor for mer naturlig pedalassistanse, og en dempet setepinne for økt komfort. Perfekt for daglig pendling, familieturer og lastetransport.",
  keyFeatures: [
    "Hydrauliske skivebremser for sterkere, mer stabil bremsing",
    "Dreiemoment sensor for jevn, naturlig kraftassistanse",
    "Dempet setepinne for økt komfort",
    "48V 15Ah (720Wh) batteri for utvidet rekkevidde",
    "Sammenleggbart design med dobbel forsterket ramme",
    "20\" fatbike dekk for stabilitet på alle terreng",
    "Kompatibel med lastetilbehør og barneseter",
    "Avansert LCD-skjerm med USB-port"
  ],
  availableColors: ["Jungle Green", "Dark Olive", "Blue Grey"],
  availableSizes: ["One Size"],
  whatsInTheBox: [
    "JOBOBIKE Romer Pro el-sykkel",
    "48V 15Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front- og baklys",
    "Sammenleggbare pedaler",
    "Sidestøtte",
    "Skjermer",
    "Bakre bagasjebrett",
    "Bjelle"
  ]
},

// 6. JOBOBIKE Ace Pro
{
  id: "ace-pro-001",
  name: "JOBOBIKE Ace Pro",
  slug: "jobobike-ace-pro",
  originalPrice: 2499,
  price: 2199,
  discount: "12%",
  image: "/images/ace-pro/ace-pro-1.jpeg",
  images: [
    "/images/ace-pro/ace-pro-1.jpeg",
  ],
  features: [
    "Full dempingssystem",
    "27,5\" x 2,8\" all-terreng dekk",
    "500W Bafang motor med 95Nm dreiemoment",
    "Hydrauliske bremser med avbruddssensorer",
    "Premium farget LCD-skjerm"
  ],
  badge: "Performance",
  category: ["Terreng"],
  rating: 4.9,
  reviewCount: 134,
  specifications: {
    motor: "500W Bafang Mid-Drive, 95Nm",
    battery: "48V 17.5Ah (840Wh)",
    range: "80-120km",
    speed: "25 km/h",
    weight: "28kg",
    wheelSize: "27.5\"",
    foldable: false,
    brakes: "Tektro hydraulic disc brakes",
    frame: "Aluminum alloy full suspension",
    drivetrain: "Shimano 9-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Ace Pro",
      rammeType: "Full demping terrengramme",
      rammeMateriale: "6061 Aluminiumslegering",
      sammenleggbar: false,
      dimensjoner: {
        utbrettet: "185cm x 115cm x 72cm",
        sammenlagt: "N/A"
      },
      vekt: "28kg",
      maksLast: "130kg",
      anbefalteHøyde: "170-195cm"
    },
    motor: {
      type: "Midtmotor",
      effekt: "500W",
      toppEffekt: "750W",
      dreiemoment: "95Nm",
      plassering: "Senter",
      dreiemomentSensor: true
    },
    batteri: {
      type: "Samsung Lithium-ion med BMS",
      spenning: "48V",
      kapasitet: "17.5Ah",
      kapasitetWh: "840Wh",
      avtakbar: true,
      ladetid: "6-8 timer",
      batteriLevetid: "1000+ ladesykluser"
    },
    ytelse: {
      maksFart: "25 km/h (EU) / 32 km/h (konfigurerbar)",
      rekkevidde: {
        renElektrisk: "50km",
        pedalAssistanse: "120km",
        kombinert: "80km"
      },
      stigningsevne: "25°",
      svingradius: "2.8m"
    },
    hjul: {
      størrelse: "27.5\"",
      dekkType: "All-terreng plus dekk",
      dekkStørrelse: "27.5\" x 2.8\"",
      felgMateriale: "Dobbeltvegg aluminiumslegering"
    },
    bremser: {
      foran: "Tektro hydraulisk skive 180mm",
      bak: "Tektro hydraulisk skive 180mm",
      type: "Hydraulisk skive med motoravbrudd"
    },
    giring: {
      type: "Ekstern girkasse",
      gir: "9-trinns Shimano",
      girskifter: "Shimano Alivio"
    },
    elektrisk: {
      display: "Premium farget LCD med Bluetooth",
      lys: {
        foran: true,
        bak: true,
        type: "Høyeffekt LED med flere moduser"
      },
      horn: true,
      gasspedal: false,
      assistanseNivåer: "5 nivåer + gåmodus"
    },
    komfort: {
      demping: {
        foran: true,
        bak: true,
        type: "Full demping - Foran: 120mm vandring, Bak: 100mm vandring"
      },
      sete: {
        type: "Ytelsessadel",
        justerbar: true,
        materiale: "Premium syntetisk lær"
      },
      styre: {
        type: "MTB riser styre 760mm",
        justerbar: false,
        materiale: "Aluminiumslegering"
      }
    },
    sikkerhet: {
      reflekser: true,
      bjelle: true,
      vannMotstand: "IPX5",
      sertifisering: ["EN15194", "CE", "TUV"]
    },
    tilkobling: {
      app: true,
      gps: false,
      bluetooth: true,
      usb: true
    },
    tilbehør: {
      sidestøtte: true,
      skjermer: true,
      bagasjebrett: false,
      kurv: false,
      flaskeholder: true
    }
  },
  description: "JOBOBIKE Ace Pro er den ultimate ytelse el-terrengsykkelen designet for seriøse syklister som krever det beste. Med en kraftig 500W Bafang midtmotor med 95Nm dreiemoment, full dempingssystem og premium komponenter gjennom hele sykkelen, erobrer Ace Pro de tøffeste stiene med letthet samtidig som den leverer en spennende kjøreopplevelse.",
  keyFeatures: [
    "500W Bafang midtmotor med 95Nm dreiemoment for eksepsjonell kraft",
    "Full dempingssystem (120mm foran / 100mm bak) for maksimal komfort",
    "27,5\" x 2,8\" plus-størrelse dekk for overlegen trekkraft og stabilitet",
    "48V 17,5Ah Samsung batteri for 80-120km rekkevidde",
    "Tektro hydrauliske skivebremser med 180mm rotorer",
    "Shimano 9-trinns giring for presise girskift",
    "Farget LCD-skjerm med Bluetooth tilkobling",
    "Integrert dreiemoment sensor for naturlig pedalassistanse"
  ],
  availableColors: ["Matte Black", "Anthracite Grey", "Forest Green"],
  availableSizes: ["M (170-180cm)", "L (180-195cm)"],
  whatsInTheBox: [
    "JOBOBIKE Ace Pro el-sykkel",
    "48V 17.5Ah Samsung batteri med hurtiglader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Høyeffekt LED frontlys",
    "LED bakre bremselys",
    "Sidestøtte",
    "Skjermer",
    "Flaskeholder",
    "Bjelle",
    "Pedaler"
  ]
},

// 7. JOBOBIKE Romer C
{
  id: "romer-c-001",
  name: "JOBOBIKE Romer C",
  slug: "jobobike-romer-c",
  originalPrice: 1899,
  price: 1699,
  discount: "11%",
  image: "/images/romer-c/romer-c.png",
  images: [
   "/images/romer-c/romer-c.png",
  ],
  features: [
    "Forbedret lastekapasitet",
    "Forsterket bakre bagasjebrett",
    "20\" fatbike dekk",
    "Sammenleggbart lastedesign",
    "Robust konstruksjon"
  ],
  badge: "Cargo",
  category: ["Lastesykkel" ,"Sammenleggbar"],
  rating: 4.7,
  reviewCount: 76,
  specifications: {
    motor: "250W Hub, 80Nm",
    battery: "48V 13Ah (624Wh)",
    range: "60-140km",
    speed: "25 km/h",
    weight: "32kg",
    wheelSize: "20\"",
    foldable: true,
    brakes: "Mechanical disc brakes",
    frame: "Reinforced aluminum alloy",
    drivetrain: "Shimano 7-speed"
  },
  tekniskeSpesifikasjoner: {
    generelt: {
      modell: "Romer C",
      rammeType: "Gjennomgående lasteramme",
      rammeMateriale: "Forsterket aluminiumslegering",
      sammenleggbar: true,
      dimensjoner: {
        utbrettet: "165cm x 110cm x 70cm",
        sammenlagt: "106cm x 60cm x 86cm"
      },
      vekt: "32kg",
      maksLast: "180kg",
      anbefalteHøyde: "160cm+"
    },
    motor: {
      type: "Rear hub motor",
      power: "250W",
      peakPower: "450W",
      torque: "80Nm",
      location: "Rear hub",
      torqueSensor: false
    },
    battery: {
      type: "LG Lithium-ion with BMS",
      voltage: "48V",
      capacity: "13Ah",
      capacityWh: "624Wh",
      removable: true,
      chargingTime: "6-8 hours",
      batteryLife: "800-1000 charge cycles"
    },
    performance: {
      maxSpeed: "25 km/h",
      range: {
        pureElectric: "45km",
        pedalAssist: "140km",
        combined: "60km"
      },
      gradability: "15°",
      turningRadius: "2.2m"
    },
    wheels: {
      size: "20\"",
      tireType: "Fat tires",
      tireSize: "20\" x 4.0\"",
      rimMaterial: "Reinforced aluminum alloy"
    },
    brakes: {
      front: "Mechanical disc brake",
      rear: "Mechanical disc brake",
      type: "Tektro mechanical disc"
    },
    transmission: {
      type: "External derailleur",
      gears: "7-speed Shimano",
      shifter: "Shimano twist grip"
    },
    electrical: {
      display: "LCD display",
      lights: {
        front: true,
        rear: true,
        type: "LED with cargo visibility lights"
      },
      horn: true,
      throttle: false,
      assistLevels: "5 levels"
    },
    comfort: {
      suspension: {
        front: false,
        rear: false,
        type: "Fat tire cushioning"
      },
      seat: {
        type: "Wide comfort saddle",
        adjustable: true,
        material: "Synthetic leather with extra padding"
      },
      handlebar: {
        type: "Swept-back comfort handlebar",
        adjustable: true,
        material: "Aluminum alloy"
      }
    },
    safety: {
      reflectors: true,
      bell: true,
      waterResistance: "IPX4",
      certification: ["EN15194", "CE"]
    },
    connectivity: {
      app: false,
      gps: false,
      bluetooth: false,
      usb: false
    },
    accessories: {
      kickstand: true,
      mudguards: true,
      rack: true,
      basket: true,
      bottleHolder: false
    }
  },
  description: "JOBOBIKE Romer C er den lastefokuserte varianten av den populære Romer-serien, designet spesielt for tunge transportbehov. Med sin forsterkede ramme, forbedrede bakre bagasjebrett og 180kg maksimal lastekapasitet, er den perfekt for leveranser, handleturer eller transport av barn og last. Det sammenleggbare designet sikrer enkel oppbevaring når den ikke er i bruk.",
  keyFeatures: [
    "Forsterket ramme med 180kg maksimal lastekapasitet",
    "Robust bakre bagasjebrett designet for lastekasser og barneseter",
    "20\" fatbike dekk for stabil lastetransport på alle overflater",
    "Sammenleggbart design for praktisk oppbevaring",
    "Bred komfortsadel med ekstra polstring for lengre turer",
    "Kompatibel med lastekasser, barneseter og tilhengere",
    "Dobbel sidestøtte for stabil parkering når lastet",
    "Forbedrede synlighetslys for lastesikkerhet"
  ],
  availableColors: ["Cargo Black", "Industrial Grey"],
  availableSizes: ["One Size"],
  whatsInTheBox: [
    "JOBOBIKE Romer C el-sykkel",
    "48V 13Ah batteri med lader",
    "Brukermanual og monteringsverktøy",
    "Garantikort",
    "Front- og baklys",
    "Robust bakre bagasjebrett",
    "Dobbel sidestøtte",
    "Skjermer",
    "Stor kurv (valgfri)",
    "Bjelle",
    "Sammenleggbare pedaler"
  ]
},
  
  {
    id: "9",
    name: "JOBOBIKE Sam",
    slug: "jobobike-sam",
    originalPrice: 1299,
    price: 1299,
    discount: "15%",
    image: "/images/sam/sam-1.png",
    images: [
      "/images/sam/sam-1.png",
      "/images/sam/sam-2.png",
      "/images/sam/sam-3.png",
      "/images/sam/sam-4.png",
      "/images/sam/sam-5.png",
      "/images/sam/sam-6.png",
      "/images/sam/sam-7.png",
      "/images/sam/sam-8.png",
     
    ],
    features: [
      "350W bakhjulsmotor",
      "36V 12,8Ah batteri",
      "20\" fatbike dekk",
      "Sammenleggbart design",
      "5 assistansenivåer"
    ],
    category: ["Pendler"],
    rating: 4.3,
    reviewCount: 67,
    specifications: {
      motor: "350W Rear Hub",
      battery: "36V 12.8Ah (461Wh)",
      range: "60-80 km",
      speed: "25 km/h",
      weight: "22 kg",
      wheelSize: "20\"",
      foldable: true,
      brakes: "Disc Brakes",
      frame: "Aluminum Alloy",
      drivetrain: "7-Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Sam",
        rammeType: "Sammenleggbar",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: {
          utbrettet: "160 x 58 x 100 cm",
          sammenlagt: "80 x 58 x 70 cm"
        },
        vekt: "22 kg",
        maksLast: "100 kg",
        anbefalteHøyde: "155-185 cm"
      },
      motor: {
        type: "Bakhjulsmotor",
        effekt: "350W",
        toppEffekt: "500W",
        dreiemoment: "40 Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "36V",
        kapasitet: "12.8Ah",
        kapasitetWh: "461Wh",
        avtakbar: true,
        ladetid: "4-5 timer",
        batteriLevetid: "600+ sykluser"
      },
      ytelse: {
        maksFart: "25 km/h",
        rekkevidde: {
          renElektrisk: "45 km",
          pedalAssistanse: "60-80 km",
          kombinert: "50-70 km"
        },
        stigningsevne: "15°"
      },
      hjul: {
        størrelse: "20\"",
        dekkType: "Fatbike dekk",
        dekkStørrelse: "20 x 4.0\"",
        felgMateriale: "Aluminiumslegering"
      },
      bremser: {
        foran: "Mekanisk skive",
        bak: "Mekanisk skive",
        type: "160mm rotorer"
      },
      giring: {
        type: "Girkasse",
        gir: "7-trinns",
        girskifter: "Shimano"
      },
      elektrisk: {
        display: "LCD-skjerm",
        lys: {
          foran: true,
          bak: true,
          type: "LED"
        },
        horn: false,
        gasspedal: true,
        assistanseNivåer: "5 nivåer"
      },
      komfort: {
        demping: {
          foran: true,
          bak: false,
          type: "Fjærgaffel"
        },
        sete: {
          type: "Komfortsadel",
          justerbar: true,
          materiale: "PU lær"
        },
        styre: {
          type: "Sammenleggbart",
          justerbar: true,
          materiale: "Stål"
        }
      },
      sikkerhet: {
        reflekser: true,
        bjelle: true,
        vannMotstand: "IPX4",
        sertifisering: ["EN15194", "CE"]
      },
      tilkobling: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: true
      },
      tilbehør: {
        sidestøtte: true,
        skjermer: true,
        bagasjebrett: false,
        kurv: false,
        flaskeholder: false
      }
    },
    description: "JOBOBIKE Sam er en allsidig sammenleggbar el-sykkel perfekt for bypendlere som trenger bærbarhet uten å ofre ytelse. Det kompakte designet gjør oppbevaring og transport enkelt.",
    keyFeatures: [
      "Hurtig-sammenlegging mekanisme for enkel oppbevaring",
      "Fatbike dekk for forbedret stabilitet og komfort",
      "Kraftig 350W motor for bykjøring",
      "Avtakbart batteri for praktisk lading",
      "Kompakt størrelse perfekt for leiligheter og kontorer"
    ],
    availableColors: ["Matte Black", "White", "Red"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Sam el-sykkel",
      "36V 12.8Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Sammenleggingsguide",
      "Nøkler (2x)"
    ]
  },

  {
    id: "7",
    name: "JOBOBIKE Lyon Pro",
    slug: "jobobike-lyon-pro",
    originalPrice: 1899,
    price: 1599,
    discount: "16%",
    image: "/images/lyon/lyon-1.png",
    images: [
      "/images/lyon/lyon-1.png",
      "/images/lyon/lyon-2.png",

    ],
    features: [
      "250W midtmotor",
      "48V 15Ah avtakbart batteri",
      "9-trinns Shimano giring",
      "90+ km rekkevidde",
      "Bluetooth App tilkobling"
    ],
    badge: "Best Seller",
    category: ["Pendler"],
    rating: 4.7,
    reviewCount: 142,
    specifications: {
      motor: "250W Mid-Drive",
      battery: "48V 15Ah (720Wh)",
      range: "90-110 km",
      speed: "25 km/h",
      weight: "24 kg",
      wheelSize: "26\"",
      foldable: false,
      brakes: "Hydraulic Disc Brakes",
      frame: "Aluminum Alloy",
      drivetrain: "9-Speed Shimano"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Lyon Pro",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "185 x 65 x 110 cm",
          sammenlagt: "N/A"
        },
        vekt: "24 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "155-195 cm"
      },
      motor: {
        type: "Midtmotor",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "90 Nm",
        plassering: "Senter",
        dreiemomentSensor: true
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800+ sykluser"
      },
      ytelse: {
        maksFart: "25 km/h",
        rekkevidde: {
          renElektrisk: "60 km",
          pedalAssistanse: "90-110 km",
          kombinert: "75-95 km"
        },
        stigningsevne: "25°",
        svingradius: "1.8m"
      },
      hjul: {
        størrelse: "26\"",
        dekkType: "Bydekk",
        dekkStørrelse: "26 x 2.1\"",
        felgMateriale: "Aluminiumslegering"
      },
      bremser: {
        foran: "Hydraulisk skive",
        bak: "Hydraulisk skive",
        type: "180mm rotorer"
      },
      giring: {
        type: "Girkasse",
        gir: "9-trinns",
        girskifter: "Shimano"
      },
      elektrisk: {
        display: "LCD Bluetooth-skjerm",
        lys: {
          foran: true,
          bak: true,
          type: "LED"
        },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer"
      },
      komfort: {
        demping: {
          foran: true,
          bak: false,
          type: "Fjærgaffel"
        },
        sete: {
          type: "Komfortsadel",
          justerbar: true,
          materiale: "Syntetisk lær"
        },
        styre: {
          type: "Ergonomisk",
          justerbar: true,
          materiale: "Aluminium"
        }
      },
      sikkerhet: {
        reflekser: true,
        bjelle: true,
        vannMotstand: "IPX4",
        sertifisering: ["EN15194", "CE"]
      },
      tilkobling: {
        app: true,
        gps: false,
        bluetooth: true,
        usb: true
      },
      tilbehør: {
        sidestøtte: true,
        skjermer: true,
        bagasjebrett: true,
        kurv: false,
        flaskeholder: true
      }
    },
    description: "JOBOBIKE Lyon Pro er en sofistikert by-elsykkel designet for den moderne pendleren. Med sin kraftige midtmotor og langdistanse batteri, tilbyr den den perfekte balansen mellom ytelse og effektivitet for bykjøring.",
    keyFeatures: [
      "Kraftig 250W midtmotor med 90 Nm dreiemoment",
      "Langdistanse 48V 15Ah avtakbart batteri",
      "Smart Bluetooth tilkobling med mobilapp",
      "Responsive hydrauliske skivebremser",
      "Komfortabelt gjennomgående rammedesign"
    ],
    availableColors: ["Matte Black", "Pearl White", "Ocean Blue"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Lyon Pro el-sykkel",
      "48V 15Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Monteringsverktøy",
      "Nøkler (2x)"
    ]
  },

  // 2. Jobobike Dyno GT
  {
    id: "8",
    name: "JOBOBIKE Dyno GT",
    slug: "jobobike-dyno-gt",
    originalPrice: 1699,
    price: 1449,
    discount: "15%",
    image: "/images/dyno/dyno-1.png",
    images: [
      "/images/dyno/dyno-1.png",
      "/images/dyno/dyno-2.png",

    ],
    features: [
      "250W bakhjulsmotor",
      "48V 15Ah smart batteri",
      "8-trinns Shimano giring",
      "Dreiemoment sensor",
      "Smart LCD-skjerm"
    ],
    category: ["Pendler" ,"Hybrid"],
    rating: 4.5,
    reviewCount: 89,
    specifications: {
      motor: "250W Rear Hub",
      battery: "48V 15Ah (720Wh)",
      range: "90+ km",
      speed: "25 km/h",
      weight: "26 kg",
      wheelSize: "27.5\"",
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminum Alloy",
      drivetrain: "8-Speed Shimano"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Dyno GT",
        rammeType: "Diamant",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "180 x 60 x 105 cm",
          sammenlagt: "N/A"
        },
        vekt: "26 kg",
        maksLast: "125 kg",
        anbefalteHøyde: "165-200 cm"
      },
      motor: {
        type: "Bakhjulsmotor",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "45 Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: true
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "3-4 timer",
        batteriLevetid: "1000+ sykluser"
      },
      ytelse: {
        maksFart: "25 km/h",
        rekkevidde: {
          renElektrisk: "70 km",
          pedalAssistanse: "90-120 km",
          kombinert: "80-100 km"
        },
        stigningsevne: "20°"
      },
      hjul: {
        størrelse: "27.5\"",
        dekkType: "Hybrid",
        dekkStørrelse: "27.5 x 1.95\"",
        felgMateriale: "Dobbeltvegg aluminium"
      },
      bremser: {
        foran: "Hydraulisk skive",
        bak: "Hydraulisk skive",
        type: "160mm rotorer"
      },
      giring: {
        type: "Girkasse",
        gir: "8-trinns",
        girskifter: "Shimano Altus"
      },
      elektrisk: {
        display: "Smart LCD Bluetooth",
        lys: {
          foran: true,
          bak: true,
          type: "Auto-sensing LED"
        },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer"
      },
      komfort: {
        demping: {
          foran: true,
          bak: false,
          type: "Låsbar gaffel"
        },
        sete: {
          type: "Sportsadel",
          justerbar: true,
          materiale: "Syntetisk"
        },
        styre: {
          type: "Flatt styre",
          justerbar: false,
          materiale: "Aluminium"
        }
      },
      sikkerhet: {
        reflekser: true,
        bjelle: true,
        vannMotstand: "IPX5",
        sertifisering: ["EN15194", "CE"]
      },
      tilkobling: {
        app: true,
        gps: false,
        bluetooth: true,
        usb: true
      },
      tilbehør: {
        sidestøtte: true,
        skjermer: true,
        bagasjebrett: false,
        kurv: false,
        flaskeholder: true
      }
    },
    description: "JOBOBIKE Dyno GT kombinerer smart teknologi med pålitelig ytelse. Med dreiemoment sensor og intelligent skjermsystem, er den perfekt for teknologikyndige bysyklister.",
    keyFeatures: [
      "Smart dreiemoment sensor for naturlig kjørefølelse",
      "Rask 3-timers ladekapasitet",
      "Auto-sensing baklys for sikkerhet",
      "Bluetooth LCD-skjerm med app-integrasjon",
      "Lett men holdbar aluminiumsramme"
    ],
    availableColors: ["Charcoal Gray", "Electric Blue", "Forest Green"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Dyno GT el-sykkel",
      "48V 15Ah batteri",
      "Hurtiglader",
      "Brukermanual",
      "Monteringssett",
      "Nøkler (2x)"
    ]
  },



  // 4. Jobobike Transer
  {
    id: "10",
    name: "JOBOBIKE Transer",
    slug: "jobobike-transer",
    originalPrice: 2199,
    price: 1899,
    discount: "14%",
    image: "/images/transer/transer-1.png",
    images: [
      "/images/transer/transer-1.png",
      "/images/transer/transer-2.png",
      "/images/transer/transer-3.png",
    ],
    features: [
      "250W midtmotor",
      "48V 17,5Ah batteri",
      "Lastekasse inkludert",
      "Familievennlig design",
      "Ekstra lang ramme"
    ],
    badge: "Family Choice",
    category: ["Sammenleggbar" , "Hybrid"],
    rating: 4.8,
    reviewCount: 123,
    specifications: {
      motor: "250W Mid-Drive",
      battery: "48V 17.5Ah (840Wh)",
      range: "80-100 km",
      speed: "25 km/h",
      weight: "32 kg",
      wheelSize: "26\"",
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminum Cargo",
      drivetrain: "8-Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Transer",
        rammeType: "Last/Langhale",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "220 x 65 x 110 cm",
          sammenlagt: "N/A"
        },
        vekt: "32 kg",
        maksLast: "180 kg",
        anbefalteHøyde: "160-195 cm"
      },
      motor: {
        type: "Mid-Drive",
        power: "250W",
        peakPower: "600W",
        torque: "80 N.m",
        location: "Center",
        torqueSensor: true
      },
      battery: {
        type: "Lithium-ion",
        voltage: "48V",
        capacity: "17.5Ah",
        capacityWh: "840Wh",
        removable: true,
        chargingTime: "5-6 hours",
        batteryLife: "800+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "60 km",
          pedalAssist: "80-100 km",
          combined: "70-90 km"
        },
        gradability: "20Â°"
      },
      wheels: {
        size: "26\"",
        tireType: "Cargo",
        tireSize: "26 x 2.35\"",
        rimMaterial: "Reinforced Aluminum"
      },
      brakes: {
        front: "Hydraulic Disc",
        rear: "Hydraulic Disc",
        type: "180mm Rotors"
      },
      transmission: {
        type: "Derailleur",
        gears: "8-Speed",
        shifter: "Shimano Acera"
      },
      electrical: {
        display: "LCD Display",
        lights: {
          front: true,
          rear: true,
          type: "Bright LED"
        },
        horn: true,
        throttle: false,
        assistLevels: "5 levels"
      },
      comfort: {
        suspension: {
          front: true,
          rear: false,
          type: "Cargo Fork"
        },
        seat: {
          type: "Comfort Saddle",
          adjustable: true,
          material: "Gel Padding"
        },
        handlebar: {
          type: "Cargo Bar",
          adjustable: true,
          material: "Aluminum"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["EN15194", "CE"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: true
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: true,
        bottleHolder: true
      }
    },
    description: "JOBOBIKE Transer er den ultimate familie lastesykkelen, designet for å trygt transportere barn og last med sin utvidede ramme og kraftige motorsystem.",
    keyFeatures: [
      "Utvidet lang ramme for maksimal lastekapasitet",
      "Kraftig midtmotor med høyt dreiemoment",
      "Ekstra stort batteri for lange familieturer",
      "Integrert lastekasse og sikkerhetstilbehør",
      "Stabil og komfortabel kjøring selv når fullt lastet"
    ],
    availableColors: ["Safety Orange", "Deep Blue", "Forest Green"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Transer el-sykkel",
      "48V 17.5Ah batteri",
      "Batterilader",
      "Lastekasse",
      "Sikkerhetsstropper",
      "Brukermanual",
      "Nøkler (2x)"
    ]
  },

  // 5. Jobobike Mover
  {
    id: "11",
    name: "JOBOBIKE Mover",
    slug: "jobobike-mover",
    originalPrice: 1399,
    price: 1199,
    discount: "14%",
    image: "/images/mover/mover-1.png",
    images: [
      "/images/mover/mover-1.png",
      "/images/mover/mover-2.png",
    ],
    features: [
      "250W bakhjulsmotor",
      "36V 14Ah batteri",
      "Gjennomgående ramme",
      "Komfortabel kjøreposisjon",
      "Integrerte lys"
    ],
    category: ["Fatbike"],
    rating: 4.4,
    reviewCount: 78,
    specifications: {
      motor: "250W Rear Hub",
      battery: "36V 14Ah (504Wh)",
      range: "70-90 km",
      speed: "25 km/h",
      weight: "23 kg",
      wheelSize: "28\"",
      foldable: false,
      brakes: "V-Brakes",
      frame: "Steel Step-Through",
      drivetrain: "7-Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Mover",
        rammeType: "Gjennomgående",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "175 x 60 x 105 cm",
          sammenlagt: "N/A"
        },
        vekt: "23 kg",
        maksLast: "110 kg",
        anbefalteHøyde: "150-185 cm"
      },
      motor: {
        type: "Rear Hub",
        power: "250W",
        peakPower: "400W",
        torque: "35 N.m",
        location: "Rear Wheel",
        torqueSensor: false
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "14Ah",
        capacityWh: "504Wh",
        removable: true,
        chargingTime: "4-5 hours",
        batteryLife: "700+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "50 km",
          pedalAssist: "70-90 km",
          combined: "60-80 km"
        },
        gradability: "15Â°"
      },
      wheels: {
        size: "28\"",
        tireType: "City",
        tireSize: "28 x 1.75\"",
        rimMaterial: "Aluminum"
      },
      brakes: {
        front: "V-Brake",
        rear: "V-Brake",
        type: "Traditional"
      },
      transmission: {
        type: "Derailleur",
        gears: "7-Speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "Integrated LED"
        },
        horn: false,
        throttle: true,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "None"
        },
        seat: {
          type: "Comfort Saddle",
          adjustable: true,
          material: "Foam Padding"
        },
        handlebar: {
          type: "Swept-Back",
          adjustable: false,
          material: "Steel"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["EN15194", "CE"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: true,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Mover tilbyr komfortabel, oppreist kjøring med sitt klassiske gjennomgående design. Perfekt for avslappende turer og daglig pendling med stil og komfort.",
    keyFeatures: [
      "Enkel gjennomgående ramme for komfortabel påstigning",
      "Oppreist kjøreposisjon reduserer belastning",
      "Integrert lyssystem for sikkerhet",
      "Klassisk bysykkel-styling med moderne el-sykkel teknologi",
      "Pålitelig og rimelig bytransport"
    ],
    availableColors: ["Classic Black", "Cream White", "Burgundy Red"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Mover el-sykkel",
      "36V 14Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Grunnleggende verktøysett",
      "Nøkler (2x)"
    ]
  },



  // 7. Jobobike Eddy X
  {
    id: "13",
    name: "JOBOBIKE Eddy X",
    slug: "jobobike-eddy-x",
    originalPrice: 1599,
    price: 1349,
    discount: "16%",
    image: "/images/eddy-x/eddy-1.png",
    images: [
      "/images/eddy-x/eddy-1.png",
      "/images/eddy-x/eddy-2.png",
    ],
    features: [
      "250W midtmotor",
      "36V 16Ah batteri",
      "Smart skjerm",
      "Integrert design",
      "By-optimalisert"
    ],
    category: ["Lastesykkel"],
    rating: 4.5,
    reviewCount: 94,
    specifications: {
      motor: "250W Mid-Drive",
      battery: "36V 16Ah (576Wh)",
      range: "80-100 km",
      speed: "25 km/h",
      weight: "25 kg",
      wheelSize: "28\"",
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Integrated Aluminum",
      drivetrain: "8-Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Eddy X",
        rammeType: "Integrert",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "180 x 60 x 105 cm",
          sammenlagt: "N/A"
        },
        vekt: "25 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "160-195 cm"
      },
      motor: {
        type: "Mid-Drive",
        power: "250W",
        peakPower: "500W",
        torque: "70 N.m",
        location: "Center",
        torqueSensor: true
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "16Ah",
        capacityWh: "576Wh",
        removable: false,
        chargingTime: "4-5 hours",
        batteryLife: "1000+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "60 km",
          pedalAssist: "80-100 km",
          combined: "70-90 km"
        },
        gradability: "20Â°"
      },
      wheels: {
        size: "28\"",
        tireType: "Urban",
        tireSize: "28 x 1.6\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Hydraulic Disc",
        rear: "Hydraulic Disc",
        type: "160mm Rotors"
      },
      transmission: {
        type: "Derailleur",
        gears: "8-Speed",
        shifter: "Shimano Acera"
      },
      electrical: {
        display: "Smart Color Display",
        lights: {
          front: true,
          rear: true,
          type: "Integrated LED"
        },
        horn: false,
        throttle: false,
        assistLevels: "5 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "None"
        },
        seat: {
          type: "Ergonomic Saddle",
          adjustable: true,
          material: "Synthetic Leather"
        },
        handlebar: {
          type: "Ergonomic Drop",
          adjustable: false,
          material: "Aluminum"
        }
      },
      safety: {
        reflectors: true,
        bell: false,
        waterResistance: "IPX5",
        certification: ["EN15194", "CE"]
      },
      connectivity: {
        app: true,
        gps: false,
        bluetooth: true,
        usb: true
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: false,
        basket: false,
        bottleHolder: true
      }
    },
    description: "JOBOBIKE Eddy X representerer fremtiden for by-elmobilitet med sitt elegante integrerte design og smarte teknologi. Perfekt for moderne pendlere som verdsetter både stil og ytelse.",
    keyFeatures: [
      "Elegant integrert batteridesign",
      "Smart fargeskjerm med tilkobling",
      "Effektivt midtmotorsystem",
      "Aerodynamisk ramme for byeffektivitet",
      "Moderne estetikk møter praktisk ytelse"
    ],
    availableColors: ["Graphite Gray", "Pure White", "Midnight Blue"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Eddy X el-sykkel",
      "Integrert batteri (ikke avtakbart)",
      "Smart lader",
      "Brukermanual",
      "App-oppsettguide",
      "Monteringsverktøy"
    ]
  },



  // 9. Jobobike Astra
  {
    id: "15",
    name: "JOBOBIKE Astra",
    slug: "jobobike-astra",
    originalPrice: 1199,
    price: 999,
    discount: "17%",
    image: "/images/astra/astra-1.png",
    images: [
      "/images/astra/astra-1.png",
      "/images/astra/astra-2.png",
    ],
    features: [
      "250W forhjulsmotor",
      "36V 10Ah batteri",
      "Lett design",
      "Budsjettennlig",
      "Enkel betjening"
    ],
    badge: "Best Value",
    category: ["Sammenleggbar"],
    rating: 4.2,
    reviewCount: 156,
    specifications: {
      motor: "250W Front Hub",
      battery: "36V 10Ah (360Wh)",
      range: "40-60 km",
      speed: "25 km/h",
      weight: "21 kg",
      wheelSize: "26\"",
      foldable: false,
      brakes: "V-Brakes",
      frame: "Steel",
      drivetrain: "6-Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Astra",
        rammeType: "Bysykkel",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "175 x 60 x 105 cm",
          sammenlagt: "N/A"
        },
        vekt: "21 kg",
        maksLast: "100 kg",
        anbefalteHøyde: "155-185 cm"
      },
      motor: {
        type: "Front Hub",
        power: "250W",
        peakPower: "350W",
        torque: "30 N.m",
        location: "Front Wheel",
        torqueSensor: false
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "10Ah",
        capacityWh: "360Wh",
        removable: true,
        chargingTime: "3-4 hours",
        batteryLife: "500+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "30 km",
          pedalAssist: "40-60 km",
          combined: "35-50 km"
        },
        gradability: "12Â°"
      },
      wheels: {
        size: "26\"",
        tireType: "City",
        tireSize: "26 x 1.95\"",
        rimMaterial: "Steel"
      },
      brakes: {
        front: "V-Brake",
        rear: "V-Brake",
        type: "Traditional"
      },
      transmission: {
        type: "Derailleur",
        gears: "6-Speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "Basic LED",
        lights: {
          front: true,
          rear: false,
          type: "Basic LED"
        },
        horn: false,
        throttle: true,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "None"
        },
        seat: {
          type: "Basic Comfort",
          adjustable: true,
          material: "PU"
        },
        handlebar: {
          type: "City Bar",
          adjustable: false,
          material: "Steel"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["EN15194", "CE"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: false,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Astra er den perfekte innstegs-el-sykkelen for budsjettbevisste syklister. Til tross for sin rimelige pris, leverer den pålitelig ytelse og alle de essensielle funksjonene som trengs for bypendling.",
    keyFeatures: [
      "Rimelig inngang til el-sykling",
      "Lett og enkel å håndtere",
      "Enkel, brukervennlig betjening",
      "Pålitelig forhjulsmotorsystem",
      "Perfekt for korte til middels pendlinger"
    ],
    availableColors: ["Basic Black", "Pearl White", "Sky Blue"],
    availableSizes: ["One Size"],
    whatsInTheBox: [
      "JOBOBIKE Astra el-sykkel",
      "36V 10Ah batteri",
      "Grunnlader",
      "Brukermanual",
      "Grunnverktøy",
      "Nøkler (2x)"
    ]
  },
  {
    id: "jobobike-viva",
    name: "JOBOBIKE Viva",
    slug: "jobobike-viva",
    originalPrice: 1699,
    price: 1399,
    discount: "-18%",
    image: "/images/viva/viva-1.png",
    images: [
      "/images/viva/viva-1.png",
      "/images/viva/viva-2.png",
      "/images/viva/viva-3.png",
      "/images/viva/viva-4.png",
      "/images/viva/viva-5.png",

    ],
    features: [
      "Lett 22kg aluminiumsramme",
      "250W XOFO bakhjulsmotor",
      "36V 14Ah LG batteri med BMS",
      "28-tommer hjul for jevn bykjøring",
      "Integrerte lys og skjermer"
    ],
    badge: "Lightweight",
    category: ["Pendler"],
    rating: 4.7,
    reviewCount: 89,
    specifications: {
      motor: "250W XOFO Rear Hub",
      battery: "36V 14Ah (504Wh)",
      range: "50-70 km",
      speed: "25 km/h",
      weight: "22 kg",
      wheelSize: "28\"",
      foldable: false,
      brakes: "Mechanical Disc Brakes",
      frame: "Aluminum Alloy 6061",
      drivetrain: "Shimano 7-speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Viva",
        rammeType: "Høy ramme",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "1850 x 680 x 1050 mm",
          sammenlagt: "N/A"
        },
        vekt: "22 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "165-185 cm"
      },
      motor: {
        type: "XOFO Brushless",
        power: "250W",
        peakPower: "450W",
        torque: "30 Nm",
        location: "Rear Hub",
        torqueSensor: false
      },
      battery: {
        type: "LG Lithium-ion",
        voltage: "36V",
        capacity: "14Ah",
        capacityWh: "504Wh",
        removable: true,
        chargingTime: "4-6 hours",
        batteryLife: "800-1000 cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "45 km",
          pedalAssist: "70 km",
          combined: "50-70 km"
        },
        gradability: "15°",
        turningRadius: "2.5m"
      },
      wheels: {
        size: "28\"",
        tireType: "City Tire",
        tireSize: "28 x 1.75\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Mechanical Disc",
        rear: "Mechanical Disc",
        type: "160mm Disc Brakes"
      },
      transmission: {
        type: "Derailleur",
        gears: "7-speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "LED Integrated"
        },
        horn: true,
        throttle: false,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "N/A"
        },
        seat: {
          type: "Ergonomic Saddle",
          adjustable: true,
          material: "Synthetic Leather"
        },
        handlebar: {
          type: "City Handlebar",
          adjustable: true,
          material: "Aluminum Alloy"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Viva er den letteste modellen i JOBOBIKE-familien med bare 22kg. Designet spesielt for bypendling, kombinerer den elegant design med praktisk funksjonalitet. Den lette aluminiumsrammen gjør den lett å bære og manøvrere gjennom bygatene, mens 28-tommer hjulene gir en jevn og komfortabel tur. Perfekt for motebevisste byboere som verdsetter stil og komfort.",
    keyFeatures: [
      "Ultra-lett 22kg konstruksjon",
      "Kraftig 250W bakhjulsmotor med 30Nm dreiemoment",
      "Langdistanse 504Wh batteri for utvidede turer",
      "Elegant bydesign med integrerte komponenter",
      "Pålitelig Shimano 7-trinns giring",
      "Innebygde lys og skjermer for all-vær kjøring"
    ],
    availableColors: ["Blue", "White", "Black"],
    availableSizes: ["One Size (165-185cm)"],
    whatsInTheBox: [
      "JOBOBIKE Viva el-sykkel",
      "36V 14Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle"
    ]
  },
  {
    id: "jobobike-viva-st",
    name: "JOBOBIKE Viva ST",
    slug: "jobobike-viva-st",
    originalPrice: 1699,
    price: 1399,
    discount: "-18%",
    image: "/images/viva-st/viva-st-1.png",
    images: [
      "/images/viva-st/viva-st-1.png",
      "/images/viva-st/viva-st-2.png",
      "/images/viva-st/viva-st-3.png",
      "/images/viva-st/viva-st-4.png",
      "/images/viva-st/viva-st-5.png",
    ],
    features: [
      "Gjennomgående ramme for enkel påstigning",
      "Lett 22kg design",
      "250W bakhjulsmotor",
      "36V 10,4Ah batteri",
      "Perfekt for bypendling"
    ],
    badge: "Step-Through",
    category: ["Pendler"],
    rating: 4.8,
    reviewCount: 76,
    specifications: {
      motor: "250W XOFO Rear Hub",
      battery: "36V 10.4Ah (374Wh)",
      range: "40-60 km",
      speed: "25 km/h",
      weight: "22 kg",
      wheelSize: "28\"",
      foldable: false,
      brakes: "Mechanical Disc Brakes",
      frame: "Step-through Aluminum Alloy",
      drivetrain: "Shimano 7-speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Viva ST",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "1850 x 680 x 1050 mm",
          sammenlagt: "N/A"
        },
        vekt: "22 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "165-185 cm"
      },
      motor: {
        type: "XOFO Brushless",
        power: "250W",
        peakPower: "450W",
        torque: "30 Nm",
        location: "Rear Hub",
        torqueSensor: false
      },
      battery: {
        type: "LG Lithium-ion",
        voltage: "36V",
        capacity: "10.4Ah",
        capacityWh: "374Wh",
        removable: true,
        chargingTime: "4-5 hours",
        batteryLife: "800-1000 cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "35 km",
          pedalAssist: "60 km",
          combined: "40-60 km"
        },
        gradability: "15°",
        turningRadius: "2.5m"
      },
      wheels: {
        size: "28\"",
        tireType: "City Tire",
        tireSize: "28 x 1.75\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Mechanical Disc",
        rear: "Mechanical Disc",
        type: "160mm Disc Brakes"
      },
      transmission: {
        type: "Derailleur",
        gears: "7-speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "LED Integrated"
        },
        horn: true,
        throttle: false,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "N/A"
        },
        seat: {
          type: "Comfort Saddle",
          adjustable: true,
          material: "Synthetic Leather"
        },
        handlebar: {
          type: "Swept-back Handlebar",
          adjustable: true,
          material: "Aluminum Alloy"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Viva ST har et gjennomgående rammedesign som gjør på- og avstigning enkel. Ideell for syklister som prioriterer komfort og bekvemmelighet, kombinerer denne lette by-el-sykkelen elegant styling med praktisk byfunksjonalitet. Den lave inngangsrammen er perfekt for daglige pendlinger og avslappende turer rundt i byen.",
    keyFeatures: [
      "Enkel gjennomgående rammedesign",
      "Ultra-lett 22kg konstruksjon",
      "Pålitelig 250W motor med 30Nm dreiemoment",
      "Komfortabel oppreist kjøreposisjon",
      "Integrerte lys og skjermer",
      "Jevnt Shimano 7-trinns girsystem"
    ],
    availableColors: ["Blue", "White", "Cream"],
    availableSizes: ["One Size (165-185cm)"],
    whatsInTheBox: [
      "JOBOBIKE Viva ST el-sykkel",
      "36V 10.4Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle"
    ]
  },
  {
    id: "jobobike-henry",
    name: "JOBOBIKE Henry",
    slug: "jobobike-henry",
    originalPrice: 2299,
    price: 1899,
    discount: "-17%",
    image: "/images/henry/henry-1.png",
    images: [
     "/images/henry/henry-1.png",
     "/images/henry/henry-2.png",
    ],
    features: [
      "Bafang M200 midtmotor",
      "Skjult integrert batteri",
      "Retro klassisk design",
      "28-tommer hjul",
      "Premium komponenter"
    ],
    badge: "Mid-Drive",
    category: ["Terreng"],
    rating: 4.9,
    reviewCount: 64,
    specifications: {
      motor: "Bafang M200 Mid-Drive 250W",
      battery: "36V 14Ah (504Wh)",
      range: "60-90 km",
      speed: "25 km/h",
      weight: "24 kg",
      wheelSize: "28\"",
      foldable: false,
      brakes: "Hydraulic Disc Brakes",
      frame: "Classic Step-over Aluminum",
      drivetrain: "Shimano 8-speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Henry",
        rammeType: "Høy klassisk ramme",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "1900 x 700 x 1100 mm",
          sammenlagt: "N/A"
        },
        vekt: "24 kg",
        maksLast: "125 kg",
        anbefalteHøyde: "170-195 cm"
      },
      motor: {
        type: "Bafang M200",
        power: "250W",
        peakPower: "500W",
        torque: "55 Nm",
        location: "Mid-Drive",
        torqueSensor: true
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "14Ah",
        capacityWh: "504Wh",
        removable: true,
        chargingTime: "4-6 hours",
        batteryLife: "1000+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "50 km",
          pedalAssist: "90 km",
          combined: "60-90 km"
        },
        gradability: "20°",
        turningRadius: "2.8m"
      },
      wheels: {
        size: "28\"",
        tireType: "City Tire",
        tireSize: "28 x 1.75\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Hydraulic Disc",
        rear: "Hydraulic Disc",
        type: "180mm Disc Brakes"
      },
      transmission: {
        type: "Derailleur",
        gears: "8-speed",
        shifter: "Shimano Altus"
      },
      electrical: {
        display: "Color LCD Display",
        lights: {
          front: true,
          rear: true,
          type: "LED Integrated"
        },
        horn: true,
        throttle: false,
        assistLevels: "5 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "N/A"
        },
        seat: {
          type: "Ergonomic Saddle",
          adjustable: true,
          material: "Genuine Leather"
        },
        handlebar: {
          type: "Classic Handlebar",
          adjustable: true,
          material: "Aluminum Alloy"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX5",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: true
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Henry er en raffinert by-el-sykkel designet for menn som verdsetter minimalistisk stil og banebrytende teknologi. Med en kraftig Bafang M200 midtmotor med dreiemoment sensor, leverer den en jevn, naturlig kjøreopplevelse. Den skjulte batteriintegrasjonen gir et rent, klassisk utseende samtidig som den opprettholder moderne el-sykkel ytelse.",
    keyFeatures: [
      "Premium Bafang M200 midtmotor med 55Nm dreiemoment",
      "Integrert skjult batteri for elegant estetikk",
      "Dreiemoment sensor for naturlig pedalassistanse",
      "Høykvalitets hydrauliske skivebremser",
      "Farget LCD-skjerm med omfattende data",
      "Klassisk retro-styling med moderne teknologi"
    ],
    availableColors: ["Matte Black", "Forest Green", "Navy Blue"],
    availableSizes: ["One Size (170-195cm)"],
    whatsInTheBox: [
      "JOBOBIKE Henry el-sykkel",
      "36V 14Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle"
    ]
  },

  {
    id: "jobobike-ace",
    name: "JOBOBIKE Ace",
    slug: "jobobike-ace",
    originalPrice: 1599,
    price: 1299,
    discount: "-19%",
    image: "/images/ace/ace-1.png",
    images: [
     "/images/ace/ace-1.png",
     "/images/ace/ace-2.png",
     "/images/ace/ace-3.png",
    ],
    features: [
      "Sammenleggbart kompakt design",
      "Mobilapp kontroll",
      "250W motor med 45Nm dreiemoment",
      "20-tommer hjul",
      "Lett og bærbar"
    ],
    badge: "Foldable",
    category: ["Hybrid", "Pendler"],
    rating: 4.6,
    reviewCount: 118,
    specifications: {
      motor: "250W Rear Hub",
      battery: "36V 10Ah (360Wh)",
      range: "40-60 km",
      speed: "25 km/h",
      weight: "21 kg",
      wheelSize: "20\" x 2.125\"",
      foldable: true,
      brakes: "Mechanical Disc Brakes",
      frame: "Foldable Aluminum Alloy",
      drivetrain: "Single Speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Ace",
        rammeType: "Sammenleggbar",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: {
          utbrettet: "1480 x 580 x 1050 mm",
          sammenlagt: "800 x 450 x 650 mm"
        },
        vekt: "21 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "155-190 cm"
      },
      motor: {
        type: "Brushless",
        power: "250W",
        peakPower: "450W",
        torque: "45 Nm",
        location: "Rear Hub",
        torqueSensor: false
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "10Ah",
        capacityWh: "360Wh",
        removable: true,
        chargingTime: "4-5 hours",
        batteryLife: "800+ cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "35 km",
          pedalAssist: "60 km",
          combined: "40-60 km"
        },
        gradability: "15°",
        turningRadius: "2.0m"
      },
      wheels: {
        size: "20\"",
        tireType: "CST Anti-Puncture",
        tireSize: "20 x 2.125\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Mechanical Disc",
        rear: "Mechanical Disc",
        type: "160mm Disc Brakes"
      },
      transmission: {
        type: "Single Speed",
        gears: "1-speed",
        shifter: "N/A"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "LED with Reflective Strips"
        },
        horn: true,
        throttle: false,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: false,
          rear: false,
          type: "N/A"
        },
        seat: {
          type: "Comfort Saddle",
          adjustable: true,
          material: "Synthetic Leather"
        },
        handlebar: {
          type: "Foldable Handlebar",
          adjustable: true,
          material: "Aluminum Alloy"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: true,
        gps: false,
        bluetooth: true,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: false,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Ace er den perfekte løsningen for bypendlere som trenger en kompakt, bærbar el-sykkel. Det innovative sammenleggbare designet tillater enkel oppbevaring i leiligheter, kontorer eller bilbagasjerom. Til tross for sin kompakte størrelse, leverer den imponerende ytelse med en 250W motor og smart app-tilkobling for moderne syklister.",
    keyFeatures: [
      "Hurtig-sammenlegging design for enkel transport",
      "Mobilapp kontroll via Bluetooth",
      "Kraftig 250W motor med 45Nm dreiemoment",
      "CST punkteringssikre dekk med reflekterende striper",
      "Kompakte 20-tommer hjul for smidig bykjøring",
      "Lett 21kg for enkel bæring"
    ],
    availableColors: ["Black", "White", "Grey"],
    availableSizes: ["Universal (155-190cm)"],
    whatsInTheBox: [
      "JOBOBIKE Ace el-sykkel",
      "36V 10Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle"
    ]
  },
  {
    id: "jobobike-triker",
    name: "JOBOBIKE Triker",
    slug: "jobobike-triker",
    originalPrice: 2199,
    price: 1799,
    discount: "-18%",
    image: "/images/triker/triker-1.png",
    images: [
      "/images/triker/triker-1.png",
      "/images/triker/triker-2.png",
    ],
    features: [
      "Tre-hjuls elektrisk trehjulsykkel",
      "Stor bakre lastekurv",
      "Ekstra stabilitet og sikkerhet",
      "250W motor med differensial",
      "Perfekt for seniorer og last"
    ],
    badge: "Tricycle",
    category: ["Hybrid", "Terreng"],
    rating: 4.9,
    reviewCount: 54,
    specifications: {
      motor: "250W Differential Motor",
      battery: "36V 13Ah (468Wh)",
      range: "50-70 km",
      speed: "25 km/h",
      weight: "38 kg",
      wheelSize: "24\" Front / 20\" Rear",
      foldable: false,
      brakes: "V-Brakes",
      frame: "Low Step-through Steel",
      drivetrain: "Shimano 7-speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Triker",
        rammeType: "Lav gjennomgående trehjulsykkel",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "1800 x 750 x 1100 mm",
          sammenlagt: "N/A"
        },
        vekt: "38 kg",
        maksLast: "160 kg",
        anbefalteHøyde: "155-185 cm"
      },
      motor: {
        type: "Differential Motor",
        power: "250W",
        peakPower: "450W",
        torque: "35 Nm",
        location: "Rear Axle",
        torqueSensor: false
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "13Ah",
        capacityWh: "468Wh",
        removable: true,
        chargingTime: "5-6 hours",
        batteryLife: "800-1000 cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "45 km",
          pedalAssist: "70 km",
          combined: "50-70 km"
        },
        gradability: "12°",
        turningRadius: "3.5m"
      },
      wheels: {
        size: "24\" / 20\"",
        tireType: "Puncture-Resistant",
        tireSize: "24\" x 1.95\" / 20\" x 1.95\"",
        rimMaterial: "Steel"
      },
      brakes: {
        front: "V-Brake",
        rear: "V-Brake",
        type: "V-Brake System"
      },
      transmission: {
        type: "Derailleur",
        gears: "7-speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "LED"
        },
        horn: true,
        throttle: true,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: true,
          rear: false,
          type: "Spring Fork"
        },
        seat: {
          type: "Extra Wide Comfort Saddle",
          adjustable: true,
          material: "Synthetic Leather with Springs"
        },
        handlebar: {
          type: "Ergonomic Swept-back",
          adjustable: true,
          material: "Steel"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: false,
        basket: true,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Triker er en innovativ tre-hjuls elektrisk trehjulsykkel designet for maksimal stabilitet og lastekapasitet. Perfekt for seniorer, leveringstjenester eller alle som verdsetter ekstra stabilitet. Den store bakre kurven kan bære dagligvarer, pakker eller last med letthet, mens den lave gjennomgående rammen sikrer enkel på- og avstigning.",
    keyFeatures: [
      "Overlegen tre-hjuls stabilitet",
      "Stor bakre lastekurv (100L kapasitet)",
      "Lav gjennomgående ramme for enkel tilgang",
      "Differensialmotor for jevne svinger",
      "Ekstra bred komfortsadel med demping",
      "Perfekt for seniorer og lastetransport"
    ],
    availableColors: ["Blue", "Black", "Red"],
    availableSizes: ["Universal (155-185cm)"],
    whatsInTheBox: [
      "JOBOBIKE Triker el-trehjulsykkel",
      "36V 13Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
      "Bakre lastekurv"
    ]
  },

  {
    id: "jobobike-dyno",
    name: "JOBOBIKE Dyno",
    slug: "jobobike-dyno",
    originalPrice: 1799,
    price: 1499,
    discount: "-17%",
    image: "/images/dyno-gt/dyno-gt-1.png",
    images: [
      "/images/dyno-gt/dyno-gt-1.png",
      "/images/dyno-gt/dyno-gt-2.png",
    ],
    features: [
      "Gjennomgående komfortdesign",
      "250W pålitelig motor",
      "Frontdemping",
      "26-tommer hjul",
      "Rimelig kvalitet"
    ],
    badge: "Best Value",
    category: ["Hybrid"],
    rating: 4.6,
    reviewCount: 103,
    specifications: {
      motor: "250W Rear Hub",
      battery: "36V 13Ah (468Wh)",
      range: "50-70 km",
      speed: "25 km/h",
      weight: "25 kg",
      wheelSize: "26\" x 1.95\"",
      foldable: false,
      brakes: "Mechanical Disc Brakes",
      frame: "Step-through Aluminum Alloy",
      drivetrain: "Shimano 7-speed"
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "JOBOBIKE Dyno",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: {
          utbrettet: "1850 x 680 x 1100 mm",
          sammenlagt: "N/A"
        },
        vekt: "25 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "160-185 cm"
      },
      motor: {
        type: "Brushless",
        power: "250W",
        peakPower: "450W",
        torque: "40 Nm",
        location: "Rear Hub",
        torqueSensor: false
      },
      battery: {
        type: "Lithium-ion",
        voltage: "36V",
        capacity: "13Ah",
        capacityWh: "468Wh",
        removable: true,
        chargingTime: "5-6 hours",
        batteryLife: "800-1000 cycles"
      },
      performance: {
        maxSpeed: "25 km/h",
        range: {
          pureElectric: "45 km",
          pedalAssist: "70 km",
          combined: "50-70 km"
        },
        gradability: "15°",
        turningRadius: "2.6m"
      },
      wheels: {
        size: "26\"",
        tireType: "City Tire",
        tireSize: "26 x 1.95\"",
        rimMaterial: "Aluminum Alloy"
      },
      brakes: {
        front: "Mechanical Disc",
        rear: "Mechanical Disc",
        type: "160mm Disc Brakes"
      },
      transmission: {
        type: "Derailleur",
        gears: "7-speed",
        shifter: "Shimano Tourney"
      },
      electrical: {
        display: "LED Display",
        lights: {
          front: true,
          rear: true,
          type: "LED"
        },
        horn: true,
        throttle: false,
        assistLevels: "3 levels"
      },
      comfort: {
        suspension: {
          front: true,
          rear: false,
          type: "Spring Fork"
        },
        seat: {
          type: "Comfort Saddle",
          adjustable: true,
          material: "Synthetic Leather"
        },
        handlebar: {
          type: "Ergonomic Handlebar",
          adjustable: true,
          material: "Aluminum Alloy"
        }
      },
      safety: {
        reflectors: true,
        bell: true,
        waterResistance: "IPX4",
        certification: ["CE", "EN15194"]
      },
      connectivity: {
        app: false,
        gps: false,
        bluetooth: false,
        usb: false
      },
      accessories: {
        kickstand: true,
        mudguards: true,
        rack: true,
        basket: false,
        bottleHolder: false
      }
    },
    description: "JOBOBIKE Dyno tilbyr eksepsjonell verdi for bypendlere som søker komfort og pålitelighet. Det gjennomgående rammedesignet sikrer enkel påstigning, mens frontdempingen absorberer støt for en jevn tur. Med solid rekkevidde og pålitelige komponenter, er det et utmerket valg for daglig pendling uten å ruinere budsjettet.",
    keyFeatures: [
      "Enkel gjennomgående rammedesign",
      "Frontdemping for komfortable turer",
      "Pålitelig 250W motor med 40Nm dreiemoment",
      "Langdistanse 468Wh batteri",
      "26-tommer hjul for stabilitet",
      "Utmerket verdi for pengene"
    ],
    availableColors: ["White", "Black", "Silver"],
    availableSizes: ["Universal (160-185cm)"],
    whatsInTheBox: [
      "JOBOBIKE Dyno el-sykkel",
      "36V 13Ah batteri",
      "Batterilader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle"
    ]
  },


];



// âœ… Get product by slug
export const getProductBySlug = (slug: string): ProductCard | undefined => {
  return PRODUCTS_DATA.find((product) => product.slug === slug);
};

// âœ… Get all slugs
export const getAllProductSlugs = (): string[] => {
  return PRODUCTS_DATA.map((product) => product.slug);
};

// âœ… Get related products
export const getRelatedProducts = (
  currentProductId: string,
  limit: number = 3
): ProductCard[] => {
  return PRODUCTS_DATA.filter((p) => p.id !== currentProductId).slice(0, limit);
};

// âœ… Get products by category
export const getProductsByCategory = (category: string): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.category.includes(category)
  );
};

// âœ… Search products
export const searchProducts = (query: string): ProductCard[] => {
  if (!query || query.trim().length === 0) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  return PRODUCTS_DATA.filter((product) => {
    // Search in product name
    if (product.name.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in description
    if (product.description.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in features
    if (product.features && product.features.some(feature =>
      feature.toLowerCase().includes(lowerQuery)
    )) return true;
    
    // Search in key features
    if (product.keyFeatures && product.keyFeatures.some(feature =>
      feature.toLowerCase().includes(lowerQuery)
    )) return true;
    
    // Search in categories
    if (product.category && product.category.some(cat =>
      cat.toLowerCase().includes(lowerQuery)
    )) return true;
    
    // Search in specifications
    if (product.specifications) {
      const specs = product.specifications;
      if (specs.motor && specs.motor.toLowerCase().includes(lowerQuery)) return true;
      if (specs.battery && specs.battery.toLowerCase().includes(lowerQuery)) return true;
      if (specs.frame && specs.frame.toLowerCase().includes(lowerQuery)) return true;
      if (specs.drivetrain && specs.drivetrain.toLowerCase().includes(lowerQuery)) return true;
    }
    
    // Search in badge
    if (product.badge && product.badge.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in colors
    if (product.availableColors && product.availableColors.some(color =>
      color.toLowerCase().includes(lowerQuery)
    )) return true;
    
    return false;
  });
};

// âœ… Get products by price range
export const getProductsByPriceRange = (
  minPrice: number,
  maxPrice: number
): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.price >= minPrice && product.price <= maxPrice
  );
};

// âœ… Get products sorted by price
export const getProductsSortedByPrice = (ascending: boolean = true): ProductCard[] => {
  return [...PRODUCTS_DATA].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price
  );
};

// âœ… Get products sorted by rating
export const getProductsSortedByRating = (ascending: boolean = false): ProductCard[] => {
  return [...PRODUCTS_DATA].sort((a, b) =>
    ascending ? a.rating - b.rating : b.rating - a.rating
  );
};

// âœ… Get featured products (with badges)
export const getFeaturedProducts = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => product.badge);
};

// âœ… Get lightweight products
export const getLightweightProducts = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.category.includes('lightweight')
  );
};

// âœ… Get folding bikes
export const getFoldingBikes = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.specifications.foldable === true
  );
};

// âœ… Get commuter bikes
export const getCommuterBikes = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.category.includes('commuter-ebike')
  );
};

// âœ… Get step-through bikes
export const getStepThroughBikes = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) =>
    product.category.includes('step-through')
  );
};

export const getProductById = (id: string) => {
  return PRODUCTS_DATA.find(product => product.id === id);
};
