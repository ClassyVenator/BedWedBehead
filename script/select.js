

document.addEventListener("keydown", event => {
    if (event.key == " " || event.key == "Enter") {
        event.preventDefault()

        const eventTarget = event.target

        if (eventTarget.parentElement.classList[0] == "iconWrapper") {
            select(eventTarget, eventTarget.id)

        } else if (eventTarget.id.includes("TextInput") && event.key != "Enter") {
            eventTarget.value += " "

        } else if (eventTarget.type == "checkbox") {
            eventTarget.checked = !eventTarget.checked
            updateConfig()

        } else if (eventTarget.classList.contains("resetTextInput")) {
            resetTextInput(eventTarget)

        } else if (eventTarget.id == "gearIcon") {
            toggleConfigMenu()

        } else if (eventTarget.classList.contains("playButton")) {
            play()
        }
    }
})

for (let index = 1; index <= 3; index++) {
    localStorage.setItem("bed" + index.toString(), false)
    localStorage.setItem("wed" + index.toString(), false)
    localStorage.setItem("behead" + index.toString(), false)
}

const select = (srcElement, id) => {
    if (srcElement.classList.contains("selected")) {
        srcElement.classList.remove("selected")
        localStorage.setItem(id, false)
        return
    }

    if (id.includes("bed")) {
        localStorage.setItem("bed1", false)
        localStorage.setItem("bed2", false)
        localStorage.setItem("bed3", false)
        localStorage.setItem(id, true)
    } else if (id.includes("wed")) {
        localStorage.setItem("wed1", false)
        localStorage.setItem("wed2", false)
        localStorage.setItem("wed3", false)
        localStorage.setItem(id, true)
    } else if (id.includes("behead")) {
        localStorage.setItem("behead1", false)
        localStorage.setItem("behead2", false)
        localStorage.setItem("behead3", false)
        localStorage.setItem(id, true)
    }
    if (id.includes("1")) {
        localStorage.setItem("bed1", false)
        localStorage.setItem("wed1", false)
        localStorage.setItem("behead1", false)
        localStorage.setItem(id, true)
    } else if (id.includes("2")) {
        localStorage.setItem("wed2", false)
        localStorage.setItem("bed2", false)
        localStorage.setItem("behead2", false)
        localStorage.setItem(id, true)
    } else if (id.includes("3")) {
        localStorage.setItem("bed3", false)
        localStorage.setItem("wed3", false)
        localStorage.setItem("behead3", false)
        localStorage.setItem(id, true)
    }

    document.querySelectorAll(".iconWrapper div").forEach(element => {
        if (localStorage.getItem(element.id) == "false") {
            element.classList.remove("selected")
        } else {
            element.classList.add("selected")
        }
    })
}
