// Initialising DB
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");        // .. is a shorthand for "go up one level" in the directory structure

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderluxe";

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async ()=> {
    await Listing.deleteMany({});           //deletes the existing data in database
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "67801267fb31f5f20dd3d392",
    }));
    await Listing.insertMany(initData.data);        //coz initData is imported as an object wherin key data contains all the samplevalues (see line 295 of data.js)
    console.log("data was initialised");
};
initDB();