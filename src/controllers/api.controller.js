const controller = {}
const Files = require("../modules/Files")

controller.index = (req, res) => {
    res.json({ status: true })
}

controller.getAllFiles = async (req, res) => {
    const myFiles = await Files.getDefaultAllFiles()
    res.json(myFiles)
}

module.exports = controller