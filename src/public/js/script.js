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
    const html = ["", ""]

    for (const elem of data) {
        html[0] += (`<b>Nombre: </b>${elem.name}, <b>extension: </b>${elem.extension}<br>`)
        const nameFile = `${elem.name}${elem.extension}`

        html[1] += (`<b>Nombre: </b>${nameFile} - <a href="/data/${nameFile}">Link</a><br>`)
    }
    const app = document.getElementById("data")
    // html[0].forEach(element => app.innerHTML = element);
    app.innerHTML = html[0] + '<br>' + html[1]
    // app.innerHTML = '<br>';
    // html[1].forEach(element => app.innerHTML = element);

}
