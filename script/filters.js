// Gender
createFilter(
    defaultValue = false,
    category = "gender",
    id = "filterGenderless",
    displayName = "Neither of the above",
    pattern = "category:Articles_with_unpopulated_pronoun_parameters,!Males,!Individuals_with_he/him_pronouns,!Females,!Individuals_with_she/her_pronouns",
    description = "Include only individuals who are neither female nor male."
)
createFilter(
    defaultValue = false,
    category = "gender",
    id = "filterMales",
    displayName = "Male individuals",
    pattern = "category:Males,Individuals_with_he/him_pronouns,Clone_troopers",
    description = "Include only male individuals."
)
createFilter(
    defaultValue = false,
    category = "gender",
    id = "filterFemales",
    displayName = "Female individuals",
    pattern = "category:Females,Individuals_with_she/her_pronouns",
    description = "Include only female individuals."
)

// Miscellaneous
// createFilter(
//     defaultValue = false,
//     category = "miscellaneous",
//     id = "filterCustomMisc",
//     displayName = "Custom",
//     pattern = "string:",
//     description = "Exclude individuals with names that include this text."
// )
createFilter(
    defaultValue = false,
    category = "miscellaneous",
    id = "filterCommon",
    displayName = "Common individuals",
    pattern = "string:filterCommon",
    description = "Include only individuals with more than 5 appearences in the 'Appearances' section on Wookieepedia."
)
createFilter(
    defaultValue = false,
    category = "miscellaneous",
    id = "filterUnidentified",
    displayName = "Identified individuals",
    pattern = "string:filterUnidentified",
    description = "Include only identified individuals."
)
createFilter(
    defaultValue = false,
    category = "miscellaneous",
    id = "filterImage",
    displayName = "Individuals with pictures",
    pattern = "string:filterImage",
    description = "Include only individuals with pictures."
)

// Status
createFilter(
    defaultValue = false,
    category = "status",
    id = "filterNonCanon",
    displayName = "Non-canon",
    pattern = "category:Non-canon_Legends_articles",
    description = "Include only Non-canon individuals."
)
createFilter(
    defaultValue = false,
    category = "status",
    id = "filterLegends",
    displayName = "Legends",
    pattern = "category:Legends_articles",
    description = "Include only Legends individuals."
)
createFilter(
    defaultValue = false,
    category = "status",
    id = "filterCanon",
    displayName = "Canon",
    pattern = "category:Canon_articles",
    description = "Include only Canon individuals."
)

// Appearance
// createFilter(
//     defaultValue = false,
//     category = "appearance",
//     id = "filterCustomAppearance",
//     displayName = "Custom",
//     pattern = "string:",
//     description = "Enter name of media as it appears in the Appearances section of articles on Wookieepedia."
// )
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterAhsoka",
    displayName = "Ahsoka",
    pattern = "appearance:Ahsoka",
    description = "Include only individuals who appear in Ahsoka."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterAndor",
    displayName = "Andor",
    pattern = "appearance:Andor",
    description = "Include only individuals who appear in Andor."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterObiWan",
    displayName = "Obi-Wan Kenobi",
    pattern = "appearance:Kenobi",
    description = "Include only individuals who appear in Obi-Wan Kenobi."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterMandoBoba",
    displayName = "The Mandalorian & TBOBF",
    pattern = "appearance:TheMandalorian,BOBF",
    description = "Include only individuals who appear in The Mandalorian or The Book of Boba Fett."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterBadBatch",
    displayName = "The Bad Batch",
    pattern = "appearance:TBB",
    description = "Include only individuals who appear in The Bad Batch."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterRebels",
    displayName = "Rebels",
    pattern = "appearance:Rebels",
    description = "Include only individuals who appear in Rebels."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterCloneWars",
    displayName = "The Clone Wars",
    pattern = "appearance:TCW",
    description = "Include only individuals who appear in The Clone Wars."
)
createFilter(
    defaultValue = false,
    category = "appearance",
    id = "filterSkywalkerRogue",
    displayName = "Skywalker saga & Rogue One",
    pattern = "appearance:",
    description = "Include only individuals who appear in episode I-IX or Rogue One."
)
