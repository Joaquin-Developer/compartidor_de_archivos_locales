const { Router } = require("express")
const router = Router()
const controller = require("../controllers/api.controller")

router.get("/", controller.getAllFiles)
router.post("/upload", controller.upload)

module.exports = router
