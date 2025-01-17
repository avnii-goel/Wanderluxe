const Listing = require("../models/listing.js");
// Used Github repo of mapbox-sdk (https://github.com/mapbox/mapbox-sdk-js?tab=readme-ov-file#creating-clients)
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listingsTemplates/index.ejs", {allListings});
};

module.exports.renderNewForm = (req,res) => {
    res.render("listingsTemplates/new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing
        .findById(id)
        .populate({
            path: "reviews", 
            populate:{ path: "author"},             //nesting populate
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for, doesn't exist!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listingsTemplates/show.ejs", {listing});
};

module.exports.createListing = async (req,res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
        })
        .send();

    let url = req.file.path;        //image's url
    let filename = req.file.filename;       //image's filename
    // let {title, description, image, price, location, country} = req.body;    //to shorten this syntax we can use below command (as used key[value] in new.ejs)
    // console.log(req.body);
    let listing = req.body.listing;         //where listing is keyname
    // console.log(listing);                 //generates a JS object{}
    const newListing = new Listing(listing)         //will store an instance listing
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    newListing.category = listing.category;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;   
    const listing = await Listing.findById(id);    
    if (!listing) {
        req.flash("error", "Listing you requested for, doesn't exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/uploads", "/uploads/w_250");
    res.render("listingsTemplates/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;         
    let updatedlisting = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined"){
        let url = req.file.path;        
        let filename = req.file.filename; 
        updatedlisting.image = {url, filename};
        await updatedlisting.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;   
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listings`);
};

module.exports.showCategory = async (req,res)=> {
    const {category} = req.query;
    if (category === "Trending") {
        return res.redirect("/listings");
    }
    let filter = {}; 
    filter.category = category; 
    const listings = await Listing.find(filter); 
    if (!listings || listings.length === 0) {
        req.flash("error", "No listings available for this category.");
        return res.redirect("/listings");
    } else {
        res.render("../views/listingsTemplates/category.ejs", { listings, category }); 
    }
};

module.exports.serchedResults = async (req,res)=> {
    const query = req.query.q.toLowerCase();
    const allListings = await Listing.find();
    const filteredListings = allListings.filter(listing => 
        listing.title.toLowerCase().includes(query) || 
        listing.location.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query)
    );
    if (filteredListings.length == 0) {
        req.flash("error", "No Searched Results found!");
        return res.redirect("/listings");
    } else {
        res.render('../views/listingsTemplates/search.ejs', { filteredListings, query });
    }
};