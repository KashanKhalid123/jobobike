import re

# Read the file
with open('src/lib/productData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace English property names with Norwegian ones
replacements = {
    'power:': 'effekt:',
    'peakPower:': 'toppEffekt:',
    'torque:': 'dreiemoment:',
    'location:': 'plassering:',
    'torqueSensor:': 'dreiemomentSensor:',
    'voltage:': 'spenning:',
    'capacity:': 'kapasitet:',
    'capacityWh:': 'kapasitetWh:',
    'removable:': 'avtakbar:',
    'chargingTime:': 'ladetid:',
    'batteryLife:': 'batteriLevetid:',
    'maxSpeed:': 'maksFart:',
    'pureElectric:': 'renElektrisk:',
    'pedalAssist:': 'pedalAssistanse:',
    'combined:': 'kombinert:',
    'gradability:': 'stigningsevne:',
    'turningRadius:': 'svingradius:',
    'size:': 'størrelse:',
    'tireType:': 'dekkType:',
    'tireSize:': 'dekkStørrelse:',
    'rimMaterial:': 'felgMateriale:',
    'front:': 'foran:',
    'rear:': 'bak:',
    'gears:': 'gir:',
    'shifter:': 'girskifter:',
    'lights:': 'lys:',
    'throttle:': 'gasspedal:',
    'assistLevels:': 'assistanseNivåer:',
    'suspension:': 'demping:',
    'seat:': 'sete:',
    'adjustable:': 'justerbar:',
    'material:': 'materiale:',
    'handlebar:': 'styre:',
    'reflectors:': 'reflekser:',
    'bell:': 'bjelle:',
    'waterResistance:': 'vannMotstand:',
    'certification:': 'sertifisering:',
    'connectivity:': 'tilkobling:',
    'accessories:': 'tilbehør:',
    'kickstand:': 'sidestøtte:',
    'mudguards:': 'skjermer:',
    'rack:': 'bagasjebrett:',
    'basket:': 'kurv:',
    'bottleHolder:': 'flaskeholder:',
    'motor:': 'motor:',
    'battery:': 'batteri:',
    'performance:': 'ytelse:',
    'wheels:': 'hjul:',
    'brakes:': 'bremser:',
    'transmission:': 'giring:',
    'electrical:': 'elektrisk:',
    'comfort:': 'komfort:',
    'safety:': 'sikkerhet:',
    'range:': 'rekkevidde:'
}

# Apply replacements
for english, norwegian in replacements.items():
    content = content.replace(english, norwegian)

# Write back to file
with open('src/lib/productData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed English properties to Norwegian")