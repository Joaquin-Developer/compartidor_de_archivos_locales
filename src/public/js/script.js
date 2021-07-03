const API = 'http://192.168.1.6:5000/api'

addEventListener("load", getAllFiles)

function getAllFiles() {
    fetch(`${API}/`)
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("allFiles", JSON.stringify(data))
        console.log(data)
        refreshFilesInPage(data)
    })
    .catch(error => console.error(error))
}

function refreshFilesInPage(data) {
    const html = [[], []]

    for (const elem of data) {
        html[0].push(`<b>Nombre: </b>${elem.name}, <b>extension: </b>${elem.extension}<br>`)
        const nameFile = `${elem.name}${elem.extension}`

        html[1].push(`<b>Nombre: </b>${nameFile} - <a href="/data/${nameFile}">Link</a><br>`)
    }

    html[0].forEach(element => document.write(element));
    document.write('<br>')
    html[1].forEach(element => document.write(element));

}
