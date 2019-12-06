const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", wikiController.create);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.get("/wikis/new/private", wikiController.newPrivate);


router.get("/wikis/new/list", wikiController.privateWikis);
router.post("/wikis/new/private", wikiController.createPrivate);

router.get("/wikis/:id/convert", wikiController.conversionPage);
router.post("/wikis/:id/convert", wikiController.convertWiki);

module.exports = router;