/* Real Metropolitan Melbourne & Regional VIC suburbs served by Elevate.
   Used to power the calculator's suburb autocomplete with genuine
   postcodes so prospects can find their site instantly. */
export interface SuburbOption {
  suburb: string;
  postcode: string;
  region: string;
  label: string;
}

const RAW: [string, string, string][] = [
  // CBD & inner city
  ["Melbourne", "3000", "CBD & Inner City"],
  ["Docklands", "3008", "CBD & Inner City"],
  ["Southbank", "3006", "CBD & Inner City"],
  ["Carlton", "3053", "CBD & Inner City"],
  ["East Melbourne", "3002", "CBD & Inner City"],
  ["West Melbourne", "3003", "CBD & Inner City"],
  ["North Melbourne", "3051", "CBD & Inner City"],
  // Inner south & bayside
  ["South Yarra", "3141", "Inner South & Bayside"],
  ["Richmond", "3121", "Inner South & Bayside"],
  ["Prahran", "3181", "Inner South & Bayside"],
  ["St Kilda", "3182", "Inner South & Bayside"],
  ["Brighton", "3186", "Inner South & Bayside"],
  ["Sandringham", "3191", "Inner South & Bayside"],
  ["Cheltenham", "3192", "Inner South & Bayside"],
  ["Moorabbin", "3189", "Inner South & Bayside"],
  // Inner east
  ["Collingwood", "3066", "Inner East"],
  ["Fitzroy", "3065", "Inner East"],
  ["Cremorne", "3121", "Inner East"],
  ["Hawthorn", "3122", "Inner East"],
  ["Kew", "3101", "Inner East"],
  ["Camberwell", "3124", "Inner East"],
  ["Box Hill", "3128", "Inner East"],
  ["Doncaster", "3108", "Inner East"],
  // West
  ["Footscray", "3011", "West"],
  ["Sunshine", "3020", "West"],
  ["St Albans", "3021", "West"],
  ["Werribee", "3030", "West"],
  ["Point Cook", "3030", "West"],
  ["Williamstown", "3016", "West"],
  ["Yarraville", "3013", "West"],
  // North
  ["Brunswick", "3056", "North"],
  ["Coburg", "3058", "North"],
  ["Preston", "3072", "North"],
  ["Reservoir", "3073", "North"],
  ["Broadmeadows", "3047", "North"],
  ["Craigieburn", "3064", "North"],
  ["Epping", "3076", "North"],
  ["South Morang", "3752", "North"],
  // South east
  ["Dandenong", "3175", "South East"],
  ["Narre Warren", "3805", "South East"],
  ["Cranbourne", "3977", "South East"],
  ["Frankston", "3199", "South East"],
  ["Mornington", "3931", "South East"],
  ["Keysborough", "3173", "South East"],
  ["Springvale", "3171", "South East"],
  // Regional Victoria
  ["Geelong", "3220", "Regional Victoria"],
  ["Ballarat", "3350", "Regional Victoria"],
  ["Bendigo", "3550", "Regional Victoria"],
  ["Lara", "3212", "Regional Victoria"],
  ["Wodonga", "3690", "Regional Victoria"],
];

export const MELB_SUBURBS: SuburbOption[] = RAW.map(
  ([suburb, postcode, region]) => ({
    suburb,
    postcode,
    region,
    label: `${suburb} ${postcode}`,
  })
);
