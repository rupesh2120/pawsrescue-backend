const mongoose = require('mongoose');
const validator = require('validator');

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    species: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'],
      index: true, // you filter by this on the list page — index it
    },

    breed: { type: String, trim: true },

    age: { type: Number, min: 0 }, // store number, not "3 years" string — format on UI

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
    },

    about: { type: String, maxlength: 1000 },

    attributes: { type: [String], default: [] }, // "Friendly", "Playful" etc.

    photos: { type: [String], default: [] }, // Cloudinary/S3 URLs, not binary

    location: {
      city: { type: String, required: true, index: true },
      address: { type: String },
      // if you ever want "near me" search:
      // coordinates: { type: [Number], index: '2dsphere' }
    },

    health: {
      vaccinated: { type: Boolean, default: false },
      status: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Needs Care'] },
    },

    rescuedDate: { type: Date },
    availableSince: { type: Date, default: Date.now },
    adoptionFee: { type: Number, default: 0, min: 0 },

    status: {
      type: String,
      enum: ['draft', 'published', 'pending_adoption', 'adopted', 'archived'],
      default: 'draft',
      index: true, // list page queries "status: published" constantly
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
)

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;

/**
 * 
 * name: {
    type: String,
    required: true // S2. 8 Data Sanitization(Making this field required, so if user tries to create an animal without name, it will throw an error)
  },
  email: {
    type: String,
    required: true,
    unique: true, // S2. 8 Data Sanitization(Making this field unique, so if user tries to create an animal with same email, it will throw an error)
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid email format');
      }
    } 
  },
  about: {
    type: String,
    default: 'This is the default description' // S2. 8 Data Sanitization(Making this field optional, so if user doesn't provide about, it will use the default value)
  },
  skills: {
    type: [String],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // S2. 8 Data Sanitization(Making this field enum, so if user tries to create an animal with gender other than
    validate(value){
      if(!['male', 'female', 'other'].includes(value.toLowerCase())){
        throw new Error('Gender must be Male, Female or Other');
      }
    }
  }
 */