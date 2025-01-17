const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("usersTemplates/signup.ejs");
};

module.exports.signup = async (req,res) => {
    try {               //used try-catch coz we wanted to use flash msg and a redirect to signup page
        let {username, email, password} = req.body;
        const newUser = await new User({email, username});
        const registeredUser = await User.register(newUser, password);
        // res.render("usersTemplates/signup.ejs");
        console.log(registeredUser);
        req.login(registeredUser, (err)=> {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLuxe!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    } 
};

module.exports.renderLoginForm = (req,res)=> {
    res.render("usersTemplates/login.ejs");
};

module.exports.login = async (req,res)=> {
    req.flash("success", "Welcome back to WanderLuxe! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";        // this will redirect to /listings if user is already at login page
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res) => {
    req.logout( (err)=> {
        if(err){ 
            return next(err) 
        }
        req.flash("success", "Logged you Out!");
        res.redirect("/listings");
    });
};