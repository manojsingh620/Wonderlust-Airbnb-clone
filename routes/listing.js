const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingConrtoller = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
    .get(wrapAsync(listingConrtoller.index)
    )
    .post(isLoggedIn, 
        upload.single("listing[image]"),
         wrapAsync(listingConrtoller.createNewListing));

    // NEW ROUTE
router.get("/new", isLoggedIn, listingConrtoller.renderNewform);


router.route("/:id")
    .get(wrapAsync(listingConrtoller.showListing))
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingConrtoller.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingConrtoller.deleteListing));


//Edit rout
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingConrtoller.editList));



module.exports = router;