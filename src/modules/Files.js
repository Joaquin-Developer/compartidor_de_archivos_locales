path = `${process.env["PP_ROUTE"]}/compartidor_de_archivos_locales/src/public/data`

module.exports = class Files {

    static async getDefaultAllFiles() {
        try {
            const { readdir } = require('fs/promises');
            const files = await readdir(path);
            const myFiles = new Array()
    
            for (const file of files) {
                if (file.includes(".") && !file.startsWith(".") && !file.includes("~lock")) {
                    const fileProps = file.split(".")
                    myFiles.push({ name: fileProps[0], extension: `.${fileProps[1]}` })
                }
            }
            
            return myFiles
    
        } catch (err) {
            console.error(err);
        }
    }


}
