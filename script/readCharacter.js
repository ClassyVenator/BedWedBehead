
const URLs = {
    noDupes: "dataVault/individuals/noDupes.csv",
    preIndexed: "dataVault/individuals/preIndexedList.json",
    placeholderImage: "style/images/placeholder-alien.png",
};

const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
};

const fetchJSON = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const updateCharacterInfo = (index, data) => {
    console.log(index, data.name);

    const imageWrapper = document.querySelectorAll(".imageWrapper")[index];
    const URL = `https://starwars.fandom.com/wiki/${data.name}`;
    imageWrapper.href = URL;

    imageWrapper.children[0].src = data.imageURL || URLs.placeholderImage;

    imageWrapper.children[1].innerHTML = data.name;
};


const filterCharacter = (data, debug = false) => { // If true, let through

    // For debug. Eventually lets a character th
    if (filterCharacter.count === undefined) {
        filterCharacter.count = 0
        filterCharacter.metaCount = 1
        filterCharacter.skip = false
    } else if (!debug) {
        filterCharacter.count++

        if (filterCharacter.count % 84000 === 0 || filterCharacter.skip) {
            console.log("object");
            data.imageURL = URLs.placeholderImage
            data.name = "Error"
            filterCharacter.count = 0
            filterCharacter.metaCount++
            if (filterCharacter.metaCount % 3 === 2) {
                alert("Error: Not enough matches. Please try again. If the error persists, please try other filters.")
                filterCharacter.skip = true
            }
            return true
        }
    }

    // "The Obi-Wan Exception"
    if (data.name === "Obi-Wan Kenobi") {
        data.imageURL = "https://static.wikia.nocookie.net/starwars/images/d/d2/ObiWan_hood.jpg"
    }

    // Helper Functions
    const dataCategories = data.categories
    const dataAppearance = data.appearances.split(",")
    const isInCategory = (string) => { return dataCategories.includes(string) }
    const appearanceInclude = (string) => { return dataAppearance.includes(string) }
    const isChecked = (string) => { return localStorage.getItem(string) === "checked" }

    // If everything is unchecked, let everything pass
    const patternIDs = Object.keys(localStorage)
    let allUnchecked = true
    patternIDs.forEach(patternID => {
        if (
            patternID.includes("%pattern")
            &&
            localStorage.getItem(patternID.replace("%pattern", "")) === "checked"
        ) {
            allUnchecked = allUnchecked && false
        } else {
            allUnchecked = allUnchecked && true
        }
    })
    if (allUnchecked) { return true }


    // Miscellaneous
    if (
        (isChecked("filterImage") && data.imageURL === "")
        ||
        (isChecked("filterUnidentified") && data.name.toLowerCase().includes("unidentified"))
        ||
        (isChecked("filterCommon") && dataAppearance.length < 5)
    ) {
        return false
    }

    // CANONICITY
    const canonCheck = isChecked("filterCanon")
    const legendsCheck = isChecked("filterLegends")
    const nonCanonCheck = isChecked("filterNonCanon")
    if ( // everything is, or isnt checked, let it pass on  
        (
            legendsCheck
            && canonCheck
            && nonCanonCheck
        )
        ||
        (
            !legendsCheck
            && !canonCheck
            && !nonCanonCheck
        )
    ) {
        // Continue to other filters
    } else {
        if ( // if there are some checked and some unchecked, check more closely if it should pass or not
            (legendsCheck && isInCategory("Legends_articles"))
            || (canonCheck && isInCategory("Canon_articles"))
            || (nonCanonCheck && (isInCategory("Non-canon_Legends_articles") || isInCategory("Non-canon_articles")))
        ) {
            // Continue to other filters
        } else {
            return false
        }
    }

    // Appearances
    const ahsokaCheck = isChecked("filterAhsoka")
    const andorCheck = isChecked("filterAndor")
    const obiWanCheck = isChecked("filterObiWan")
    const mandoBobaCheck = isChecked("filterMandoBoba")
    const badBatchCheck = isChecked("filterBadBatch")
    const rebelsCheck = isChecked("filterRebels")
    const cloneWarsCheck = isChecked("filterCloneWars")
    const SWScheck = isChecked("filterSkywalkerRogue")
    if (
        !ahsokaCheck
        && !andorCheck
        && !obiWanCheck
        && !mandoBobaCheck
        && !badBatchCheck
        && !rebelsCheck
        && !cloneWarsCheck
        && !SWScheck
    ) {
        // Continue to other filters
    } else {
        if (
            (SWScheck && (appearanceInclude("Rogue One:A Star Wars Story") || appearanceInclude("Star Wars:Episode I The Phantom Menace") || appearanceInclude("Star Wars:Episode II Attack of the Clones") || appearanceInclude("Star Wars:Episode III Revenge of the Sith") || appearanceInclude("Star Wars:Episode IV A New Hope") || appearanceInclude("Star Wars:Episode V The Empire Strikes Back") || appearanceInclude("Star Wars:Episode VI Return of the Jedi") || appearanceInclude("Star Wars:Episode VII The Force Awakens") || appearanceInclude("Star Wars:Episode VIII The Last Jedi") || appearanceInclude("Star Wars:Episode IX The Rise of Skywalker")))
            || (cloneWarsCheck && appearanceInclude("Star Wars:The Clone Wars"))
            || (rebelsCheck && appearanceInclude("Star Wars Rebels"))
            || (mandoBobaCheck && (appearanceInclude("The Mandalorian") || appearanceInclude("The Book of Boba Fett")))
            || (badBatchCheck && appearanceInclude("Star Wars:The Bad Batch"))
            || (ahsokaCheck && appearanceInclude("Ahsoka (television series)"))
            || (andorCheck && appearanceInclude("Andor (television series)"))
            || (obiWanCheck && appearanceInclude("Obi-Wan Kenobi (television series)"))
        ) {
            // Continue to other filters
        } else {
            return false
        }
    }

    // GENDER
    const femaleCheck = isChecked("filterFemales")
    const maleCheck = isChecked("filterMales")
    const neitherCheck = isChecked("filterGenderless")
    if (
        !femaleCheck
        && !maleCheck
        && !neitherCheck
    ) {
        // Continue to other filters
    } else {
        const isFemale = (
            isInCategory("Females")
            ||
            isInCategory("Individuals_with_she/her_pronouns")
            ||
            isInCategory("Droids_with_feminine_programming")
        )
        const isMale = (
            isInCategory("Males")
            ||
            isInCategory("Individuals_with_he/him_pronouns")
            ||
            isInCategory("Droids_with_masculine_programming")
            ||
            (
                (
                    isInCategory("Clone_troopers")
                    ||
                    isInCategory("Clone_trooper_captains")
                    ||
                    isInCategory("Clone_trooper_commanders")
                    ||
                    isInCategory("Clone_scout_troopers")
                )
                &&
                !isFemale // "The Sister Exception" 
            )

        )
        const isNeither = (
            !isInCategory("Males") && !isInCategory("Females") && !isInCategory("Droids_with_masculine_programming") && !isInCategory("Droids_with_feminine_programming")
        )

        if (
            (maleCheck && isMale)
            || (femaleCheck && isFemale)
            || (neitherCheck && isNeither)
        ) {
            // Continue to other filters
        } else {
            return false
        }
    }

    return true
};

const getRandomName = (checkAgainst, fullListNames) => {
    let uriName = fullListNames[Math.floor(Math.random() * fullListNames.length)];
    while (checkAgainst.includes(uriName)) {
        uriName = fullListNames[Math.floor(Math.random() * fullListNames.length)];
    }
    return uriName;
};

const showFetching = () => {
    const tiles = document.querySelectorAll(".imageWrapper")

    tiles.forEach(tile => {
        tile.href = "#"
        tile.children[0].src = URLs.placeholderImage
        tile.children[1].innerHTML = "Fetching..."
    })
}

const clearSelection = () => {
    try {
        document.querySelectorAll(".selected").forEach(element => {
            element.classList.remove("selected")
            localStorage.setItem(element.id, "false")
        })
    } catch (_) { }
}

const play = async () => {
    countCharacters()

    if (localStorage.getItem("showTip") === null) {
        localStorage.setItem("showTip", "yes")
    }
    if (play.count === undefined) {
        play.count = 0
    } else {
        play.count++
    }
    if (play.count === 3 && localStorage.getItem("showTip") === "yes") {
        localStorage.setItem("showTip", "no")
        document.getElementById("filterTip").style.display = "grid"
    }
    filterCharacter.skip = false

    clearSelection()
    showFetching()

    let tryFetch = true
    const alternatives = [];

    tryFetch = false
    if (tryFetch) {
        alternatives.forEach((data, index) => {
            console.log(index === 0 ? ("Fetching", alternatives) : "");
            updateCharacterInfo(index, data)
        })

    } else {

        tryFetch = false

        const indexedList = JSON.parse(await fetchText(URLs.preIndexed));
        const indexedListOfIndividuals = Object.keys(indexedList)

        // const localAlternatives = ["Dooku", "CT-5555", "Bo-Katan_Kryze"]
        const localAlternatives = []
        while (localAlternatives.length < 3) {
            const name = getRandomName(localAlternatives, indexedListOfIndividuals)
            const data = indexedList[name]
            if (filterCharacter(data)) {
                localAlternatives.push(name);
            }
        }


        localAlternatives.forEach((name, index) => {
            index === 0 ? console.log("Loading", localAlternatives) : undefined

            updateCharacterInfo(index, indexedList[name]);
        })
    }
};

const countCharacters = async () => {
    const fullList = (await fetchText(URLs.noDupes)).replaceAll("\"", "").split(",")
    const index = await fetchJSON(URLs.preIndexed)

    let count = 0
    fullList.forEach(name => {
        const data = index[name]
        if (filterCharacter(data, true)) {
            count++
        }
    })
    document.getElementById("totalCharacterCount").innerHTML = count
}

countCharacters()
play();

