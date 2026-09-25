import { Market } from '../types/market';

export const INITIAL_MARKETS: Market[] = [
  {
    id: 1,
    name: 'Haideri',
    area: 'North Nazimabad',
    district: 'Central Karachi',
    latitude: 24.9398,
    longitude: 67.0426,
    mapX: 42,
    mapY: 26,
    status: 'active',
    shopsCount: 24,
    productsCount: 340,
    tagline: "Karachi's heart for bridal fabrics, jewelry, and ethnic wear",
    timing: '12:00 PM – 11:00 PM',
    specialties: ['Unstitched Fabrics', 'Abayas & Hijabs', 'Gold Jewelry', 'Traditional Khussa'],
    sampleShops: [
      {
        id: 'h-1',
        marketId: 1,
        name: 'Al-Madina Silk & Chiffon',
        shopNumber: 'Shop G-14',
        floor: 'Ground Floor',
        category: 'Fabrics & Bridal',
        rating: 4.8,
        reviewsCount: 124,
        isVerified: true,
        productCount: 45,
        description: 'Premium pure silk, embroidered organza, and ceremonial lawn collections sourced directly from Faisalabad weavers.',
        featuredProducts: [
          { id: 'p1', name: 'Embroidered Chiffon 3-Piece Suite', category: 'Festive Wear', price: 4850, inStock: true, tag: 'Best Seller' },
          { id: 'p2', name: 'Pure Raw Silk Unstitched Fabric (per yard)', category: 'Silk', price: 1200, unit: 'yard', inStock: true },
          { id: 'p3', name: 'Zari Work Dupatta (Maroon/Gold)', category: 'Dupattas', price: 2100, inStock: true }
        ]
      },
      {
        id: 'h-2',
        marketId: 1,
        name: 'Karachi Khussa Mahal',
        shopNumber: 'Shop 42',
        floor: 'First Floor',
        category: 'Handmade Footwear',
        rating: 4.9,
        reviewsCount: 89,
        isVerified: true,
        productCount: 32,
        description: 'Traditional handcrafted leather khussas with tilla embroidery and cushioned double-soled comfort.',
        featuredProducts: [
          { id: 'p4', name: 'Golden Tilla Velvet Khussa', category: 'Bridal Shoes', price: 2800, inStock: true, tag: 'Handmade' },
          { id: 'p5', name: 'Casual Tan Leather Khussa', category: 'Daily Footwear', price: 1950, inStock: true },
          { id: 'p6', name: 'Silver Kundan Embellished Jutti', category: 'Occasion', price: 3200, inStock: true }
        ]
      },
      {
        id: 'h-3',
        marketId: 1,
        name: 'Zeeshan 22K Jewellers',
        shopNumber: 'Shop 11',
        floor: 'Main Gold Market Lane',
        category: 'Gold & Silver',
        rating: 4.7,
        reviewsCount: 65,
        isVerified: true,
        productCount: 28,
        description: 'Certified 22-karat hallmark jewelry, traditional Pakistani naulakha designs, and sterling silver bangles.',
        featuredProducts: [
          { id: 'p7', name: 'Sterling Silver Filigree Bangles (Pair)', category: 'Silver', price: 6500, inStock: true },
          { id: 'p8', name: 'Hyderabadi Pearl Choker Necklace', category: 'Jewelry', price: 4200, inStock: true, tag: 'Traditional' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Tariq Road',
    area: 'PECHS / Jamshed Town',
    district: 'East Karachi',
    latitude: 24.8716,
    longitude: 67.0599,
    mapX: 64,
    mapY: 53,
    status: 'active',
    shopsCount: 32,
    productsCount: 480,
    tagline: "The premier fashion and stitched apparel corridor of Karachi",
    timing: '1:00 PM – 11:30 PM',
    specialties: ['Ready-to-Wear Pret', 'Designer Kurtas', 'Leather Goods', 'Formal Footwear'],
    sampleShops: [
      {
        id: 't-1',
        marketId: 2,
        name: 'Kurta Corner Heritage',
        shopNumber: 'Shop 08',
        floor: 'Ground Floor, Tariq Centre',
        category: "Men's Apparel",
        rating: 4.9,
        reviewsCount: 210,
        isVerified: true,
        productCount: 60,
        description: 'Iconic bespoke and ready-to-wear kurtas, premium Egyptian cotton waistcoats, and sherwanis.',
        featuredProducts: [
          { id: 'p9', name: 'Pima Cotton Embroidered Kurta Shalwar', category: 'Eastern Wear', price: 5400, inStock: true, tag: 'Signature' },
          { id: 'p10', name: 'Jamawar Charcoal Waistcoat', category: 'Formal', price: 4200, inStock: true }
        ]
      },
      {
        id: 't-2',
        marketId: 2,
        name: 'Royal Leather & Travel',
        shopNumber: 'Shop B-04',
        floor: 'Basement, Rabi Centre',
        category: 'Leather Accessories',
        rating: 4.6,
        reviewsCount: 94,
        isVerified: true,
        productCount: 38,
        description: 'Full-grain cowhide wallets, leather messenger bags, and custom reversible belts.',
        featuredProducts: [
          { id: 'p11', name: 'Vintage Bifold Leather Wallet with RFID', category: 'Leather', price: 1850, inStock: true, tag: 'Top Rated' },
          { id: 'p12', name: 'Executive Laptop Briefcase Bag', category: 'Travel', price: 6900, inStock: true }
        ]
      },
      {
        id: 't-3',
        marketId: 2,
        name: 'Gul Ahmed Style Partner',
        shopNumber: 'Shop 104',
        floor: 'Dolmen Arcade Entrance',
        category: 'Women Pret',
        rating: 4.8,
        reviewsCount: 156,
        isVerified: true,
        productCount: 52,
        description: 'Latest stitched 2-piece and 3-piece seasonal collections, cambric tunics, and daily coordinates.',
        featuredProducts: [
          { id: 'p13', name: 'Block-Printed Lawn Co-ord Set', category: 'Pret', price: 3950, inStock: true },
          { id: 'p14', name: 'Solid Linen Tunic with Pearl Buttons', category: 'Tops', price: 2600, inStock: true }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Rex Center',
    area: 'Saddar',
    district: 'South Karachi',
    latitude: 24.8532,
    longitude: 67.0305,
    mapX: 38,
    mapY: 74,
    status: 'active',
    shopsCount: 18,
    productsCount: 220,
    tagline: "Historic destination for bespoke tailoring, warm suiting, and fabrics",
    timing: '11:30 AM – 9:30 PM',
    specialties: ['Fine Wool Suiting', 'Winter Coats', 'Master Tailoring', 'Dress Shirts'],
    sampleShops: [
      {
        id: 'r-1',
        marketId: 3,
        name: 'Rex Master Tailors & Clothiers',
        shopNumber: 'Shop 21',
        floor: 'Mezzanine Floor',
        category: 'Tailoring & Suiting',
        rating: 4.8,
        reviewsCount: 112,
        isVerified: true,
        productCount: 28,
        description: 'Over 35 years of bespoke tailoring excellence for business suits, blazers, and formal waistcoats.',
        featuredProducts: [
          { id: 'p15', name: 'Italian Blend 2-Piece Business Suit (Tailored)', category: 'Suits', price: 14500, inStock: true, tag: 'Bespoke' },
          { id: 'p16', name: 'Super 120s Wool Fabric (Per Suit Length)', category: 'Fabrics', price: 6200, inStock: true }
        ]
      },
      {
        id: 'r-2',
        marketId: 3,
        name: 'Saddar Winter & Leather Wear',
        shopNumber: 'Shop 06',
        floor: 'Ground Floor',
        category: 'Leather Jackets',
        rating: 4.7,
        reviewsCount: 88,
        isVerified: true,
        productCount: 30,
        description: 'Pure sheepskin leather biker jackets, bomber jackets, and heavy wool overcoats.',
        featuredProducts: [
          { id: 'p17', name: 'Classic Black Lambskin Bomber Jacket', category: 'Jackets', price: 12500, inStock: true, tag: 'Pure Leather' },
          { id: 'p18', name: 'Tweed Overcoat (Camel/Charcoal)', category: 'Outerwear', price: 8900, inStock: true }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Gul Plaza',
    area: 'M.A. Jinnah Road',
    district: 'South Karachi',
    latitude: 24.8624,
    longitude: 67.0234,
    mapX: 43,
    mapY: 64,
    status: 'active',
    shopsCount: 13,
    productsCount: 160,
    tagline: "Karachi's go-to multi-story center for home decor, crockery, and toys",
    timing: '11:00 AM – 10:00 PM',
    specialties: ['Home Decor', 'Ceramic & Glass Crockery', 'Kitchenware', 'Gifts & Toys'],
    sampleShops: [
      {
        id: 'g-1',
        marketId: 4,
        name: 'Elegant Crystal & Kitchen',
        shopNumber: 'Shop 108',
        floor: 'First Floor',
        category: 'Crockery & Dining',
        rating: 4.8,
        reviewsCount: 78,
        isVerified: true,
        productCount: 42,
        description: 'Fine bone china dinner sets, crystal drinkware, and non-stick marble cookware.',
        featuredProducts: [
          { id: 'p19', name: '72-Piece Royal Bone China Dinner Set', category: 'Dinnerware', price: 21500, inStock: true, tag: 'Imported' },
          { id: 'p20', name: 'Granite Die-Cast Non-Stick Cookware Set (3pc)', category: 'Cookware', price: 8400, inStock: true }
        ]
      },
      {
        id: 'g-2',
        marketId: 4,
        name: 'Noor Lighting & Wall Art',
        shopNumber: 'Shop G-22',
        floor: 'Ground Floor',
        category: 'Home Decor',
        rating: 4.7,
        reviewsCount: 62,
        isVerified: true,
        productCount: 35,
        description: 'Modern pendant lamps, Islamic calligraphic metal wall frames, and accent mirrors.',
        featuredProducts: [
          { id: 'p21', name: 'Geometric Brass Pendant Chandelier', category: 'Lighting', price: 4900, inStock: true },
          { id: 'p22', name: 'Laser-Cut Stainless Steel Ayatul Kursi Frame', category: 'Wall Art', price: 3400, inStock: true, tag: 'Hand Finished' }
        ]
      }
    ]
  },
  // Inactive market 1: Can be activated dynamically in DB simulator
  {
    id: 5,
    name: 'Zainab Market',
    area: 'Abdullah Haroon Road, Saddar',
    district: 'South Karachi',
    latitude: 24.8545,
    longitude: 67.0289,
    mapX: 36,
    mapY: 76,
    status: 'inactive', // inactive demonstration
    shopsCount: 22,
    productsCount: 290,
    tagline: "Karachi's legendary destination for export apparel, denim, and brass handicrafts",
    timing: '11:00 AM – 10:00 PM',
    specialties: ['Export Surplus Denim', 'Leather Accessories', 'Onyx Handicrafts', 'Pashmina Shawls'],
    sampleShops: [
      {
        id: 'z-1',
        marketId: 5,
        name: 'Denim Depot & Casuals',
        shopNumber: 'Shop 14, Basement',
        floor: 'Basement',
        category: 'Casual Apparel',
        rating: 4.6,
        reviewsCount: 140,
        isVerified: true,
        productCount: 50,
        description: 'Export quality stretch denim jeans, hoodies, and cotton shirts.',
        featuredProducts: [
          { id: 'p23', name: 'Slim Fit Dark Wash Selvedge Jeans', category: 'Denim', price: 2450, inStock: true },
          { id: 'p24', name: 'Heavyweight Fleece Zipper Hoodie', category: 'Sweatshirts', price: 2950, inStock: true }
        ]
      }
    ]
  },
  // Inactive market 2: Can be activated dynamically in DB simulator
  {
    id: 6,
    name: 'Bohri Bazaar',
    area: 'Saddar',
    district: 'South Karachi',
    latitude: 24.8566,
    longitude: 67.0264,
    mapX: 34,
    mapY: 69,
    status: 'inactive', // inactive demonstration
    shopsCount: 16,
    productsCount: 180,
    tagline: "Karachi's oldest heritage bazaar for metal crafts, kitchenware, and specialty spices",
    timing: '10:30 AM – 9:00 PM',
    specialties: ['Stainless Steel Utensils', 'Traditional Spices', 'Sewing & Craft Notions', 'Dry Fruits'],
    sampleShops: [
      {
        id: 'b-1',
        marketId: 6,
        name: 'Haji Adam Stainless & Brass',
        shopNumber: 'Shop 31, Bohri Lane',
        floor: 'Ground Floor',
        category: 'Utensils & Metalcraft',
        rating: 4.8,
        reviewsCount: 52,
        isVerified: true,
        productCount: 30,
        description: 'Heavy gauge steel degchis, copper water pots, and brass heritage tableware.',
        featuredProducts: [
          { id: 'p25', name: 'Hammered Copper Water Carafe & Tumbler', category: 'Copperware', price: 3800, inStock: true }
        ]
      }
    ]
  }
];
