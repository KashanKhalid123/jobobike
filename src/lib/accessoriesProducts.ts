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
}

export const accessoriesProducts: AccessoryProduct[] = [
  {
    id: "1",
    slug: "jobobike-front-rack",
    name: "JOBOBIKE Front Rack",
    description: "Lightweight aluminum front rack with durable matte black powder coating, rustproof and perfect for all weather conditions.",
    fullDescription: "The JOBOBIKE front rack is made of lightweight aluminum with a durable, matte black powder coating. It is rustproof, making it perfect for all weather conditions. No matter whether you are traveling on rough terrain or in the city - the JOBOBIKE luggage rack is guaranteed not to fall down when suddenly turning or braking heavily.",
    price: 45,
    currency: "kr",
    image: "/images/front-rack/front-1.png",
    images: [
      "/images/front-rack/front-1.png",
      "/images/front-rack/front-2.png",
     
     
    ],
    category: ["Racks & Carriers"],
    specifications: [
      { label: "Material", value: "Aluminum Alloy" },
      { label: "Finish", value: "Matte Black Powder Coating" },
      { label: "Weight Capacity", value: "15kg" },
      { label: "Mounting", value: "Front Fork Mount" }
    ],
    features: [
      "Rustproof construction",
      "Lightweight aluminum design",
      "Durable matte black finish",
      "Secure mounting system",
      "All-weather performance"
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
    name: "JOBOBIKE Basket with Wooden Handle",
    description: "Stylish integrated basket with wooden handle, perfect for carrying groceries and personal items on your e-bike.",
    fullDescription: "The JOBOBIKE basket with wooden handle combines functionality with elegant design. Made from durable materials with a beautiful wooden handle accent, it can be mounted on both front and rear racks. The integrated design ensures quick and easy installation without additional hardware.",
    price: 55,
    currency: "kr",
    image: "/images/basket/basket-1.png",
    images: [
      "/images/basket/basket-1.png",
      "/images/basket/basket-2.png",
     
    ],
    category: ["Baskets & Storage"],
    specifications: [
      { label: "Material", value: "Aluminum Alloy with Wooden Handle" },
      { label: "Finish", value: "Matte Black" },
      { label: "Capacity", value: "20L" },
      { label: "Mounting", value: "Front/Rear Rack Compatible" }
    ],
    features: [
      "Elegant wooden handle",
      "Integrated mounting system",
      "Quick installation",
      "Weather resistant",
      "Spacious 20L capacity"
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
    name: "JOBOBIKE Cover Bag for Sam",
    description: "Waterproof cover bag that protects your folding bike from dust, water and abrasions. Specially designed for JOBOBIKE Sam.",
    fullDescription: "This waterproof cover bag is specifically designed to protect your JOBOBIKE Sam folding bike from dust, water, and abrasions. The durable material ensures long-lasting protection, while the compact design makes it easy to store and transport your bike. Perfect for travel and storage.",
    price: 65,
    currency: "kr",
    image: "/images/Thermal/thermal-bag-1.png",
    images: [
      "/images/Thermal/thermal-bag-1.png",
      "/images/Thermal/thermal-bag-2.png",
      "/images/Thermal/thermal-bag-3.png",
     
    ],
    category: ["Protection & Storage"],
    specifications: [
      { label: "Material", value: "600D Oxford Fabric" },
      { label: "Water Resistance", value: "IPX4" },
      { label: "Size", value: "85cm x 43cm x 72cm" },
      { label: "Weight", value: "1.2kg" }
    ],
    features: [
      "Waterproof protection",
      "Dust and scratch resistant",
      "Reinforced carrying handles",
      "Compact storage",
      "Easy to clean"
    ],
    compatibility: ["JOBOBIKE Sam"],
    inStock: true
  },
  {
    id: "4",
    slug: "jobobike-lock",
    name: "JOBOBIKE Lock",
    description: "Heavy-duty bike lock providing maximum security for your e-bike with anti-theft protection and weather-resistant construction.",
    fullDescription: "The JOBOBIKE Lock offers premium security for your electric bike. Featuring a hardened steel construction with anti-pick and anti-drill protection, this lock ensures your bike stays safe. The weather-resistant design works in all conditions, and the compact size makes it easy to carry.",
    price: 35,
    currency: "kr",
    image: "/images/lock/lock-1.png",
    images: [
      "/images/lock/lock-1.png",
      "/images/lock/lock-2.png",
      
    ],
    category: ["Security"],
    specifications: [
      { label: "Material", value: "Hardened Steel" },
      { label: "Security Level", value: "Level 9" },
      { label: "Length", value: "120cm" },
      { label: "Diameter", value: "12mm" }
    ],
    features: [
      "Hardened steel construction",
      "Anti-pick cylinder",
      "Anti-drill protection",
      "Weather resistant coating",
      "Includes 3 keys"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "5",
    slug: "jobobike-phone-holder-waterproof",
    name: "JOBOBIKE Phone Holder (Waterproof Cover)",
    description: "Secure phone holder with waterproof cover, allowing you to use your phone for navigation while protecting it from the elements.",
    fullDescription: "Keep your phone accessible and protected with the JOBOBIKE Phone Holder. The waterproof cover allows full touchscreen functionality while protecting against rain and dust. The secure mounting system ensures your phone stays in place even on rough terrain, making it perfect for GPS navigation.",
    price: 25,
    currency: "kr",
    image: "/images/holder/holder-1.png",
    images: [
      "/images/holder/holder-1.png",
      "/images/holder/holder-2.png",
      "/images/holder/holder-3.png",
      
    ],
    category: ["Electronics & Holders"],
    specifications: [
      { label: "Compatibility", value: "Phones up to 6.7 inches" },
      { label: "Water Resistance", value: "IPX6" },
      { label: "Mounting", value: "Handlebar Mount" },
      { label: "Rotation", value: "360Â°" }
    ],
    features: [
      "Waterproof touchscreen cover",
      "360Â° rotation",
      "Secure locking mechanism",
      "Quick release system",
      "Universal phone compatibility"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "6",
    slug: "jobobike-bicycle-mirror",
    name: "JOBOBIKE Bicycle Mirror",
    description: "High-quality rearview mirror providing excellent visibility and safety while riding your e-bike.",
    fullDescription: "The JOBOBIKE Bicycle Mirror enhances your riding safety with a wide field of view and shatterproof glass. The adjustable arm allows you to find the perfect viewing angle, while the sturdy mounting system keeps it secure even on bumpy roads. The sleek design complements your bike's aesthetics.",
    price: 20,
    currency: "kr",
    image: "/images/mirror/mirror-1.png",
    images: [
      "/images/mirror/mirror-1.png",
      "/images/mirror/mirror-2.png",
      
    ],
    category: ["Safety & Visibility"],
    specifications: [
      { label: "Mirror Size", value: "80mm diameter" },
      { label: "Material", value: "Shatterproof Glass" },
      { label: "Mounting", value: "Handlebar Mount" },
      { label: "Adjustment", value: "Multi-angle" }
    ],
    features: [
      "Shatterproof mirror glass",
      "Wide viewing angle",
      "Adjustable positioning",
      "Sturdy mounting bracket",
      "Easy installation"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
  {
    id: "7",
    slug: "jobobike-helmet",
    name: "JOBOBIKE Bicycle Helmet",
    description: "CE EN 1078 and CPSC certified safety helmet with impact-resistant construction and optimal ventilation for comfortable riding.",
    fullDescription: "The JOBOBIKE bicycle helmet was tested for safety by CE EN 1078 in Europe and CPSC in the USA. Impact-resistant PC material on the outside and a shock-absorbing EPS unibody on the inside provide maximum protection. The helmet features optimal ventilation, adjustable fit system, and removable padding for comfort during long rides.",
    price: 49,
    currency: "kr",
    image: "/images/helmet/helmet-1.png",
    images: [
      "/images/helmet/helmet-1.png",
      "/images/helmet/helmet-2.png",
      
    ],
    category: ["Safety & Visibility"],
    specifications: [
      { label: "Certification", value: "CE EN 1078, CPSC" },
      { label: "Material", value: "PC Shell + EPS Foam" },
      { label: "Weight", value: "280g" },
      { label: "Ventilation", value: "18 Air Vents" }
    ],
    features: [
      "Dual safety certification",
      "Impact-resistant construction",
      "Optimal ventilation system",
      "Adjustable fit dial",
      "Removable padding",
      "Reflective elements"
    ],
    compatibility: ["Universal"],
    inStock: true,
    sizes: ["S (52-56cm)", "M (56-60cm)", "L (60-64cm)"],
    colors: ["Black", "White", "Blue", "Red"]
  },
  {
    id: "8",
    slug: "jobobike-bottle-holder",
    name: "JOBOBIKE Bottle Holder",
    description: "Durable aluminum bottle holder that securely holds your water bottle during rides, easy to install and compatible with most bottles.",
    fullDescription: "Stay hydrated on your rides with the JOBOBIKE Bottle Holder. Made from lightweight aluminum with a secure grip design, it holds bottles firmly in place even on rough terrain. The universal mounting system fits all JOBOBIKE frames, and the sleek design matches your bike's aesthetic.",
    price: 15,
    currency: "kr",
    image: "/images/bottle/bottle-1.png",
    images: [
      "/images/bottle/bottle-1.png",
      "/images/bottle/bottle-2.png",
     
    ],
    category: ["Accessories"],
    specifications: [
      { label: "Material", value: "Aluminum Alloy" },
      { label: "Finish", value: "Matte Black" },
      { label: "Bottle Capacity", value: "500-750ml" },
      { label: "Mounting", value: "Frame Mount" }
    ],
    features: [
      "Lightweight aluminum construction",
      "Secure grip design",
      "Universal bottle compatibility",
      "Easy installation",
      "Sleek appearance"
    ],
    compatibility: ["Universal - All JOBOBIKE Models"],
    inStock: true
  },
 


  // 3. Integrated Front Basket
  {
    id: "acc-integrated-basket-001",
    slug: "integrated-front-basket",
    name: "JOBOBIKE Integrated Front Basket",
    description: "Integrated basket specially designed for e-bikes. Mounts directly on front or rear rack without additional hardware. Quick and easy installation.",
    fullDescription: "Integrated basket, specially designed for e-bikes. It can be mounted directly on the front or rear rack of the e-bike without the need for an additional front rack. Installation is quick and easy. The basket is made of aluminum alloy and features a durable matte black powder coating for excellent rust resistance. This makes it suitable for all weather conditions and ensures a long service life. The basket's design combines modern urban style with natural wood elements.",
    price: 88,
    currency: "NOK",
    image: "/images/Integrated-basket/basket.png.png",
    images: [
     "/images/Integrated-basket/basket.png",
    ],
    category: ["Baskets", "Storage", "Cargo"],
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
    colors: ["Black"]
  },

 
  // 7. Phone Holder (Shockproof)
  {
    id: "acc-phone-holder-shockproof-001",
    slug: "phone-holder-shockproof",
    name: "JOBOBIKE Shockproof Phone Holder",
    description: "Universal shockproof phone mount with anti-slip silicone pads and 360° rotation. Tool-free installation, fits phones 4.8\"-7.0\".",
    fullDescription: "Secure your phone on every ride with this shockproof, universal e-bike phone mount. Built to handle rough roads and daily commutes, it features a non-slip clamp, 360° adjustable viewing, and a quick-install system – no tools needed. Compatible with phones 132–182mm long (about 4.8\" to 7.0\") and mounts on handlebars up to 46mm in diameter. Full silicone padding protects your phone from scratches and shocks, while the safety lock clip enhances grip and stability during rides.",
    price: 29,
    currency: "NOK",
    image: "/images/holder-shock/holder.png.png",
    images: [
     "/images/holder-shock/holder.png",
    ],
    category: ["Phone Holders", "Accessories", "Navigation"],
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
    colors: ["Black"]
  },

  

  // 11. Water Bottle Holder (JOBOBIKE Logo)
  {
    id: "acc-bottle-holder-logo-001",
    slug: "water-bottle-holder-jobobike-logo",
    name: "JOBOBIKE Logo Water Bottle Holder",
    description: "Premium water bottle holder with JOBOBIKE branding. Durable construction with secure grip for standard bottles.",
    fullDescription: "Premium water bottle holder featuring the JOBOBIKE logo. Made from high-quality materials with a durable black finish. Provides secure retention for standard water bottles while adding a branded touch to your e-bike. Easy installation with included mounting hardware.",
    price: 19,
    currency: "NOK",
    image: "/images/bottle-logo/bottle-logo.png.png",
    images: [
      "/images/bottle-logo/bottle-logo.png",
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
    colors: ["Black"]
  },

  // 12. Magnet Water Bottle Holder
  {
    id: "acc-bottle-holder-magnet-001",
    slug: "magnet-water-bottle-holder",
    name: "Magnetic Water Bottle Holder",
    description: "Innovative magnetic water bottle holder for quick access. Strong magnetic grip with easy one-hand operation.",
    fullDescription: "Revolutionary magnetic water bottle holder that allows quick, one-handed access to your water bottle while riding. Features powerful magnets that securely hold your bottle in place, yet release easily when needed. Perfect for riders who need frequent hydration without stopping. Compatible with special magnetic water bottles or magnetic bottle adapters.",
    price: 35.99,
    currency: "NOK",
    image: "/images/magnet-holder/magnet-holder.png.png",
    images: [
     "/images/magnet-holder/magnet-holder.png",
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
    colors: ["Black", "Grey"]
  },

  // 13. Single Side Pannier Bag
  {
    id: "acc-pannier-single-001",
    slug: "single-side-pannier-bag",
    name: "Single Side Pannier Bag",
    description: "Waterproof single-side pannier bag for rear rack. Perfect for daily commuting and grocery shopping.",
    fullDescription: "Versatile single-side pannier bag designed to attach to your rear rack. Features waterproof construction, reflective strips for safety, and multiple compartments for organized storage. Ideal for commuters who need moderate cargo capacity without the bulk of double panniers. Quick-release mounting system allows easy attachment and removal.",
    price: 66,
    currency: "NOK",
    image: "/images/pannier/pannier-1.png",
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
    colors: ["Blue"]
  },

  // 14. Double Side Pannier Bag
  {
    id: "acc-pannier-double-001",
    slug: "double-side-pannier-bag",
    name: "Double Side Pannier Bag Set",
    description: "Waterproof double pannier bag set for maximum cargo capacity. Ideal for touring, shopping, and heavy loads.",
    fullDescription: "Complete double-sided pannier bag system for serious cargo needs. Features two spacious bags that attach to both sides of your rear rack, providing balanced weight distribution and maximum storage capacity. Waterproof construction with roll-top closures, reflective safety elements, and quick-release mounting. Perfect for bike touring, large shopping trips, or transporting equipment.",
    price: 119,
    currency: "NOK",
    image: "/images/double-bag/bag.png.png",
    images: [
     "/images/double-bag/bag.png",
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
    colors: ["Black", "Grey"]
  },

  // 15. Canopy
  {
    id: "acc-canopy-001",
    slug: "bike-canopy",
    name: "JOBOBIKE Canopy",
    description: "Weather protection canopy for cargo bikes. Shields rider and cargo from rain, sun, and wind.",
    fullDescription: "The JOBOBIKE Canopy provides comprehensive weather protection for cargo bike riders. This durable canopy shields you and your cargo from rain, harsh sun, and wind, making year-round riding more comfortable. Features a sturdy aluminum frame with waterproof fabric cover, easy installation, and adjustable positioning. Perfect for delivery riders, parents transporting children, or anyone who rides in all weather conditions.",
    price: 259,
    currency: "NOK",
    image: "/images/canopy/canopy.png.png",
    images: [
      "/images/canopy/canopy.png",
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
    colors: ["Black"]
  },

  // 16. Monkey Bar
  {
    id: "acc-monkey-bar-001",
    slug: "monkey-bar",
    name: "JOBOBIKE Monkey Bar",
    description: "Front handlebar attachment for child passenger. Safe and comfortable seating position for young riders.",
    fullDescription: "The JOBOBIKE Monkey Bar is a front-mounted handlebar attachment that allows you to safely transport a child on your cargo bike. This innovative accessory provides a secure holding bar for children to grip while riding, positioned in front of the rider for maximum supervision and interaction. Features padded grips, adjustable positioning, and sturdy construction to ensure safety and comfort.",
    price: 220,
    currency: "NOK",
    image: "/images/monkey-bar/bar.png.png",
    images: [
      "/images/monkey-bar/bar.png",
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
    colors: ["Black"]
  },

  // 17. Captain Chair
  {
    id: "acc-captain-chair-001",
    slug: "captain-chair",
    name: "JOBOBIKE Captain Chair",
    description: "Premium child seat with full back support and safety harness. Comfortable and secure seating for young passengers.",
    fullDescription: "The JOBOBIKE Captain Chair is a premium child seating solution for cargo bikes. Features a full backrest, comfortable cushioning, integrated safety harness, and footrests for secure and comfortable transport of children. Designed to work seamlessly with the Monkey Bar for the ultimate family riding experience. High-quality construction ensures durability and safety for years of use.",
    price: 245,
    currency: "NOK",
    image: "/images/chair/chair.png.png",
    images: [
      "/images/chair/chair.png",
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
    colors: ["Black"]
  },

  // 18. Armrest
  {
    id: "acc-armrest-001",
    slug: "armrest",
    name: "JOBOBIKE Armrest",
    description: "Comfortable armrests for cargo bike seating. Adds extra comfort and security for passengers.",
    fullDescription: "The JOBOBIKE Armrest set provides additional comfort and security for cargo bike passengers. These padded armrests attach to the sides of the cargo platform, giving passengers something to hold onto and lean against during the ride. Particularly useful when transporting adults or older children, or when using the cargo area for extended trips.",
    price: 59,
    currency: "NOK",
    image: "/images/arm/arm.png.png",
    images: [
      "/images/arm/arm.png",
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
    colors: ["Black"]
  },

  // 19. Safety Belt
  {
    id: "acc-safety-belt-001",
    slug: "safety-belt",
    name: "JOBOBIKE Safety Belt",
    description: "Adjustable safety belt for securing cargo or passengers on rear rack. Essential safety accessory.",
    fullDescription: "The JOBOBIKE Safety Belt is an essential safety accessory for securing cargo or passengers on your rear rack. Features adjustable length, quick-release buckle, and durable webbing that can withstand outdoor conditions. Perfect for securing bags, boxes, or providing additional safety for rear-mounted child seats.",
    price: 15,
    currency: "NOK",
    image: "/images/belt/belt.png.png",
    images: [
     "/images/belt/belt.png",
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
    colors: ["Black"]
  },

  // 20. Cushion
  {
    id: "acc-cushion-001",
    slug: "rear-rack-cushion",
    name: "JOBOBIKE Rear Rack Cushion",
    description: "Comfortable cushion for rear rack passenger seating. Waterproof and padded for extended comfort.",
    fullDescription: "Transform your rear rack into a comfortable passenger seat with the JOBOBIKE Rear Rack Cushion. This padded cushion features waterproof covering, anti-slip bottom, and secure attachment straps. Perfect for giving friends a ride or creating a comfortable seating area on your cargo rack. The cushion is weather-resistant and easy to clean.",
    price: 40,
    currency: "NOK",
    image: "/images/cushion/cushion.png.png",
    images: [
      "/images/cushion/cushion.png",
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
    colors: ["Black"]
  },

  // 21. Loading-Bearing Plate
  {
    id: "acc-loading-plate-001",
    slug: "loading-bearing-plate",
    name: "JOBOBIKE Loading-Bearing Plate",
    description: "Heavy-duty loading platform extension for cargo bikes. Increases cargo capacity and provides flat loading surface.",
    fullDescription: "The JOBOBIKE Loading-Bearing Plate is a heavy-duty platform extension designed for serious cargo needs. This reinforced plate mounts to your cargo bike's platform, providing a stable, flat surface for transporting larger items, boxes, or equipment. Made from durable materials that can handle significant weight, it's perfect for delivery riders, business use, or anyone who needs maximum cargo capacity.",
    price: 99,
    currency: "NOK",
    image: "/images/plate/plate.png.png",
    images: [
      "/images/plate/plate.png",
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
    colors: ["Black"]
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

