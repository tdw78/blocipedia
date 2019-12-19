const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const validation = require("./validation");


router.post("/wikis/:id/collaborators/add", collaboratorController.create);
router.post("/wikis/:wiki_id/collaborators/:id/destroy", collaboratorController.destroy);

module.exports = router;