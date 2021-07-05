const ppRoute = process.env["PP_ROUTE"]
const path = `${ppRoute}/compartidor_de_archivos_locales/src/public/data`
const { readdir } = require('fs/promises')

module.exports = class Files {

    static async getDefaultAllFiles() {
        try {
            const files = await readdir(path)
            const myFiles = new Array()
    
            for (const file of files) {
                if (file.includes(".") && !file.startsWith(".") && !file.includes("~lock")) {
                    const fileProps = file.split(".")
                    myFiles.push({ name: fileProps[0], extension: `.${fileProps[1]}` })
                }
            }
            return myFiles
    
        } catch (error) {
            console.error(err)
        }
    }

    static uploadFile(file)
    {
        file.mv(`${path}/${file.name}` /*, err => { throw err }*/)
    }

    static deleteFile(filename)
    {
        console.log(filename)
    }


}
