const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer( {storage} );       
const flash = require('connect-flash');


router.route("/")
    .get( wrapAsync(listingController.index))       //Index Route
    .post(                                          //Create Route
        isLoggedIn,  
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));

// Filter route
router.get("/category", listingController.showCategory);

//Search route
router.get("/search", listingController.serchedResults);
        
// New Route (to get a form to add a new listing)       //we kept new route before show route taaki /:id aur /new me koi confusion na ho server ko
router.get("/new", isLoggedIn, listingController.renderNewForm);
        
router.route("/:id")
    .get( wrapAsync(listingController.showListing))        // Show Route (Specific Listing)
    .put(                                                  // Update Route
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(                                               // Delete Route
        isLoggedIn, 
        isOwner, 
        wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;