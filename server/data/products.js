const productImages = {
  "Shirt & Pant": [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800"
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
  ],
  "Cosmetic & Perfume": [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800"
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  ],
  Bags: [
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
    "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"
  ]
};

const productNames = {
  "Shirt & Pant": [
    "Classic Men Shirt",
    "Formal Cotton Shirt",
    "Slim Fit Pant",
    "Casual Denim Shirt",
    "Black Formal Pant",
    "Office Wear Shirt",
    "White Premium Shirt",
    "Brown Chino Pant",
    "Blue Check Shirt",
    "Luxury Dress Pant",
    "Summer Casual Shirt",
    "Stretch Formal Pant",
    "Royal Kurta Style Shirt",
    "Modern Fit Trouser",
    "Executive Shirt"
  ],
  Shoes: [
    "Nike Style Shoes",
    "Running Sneakers",
    "Formal Leather Shoes",
    "Casual White Shoes",
    "Sports Training Shoes",
    "Black Office Shoes",
    "High Ankle Sneakers",
    "Comfort Walking Shoes",
    "Brown Leather Shoes",
    "Fashion Street Shoes",
    "Gym Workout Shoes",
    "Classic Loafers",
    "Outdoor Joggers",
    "Premium Sneaker Pair",
    "Soft Sole Shoes"
  ],
  "Cosmetic & Perfume": [
    "Luxury Perfume",
    "Rose Face Cream",
    "Matte Lipstick",
    "Men Body Spray",
    "Skin Care Lotion",
    "Hair Styling Gel",
    "Royal Oud Perfume",
    "Face Wash",
    "Makeup Kit",
    "Moisturizing Cream",
    "Long Lasting Attar",
    "Sunscreen Lotion",
    "Beauty Serum",
    "Perfume Gift Box",
    "Nail Polish Set"
  ],
  Electronics: [
    "Smart Watch",
    "Wireless Headphones",
    "Bluetooth Speaker",
    "Mobile Power Bank",
    "Gaming Mouse",
    "Keyboard RGB",
    "Smartphone Cover",
    "USB Fast Charger",
    "Laptop Stand",
    "Mini Tripod",
    "Earbuds Pro",
    "LED Desk Lamp",
    "Portable Fan",
    "Smart Fitness Band",
    "Tablet Holder"
  ],
  Bags: [
    "Leather Hand Bag",
    "Travel Backpack",
    "Office Laptop Bag",
    "School Shoulder Bag",
    "Women Fashion Bag",
    "Gym Sports Bag",
    "Mini Crossbody Bag",
    "Premium Wallet Bag",
    "Canvas Travel Bag",
    "Business Briefcase",
    "College Backpack",
    "Luxury Tote Bag",
    "Outdoor Hiking Bag",
    "Messenger Bag",
    "Classic Hand Carry"
  ]
};

export const products = Object.keys(productNames).flatMap((category) =>
  productNames[category].map((name, index) => ({
    name,
    category,
    price: 1500 + index * 450,
    rating: Number((4.2 + index * 0.03).toFixed(1)),
    views: 60 + index * 18,
    sold: 20 + index * 9,
    stock: 15 + index,
    image: productImages[category][index % productImages[category].length],
    description:
      "High quality product with modern design, comfortable use, and reliable shopping experience."
  }))
);