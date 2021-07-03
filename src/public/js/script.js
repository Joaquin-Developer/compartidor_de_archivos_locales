const API = 'http://192.168.1.6:5000/api'

addEventListener("load", getAllFiles)

function getAllFiles() {
    fetch(`${API}/`)
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("allFiles", JSON.stringify(data))
        console.log(data)
        // refreshFilesInPage(data) 
        showMyFilesInHtml(data)
    })
    .catch(error => console.error(error))
}

function showMyFilesInHtml(data) {
    const tbody = document.getElementById("tbody")
    for (const file of data)
    {
        const tr = document.createElement("tr")
        tr.classList.add("table-active")
        const thName = document.createElement("th")
        thName.scope = "row"
        thName.appendChild(document.createTextNode(file.name))

        const tdExtension = document.createElement("th")
        tdExtension.appendChild(document.createTextNode(file.extension))
        
        const tdLink = document.createElement("th")
        const aLink = document.createElement("a")
        aLink.href = `/data/${file.name}${file.extension}`
        aLink.appendChild(document.createTextNode("Abrir"))
        tdLink.appendChild(aLink)
        tr.appendChild(thName)
        tr.appendChild(tdExtension)
        tr.appendChild(tdLink)
        tbody.appendChild(tr)
    }

    // <tr class="table-primary table-active">
    //     <th scope="row">un nombre</th>
    //     <td>una extension</td>
    //     <td><a href="">Descargar</a></td>
    // </tr>

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
