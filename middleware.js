const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);      //if gives undefined then not logged in and gives an obj then already logged in
    // console.log(req);            //to see what all req is storing in it.
    if(!req.isAuthenticated()){
        // console.log(req.path, "..", req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "User must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next)=> {
    let {id} = req.params;   
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You're not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// Validation for Listing Schema (Middleware)
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map( (el) => el.message ).join(",");     //agar kabhi extra details aati hein to wo , se join hoke alert me display hoengi if agar koi postman ya hoppscotch se try krta hei to
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// Validation for Review Schema (Middleware)
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map( (el) => el.message ).join(",");     //agar kabhi extra details aati hein to wo , se join hoke alert me display hoengi if agar koi postman ya hoppscotch se try krta hei to
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next)=> {
    let {id, reviewId} = req.params;   
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You're not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}