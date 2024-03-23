const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn,isreviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//post route
    router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// DELETE REVIEW ROUTE
    router.delete("/:reviewId",isLoggedIn,
    isreviewAuthor,
    wrapAsync(reviewController.deleteReview));


module.exports= router;