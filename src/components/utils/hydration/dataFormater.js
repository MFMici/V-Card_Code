export const removeSpaces = (title) => {
    return title.replace(/\s/g, '')
}

export const removeEmail = (title) => {
    return title.replace('@gmail.com', '')
}