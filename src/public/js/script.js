const API = 'http://192.168.1.6:5000/api'
const fileField = document.getElementById("inputFile")
const selectRemove = document.getElementById("selectRemoveFiles")

addEventListener("load", getAllFiles)

function getAllFiles() {
    fetch(`${API}/getAllFiles`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("allFiles", JSON.stringify(data))
        showMyFilesInHtml(data)
        addFilenamesInSelect()
    })
    .catch(error => console.error(error))
}

function showMyFilesInHtml(data) {
    removeChildrensFromElement()

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

}

document.getElementById("uploadFile").addEventListener("click", (event) => {
    event.preventDefault();
    const file = fileField.files[0]
    if (file) {
        const formData = new FormData()
        formData.append("file", file)
        uploadFile(formData)

    } else {
        alert("Debe seleccionar un archivo")
    }
})

selectRemove.addEventListener("change", () => {
    const filename = selectRemove.options[selectRemove.selectedIndex]
    if (filename.value != 0) {
        deleteFile(filename.text)
    }
    
})

function uploadFile(formData) {
    fetch(`${API}/upload`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.status == 200) {
            alert("Archivo publicado con éxito.")
        } else {
            alert("Error: No se pudo subir el archivo.")
        }
        return response.json()
    })
    .then(json => {
        console.log(json.message)
    })
    .catch(error => {
        console.error(error)
    })

    getAllFiles()
}

function deleteFile(filename) {

    fetch(`${API}/delete/${filename}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.status == 200) {
            alert("Archivo eliminado con éxito.")
        } else {
            alert("Error: No se pudo realizar la acción.")
        }
        return response.json()
    })
    .then(json => console.log(json))
    .catch(error => console.error(error))
}


function removeChildrensFromElement(element = tbody) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function addFilenamesInSelect() {
    const allFiles = JSON.parse(localStorage.getItem("allFiles"))

    // first, delete the childs:
    removeChildrensFromElement(selectRemove)
    // then, add the option by default
    const defaultOption = document.createElement("option")
    defaultOption.value = "0"
    defaultOption.text = "Seleccionar nombre"
    selectRemove.appendChild(defaultOption)
    
    // and finally, add the options with the file names:
    for (const file of allFiles) {
        const optionElement = document.createElement("option")
        optionElement.appendChild(document.createTextNode(file.name))
        selectRemove.appendChild(optionElement)
    }
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
