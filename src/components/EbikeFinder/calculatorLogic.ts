// components/EbikeFinder/calculatorLogic.ts

export interface UserPreferences {
  gender: string;
  age: number;
  height: number;
  weight: number;
  usageType: string[];
  terrain: string;
  distancePerTrip: string;
  rangeRequirement: number;
  budget: number;
  weightPreference: string;
  motorPreference: string;
  comfortLevel: string;
  extraNeeds: string[];
}

export interface Bike {
  id: string ;
  name: string;
  brand: string;
  price: number;
  range_km?: number;
  motor_watt?: number;
  motor_position?: string;
  battery_Ah?: number;
  weight_kg?: number;
  terrain?: string[];
  usage_type?: string[];
  comfort_level?: string;
  frame_height_cm?: number;
  tire_width?: number;
  image: string;
  description?: string;
  link?: string;
  // Add any other fields from your product data
}

export interface BikeWithScore extends Bike {
  matchScore: number;
  matchReasons: string[];
}

// Weighting system based on the document
const WEIGHTS = {
  terrain: 0.25,
  usage: 0.20,
  range: 0.20,
  budget: 0.15,
  physicalFit: 0.10,
  comfort: 0.10,
};

export function calculateBikeMatch(
  preferences: UserPreferences,
  bikes: Bike[]
): BikeWithScore[] {
  const scoredBikes = bikes.map(bike => {
    let totalScore = 0;
    const reasons: string[] = [];

    // Terrain matching (25%)
    const terrainScore = calculateTerrainScore(preferences.terrain, bike.terrain, bike.motor_watt);
    totalScore += terrainScore * WEIGHTS.terrain;
    if (terrainScore > 0.7) {
      reasons.push(`Perfekt for ${preferences.terrain.toLowerCase()} terreng`);
    }

    // Usage type matching (20%)
    const usageScore = calculateUsageScore(preferences.usageType, bike.usage_type);
    totalScore += usageScore * WEIGHTS.usage;
    if (usageScore > 0.7) {
      reasons.push(`Ideell for ${preferences.usageType.join(' og ')}`);
    }

    // Range matching (20%)
    const rangeScore = calculateRangeScore(preferences.rangeRequirement, bike.range_km);
    totalScore += rangeScore * WEIGHTS.range;
    if (rangeScore > 0.8) {
      reasons.push(`Utmerket rekkevidde på ${bike.range_km}km`);
    }

    // Budget matching (15%)
    const budgetScore = calculateBudgetScore(preferences.budget, bike.price);
    totalScore += budgetScore * WEIGHTS.budget;
    if (budgetScore === 1) {
      reasons.push('Innenfor ditt budsjett');
    }

    // Physical fit matching (10%)
    const fitScore = calculatePhysicalFitScore(preferences.height, bike.frame_height_cm);
    totalScore += fitScore * WEIGHTS.physicalFit;
    if (fitScore > 0.8) {
      reasons.push('Perfekt størrelse for din høyde');
    }

    // Comfort matching (10%)
    const comfortScore = calculateComfortScore(preferences.comfortLevel, bike.comfort_level);
    totalScore += comfortScore * WEIGHTS.comfort;

    // Motor preference bonus
    if (preferences.motorPreference !== 'Not sure' && 
        bike.motor_position?.toLowerCase() === preferences.motorPreference.toLowerCase()) {
      totalScore += 0.05;
      reasons.push(`${bike.motor_position} motor som ønsket`);
    }

    return {
      ...bike,
      matchScore: Math.round(totalScore * 100),
      matchReasons: reasons,
    };
  });

  // Sort by match score and return top results
  return scoredBikes
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}

function calculateTerrainScore(userTerrain: string, bikeTerrain?: string[], motorWatt?: number): number {
  if (!bikeTerrain || bikeTerrain.length === 0) return 0.5;

  const terrainMatch = bikeTerrain.some(t => 
    t.toLowerCase().includes(userTerrain.toLowerCase()) ||
    userTerrain.toLowerCase().includes(t.toLowerCase())
  );

  if (!terrainMatch) return 0.3;

  // Check motor power for terrain
  const requiredPower = {
    'flat': 250,
    'small hills': 350,
    'hilly': 500,
    'mountain': 750,
  };

  const required = requiredPower[userTerrain.toLowerCase() as keyof typeof requiredPower] || 350;
  if (motorWatt && motorWatt >= required) return 1.0;
  if (motorWatt && motorWatt >= required * 0.8) return 0.8;
  
  return 0.6;
}

function calculateUsageScore(userUsage: string[], bikeUsage?: string[]): number {
  if (!bikeUsage || bikeUsage.length === 0) return 0.5;

  const matches = userUsage.filter(usage => 
    bikeUsage.some(bu => 
      bu.toLowerCase().includes(usage.toLowerCase()) ||
      usage.toLowerCase().includes(bu.toLowerCase())
    )
  );

  return matches.length / userUsage.length;
}

function calculateRangeScore(requiredRange: number, bikeRange?: number): number {
  if (!bikeRange) return 0.5;
  
  if (bikeRange >= requiredRange * 1.2) return 1.0;
  if (bikeRange >= requiredRange) return 0.9;
  if (bikeRange >= requiredRange * 0.8) return 0.7;
  if (bikeRange >= requiredRange * 0.6) return 0.5;
  
  return 0.3;
}

function calculateBudgetScore(budget: number, price: number): number {
  if (price <= budget) return 1.0;
  if (price <= budget * 1.1) return 0.8;
  if (price <= budget * 1.2) return 0.6;
  
  return 0.3;
}

function calculatePhysicalFitScore(height: number, frameHeight?: number): number {
  if (!frameHeight) return 0.5;

  // Rough frame size calculation based on height
  const idealFrame = (height - 100) * 0.66;
  const difference = Math.abs(idealFrame - frameHeight);

  if (difference <= 2) return 1.0;
  if (difference <= 4) return 0.8;
  if (difference <= 6) return 0.6;
  
  return 0.4;
}

function calculateComfortScore(userComfort: string, bikeComfort?: string): number {
  if (!bikeComfort) return 0.5;
  
  if (userComfort.toLowerCase() === bikeComfort.toLowerCase()) return 1.0;
  
  return 0.6;
}