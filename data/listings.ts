export interface Listing {
  id: string;
  name: string;
  area: string;
  price: number;
  floorplan: {
    beds: number;
    baths: number;
  };
  furnished: boolean;
  petFriendly: boolean;
  commuteMins: {
    walking: number;
    biking: number;
    driving: number;
    bus: number;
  };
  liveliness: 1 | 2 | 3 | 4 | 5;
  amenities: string[];
}

export const listings: Listing[] = [
  {
    id: "1",
    name: "Gator Gardens",
    area: "Midtown",
    price: 899,
    floorplan: { beds: 2, baths: 2 },
    furnished: true,
    petFriendly: true,
    commuteMins: { walking: 25, biking: 8, driving: 5, bus: 12 },
    liveliness: 4,
    amenities: ["Pool", "Gym", "Study Room", "BBQ Area", "Parking"],
  },
  {
    id: "2",
    name: "Swamp Side Luxury",
    area: "Downtown",
    price: 1250,
    floorplan: { beds: 1, baths: 1 },
    furnished: false,
    petFriendly: false,
    commuteMins: { walking: 15, biking: 5, driving: 4, bus: 8 },
    liveliness: 5,
    amenities: ["Rooftop Lounge", "Gym", "Concierge", "In-Unit Laundry"],
  },
  {
    id: "3",
    name: "Gatorville Studios",
    area: "University Heights",
    price: 750,
    floorplan: { beds: 1, baths: 1 },
    furnished: true,
    petFriendly: true,
    commuteMins: { walking: 20, biking: 6, driving: 3, bus: 10 },
    liveliness: 3,
    amenities: ["Pool", "Study Lounge", "Parking", "On-Site Laundry"],
  },
  {
    id: "4",
    name: "Chomp Commons",
    area: "Sorority Row",
    price: 1100,
    floorplan: { beds: 3, baths: 2 },
    furnished: false,
    petFriendly: true,
    commuteMins: { walking: 18, biking: 7, driving: 4, bus: 9 },
    liveliness: 5,
    amenities: ["Pool", "Hot Tub", "Volleyball Court", "Clubhouse", "Gym"],
  },
  {
    id: "5",
    name: "Campus Edge Apartments",
    area: "SW 13th St",
    price: 825,
    floorplan: { beds: 2, baths: 1 },
    furnished: true,
    petFriendly: false,
    commuteMins: { walking: 22, biking: 9, driving: 6, bus: 11 },
    liveliness: 2,
    amenities: ["Quiet Hours", "Study Room", "Parking", "Bike Storage"],
  },
  {
    id: "6",
    name: "The Pavilion",
    area: "Archer Road",
    price: 950,
    floorplan: { beds: 2, baths: 2 },
    furnished: false,
    petFriendly: true,
    commuteMins: { walking: 35, biking: 15, driving: 8, bus: 18 },
    liveliness: 3,
    amenities: ["Pool", "Tennis Court", "Gym", "Business Center"],
  },
  {
    id: "7",
    name: "Orange & Blue Lofts",
    area: "Midtown",
    price: 1350,
    floorplan: { beds: 1, baths: 1 },
    furnished: true,
    petFriendly: false,
    commuteMins: { walking: 20, biking: 7, driving: 5, bus: 10 },
    liveliness: 4,
    amenities: ["Rooftop Pool", "Gym", "Pet Spa", "Package Room", "Coworking"],
  },
  {
    id: "8",
    name: "Gator Crossing",
    area: "SW 20th Ave",
    price: 699,
    floorplan: { beds: 1, baths: 1 },
    furnished: false,
    petFriendly: true,
    commuteMins: { walking: 30, biking: 12, driving: 7, bus: 15 },
    liveliness: 2,
    amenities: ["Pool", "Basketball Court", "On-Site Maintenance"],
  },
  {
    id: "9",
    name: "University Pointe",
    area: "University Heights",
    price: 1050,
    floorplan: { beds: 2, baths: 2 },
    furnished: true,
    petFriendly: true,
    commuteMins: { walking: 18, biking: 6, driving: 4, bus: 9 },
    liveliness: 4,
    amenities: ["Pool", "Gym", "Game Room", "Private Shuttle", "Tanning Bed"],
  },
  {
    id: "10",
    name: "Ben Hill Griffin Heights",
    area: "Stadium District",
    price: 1425,
    floorplan: { beds: 3, baths: 3 },
    furnished: true,
    petFriendly: true,
    commuteMins: { walking: 12, biking: 4, driving: 3, bus: 6 },
    liveliness: 5,
    amenities: ["Pool", "Gym", "Game Room", "Stadium Views", "Covered Parking"],
  },
  {
    id: "11",
    name: "Gator Nest Townhomes",
    area: "NW 39th Ave",
    price: 1200,
    floorplan: { beds: 3, baths: 2.5 },
    furnished: false,
    petFriendly: true,
    commuteMins: { walking: 40, biking: 18, driving: 10, bus: 20 },
    liveliness: 1,
    amenities: ["Backyard", "In-Unit Washer/Dryer", "Pet Park", "Storage"],
  },
  {
    id: "12",
    name: "The Swamp @ Midtown",
    area: "Midtown",
    price: 975,
    floorplan: { beds: 2, baths: 2 },
    furnished: true,
    petFriendly: false,
    commuteMins: { walking: 22, biking: 8, driving: 5, bus: 11 },
    liveliness: 4,
    amenities: ["Pool", "Coffee Bar", "Study Pods", "Gym", "Yoga Studio"],
  },
];
