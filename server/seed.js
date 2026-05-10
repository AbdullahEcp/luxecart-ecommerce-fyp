import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import { products } from "./data/products.js";

dotenv.config();

await connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin"
      });
    }

    console.log("75 products and admin inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();