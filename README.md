# WanderLuxe
WanderLuxe is a fully-responsive and premier website for exploring cozy-luxurious stays at travel experiences, inspired by the ease and elegance of Airbnb.
Whether you're looking for a private villa on a tropical island, or a luxury penthouse in the heart of the city, WanderLuxe ensures a seamless and personalized journey.
<br><br>
Check out the deployed website: [WanderLuxe](https://wanderluxe-nxhh.onrender.com/listings)
<img height= "" width="1000" alt="Desktop view" src="https://github.com/user-attachments/assets/1b25848c-78ea-488f-a60b-7b26f3292d44" />


## Technologies 
I decently learnt and used the following technologies: 
-   **Frontend**: HTML, CSS, JavaSript
-   **Database**: MongoDB (Mongosh, Mongoose, Mongo Atlas)
-   **Backend**: Node.js, Express.js, EJS
-   **Dependencies**: Ejs-mate, method-override, Joi, connect-flash, connect-mongo, express-session, @mapbox/mapbox-sdk, passport, passport-local, passport-local-mongoose, cloudinary, multer, multer-storage-cloudinary, dotenv


## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/avnii-goel/Wanderluxe.git
    ```

2. Install dependencies: Ensure you have Node.js and npm installed.
    ```sh
    npm install
    ```

## Configuration
1. Environment Variables:
   Create a `.env` file in the root directory containing following variables:

    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_mapbox_access_token
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret
    PORT=8080
    ```

## Usage
1. Start the Development Server (to view locally), use:
    ```sh
        npm start
    ```
2. Navigate on `http://localhost:8080` 