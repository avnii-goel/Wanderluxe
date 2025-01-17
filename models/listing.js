const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // Dealing with image file upladed by the user
        url: String,
        filename: String

        // Earlier when we dealt with just link of image in string format
        // type: String,
        // default: "https://images.unsplash.com/photo-1682687982183-c2937a74257c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",       
        // set: (v) =>             //mongoose docs -> Schemas -> Virtuals
        //     v === ""            //Ternary operator in Js (condition ? expressionIfTrue : expressionIfFalse) 
        //         ? "https://images.unsplash.com/photo-1682687982183-c2937a74257c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        //         : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // referred https://mongoosejs.com/docs/geojson.html
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    category: {
        type: String,
        default: "Trending",
        enum: [
            "Trending", "Rooms", "Iconic cities", "Mountains", "Beachside", "Amazing Pools", 
            "Camping", "Farms", "Arctic", "CityStays", "HouseBoats", "Tents" 
        ],
        required: true
    }
});

// Post Middleware Fxn
listingSchema.post("findOneAndDelete", async (listing)=> {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews} });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;