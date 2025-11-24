// src/lib/productData.ts
export interface ProductVariant {
  variantName: string;
  originalPrice: number;
  price: number;
  image: string;
  images: string[];
  description: string;
  keyFeatures: string[];
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
  tekniskeSpesifikasjoner: any;
  whatsInTheBox: string[];
}

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
  inStock?: boolean;
  variants?: ProductVariant[];
  colors?: string[];
  colorImages?: { [color: string]: string };
  colorImageArrays?: { [color: string]: string[] };
  modelVariants?: Array<{ name: string; slug: string; price: number }>;
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
  // Detaljerte tekniske spesifikasjoner (norsk struktur)
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
  availableSizes: string[];
  whatsInTheBox: string[];
}

// PRODUKTDATA (alle på norsk, konsistente nøkler)
export const PRODUCTS_DATA: ProductCard[] = [
  // 1. JOBOBIKE Luxe Snøhvit
  {
    id: "luxe-snow-001",
    name: "LUXE - JoboBike",
    slug: "jobobike-luxe-snohvit",
    originalPrice: 34999,
    price: 14000,
    discount: "9%",
    image: "/images/luxe/luxe-1.jpg",
    images: ["/images/luxe/luxe-1.jpg", "/images/luxe/luxe-2.png"],
    features: [
      "Karbon drivrem system",
      "Intern 8-trinns giring",
      "Hydrauliske bremser",
      "Smart App tilkobling via Bluetooth",
      "Automatisk bremselys sensing",
    ],
    badge: "Smart teknologi",
    category: ["Pendler"],
    rating: 4.8,
    reviewCount: 89,
    colors: ["Hvit", "Grå"],
    colorImages: {
      "Hvit": "/images/luxe/luxe-1.jpg",
      "Grå": "/images/luxe/luxegrey1.jpg"
    },
    colorImageArrays: {
      "Hvit": ["/images/luxe/luxe-1.jpg", "/images/luxe/luxe-2.png"],
      "Grå": ["/images/luxe/luxegrey1.jpg", "/images/luxe/luxegrey2.jpg"]
    },
    specifications: {
      motor: "XOFO 36V250W Mid",
      battery: "36V15Ah Samsung",
      range: "90km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '27.5"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminiumslegering",
      drivetrain: "Shimano Nexus 8",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Luxe",
        rammeType: "Høy urban ramme",
        rammeMateriale: "Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "158×28×85 cm", sammenlagt: "N/A" },
        vekt: "27kg",
        maksLast: "120kg",
        anbefalteHøyde: "165-195cm",
      },
      motor: {
        type: "Midtmotor (XOFO)",
        effekt: "250W",
        toppEffekt: "400W",
        dreiemoment: "90Nm",
        plassering: "Senter",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "Samsung Lithium-ion med BMS",
        spenning: "36V",
        kapasitet: "15Ah",
        kapasitetWh: "540Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "65-90 km", kombinert: "65-90 km" },
        stigningsevne: "15°",
        svingradius: "2.5m",
      },
      hjul: {
        størrelse: '27.5"',
        dekkType: "Bydekk",
        dekkStørrelse: '27.5×2.4',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Hydraulisk skivebrems", bak: "Hydraulisk skivebrems", type: "Hydraulic Disc" },
      giring: { type: "Intern navgiring", gir: "Shimano Nexus 8", girskifter: "Gripskift" },
      elektrisk: {
        display: "LCD + Bluetooth",
        lys: { foran: true, bak: true, type: "LED med automatisk bremselys" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer + auto",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Stiv" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Bystyre", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX5", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: false },
    },
    description:
      "JOBOBIKE Luxe er en premium smart by-elsykkel med vedlikeholdsfritt karbon drivrem og intern 8-trinns giring. Bluetooth-app gir sanntidsdata og personlige innstillinger.",
    keyFeatures: [
      "XOFO 250W, 90Nm",
      "36V 15Ah Samsung (540Wh)",
      "Opptil 90 km rekkevidde",
      "27.5×2.4 Belt dekk",
      "Aluminiumslegering ramme",
      "Hydraulic Disc bremser",
      "Shimano Nexus 8",
      "LCD + Bluetooth",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Luxe el-sykkel",
      "36V 15Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front- og baklys",
      "Sidestøtte",
      "Bjelle",
    ],
  },

  // 2. JOBOBIKE Robin
  {
    id: "robin-001",
    name: "ROBIN - JoboBike",
    slug: "jobobike-robin",
    originalPrice: 28999,
    price: 17399.4,
    discount: "18%",
    image: "/images/robin/robin-1.png",
    images: ["/images/robin/robin-1.png", 
      "/images/robin/robin-2.png",
      "/images/robin/robin-3.jpg",
       "/images/robin/robin-4.jpg",
       "/images/robin/robin-5.jpg", 
       "/images/robin/robin-6.jpg"],
    features: [
      '26" x 4,0" fatbike-dekk',
      "80mm RST hydraulisk demping",
      "Bafang 250W motor, 80Nm",
      "All-terreng",
      "USB-ladeport",
    ],
    badge: "All-terreng",
    category: ["Fatbike", "Terreng"],
    rating: 4.7,
    reviewCount: 156,
    modelVariants: [
      { name: "Robin", slug: "jobobike-robin", price: 28999 },
      { name: "Robin Pro", slug: "jobobike-robin-pro", price: 32999 }
    ],
    specifications: {
      motor: "Bafang 48V250W Hub",
      battery: "48V13Ah",
      range: "65km",
      speed: "25 km/t",
      weight: "44 kg",
      wheelSize: '26"',
      foldable: false,
      brakes: "Tektro Mechanical Disc",
      frame: "6061 aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Robin",
        rammeType: "Høy ramme / Gjennomgående tilgjengelig",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "1620×280×920 mm", sammenlagt: "N/A" },
        vekt: "44kg",
        maksLast: "150kg",
        anbefalteHøyde: "160-200cm",
      },
      motor: {
        type: "Bakhjulsmotor",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Lithium-ion med BMS",
        spenning: "48V",
        kapasitet: "13Ah",
        kapasitetWh: "624Wh",
        avtakbar: true,
        ladetid: "6-8 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "40 km", pedalAssistanse: "55-65 km", kombinert: "55-65 km" },
        stigningsevne: "20°",
        svingradius: "3m",
      },
      hjul: {
        størrelse: '26"',
        dekkType: "Fatbike",
        dekkStørrelse: '26×4',
        felgMateriale: "Aluminiumslegering bred felg",
      },
      bremser: { foran: "Mekanisk skivebrems", bak: "Mekanisk skivebrems", type: "Tektro Mechanical Disc" },
      giring: { type: "Ekstern gir", gir: "7-trinns Shimano", girskifter: "Shimano vrigrep" },
      elektrisk: {
        display: "YL-81F LCD",
        lys: { foran: true, bak: true, type: "LED 60 LUX foran, bremselys bak" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "RST hydraulisk 80mm" },
        sete: { type: "Velo lær komfort", justerbar: true, materiale: "Lær" },
        styre: { type: "Terreng 720mm", justerbar: false, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE", "TUV"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "JOBOBIKE Robin er en kraftig fatbike for eventyr i skog, fjell og snø. Store 26\" x 4,0\" dekk og RST-demping gir grep og stabilitet i all slags terreng.",
    keyFeatures: [
      "Bafang 250W, 80Nm",
      "48V 13Ah (624Wh)",
      "Opptil 65 km rekkevidde",
      "26×4.0 CST/Kenda Fat Tires",
      "6061 Aluminiumslegering ramme (Maks last 150kg)",
      "80mm RST Hydraulisk demping",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "YL-81F LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Robin el-sykkel",
      "48V 13Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front LED-lys (60 LUX)",
      "Bakre bremselys",
      "Sidestøtte",
      "Bjelle",
    ],
  },

  // 3. JOBOBIKE Robin Pro
  {
    id: "robin-pro-001",
    name: "ROBIN PRO - JoboBike",
    slug: "jobobike-robin-pro",
    originalPrice: 32999,
    price: 19799.4,
    discount: "14%",
    image: "/images/robin-pro/robin-pro-1.png",
    images: ["/images/robin-pro/robin-pro-1.png",
      "/images/robin-pro/robin-pro-2.jpg"
    ],
    colors: ["Svart", "Grå"],
    colorImages: {
      "Svart": "/images/robin-pro/robin-pro-1.png",
      "Grå": "/images/robin-pro/robin-pro-green-1.jpg"
    },
    colorImageArrays: {
      "Svart": ["/images/robin-pro/robin-pro-1.png", "/images/robin-pro/robin-pro-2.jpg"],
      "Grå": ["/images/robin-pro/robin-pro-green-1.jpg", "/images/robin-pro/robin-pro-green-2.jpg"]
    },
    features: [
      "48V 20Ah batteri (utvidet rekkevidde)",
      '26" x 4,0" fatbike-dekk',
      "80mm RST hydraulisk demping",
      "Opptil 90km pr lading",
      "Premium all-terreng",
    ],
    badge: "Utvidet rekkevidde",
    category: ["Fatbike"],
    rating: 4.9,
    reviewCount: 98,
    modelVariants: [
      { name: "Robin", slug: "jobobike-robin", price: 28999 },
      { name: "Robin Pro", slug: "jobobike-robin-pro", price: 32999 }
    ],
    specifications: {
      motor: "Bafang 48V250W Hub",
      battery: "48V20Ah",
      range: "90km",
      speed: "25 km/t",
      weight: "44 kg",
      wheelSize: '26"',
      foldable: false,
      brakes: "Tektro Hydraulic Disc",
      frame: "6061 aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Robin Pro",
        rammeType: "Høy ramme / Gjennomgående tilgjengelig",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "1620×280×920 mm", sammenlagt: "N/A" },
        vekt: "44kg",
        maksLast: "150kg",
        anbefalteHøyde: "160-200cm",
      },
      motor: {
        type: "Bakhjulsmotor",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Lithium-ion med BMS",
        spenning: "48V",
        kapasitet: "20Ah",
        kapasitetWh: "960Wh",
        avtakbar: true,
        ladetid: "8-10 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "70-90 km", kombinert: "70-90 km" },
        stigningsevne: "20°",
        svingradius: "3m",
      },
      hjul: {
        størrelse: '26"',
        dekkType: "Fatbike",
        dekkStørrelse: '26×4',
        felgMateriale: "Aluminiumslegering bred felg",
      },
      bremser: { foran: "Hydraulisk skivebrems", bak: "Hydraulisk skivebrems", type: "Tektro Hydraulic Disc" },
      giring: { type: "Ekstern gir", gir: "7-trinns Shimano", girskifter: "Shimano vrigrep" },
      elektrisk: {
        display: "YL-81F LCD",
        lys: { foran: true, bak: true, type: "LED 60 LUX foran, bremselys bak" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "RST hydraulisk 80mm" },
        sete: { type: "Velo lær komfort", justerbar: true, materiale: "Lær" },
        styre: { type: "Terreng 720mm", justerbar: false, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE", "TUV"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "Robin Pro bygger på Robin med 48V 20Ah (960Wh) batteri for opptil 90km. Ideell for lengre eventyr i krevende terreng.",
    keyFeatures: [
      "Bafang 250W, 80Nm",
      "48V 20Ah (960Wh)",
      "Opptil 90 km rekkevidde",
      "26×4.0 CST/Kenda Fat Tires",
      "6061 Aluminiumslegering ramme (Maks last 150kg)",
      "80mm RST Hydraulisk demping",
      "Tektro Hydraulic Disc bremser",
      "Shimano 7-Speed",
      "YL-81F LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Robin Pro el-sykkel",
      "48V 20Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front LED-lys (60 LUX)",
      "Bakre bremselys",
      "Sidestøtte",
      "Bjelle",
    ],
  },

  // 4. JOBOBIKE Romer
  {
    id: "romer-001",
    name: "ROMER - JoboBike",
    slug: "jobobike-romer",
    originalPrice: 28999,
    price: 17399.4,
    discount: "10%",
    image: "/images/romer/romer-1.png",
    images: [
 
      "/images/romer/romer-1.png","/images/romer/romer-3.png",
    ],
    features: [
      "Sammenleggbart design",
      '20" fatbike-dekk',
      "Gjennomgående ramme",
      "Tilbehørskompatibel",
      "Opptil 150km (økonomodus)",
    ],
    badge: "Nytte",
    category: ["Sammenleggbar", "Fatbike", "Pendler"],
    rating: 4.6,
    reviewCount: 112,
    modelVariants: [
      { name: "Romer", slug: "jobobike-romer", price: 28999 },
      { name: "Romer C", slug: "jobobike-romer-c", price: 26999 },
      { name: "Romer Pro", slug: "jobobike-romer-pro", price: 29999 }
    ],
    specifications: {
      motor: "Bafang 48V250W Hub",
      battery: "48V15Ah LG",
      range: "65-150km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '20"',
      foldable: true,
      brakes: "Tektro Mechanical Disc",
      frame: "Dobbeltlags aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Romer",
        rammeType: "Gjennomgående sammenleggbar",
        rammeMateriale: "Dobbeltlags aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: { utbrettet: "165cm x 110cm x 70cm", sammenlagt: "106cm x 60cm x 86cm" },
        vekt: "30kg",
        maksLast: "150kg",
        anbefalteHøyde: "160cm+",
      },
      motor: {
        type: "Bakhjulsmotor (Bafang)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "LG Lithium-ion med BMS",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "6-8 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "65-150 km (avhengig av forhold)", kombinert: "65-150 km (avhengig av forhold)" },
        stigningsevne: "18°",
        svingradius: "2.2m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "Fatbike",
        dekkStørrelse: '20×3.0',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Mekanisk skivebrems", bak: "Mekanisk skivebrems", type: "Tektro Mechanical Disc" },
      giring: { type: "Ekstern gir", gir: "7-trinns Shimano", girskifter: "Shimano vrigrep" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED med vanntett kabling" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Stiv (fat-dekk demper)" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Sammenleggbart", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: true, flaskeholder: false },
    },
    description:
      "Romer er en allsidig nyttesykkel med sammenleggbart design og gjennomgående ramme. Dobbeltramme beskytter batteriet og gir styrke – kompatibel med tilhenger/barnesete.",
    keyFeatures: [
      "Bafang 250W, 80Nm",
      "48V 15Ah LG (720Wh)",
      "Opptil 150 km rekkevidde",
      "20×3.0 Kenda Fat Tires",
      "Dobbel ramme (Maks last 150kg)",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "Bakre bagasjebrett",
      "Kompakt sammenlegging 106×60×86cm",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Romer el-sykkel",
      "48V 13Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front- og baklys",
      "Sammenleggbare pedaler",
      "Sidestøtte",
      "Skjermer",
      "Bjelle",
    ],
  },

  // 5. JOBOBIKE Romer Pro
  {
    id: "romer-pro-001",
    name: "ROMER PRO - JoboBike",
    slug: "jobobike-romer-pro",
    originalPrice: 29999,
    price: 17999.4,
    discount: "9%",
    image: "/images/romer-pro/romer-1.png",
    images: ["/images/romer-pro/romer-1.png"],
    colors: ["Svart", "Black Olive", "Special"],
    colorImages: {
      "Svart": "/images/romer-pro/romer-1.png",
      "Black Olive": "/images/romer-pro/romer-grey.jpg",
      "Special": "/images/romer-pro/romer-red.jpg"
    },
    colorImageArrays: {
      "Svart": ["/images/romer-pro/romer-1.png"],
      "Black Olive": ["/images/romer-pro/romer-grey.jpg"],
      "Special": ["/images/romer-pro/romer-red.jpg"]
    },
    features: [
      "Hydrauliske skivebremser",
      "Dreiemomentsensor",
      "Dempet setepinne",
      "Sammenleggbart nyttedesign",
      "Bedre lastekapasitet",
    ],
    badge: "Pro nytte",
    category: ["Sammenleggbar", "Lastesykkel"],
    rating: 4.8,
    reviewCount: 87,
    modelVariants: [
      { name: "Romer", slug: "jobobike-romer", price: 28999 },
      { name: "Romer C", slug: "jobobike-romer-c", price: 26999 },
      { name: "Romer Pro", slug: "jobobike-romer-pro", price: 29999 }
    ],
    specifications: {
      motor: "XOFO 48V250W Hub",
      battery: "48V15Ah LG",
      range: "70-160km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '20"',
      foldable: true,
      brakes: "Hydraulic Disc",
      frame: "Dobbeltlags aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Romer Pro",
        rammeType: "Gjennomgående sammenleggbar",
        rammeMateriale: "Dobbeltlags aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: { utbrettet: "165cm x 110cm x 70cm", sammenlagt: "106cm x 60cm x 86cm" },
        vekt: "29kg",
        maksLast: "150kg",
        anbefalteHøyde: "160cm+",
      },
      motor: {
        type: "Hub (XOFO)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "LG Lithium-ion med BMS",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "6-8 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "70-160 km (avhengig av forhold)", kombinert: "70-160 km (avhengig av forhold)" },
        stigningsevne: "18°",
        svingradius: "2.2m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "All-terrain",
        dekkStørrelse: '20×3.0',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Hydraulisk skivebrems", bak: "Hydraulisk skivebrems", type: "Hydraulic Disc" },
      giring: { type: "Ekstern gir", gir: "7-trinns Shimano", girskifter: "Shimano vrigrep" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED med vanntett kabling" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: true, type: "Dempet setepinne" },
        sete: { type: "Premium komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Sammenleggbart", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: true, flaskeholder: false },
    },
    description:
      "Romer Pro oppgraderer Romer med hydrauliske skiver, dreiemomentsensor og dempet setepinne – ideell for pendling, familieturer og last.",
    keyFeatures: [
      "XOFO 250W, 80Nm",
      "48V 15Ah LG (720Wh)",
      "Opptil 160 km rekkevidde",
      "20×3.0 Kenda dekk",
      "Dobbel ramme (Maks last 150kg)",
      "Dempet setepinne",
      "Hydraulic Disc bremser",
      "Shimano 7-Speed",
      "Bakre bagasjebrett",
      "Kompakt sammenlegging 106×60×86cm",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Romer Pro el-sykkel",
      "36V 14Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front- og baklys",
      "Sammenleggbare pedaler",
      "Sidestøtte",
      "Skjermer",
      "Bakre bagasjebrett",
      "Bjelle",
    ],
  },

  // 6. JOBOBIKE Ace Pro
  {
    id: "ace-pro-001",
    name: "ACE PRO - JoboBike",
    slug: "jobobike-ace-pro",
    originalPrice: 22999,
    price: 13799.4,
    discount: "12%",
    image: "/images/ace-pro/ace-pro-1.jpeg",
    images: ["/images/ace-pro/ace-pro-1.jpeg",
      "/images/ace-pro/ace-pro-2.jpg"
    ],
    colors: ["Blå", "Lys Grønn"],
    colorImages: {
      "Blå": "/images/ace-pro/ace-pro-1.jpeg",
      "Lys Grønn": "/images/ace-pro/ace-green-1.jpg"
    },
    colorImageArrays: {
      "Blå": ["/images/ace-pro/ace-pro-1.jpeg", "/images/ace-pro/ace-pro-2.jpg"],
      "Lys Grønn": ["/images/ace-pro/ace-green-1.jpg"]
    },
    features: [
      "Fullt dempingssystem",
      '27,5" x 2,8" all-terreng dekk',
      "500W Bafang midtmotor (95Nm)",
      "Hydrauliske bremser m/avbrudd",
      "Farget LCD",
    ],
    badge: "Ytelse",
    category: ["Sammenleggbar"],
    rating: 4.9,
    reviewCount: 134,
    modelVariants: [
      { name: "Ace", slug: "jobobike-ace", price: 21999 },
      { name: "Ace Pro", slug: "jobobike-ace-pro", price: 22999 }
    ],
    specifications: {
      motor: "XOFO 36V250W",
      battery: "36V10Ah Samsung",
      range: "80-120km",
      speed: "25 km/t",
      weight: "26 kg",
      wheelSize: '20"',
      foldable: false,
      brakes: "Tektro Hydraulic Disc",
      frame: "Aluminiumsramme, full demping",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Ace Pro",
        rammeType: "Full demping terreng",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "N/A", sammenlagt: "N/A" },
        vekt: "26kg",
        maksLast: "130kg",
        anbefalteHøyde: "170-195cm",
      },
      motor: {
        type: "Hub (XOFO)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "50Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Samsung Lithium-ion med BMS",
        spenning: "36V",
        kapasitet: "10Ah",
        kapasitetWh: "360Wh",
        avtakbar: true,
        ladetid: "4-5 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "80-120 km", kombinert: "80-120 km" },
        stigningsevne: "25°",
        svingradius: "2.8m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "CST",
        dekkStørrelse: '20×2.125',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Tektro hydraulisk skive", bak: "Tektro hydraulisk skive", type: "Tektro Hydraulic Disc" },
      giring: { type: "Ekstern", gir: "7-trinns Shimano", girskifter: "Shimano" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "Høyeffekt LED, flere moduser" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer + gåmodus",
      },
      komfort: {
        demping: { foran: true, bak: true, type: "Foran 120mm / Bak 100mm" },
        sete: { type: "Ytelsessadel", justerbar: true, materiale: "Premium syntetisk lær" },
        styre: { type: "MTB riser 760mm", justerbar: false, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX5", sertifisering: ["EN15194", "CE", "TUV"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: true },
    },
    description:
      "Ace Pro er toppmodellen for seriøse stisyklister: kraftig midtmotor (95Nm), full demping og premium komponenter for de tøffeste løypene.",
    keyFeatures: [
      "XOFO 250W, 50Nm",
      "36V 10Ah Samsung (360Wh)",
      "Opptil 120 km rekkevidde",
      "20×2.125 CST dekk",
      "6061 Aluminiumslegering ramme",
      "Full demping (Foran 120mm / Bak 100mm)",
      "Tektro Hydraulic Disc bremser",
      "Shimano 7-Speed",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Ace Pro el-sykkel",
      "36V 14Ah LG-batteri + lader",
      "Brukermanual",
      "Garantikort",
      "LED frontlys",
      "Bakre bremselys",
      "Sidestøtte",
      "Skjermer",
      "Flaskeholder",
      "Bjelle",
      "Pedaler",
    ],
  },

  // 7. JOBOBIKE Romer C
  {
    id: "romer-c-001",
    name: "ROMER C - JoboBike",
    slug: "jobobike-romer-c",
    originalPrice: 26999,
    price: 16199.4,
    discount: "11%",
    image: "/images/romer-c/romer-c.png",
    images: ["/images/romer-c/romer-c.png","/images/romer-c/romer-c1.jpg"],
    features: [
      "Forbedret lastekapasitet",
      "Forsterket bakre bagasjebrett",
      '20" fatbike-dekk',
      "Sammenleggbart lastedesign",
      "Robust konstruksjon",
    ],
    badge: "Last",
    category: ["Lastesykkel", "Sammenleggbar"],
    rating: 4.7,
    reviewCount: 76,
    modelVariants: [
      { name: "Romer", slug: "jobobike-romer", price: 28999 },
      { name: "Romer C", slug: "jobobike-romer-c", price: 26999 },
      { name: "Romer Pro", slug: "jobobike-romer-pro", price: 29999 }
    ],
    specifications: {
      motor: "Bafang 48V250W Hub",
      battery: "48V15Ah LG",
      range: "60-140km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '20"',
      foldable: true,
      brakes: "Tektro Mechanical Disc",
      frame: "Forsterket aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Romer C",
        rammeType: "Gjennomgående lasteramme",
        rammeMateriale: "Forsterket aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: { utbrettet: "165cm x 110cm x 70cm", sammenlagt: "106cm x 60cm x 86cm" },
        vekt: "29kg",
        maksLast: "180kg",
        anbefalteHøyde: "160cm+",
      },
      motor: {
        type: "Hub (Bafang)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "LG Lithium-ion med BMS",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "6-8 timer",
        batteriLevetid: "800-1000 ladesykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "60-140 km (avhengig av forhold)", kombinert: "60-140 km (avhengig av forhold)" },
        stigningsevne: "15°",
        svingradius: "2.2m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "All-terrain",
        dekkStørrelse: '20×3.0',
        felgMateriale: "Forsterket aluminiumslegering",
      },
      bremser: { foran: "Mekanisk skivebrems", bak: "Mekanisk skivebrems", type: "Tektro Mechanical Disc" },
      giring: { type: "Ekstern gir", gir: "7-trinns Shimano", girskifter: "Shimano vrigrep" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED m/lastsynlighet" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Fat-dekk demping" },
        sete: { type: "Bred komfortsadel", justerbar: true, materiale: "Syntetisk lær, ekstra polstring" },
        styre: { type: "Komfortstyre", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: true, flaskeholder: false },
    },
    description:
      "Romer C er lastevarianten av Romer-serien, med forsterket ramme, kraftig bakre bagasjebrett og 180kg total lastekapasitet.",
    keyFeatures: [
      "Bafang 250W, 80Nm",
      "48V 15Ah LG (720Wh)",
      "Opptil 140 km rekkevidde",
      "20×3.0 Kenda dekk",
      "Forsterket ramme (Maks last 180kg)",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "Robust bakre bagasjebrett",
      "Kompakt sammenlegging 106×60×86cm",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Romer C el-sykkel",
      "36V 13Ah batteri med lader",
      "Brukermanual og verktøy",
      "Garantikort",
      "Front- og baklys",
      "Robust bakre bagasjebrett",
      "Dobbel sidestøtte",
      "Skjermer",
      "Stor kurv (valgfri)",
      "Bjelle",
      "Sammenleggbare pedaler",
    ],
  },

  // 8. JOBOBIKE Sam
  {
    id: "sam-001",
    name: "SAM - JoboBike",
    slug: "jobobike-sam",
    originalPrice: 22999,
    price: 13799.4,
    discount: "15%",
    image: "/images/sam/sam-1.png",
    images: [
      "/images/sam/sam-1.png",
      "/images/sam/sam-2.png",
      "/images/sam/sam-3.JPG",
      "/images/sam/sam-4.JPG",
      "/images/sam/sam-5.jpg",
      "/images/sam/sam-6.jpg",
    ],
    features: ['350W bakhjulsmotor', "36V 12,8Ah batteri", '20" fat-dekk', "Sammenleggbar", "5 assistansenivåer"],
    category: ["Sammenleggbar", "Pendler"],
    rating: 4.3,
    reviewCount: 67,
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V13Ah",
      range: "60-80 km",
      speed: "25 km/t",
      weight: "30 kg",
      wheelSize: '20"',
      foldable: true,
      brakes: "Tektro Mechanical Disc",
      frame: "Aluminiumslegering",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Sam",
        rammeType: "Sammenleggbar",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: { utbrettet: "1450×260×680 mm", sammenlagt: "80 x 58 x 70 cm" },
        vekt: "30 kg",
        maksLast: "100 kg",
        anbefalteHøyde: "155-185 cm",
      },
      motor: {
        type: "Hub",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "40Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "36V",
        kapasitet: "13Ah",
        kapasitetWh: "468Wh",
        avtakbar: true,
        ladetid: "4-5 timer",
        batteriLevetid: "600+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-80 km", kombinert: "50-80 km" },
        stigningsevne: "15°",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "CST",
        dekkStørrelse: '20×2.125"',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Mekanisk skive", bak: "Mekanisk skive", type: "160mm rotorer" },
      giring: { type: "Girkasse", gir: "7-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED" },
        horn: false,
        gasspedal: true,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "Fjærgaffel" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "PU-lær" },
        styre: { type: "Sammenleggbart", justerbar: true, materiale: "Stål" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "Sam er en kompakt sammenleggbar elsykkel perfekt for bypendlere som trenger en praktisk og plassbesparende løsning. Lett å oppbevare hjemme eller på kontoret, og enkel å ta med i kollektivtrafikk. Ideell for daglige turer i byen med god rekkevidde og pålitelig ytelse.",
    keyFeatures: [
      "XOFO 250W, 40Nm",
      "36V 13Ah (468Wh)",
      "Opptil 80 km rekkevidde",
      "20×2.125 CST dekk",
      "6061 Aluminiumslegering ramme",
      "Fjærgaffel demping",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "Kompakt sammenlegging 80×58×70cm",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Sam el-sykkel",
      "36V 12.8Ah batteri",
      "Lader",
      "Brukermanual",
      "Sammenleggingsguide",
      "2 nøkler",
    ],
  },

  // 10. JOBOBIKE Dyno GT
  {
    id: "dyno-gt-001",
    name: "DYNO GT - JoboBike",
    slug: "jobobike-dyno-gt",
    originalPrice: 34999,
    price: 20999.4,
    discount: "15%",
    image: "/images/dyno/dyno-1.png",
    images: ["/images/dyno/dyno-1.png", "/images/dyno/dyno-2.png"],
    features: [
      "250W bakhjulsmotor",
      "36V 15Ah smart batteri",
      "Single speed belt drive",
      "Vedlikeholdsfritt",
      "Smart LCD",
    ],
    category: ["Hybrid", "Pendler"],
    rating: 4.5,
    reviewCount: 89,
    inStock: false,
    modelVariants: [
      { name: "Dyno", slug: "jobobike-dyno", price: 33999 },
      { name: "Dyno GT", slug: "jobobike-dyno-gt", price: 34999 }
    ],
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V15Ah Samsung",
      range: "60-80 km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '27.5"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminiumslegering",
      drivetrain: "Single speed",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Dyno GT",
        rammeType: "Diamant",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "158×28×85 cm", sammenlagt: "N/A" },
        vekt: "27 kg",
        maksLast: "125 kg",
        anbefalteHøyde: "165-200 cm",
      },
      motor: {
        type: "Hub (XOFO)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "45Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "Samsung Lithium-ion",
        spenning: "36V",
        kapasitet: "15Ah",
        kapasitetWh: "540Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-80 km", kombinert: "50-80 km" },
        stigningsevne: "20°",
      },
      hjul: {
        størrelse: '27.5"',
        dekkType: "Belt",
        dekkStørrelse: '27.5×2.4',
        felgMateriale: "Dobbeltvegg aluminium",
      },
      bremser: { foran: "Hydraulisk skive", bak: "Hydraulisk skive", type: "Hydraulic Disc" },
      giring: { type: "Single speed", gir: "1-trinn", girskifter: "N/A" },
      elektrisk: {
        display: "LCD + Bluetooth",
        lys: { foran: true, bak: true, type: "Auto-sensing LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Sportsadel", justerbar: true, materiale: "Syntetisk" },
        styre: { type: "Flatt styre", justerbar: false, materiale: "Aluminium" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX5", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: true },
    },
    description:
      "Dyno GT kombinerer smart teknologi og vedlikeholdsfritt belt drive system. Dreiemomentsensor og intelligent skjerm gir naturlig kjørefølelse for teknologikyndige pendlere.",
    keyFeatures: [
      "XOFO 250W, 45Nm",
      "36V 15Ah Samsung (540Wh)",
      "Opptil 80 km rekkevidde",
      "27.5×2.4 Belt dekk",
      "6061 Aluminiumslegering ramme",
      "Hydraulic Disc bremser",
      "Single Speed Belt Drive",
      "LCD + Bluetooth",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Dyno GT el-sykkel",
      "36V 15Ah batteri",
      "Hurtiglader",
      "Brukermanual",
      "Monteringssett",
      "2 nøkler",
    ],
  },

  // 9. JOBOBIKE Lyon Pro
  {
    id: "lyon-pro-001",
    name: "LYON PRO - JoboBike",
    slug: "jobobike-lyon-pro",
    originalPrice: 34999,
    price: 20999.4,
    discount: "16%",
    image: "/images/lyon/lyon-1.png",
    images: ["/images/lyon/lyon-1.png", "/images/lyon/lyon-2.png"],
    features: [
      "250W midtmotor",
      "48V 15Ah avtakbart batteri",
      "9-trinns Shimano",
      "90+ km rekkevidde",
      "Bluetooth-app",
    ],
    badge: "Bestselger",
    category: ["Pendler"],
    rating: 4.7,
    reviewCount: 142,
    inStock: false,
    specifications: {
      motor: "XOFO 36V250W Mid",
      battery: "36V15Ah Samsung",
      range: "90-110 km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '27.5"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminiumslegering",
      drivetrain: "Shimano 9 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Lyon Pro",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "158×28×85 cm", sammenlagt: "N/A" },
        vekt: "27 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "155-195 cm",
      },
      motor: {
        type: "Midtmotor (XOFO)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "90Nm",
        plassering: "Senter",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "Samsung Lithium-ion",
        spenning: "36V",
        kapasitet: "15Ah",
        kapasitetWh: "540Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "60 km", pedalAssistanse: "75-110 km (avhengig av forhold)", kombinert: "75-110 km (avhengig av forhold)" },
        stigningsevne: "25°",
        svingradius: "1.8m",
      },
      hjul: { størrelse: '27.5"', dekkType: "Bydekk", dekkStørrelse: '27.5×2.4', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Hydraulisk skive 180mm", bak: "Hydraulisk skive 180mm", type: "Hydraulic Disc" },
      giring: { type: "Girkasse", gir: "9-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "LCD + Bluetooth",
        lys: { foran: true, bak: true, type: "LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "Fjærgaffel" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Ergonomisk", justerbar: true, materiale: "Aluminium" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: true },
    },
    description:
      "Lyon Pro er en sofistikert by-elsykkel med kraftig midtmotor og langdistanse batteri – perfekt balanse mellom ytelse og effektivitet.",
    keyFeatures: [
      "XOFO 250W, 90Nm",
      "36V 15Ah Samsung (540Wh)",
      "Opptil 110 km rekkevidde",
      "27.5×2.4 Kenda hjul",
      "6061 Aluminiumslegering ramme",
      "Fjærgaffel demping",
      "Hydraulic Disc bremser",
      "Shimano 9-Speed",
      "LCD + Bluetooth",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Lyon Pro el-sykkel",
      "48V 15Ah batteri",
      "Lader",
      "Brukermanual",
      "Monteringsverktøy",
      "2 nøkler",
    ],
  },

  // 11. JOBOBIKE Transer Grønn
  {
    id: "transer-001",
    name: "TRANSER - JoboBike",
    slug: "jobobike-transer-gronn",
    originalPrice: 43999,
    price: 17600,
    discount: "14%",
    image: "/images/transer/transer-1.png",
    images: ["/images/transer/transer-1.png", "/images/transer/transer-2.png", "/images/transer/tran-1.png", "/images/transer/tan-2.png", "/images/transer/transer-3.tif", "/images/transer/transer-4.tif"],
    features: ["BAFANG 36V 250W midtmotor", "48V 17.5Ah batteri", "Lastekasse inkludert", "Familievennlig", "Lang ramme"],
    badge: "Familievalg",
    category: ["Lastesykkel", "Pendler"],
    rating: 4.8,
    reviewCount: 123,
    colors: ["Grønn", "Hvit", "Grå"],
    colorImages: {
      "Grønn": "/images/transer/transer-1.png",
      "Hvit": "/images/transer/transerwhite-2.jpg",
      "Grå": "/images/transer/transergrey-1.jpg"
    },
    colorImageArrays: {
      "Grønn": ["/images/transer/transer-1.png", "/images/transer/transer-2.png", "/images/transer/transer-3.tif", "/images/transer/transer-4.tif", "/images/transer/tran-1.jpg", "/images/transer/tan-2.jpg"],
      "Hvit": ["/images/transer/transerwhite-2.jpg", "/images/transer/transerwhite-1.jpg", "/images/transer/tran-1.jpg", "/images/transer/tan-2.jpg"],
      "Grå": ["/images/transer/transergrey-1.jpg", "/images/transer/transergrey-2.jpg", "/images/transer/tran-1.jpg", "/images/transer/tan-2.jpg"]
    },
    specifications: {
      motor: "XOFO 48V250W Hub",
      battery: "48V13Ah ×2",
      range: "80-100 km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '20"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminium, cargo",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Transer",
        rammeType: "Last / Langhale",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "220 x 65 x 110 cm", sammenlagt: "N/A" },
        vekt: "32 kg",
        maksLast: "180 kg",
        anbefalteHøyde: "160-195 cm",
      },
      motor: {
        type: "Hub motor (XOFO)",
        effekt: "250W",
        toppEffekt: "600W",
        dreiemoment: "80Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Lithium-ion (Dual)",
        spenning: "48V",
        kapasitet: "13Ah × 2",
        kapasitetWh: "1248Wh",
        avtakbar: true,
        ladetid: "5-6 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "60 km", pedalAssistanse: "70-100 km", kombinert: "70-100 km" },
        stigningsevne: "20°",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "Cargo",
        dekkStørrelse: '20×3.0',
        felgMateriale: "Forsterket aluminium",
      },
      bremser: { foran: "Hydraulisk skive", bak: "Hydraulisk skive", type: "Hydraulic Disc" },
      giring: { type: "Ekstern (derailleur)", gir: "7-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "YL-81F LCD",
        lys: { foran: true, bak: true, type: "Kraftig LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "Cargo-gaffel" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Gel-polstring" },
        styre: { type: "Cargo-styre", justerbar: true, materiale: "Aluminium" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: true, flaskeholder: true },
    },
    description:
      "Transer er familielastesykkelen for trygg transport av barn og last – utvidet ramme, kraftig midtmotor og stor batterikapasitet.",
    keyFeatures: [
      "XOFO 250W, 80Nm",
      "48V 13Ah ×2 (1248Wh)",
      "Opptil 100 km rekkevidde",
      "20×3.0 CST Cargo hjul",
      "6061 Aluminiumslegering ramme (Maks last 180kg)",
      "Cargo-gaffel demping",
      "Hydraulic Disc bremser",
      "Shimano 7-Speed",
      "Integrert lastekasse",
      "YL-81F LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Transer el-sykkel",
      "48V 17.5Ah batteri",
      "Lader",
      "Lastekasse + stropper",
      "Brukermanual",
      "2 nøkler",
    ],
  },

  // 12. JOBOBIKE Mover
  {
    id: "mover-001",
    name: "MOVER - JoboBike",
    slug: "jobobike-mover",
    originalPrice: 34999,
    price: 20999.4,
    discount: "14%",
    image: "/images/mover/mover-1.png",
    images: ["/images/mover/mover-1.png", "/images/mover/mover-2.png"],
    features: [
      "250W bakhjulsmotor",
      "36V 14Ah batteri",
      "Lav innsteg ramme",
      "Komfortabel sittestilling",
      "Integrerte lys",
    ],
    category: ["Pendler", "Fatbike", "Terreng"],
    rating: 4.4,
    reviewCount: 78,
    inStock: false,
    specifications: {
      motor: "250W baknav",
      battery: "36V 14Ah (504Wh)",
      range: "70-90 km",
      speed: "25 km/t",
      weight: "23 kg",
      wheelSize: '28"',
      foldable: false,
      brakes: "V-bremser",
      frame: "Stål, gjennomgående",
      drivetrain: "7-trinns",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Mover",
        rammeType: "Gjennomgående",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "175 x 60 x 105 cm", sammenlagt: "N/A" },
        vekt: "23 kg",
        maksLast: "110 kg",
        anbefalteHøyde: "150-185 cm",
      },
      motor: {
        type: "Bakhjulsmotor",
        effekt: "250W",
        toppEffekt: "400W",
        dreiemoment: "35Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "36V",
        kapasitet: "14Ah",
        kapasitetWh: "504Wh",
        avtakbar: true,
        ladetid: "4-5 timer",
        batteriLevetid: "700+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "60-90 km", kombinert: "60-90 km" },
        stigningsevne: "15°",
      },
      hjul: {
        størrelse: '28"',
        dekkType: "By",
        dekkStørrelse: '28 x 1.75"',
        felgMateriale: "Aluminium",
      },
      bremser: { foran: "V-bremse", bak: "V-bremse", type: "Mekanisk" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano Tourney" },
      elektrisk: {
        display: "LED-indikator",
        lys: { foran: true, bak: true, type: "Integrert LED" },
        horn: false,
        gasspedal: true,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Skumpolstring" },
        styre: { type: "Svingt tilbake", justerbar: false, materiale: "Stål" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: true, flaskeholder: false },
    },
    description:
      "Mover tilbyr avslappet, oppreist bykjøring med klassisk gjennomgående design og integrerte lys – behagelig og rimelig transport.",
    keyFeatures: [
      "250W, 35Nm",
      "36V 14Ah (504Wh)",
      "Opptil 90 km rekkevidde",
      "28×1.75 hjul",
      "Høyfast stål ramme",
      "V-bremser",
      "Shimano 7-Speed",
      "LED-indikator",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Mover el-sykkel",
      "36V 14Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "2 nøkler",
    ],
  },

  // 13. JOBOBIKE Eddy X
  {
    id: "eddy-x-001",
    name: "EDDY X - JoboBike",
    slug: "jobobike-eddy-x",
    originalPrice: 18999,
    price: 11399.4,
    discount: "16%",
    image: "/images/eddy-x/eddy-1.png",
    images: ["/images/eddy-x/eddy-1.png",
      "/images/eddy-x/eddy-2.png",
      "/images/eddy-x/eddy-3.jpg",
      "/images/eddy-x/eddy-4.jpg",],
    features: ["250W midtmotor", "36V 16Ah batteri", "Smart skjerm", "Integrert design", "Byoptimalisert"],
    category: ["Pendler", "Sammenleggbar", "Fatbike", "Terreng"],
    rating: 4.5,
    reviewCount: 94,
    inStock: false,
    specifications: {
      motor: "250W midtmotor",
      battery: "36V 16Ah (576Wh)",
      range: "80-100 km",
      speed: "25 km/t",
      weight: "25 kg",
      wheelSize: '28"',
      foldable: false,
      brakes: "Hydrauliske skiver",
      frame: "Integrert aluminium",
      drivetrain: "8-trinns",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Eddy X",
        rammeType: "Integrert",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "180 x 60 x 105 cm", sammenlagt: "N/A" },
        vekt: "25 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "160-195 cm",
      },
      motor: {
        type: "Midtmotor",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "70Nm",
        plassering: "Senter",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "Lithium-ion",
        spenning: "36V",
        kapasitet: "16Ah",
        kapasitetWh: "576Wh",
        avtakbar: false,
        ladetid: "4-5 timer",
        batteriLevetid: "1000+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "60 km", pedalAssistanse: "70-100 km", kombinert: "70-100 km" },
        stigningsevne: "20°",
      },
      hjul: { størrelse: '28"', dekkType: "Urban", dekkStørrelse: '28 x 1.6"', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Hydraulisk skive", bak: "Hydraulisk skive", type: "160mm rotorer" },
      giring: { type: "Derailleur", gir: "8-trinns", girskifter: "Shimano Acera" },
      elektrisk: {
        display: "Smart fargeskjerm",
        lys: { foran: true, bak: true, type: "Integrert LED" },
        horn: false,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Ergonomisk", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Ergonomisk (svakt nedover)", justerbar: false, materiale: "Aluminium" },
      },
      sikkerhet: { reflekser: true, bjelle: false, vannMotstand: "IPX5", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: true },
    },
    description:
      "Eddy X kombinerer elegant integrert design med smart teknologi – en moderne by-elsykkel med effektiv midtmotor.",
    keyFeatures: [
      "250W, 70Nm",
      "36V 16Ah (576Wh)",
      "Opptil 100 km rekkevidde",
      "28×1.6 Urban hjul",
      "6061 Aluminiumslegering ramme",
      "Hydrauliske skivebremser",
      "Shimano 8-Speed",
      "Smart fargeskjerm",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Eddy X el-sykkel",
      "Integrert batteri",
      "Smart lader",
      "Brukermanual",
      "App-oppsettguide",
      "Monteringsverktøy",
    ],
  },

  // 14. JOBOBIKE Astra
  {
    id: "astra-001",
    name: "ASTRA - JoboBike",
    slug: "jobobike-astra",
    originalPrice: 32999,
    price: 19799.4,
    discount: "17%",
    image: "/images/astra/astra-1.png",
    images: ["/images/astra/astra-1.png", "/images/astra/astra-2.png"],
    features: ["250W forhjulsmotor", "36V 10Ah", "Lett design", "Budsjettvennlig", "Enkel betjening"],
    badge: "Best verdi",
    category: ["Pendler"],
    rating: 4.2,
    reviewCount: 156,
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V15Ah Samsung",
      range: "40-60 km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '27.5"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Stål",
      drivetrain: "Shimano 8 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Astra",
        rammeType: "Bysykkel",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "158×28×85 cm", sammenlagt: "N/A" },
        vekt: "27 kg",
        maksLast: "100 kg",
        anbefalteHøyde: "155-185 cm",
      },
      motor: {
        type: "Hub (XOFO)",
        effekt: "250W",
        toppEffekt: "350W",
        dreiemoment: "30Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Samsung Lithium-ion",
        spenning: "36V",
        kapasitet: "15Ah",
        kapasitetWh: "540Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "30 km", pedalAssistanse: "35-60 km", kombinert: "35-60 km" },
        stigningsevne: "12°",
      },
      hjul: {
        størrelse: '27.5"',
        dekkType: "By",
        dekkStørrelse: '27.5×2.4',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Hydraulisk skive", bak: "Hydraulisk skive", type: "Hydraulic Disc" },
      giring: { type: "Derailleur", gir: "8-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "LCD + Bluetooth",
        lys: { foran: true, bak: false, type: "Basic LED" },
        horn: false,
        gasspedal: true,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Grunnleggende komfort", justerbar: true, materiale: "PU" },
        styre: { type: "By-styre", justerbar: false, materiale: "Stål" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["EN15194", "CE"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "Astra er en prisgunstig innstegsmodell for bypendlere – lett, enkel og pålitelig med forhjulsmotor.",
    keyFeatures: [
      "XOFO 250W, 30Nm",
      "36V 15Ah Samsung (540Wh)",
      "Opptil 60 km rekkevidde",
      "27.5×2.4 Kenda hjul",
      "Høyfast stål ramme",
      "Hydraulic Disc bremser",
      "Shimano 8-Speed",
      "LCD + Bluetooth",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Astra el-sykkel",
      "36V 10Ah batteri",
      "Lader",
      "Brukermanual",
      "Grunnverktøy",
      "2 nøkler",
    ],
  },

  // 15. JOBOBIKE Viva
  {
    id: "viva-001",
    name: "VIVA - JoboBike",
    slug: "jobobike-viva",
    originalPrice: 21999,
    price: 13199.4,
    discount: "18%",
    image: "/images/viva/viva-1.png",
    images: ["/images/viva/viva-1.png", "/images/viva/viva-2.jpg", "/images/viva/viva-4.jpg", "/images/viva/viva-3.jpg"],
    features: [
      "Lett 29kg aluminiumsramme",
      "XOFO 36V 250W bakhjulsmotor",
      "36V 14Ah LG batteri",
      '700C×38/40 hjul for jevn bykjøring',
      "Integrerte lys og skjermer",
    ],
    badge: "Lettvekt",
    category: ["Pendler"],
    rating: 4.7,
    reviewCount: 89,
    modelVariants: [
      { name: "Viva", slug: "jobobike-viva", price: 21999 },
      { name: "Viva ST", slug: "jobobike-viva-st", price: 21999 }
    ],
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V14Ah LG",
      range: "50-70 km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '700C',
      foldable: false,
      brakes: "Tektro Mechanical Disc",
      frame: "Aluminium 6061",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Viva",
        rammeType: "Høy ramme",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "1500×280×750 mm", sammenlagt: "N/A" },
        vekt: "29 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "165-185 cm",
      },
      motor: {
        type: "Børsteløs baknav (XOFO)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "30Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "LG Lithium-ion",
        spenning: "36V",
        kapasitet: "14Ah",
        kapasitetWh: "504Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800-1000 sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-70 km", kombinert: "50-70 km" },
        stigningsevne: "15°",
        svingradius: "2.5m",
      },
      hjul: { størrelse: '700C', dekkType: "By", dekkStørrelse: '700C×38/40', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Mekanisk skive 160mm", bak: "Mekanisk skive 160mm", type: "Skivebremser" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano Tourney" },
      elektrisk: {
        display: "LED",
        lys: { foran: true, bak: true, type: "Integrert LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Ergonomisk", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "By-styre", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: false },
    },
    description:
      "Viva er en elegant og lettvekts by-elsykkel designet for komfortabel pendling. Med sitt slanke design og integrerte komponenter gir den en jevn og behagelig kjøreopplevelse. Perfekt for deg som ønsker en stilren og pålitelig elsykkel for daglige turer i byen.",
    keyFeatures: [
      "XOFO 250W, 30Nm",
      "36V 14Ah LG (504Wh)",
      "Opptil 70 km rekkevidde",
      "700C×38/40 hjul",
      "6061 Aluminiumslegering ramme",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "LED display",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Viva el-sykkel",
      "36V 14Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },

  // 16. JOBOBIKE Viva ST
  {
    id: "viva-st-001",
    name: "VIVA ST - JoboBike",
    slug: "jobobike-viva-st",
    originalPrice: 21999,
    price: 13199.4,
    discount: "18%",
    image: "/images/viva-st/viva-st-1.png",
    images: ["/images/viva-st/viva-st-1.png",
       "/images/viva-st/viva-st-2.png", 
       "/images/viva-st/viva-st-3.png",
        "/images/viva-st/viva-st-5.png",],
    features: ["Gjennomgående ramme", "Lett 29kg", "XOFO 36V 250W bakhjulsmotor", "36V 14Ah LG batteri", "Bypendling"],
    badge: "Lettvekt",
    category: ["Pendler"],
    rating: 4.8,
    reviewCount: 76,
    inStock: false,
    modelVariants: [
      { name: "Viva", slug: "jobobike-viva", price: 21999 },
      { name: "Viva ST", slug: "jobobike-viva-st", price: 21999 }
    ],
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V14Ah LG",
      range: "50-70 km",
      speed: "25 km/t",
      weight: "29 kg",
      wheelSize: '700C',
      foldable: false,
      brakes: "Tektro Mechanical Disc",
      frame: "Gjennomgående aluminium",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Viva ST",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "1500×280×750 mm", sammenlagt: "N/A" },
        vekt: "29 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "165-185 cm",
      },
      motor: {
        type: "Børsteløs baknav (XOFO)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "30Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "LG Lithium-ion",
        spenning: "36V",
        kapasitet: "14Ah",
        kapasitetWh: "504Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800-1000 sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-70 km", kombinert: "50-70 km" },
        stigningsevne: "15°",
        svingradius: "2.5m",
      },
      hjul: { størrelse: '700C', dekkType: "By", dekkStørrelse: '700C×38C', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Mekanisk skive 160mm", bak: "Mekanisk skive 160mm", type: "Skivebremser" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano Tourney" },
      elektrisk: {
        display: "LED",
        lys: { foran: true, bak: true, type: "Integrert LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Svingt (swept-back)", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: false },
    },
    description:
      "Viva ST har lav innsteg (gjennomgående ramme) for enkel på-/avstigning – lett, komfortabel og perfekt for daglige turer i byen.",
    keyFeatures: [
      "XOFO 250W, 30Nm",
      "36V 14Ah LG (504Wh)",
      "Opptil 70 km rekkevidde",
      "700C×38C hjul",
      "6061 Aluminiumslegering ramme",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "LED display",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Viva ST el-sykkel",
      "36V 14Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },

  // 17. JOBOBIKE Henry
  {
    id: "henry-001",
    name: "HENRY - JoboBike",
    slug: "jobobike-henry",
    originalPrice: 34999,
    price: 14000,
    discount: "17%",
    image: "/images/henry/henry-1.png",
    images: ["/images/henry/henry-1.png",
      "/images/henry/henry-2.jpg",
      "/images/henry/henry-3.jpg",
      "/images/henry/henry-4.jpg","/images/henry/henry-5.jpg","/images/henry/henry-6.jpg",
    ],
    features: ["BAFANG 36V 250W midtmotor", "36V 17.5Ah batteri", "Retro design", '27.5×2.1 hjul', "Premium komponenter"],
    badge: "Midtmotor",
    category: ["Pendler"],
    rating: 4.9,
    reviewCount: 64,
    specifications: {
      motor: "Bafang 36V250W Mid",
      battery: "36V14Ah LG",
      range: "60-90 km",
      speed: "25 km/t",
      weight: "33.6 kg",
      wheelSize: '28"',
      foldable: false,
      brakes: "Tektro Hydraulic Disc",
      frame: "Klassisk høy ramme (aluminium)",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Henry",
        rammeType: "Høy klassisk ramme",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "N/A", sammenlagt: "N/A" },
        vekt: "33.6 kg",
        maksLast: "125 kg",
        anbefalteHøyde: "170-195 cm",
      },
      motor: {
        type: "Midtmotor (Bafang)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "55Nm",
        plassering: "Midt",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "LG Lithium-ion",
        spenning: "36V",
        kapasitet: "14Ah",
        kapasitetWh: "504Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "1000+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "60-90 km", kombinert: "60-90 km" },
        stigningsevne: "20°",
        svingradius: "2.8m",
      },
      hjul: { størrelse: '28"', dekkType: "By", dekkStørrelse: '28×2.0', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Hydraulisk skive 180mm", bak: "Hydraulisk skive 180mm", type: "Tektro Hydraulic Disc" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "Bafang LCD",
        lys: { foran: true, bak: true, type: "Integrert LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Ergonomisk", justerbar: true, materiale: "Ekte lær" },
        styre: { type: "Klassisk", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX5", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: false },
    },
    description:
      "Henry er en raffinert by-elsykkel for de som vil ha minimalistisk retrostil med moderne midtmotor og skjult batteri.",
    keyFeatures: [
      "Bafang 250W, 55Nm",
      "36V 14Ah LG (504Wh)",
      "Opptil 90 km rekkevidde",
      "28×2.0 CST hjul",
      "6061 Aluminiumslegering ramme",
      "Tektro Hydraulic Disc bremser",
      "Shimano 7-Speed",
      "Bafang LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Henry el-sykkel",
      "36V 14Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },

  // 18. JOBOBIKE Ace
  {
    id: "ace-001",
    name: "ACE - JoboBike",
    slug: "jobobike-ace",
    originalPrice: 21999,
    price: 13199.4,
    discount: "19%",
    image: "/images/ace/ace-1.png",
    images: ["/images/ace/ace-1.png", "/images/ace/ace-2.png"],
    colors: ["Svart", "Grønn", "Peach"],
    colorImages: {
      "Svart": "/images/ace/ace-1.png",
      "Grønn": "/images/ace/ace-green.jpg",
      "Peach": "/images/ace/ace-peach.jpg"
    },
    colorImageArrays: {
      "Svart": ["/images/ace/ace-1.png", "/images/ace/ace-2.png"],
      "Grønn": ["/images/ace/ace-green-1.jpg"],
      "Peach": ["/images/ace/ace-peach-1.jpg"]
    },
    features: ["Sammenleggbart kompakt design", "Mobilapp-kontroll", "250W motor 45Nm", '20" hjul', "Lett og bærbar"],
    badge: "Sammenleggbar",
    category: ["Sammenleggbar"],
    rating: 4.6,
    reviewCount: 118,
    modelVariants: [
      { name: "Ace", slug: "jobobike-ace", price: 21999 },
      { name: "Ace Pro", slug: "jobobike-ace-pro", price: 22999 }
    ],
    specifications: {
      motor: "XOFO 36V250W",
      battery: "36V10Ah Samsung",
      range: "40-60 km",
      speed: "25 km/t",
      weight: "26 kg",
      wheelSize: '20"',
      foldable: true,
      brakes: "Tektro Mechanical Disc",
      frame: "Sammenleggbar aluminium",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Ace",
        rammeType: "Sammenleggbar",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: true,
        dimensjoner: { utbrettet: "N/A", sammenlagt: "800 x 450 x 650 mm" },
        vekt: "26 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "155-190 cm",
      },
      motor: {
        type: "Børsteløs baknav (XOFO)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "45Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Samsung Lithium-ion",
        spenning: "36V",
        kapasitet: "10Ah",
        kapasitetWh: "360Wh",
        avtakbar: true,
        ladetid: "4-5 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "35 km", pedalAssistanse: "40-60 km", kombinert: "40-60 km" },
        stigningsevne: "15°",
        svingradius: "2.0m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "CST anti-punktering",
        dekkStørrelse: '20×2.125',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Mekanisk skive 160mm", bak: "Mekanisk skive 160mm", type: "Tektro Mechanical Disc" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED m/refleksstriper" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Sammenleggbart styre", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: true, gps: false, bluetooth: true, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "Ace er en kompakt sammenleggbar bysykkel med app-kontroll. Enkel å ta med i bil/bod og leverer solid ytelse.",
    keyFeatures: [
      "XOFO 250W, 45Nm",
      "36V 10Ah Samsung (360Wh)",
      "Opptil 60 km rekkevidde",
      "20×2.125 CST dekk",
      "6061 Aluminiumslegering ramme",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "Kompakt sammenlegging 800×450×650mm",
      "Color LCD",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Ace el-sykkel",
      "36V 10Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },

  // 18b. JOBOBIKE Linda
  {
    id: "linda-001",
    name: "LINDA - JoboBike",
    slug: "jobobike-linda",
    originalPrice: 32999,
    price: 19799.4,
    discount: "17%",
    image: "/images/linda/linda-1.jpg",
    images: ["/images/linda/linda-1.jpg", "/images/linda/linda-2.jpg", "/images/linda/linda-3.jpg", "/images/linda/linda-4.jpg", "/images/linda/linda-5.jpg", "/images/linda/linda-6.jpg"],
    features: ["Gjennomgående ramme", "Bafang M200 midtmotor 65Nm", "36V 14Ah batteri (504Wh)", '26" hjul', "SR Gel sadel"],
    badge: "Komfort",
    category: ["Pendler"],
    rating: 4.7,
    reviewCount: 82,
    inStock: false,
    specifications: {
      motor: "250W Bafang M200 midtmotor",
      battery: "36V 14Ah (504Wh)",
      range: "90 km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '26"',
      foldable: false,
      brakes: "Hydrauliske skivebremser",
      frame: "Gjennomgående aluminium",
      drivetrain: "Single Speed",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Linda",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "1800 x 700 x 1200 mm", sammenlagt: "N/A" },
        vekt: "27 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "155-185 cm",
      },
      motor: {
        type: "Midtmotor (Bafang M200)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "65Nm",
        plassering: "Midt",
        dreiemomentSensor: true,
      },
      batteri: {
        type: "LG Lithium-ion",
        spenning: "36V",
        kapasitet: "14Ah",
        kapasitetWh: "504Wh",
        avtakbar: true,
        ladetid: "6-7 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "50 km", pedalAssistanse: "60-90 km", kombinert: "60-90 km" },
        stigningsevne: "18°",
        svingradius: "2.5m",
      },
      hjul: {
        størrelse: '26"',
        dekkType: "CST",
        dekkStørrelse: '26 x 2.35"',
        felgMateriale: "Aluminiumslegering",
      },
      bremser: { foran: "Hydraulisk skive 180mm", bak: "Hydraulisk skive 180mm", type: "Tektro hydraulisk skive" },
      giring: { type: "Single Speed", gir: "1-trinn", girskifter: "N/A" },
      elektrisk: {
        display: "Bafang LCD m/USB",
        lys: { foran: true, bak: true, type: "LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "SR Gel sadel", justerbar: true, materiale: "Gel-polstring" },
        styre: { type: "Ergonomisk", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: true },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: false, flaskeholder: false },
    },
    description:
      "Linda er en komfortabel gjennomgående elsykkel med Bafang M200 midtmotor og premium SR Gel sadel – perfekt for kvinner og seniorer.",
    keyFeatures: [
      "Bafang M200 250W, 65Nm",
      "36V 14Ah (504Wh)",
      "Opptil 90 km rekkevidde",
      "26×2.35 CST hjul",
      "6061 Aluminiumslegering ramme",
      "Tektro Hydrauliske skivebremser",
      "Single Speed",
      "Bafang LCD m/USB",
      "En størrelse",
    ],
    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Linda el-sykkel",
      "36V 14Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },


  // 19. JOBOBIKE Triker
  {
    id: "triker-001",
    name: "TRIKER - JoboBike",
    slug: "jobobike-triker",
    originalPrice: 56999,
    price: 34199.4,
    discount: "18%",
    image: "/images/triker/triker-1.jpg",
    images: ["/images/triker/triker-1.jpg", "/images/triker/triker-2.jpg"],
    features: ["Elektrisk trehjulssykkel", "Stor bakre lastekurv", "Ekstra stabilitet", "250W motor m/differensial", "For seniorer og last"],
    badge: "Trehjuling",
    category: ["Hybrid"],
    rating: 4.9,
    reviewCount: 54,
    inStock: false,
    specifications: {
      motor: "Bafang 48V250W",
      battery: "48V15Ah LG",
      range: "50-70 km",
      speed: "25 km/t",
      weight: "44 kg",
      wheelSize: '20"',
      foldable: false,
      brakes: "Tektro Mechanical Disc",
      frame: "Lav gjennomgående stål",
      drivetrain: "Shimano 7 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Triker",
        rammeType: "Lav gjennomgående trehjuling",
        rammeMateriale: "Høyfast stål",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "N/A", sammenlagt: "N/A" },
        vekt: "44 kg",
        maksLast: "160 kg",
        anbefalteHøyde: "155-185 cm",
      },
      motor: {
        type: "Differensialmotor (Bafang)",
        effekt: "250W",
        toppEffekt: "450W",
        dreiemoment: "35Nm",
        plassering: "Bakhjulsaksel",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "LG Lithium-ion",
        spenning: "48V",
        kapasitet: "15Ah",
        kapasitetWh: "720Wh",
        avtakbar: true,
        ladetid: "6-8 timer",
        batteriLevetid: "800-1000 sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-70 km", kombinert: "50-70 km" },
        stigningsevne: "12°",
        svingradius: "3.5m",
      },
      hjul: {
        størrelse: '20"',
        dekkType: "Punkteringsbestandig",
        dekkStørrelse: '20×3.0',
        felgMateriale: "Stål",
      },
      bremser: { foran: "Mekanisk skive", bak: "Mekanisk skive", type: "Tektro Mechanical Disc" },
      giring: { type: "Derailleur", gir: "7-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "Color LCD",
        lys: { foran: true, bak: true, type: "LED" },
        horn: true,
        gasspedal: true,
        assistanseNivåer: "3 nivåer",
      },
      komfort: {
        demping: { foran: true, bak: false, type: "Fjærgaffel" },
        sete: { type: "Ekstra bred komfortsadel", justerbar: true, materiale: "Syntetisk lær m/fjærer" },
        styre: { type: "Ergonomisk svingt", justerbar: true, materiale: "Stål" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: false, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: false, kurv: true, flaskeholder: false },
    },
    description:
      "Triker er en stabil trehjulssykkel med stor last, lav innsteg og differensial – ideell for seniorer og varetransport.",
    keyFeatures: [
      "Bafang 250W, 35Nm",
      "48V 15Ah LG (720Wh)",
      "Opptil 70 km rekkevidde",
      "20×3.0 CST hjul",
      "Høyfast stål ramme (Maks last 160kg)",
      "Fjærgaffel demping",
      "Tektro Mechanical Disc bremser",
      "Shimano 7-Speed",
      "Stor bak-kurv (ca. 100L)",
      "Color LCD",
      "En størrelse",
    ],

    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Triker el-trehjulssykkel",
      "36V 13Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
      "Bakre lastekurv",
    ],
  },

  // 20. JOBOBIKE Dyno (ST)
  {
    id: "dyno-001",
    name: "DYNO - JoboBike",
    slug: "jobobike-dyno",
    originalPrice: 33999,
    price: 13600,
    discount: "17%",
    image: "/images/dyno-gt/dyno-gt-1.png",
    images: ["/images/dyno-gt/dyno-gt-1.png", "/images/dyno-gt/dyno-gt-2.png"],
    features: ["Lav innsteg komfortdesign", "250W motor", "Frontdemping", '27.5" hjul', "Rimelig kvalitet"],
    badge: "Best verdi",
    category: ["Hybrid"],
    rating: 4.6,
    reviewCount: 103,
    modelVariants: [
      { name: "Dyno", slug: "jobobike-dyno", price: 33999 },
      { name: "Dyno GT", slug: "jobobike-dyno-gt", price: 34999 }
    ],
    specifications: {
      motor: "XOFO 36V250W Hub",
      battery: "36V15Ah Samsung",
      range: "60-80 km",
      speed: "25 km/t",
      weight: "27 kg",
      wheelSize: '27.5"',
      foldable: false,
      brakes: "Hydraulic Disc",
      frame: "Aluminiumslegering",
      drivetrain: "Shimano 8 sp",
    },
    tekniskeSpesifikasjoner: {
      generelt: {
        modell: "Dyno",
        rammeType: "Gjennomgående",
        rammeMateriale: "6061 Aluminiumslegering",
        sammenleggbar: false,
        dimensjoner: { utbrettet: "158×28×85 cm", sammenlagt: "N/A" },
        vekt: "27 kg",
        maksLast: "120 kg",
        anbefalteHøyde: "160-185 cm",
      },
      motor: {
        type: "Hub (XOFO)",
        effekt: "250W",
        toppEffekt: "500W",
        dreiemoment: "40Nm",
        plassering: "Bakhjul",
        dreiemomentSensor: false,
      },
      batteri: {
        type: "Samsung Lithium-ion",
        spenning: "36V",
        kapasitet: "15Ah",
        kapasitetWh: "540Wh",
        avtakbar: true,
        ladetid: "4-6 timer",
        batteriLevetid: "800+ sykluser",
      },
      ytelse: {
        maksFart: "25 km/t",
        rekkevidde: { renElektrisk: "45 km", pedalAssistanse: "50-80 km", kombinert: "50-80 km" },
        stigningsevne: "15°",
        svingradius: "2.5m",
      },
      hjul: { størrelse: '27.5"', dekkType: "Kenda", dekkStørrelse: '27.5×2.4', felgMateriale: "Aluminiumslegering" },
      bremser: { foran: "Hydraulisk skive", bak: "Hydraulisk skive", type: "Hydraulic Disc" },
      giring: { type: "Derailleur", gir: "8-trinns", girskifter: "Shimano" },
      elektrisk: {
        display: "LCD + Bluetooth",
        lys: { foran: true, bak: true, type: "LED" },
        horn: true,
        gasspedal: false,
        assistanseNivåer: "5 nivåer",
      },
      komfort: {
        demping: { foran: false, bak: false, type: "Ingen" },
        sete: { type: "Komfortsadel", justerbar: true, materiale: "Syntetisk lær" },
        styre: { type: "Ergonomisk", justerbar: true, materiale: "Aluminiumslegering" },
      },
      sikkerhet: { reflekser: true, bjelle: true, vannMotstand: "IPX4", sertifisering: ["CE", "EN15194"] },
      tilkobling: { app: false, gps: false, bluetooth: true, usb: false },
      tilbehør: { sidestøtte: true, skjermer: true, bagasjebrett: true, kurv: false, flaskeholder: false },
    },
    description:
      "Dyno gir enkel påstigning, komfortabel kjøring og solid rekkevidde – mye sykkel for pengene.",
    keyFeatures: [
      "XOFO 250W, 40Nm",
      "36V 15Ah Samsung (540Wh)",
      "Opptil 80 km rekkevidde",
      "27.5×2.4 Kenda hjul",
      "6061 Aluminiumslegering ramme",
      "Hydraulic Disc bremser",
      "Shimano 8-Speed",
      "LCD + Bluetooth",
      "En størrelse",
    ],

    availableSizes: ["En størrelse"],
    whatsInTheBox: [
      "JOBOBIKE Dyno el-sykkel",
      "36V 15Ah batteri",
      "Lader",
      "Brukermanual",
      "Verktøysett",
      "Pedaler",
      "Bjelle",
    ],
  },
];

// Hent produkt etter slug
export const getProductBySlug = (slug: string): ProductCard | undefined => {
  return PRODUCTS_DATA.find((product) => product.slug === slug);
};

// Hent alle slugs
export const getAllProductSlugs = (): string[] => {
  return PRODUCTS_DATA.map((product) => product.slug);
};

// Relaterte produkter (enkelt: alt uten gjeldende, begrenset)
export const getRelatedProducts = (currentProductId: string, limit: number = 3): ProductCard[] => {
  return PRODUCTS_DATA.filter((p) => p.id !== currentProductId).slice(0, limit);
};

// Hent produkter etter kategori (norsk)
export const getProductsByCategory = (category: string): ProductCard[] => {
  const lower = category.toLowerCase();
  return PRODUCTS_DATA.filter((product) => product.category.some((c) => c.toLowerCase() === lower));
};

// Søk i produkter (navn, beskrivelse, funksjoner, nøkkelfunksjoner, kategori, enkle specs)
export const searchProducts = (query: string): ProductCard[] => {
  if (!query || query.trim().length === 0) return [];
  const lowerQuery = query.toLowerCase().trim();

  return PRODUCTS_DATA.filter((product) => {
    return product.name.toLowerCase().startsWith(lowerQuery);
  });
};

// Hent produkter i prisintervall
export const getProductsByPriceRange = (minPrice: number, maxPrice: number): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => product.price >= minPrice && product.price <= maxPrice);
};

// Sorter på pris
export const getProductsSortedByPrice = (ascending: boolean = true): ProductCard[] => {
  return [...PRODUCTS_DATA].sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
};

// Sorter på rating
export const getProductsSortedByRating = (ascending: boolean = false): ProductCard[] => {
  return [...PRODUCTS_DATA].sort((a, b) => (ascending ? a.rating - b.rating : b.rating - a.rating));
};

// Utvalgte produkter (har badge)
export const getFeaturedProducts = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => Boolean(product.badge));
};

// Lettvektsprodukter (merkebasert)
export const getLightweightProducts = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => product.badge?.toLowerCase() === "lettvekt");
};

// Sammenleggbare sykler
export const getFoldingBikes = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => product.specifications.foldable === true || product.category.includes("Sammenleggbar"));
};

// Pendlersykler (norsk)
export const getCommuterBikes = (): ProductCard[] => {
  return PRODUCTS_DATA.filter((product) => product.category.some((c) => ["pendler", "hybrid"].includes(c.toLowerCase())));
};



// Hent produkt etter ID
export const getProductById = (id: string): ProductCard | undefined => {
  return PRODUCTS_DATA.find((product) => product.id === id);
};
