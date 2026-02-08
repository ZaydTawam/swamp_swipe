export interface Listing {
  id: string;
  name: string;
  price: number;
  floorplan: {
    beds: number;
    baths: number;
  };
  distance: number; // miles from UF campus
  commuteMins: {
    walking: number;
    biking: number;
    driving: number;
    bus: number;
  };
  liveliness: 1 | 2 | 3 | 4 | 5;
  image: string; // Unsplash image URL
}

export const listings: Listing[] = [
  {
    id: "1",
    name: "The Standard",
    price: 899,
    floorplan: { beds: 2, baths: 2 },
    distance: 1.2,
    commuteMins: { walking: 25, biking: 8, driving: 5, bus: 12 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "The Luxe",
    price: 1250,
    floorplan: { beds: 1, baths: 1 },
    distance: 0.7,
    commuteMins: { walking: 15, biking: 5, driving: 4, bus: 8 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "2nd Avenue Centre",
    price: 750,
    floorplan: { beds: 1, baths: 1 },
    distance: 0.9,
    commuteMins: { walking: 20, biking: 6, driving: 3, bus: 10 },
    liveliness: 3,
    image:
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Cabana Beach",
    price: 1100,
    floorplan: { beds: 3, baths: 2 },
    distance: 0.8,
    commuteMins: { walking: 18, biking: 7, driving: 4, bus: 9 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    name: "Campus Lodge",
    price: 825,
    floorplan: { beds: 2, baths: 1 },
    distance: 1.1,
    commuteMins: { walking: 22, biking: 9, driving: 6, bus: 11 },
    liveliness: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    name: "The Pavilion on 62nd",
    price: 950,
    floorplan: { beds: 2, baths: 2 },
    distance: 2.3,
    commuteMins: { walking: 35, biking: 15, driving: 8, bus: 18 },
    liveliness: 3,
    image:
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
  },
  {
    id: "7",
    name: "Midtown",
    price: 1350,
    floorplan: { beds: 1, baths: 1 },
    distance: 1.0,
    commuteMins: { walking: 20, biking: 7, driving: 5, bus: 10 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",
  },
  {
    id: "8",
    name: "College Park",
    price: 699,
    floorplan: { beds: 1, baths: 1 },
    distance: 1.8,
    commuteMins: { walking: 30, biking: 12, driving: 7, bus: 15 },
    liveliness: 2,
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "9",
    name: "University House",
    price: 1050,
    floorplan: { beds: 2, baths: 2 },
    distance: 0.8,
    commuteMins: { walking: 18, biking: 6, driving: 4, bus: 9 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  },
  {
    id: "10",
    name: "The Retreat",
    price: 1425,
    floorplan: { beds: 3, baths: 3 },
    distance: 0.5,
    commuteMins: { walking: 12, biking: 4, driving: 3, bus: 6 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: "11",
    name: "Countryside",
    price: 1200,
    floorplan: { beds: 3, baths: 2.5 },
    distance: 3.2,
    commuteMins: { walking: 40, biking: 18, driving: 10, bus: 20 },
    liveliness: 1,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
  },
  {
    id: "12",
    name: "The Swamp",
    price: 975,
    floorplan: { beds: 2, baths: 2 },
    distance: 1.1,
    commuteMins: { walking: 22, biking: 8, driving: 5, bus: 11 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "13",
    name: "The Estates",
    price: 675,
    floorplan: { beds: 1, baths: 1 },
    distance: 2.5,
    commuteMins: { walking: 35, biking: 13, driving: 9, bus: 16 },
    liveliness: 1,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
  },
  {
    id: "14",
    name: "The Domain",
    price: 1550,
    floorplan: { beds: 2, baths: 2.5 },
    distance: 0.4,
    commuteMins: { walking: 10, biking: 3, driving: 2, bus: 5 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    id: "15",
    name: "Grove at Gainesville",
    price: 850,
    floorplan: { beds: 2, baths: 1.5 },
    distance: 1.6,
    commuteMins: { walking: 28, biking: 10, driving: 6, bus: 13 },
    liveliness: 3,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
  },
  {
    id: "16",
    name: "Stadium View",
    price: 1375,
    floorplan: { beds: 3, baths: 2 },
    distance: 0.6,
    commuteMins: { walking: 14, biking: 5, driving: 3, bus: 7 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
  },
  {
    id: "17",
    name: "Gator Place",
    price: 725,
    floorplan: { beds: 1, baths: 1 },
    distance: 2.8,
    commuteMins: { walking: 38, biking: 16, driving: 10, bus: 19 },
    liveliness: 2,
    image:
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=659&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "18",
    name: "Lakewood Villas",
    price: 1150,
    floorplan: { beds: 2, baths: 2 },
    distance: 1.3,
    commuteMins: { walking: 24, biking: 9, driving: 6, bus: 12 },
    liveliness: 3,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
  },
  {
    id: "19",
    name: "The Courtyards",
    price: 1650,
    floorplan: { beds: 4, baths: 3 },
    distance: 1.9,
    commuteMins: { walking: 32, biking: 11, driving: 7, bus: 14 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=600&fit=crop",
  },
  {
    id: "20",
    name: "nine31",
    price: 1100,
    floorplan: { beds: 3, baths: 3 },
    distance: 0.4,
    commuteMins: { walking: 12, biking: 5, driving: 4, bus: 9 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "21",
    name: "Woodlands of Gainesville",
    price: 795,
    floorplan: { beds: 1, baths: 1 },
    distance: 3.5,
    commuteMins: { walking: 45, biking: 20, driving: 12, bus: 22 },
    liveliness: 1,
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop",
  },
  {
    id: "22",
    name: "Polos East",
    price: 925,
    floorplan: { beds: 2, baths: 1.5 },
    distance: 1.4,
    commuteMins: { walking: 26, biking: 9, driving: 6, bus: 12 },
    liveliness: 4,
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop",
  },
  {
    id: "23",
    name: "University Towers",
    price: 1475,
    floorplan: { beds: 2, baths: 2 },
    distance: 0.3,
    commuteMins: { walking: 8, biking: 3, driving: 2, bus: 4 },
    liveliness: 3,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    id: "24",
    name: "Lexington Crossing",
    price: 1300,
    floorplan: { beds: 1, baths: 1 },
    distance: 0.6,
    commuteMins: { walking: 13, biking: 5, driving: 3, bus: 6 },
    liveliness: 2,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
  },
  {
    id: "25",
    name: "The Lofts",
    price: 1225,
    floorplan: { beds: 4, baths: 2 },
    distance: 1.0,
    commuteMins: { walking: 21, biking: 8, driving: 5, bus: 10 },
    liveliness: 5,
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
  },
];
