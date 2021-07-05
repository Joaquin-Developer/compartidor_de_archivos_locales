const controller = {}
const Files = require("../modules/Files")

controller.index = (req, res) => {
    res.json({ status: true })
}

controller.upload = (req, res) => {
    const file = req.files.file
    
    try {
        if (file === undefined) throw Error("Error: File is missing")
        Files.uploadFile(file)
        res.status(200).send({ message: "File uploaded successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

controller.getAllFiles = async (req, res) => {
    const myFiles = await Files.getDefaultAllFiles()
    res.json(myFiles)
}

module.exports = controller