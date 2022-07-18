const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [3, 'A tour name must have more or equal then 10 characters']
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
      location: {
        //GeoJson 
        type: {
          type: String,
          defaut: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
      }
    });

  const Shop = mongoose.model('Shop', shopSchema);

  module.exports = Shop;