const { Router } = require("express")
const router = Router()
const controller = require("../controllers/api.controller")

router.get("/", controller.getAllFiles)

module.exports = router
