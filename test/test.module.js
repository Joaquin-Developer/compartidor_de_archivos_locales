// const path = "/home/joaquin/Documentos/Po"

const path = `${process.env["PP_ROUTE"]}/compartidor_de_archivos_locales/src/public/data`

async function read() {
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

function deleteFile(filename) {
    const { readdir, unlink } = require('fs/promises')
    const { exists } = require("fs")

    exists(filename, (e) => {
        console.log(e ? 'it exists' : 'no exists');
      });
    
}

(async () => {
    // const myFiles = await read()
    // console.log(myFiles)

    deleteFile(`${path}/screen.jpeg`)

})();


