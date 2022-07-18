const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Shop = require("../models/shopModel");
const Product = require("../models/productModel");

dotenv.config({ path: './config.env' });

const DB = "mongodb+srv://XennMaestro:Batmans@13@cluster0.bt3gv.mongodb.net/natours?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const shops = JSON.parse(fs.readFileSync(`${__dirname}/shops.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Shop.create(shops);
    await Product.create(products);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Shop.deleteMany();
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
