const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [3, 'A tour name must have more or equal then 10 characters']
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
      },
      quantity: {
        type: Number,
        required: [true, 'A product must have a quantity']
      },
      price: {
        type: Number,
        required: [true, 'A product must have a price']
      },
      ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
      },
      ratingsQuantity: {
        type: Number,
        default: 0
      },
      summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
      },
      description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
      },
      imageCover: {
        type: String,
      },
      images: [String],
      shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true, 'Product must belond to a shop']
      }
    });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;