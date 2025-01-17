// We are defining the Server-Side Validation Schema (ie different from Mongoose Schema)
// Referred (https://joi.dev/api/?v=17.13.3)
// Already installed joi npm package
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),      //to prevent negative values
        image: Joi.string().allow("", null),        // image can be empty or null
        category: Joi.string()
            .valid(
                "Trending", "Rooms", "Iconic cities", "Mountains", "Beachside",
                "Amazing Pools", "Camping", "Farms", "Arctic", "CityStays",
                "HouseBoats", "Tents"
            ),
    }).required()           //listing object is required itself
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()           //review object is required itself
});