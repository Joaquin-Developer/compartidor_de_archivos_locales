const { Router } = require("express")
const router = Router()
const controller = require("../controllers/api.controller")

router.get("/", controller.index)
router.get("/getAllFiles", controller.getAllFiles)
router.post("/upload", controller.upload)
router.delete("/delete/:name", controller.deleteFile)

module.exports = router
