
// Function to toggle the configuration menu
const toggleConfigMenu = () => {

    // Rotate a different direction every other time
    const gearIcon = document.getElementById("gearIcon")

    if (!gearIcon.classList.contains("direction")) {
        gearIcon.classList.toggle("direction");

        gearIcon.classList.toggle("spinLeft");
        setTimeout(() => {
            gearIcon.classList.toggle("spinLeft");
        }, 500);
    } else {
        gearIcon.classList.toggle("direction");

        gearIcon.classList.toggle("spinRight");
        setTimeout(() => {
            gearIcon.classList.toggle("spinRight");
        }, 500);
    }

    const configMenu = document.getElementById("configMenu");
    const configState = configMenu.style.display === "none" ? "open" : "closed";

    configMenu.style.display = configState === "open" ? "block" : "none";
    localStorage.setItem("config", configState);
};

// Function to update configuration settings in local storage
const updateConfig = () => {
    const configFormCheckboxes = document.querySelectorAll("#configForm input[type=checkbox]")

    // Checkboxes
    configFormCheckboxes.forEach(checkbox => {
        localStorage.setItem(checkbox.id, checkbox.checked ? "checked" : "unchecked")
    })

    const configFormxTextInputs = document.querySelectorAll("#configForm input[type=text]")

    // Text fields
    configFormxTextInputs.forEach(textInput => {
        localStorage.setItem(textInput.id, textInput.value)
    })
};

// Event listener to close the config menu if you press Esc or click outside of the menu
document.addEventListener("keydown", (event) => {
    if (localStorage.getItem("config") === "open" && event.key === "Escape") {
        toggleConfigMenu();
    }
});
document.addEventListener("mousedown", (event) => {
    if (localStorage.getItem("config") === "open") {
        const { target } = event;
        try {
            if (
                target.id !== "gearIcon"
                && target.id !== "configMenu"
                && target.closest("aside") === null
            ) {
                toggleConfigMenu();
            }
        } catch (_) {

        }
    }
});

// Prevent the page from reloading when pressing enter on the text input
document.getElementById("configMenu").addEventListener("submit", event => {
    event.preventDefault()
})

const resetTextInput = (target) => {
    // Function to reset a text input in local storage and its corresponding value
    const id = target.parentNode.children[1].id
    localStorage.setItem(id, "");
    document.getElementById(id).value = "";
    updateConfig()
}

// Function to create a filter element in DOM and handle local storage
const createFilter = (defaultValue, category, id, displayName, pattern, description = "") => {

    // DOM Aspect

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.title = description;
    label.innerHTML = displayName;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.title = description
    input.checked = defaultValue

    const parent = document.getElementById(category);
    if (id.toLowerCase().includes("custom")) {
        const textInput = document.createElement("input")
        textInput.type = "text"
        textInput.title = description
        textInput.id = id + "TextInput"
        textInput.placeholder = "Exclude this text"
        textInput.value = localStorage.getItem(textInput.id);

        const reset = document.createElement("img")
        reset.title = "Clear the text."
        reset.src = "../style/images/icons/refresh_FILL0_wght600_GRAD0_opsz48.png"
        reset.classList.add("resetTextInput")
        reset.tabIndex = 0
        reset.addEventListener("click", event => {
            resetTextInput(event.target)
        })

        const textInputwrapper = document.createElement("div")
        textInputwrapper.classList.add("textInputWrapper")
        textInputwrapper.appendChild(reset)
        textInputwrapper.appendChild(textInput)

        const biggerWrapper = document.createElement("div")
        biggerWrapper.style.display = "flex"
        biggerWrapper.style.flexFlow = "row nowrap"
        biggerWrapper.style.alignContent = "center"
        biggerWrapper.classList.add("biggerTextInputWrapper")
        biggerWrapper.appendChild(label)
        biggerWrapper.appendChild(textInputwrapper)


        parent.after(biggerWrapper)
        parent.after(input);

    } else {
        parent.after(label);
        parent.after(input);
    }


    // Local Storage Aspect
    const localStorageValue = localStorage.getItem(id);

    if (localStorageValue === null) {
        console.warn(id, "localStorage is missing");
        localStorage.setItem(id, defaultValue ? "checked" : "unchecked");
        localStorage.setItem(`${id}%pattern`, pattern);
    }
    if (localStorageValue === "checked") {
        input.checked = true;
    } else if (localStorageValue === "unchecked") {
        input.checked = false;
    }
};

// Run on window load
window.onload = () => {
    if (localStorage.getItem("config") === null) {
        console.error("Config reopen error: localStorage is missing");
        localStorage.setItem("config", "closed");
    }    

    // Remeber if config was open or not
    if (localStorage.getItem("config") === "open") {
        const configMenu = document.getElementById("configMenu");
        configMenu.style.display = "none";
        localStorage.setItem("config", "closed");
    }
};
