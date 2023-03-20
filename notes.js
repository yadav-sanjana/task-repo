const { default: chalk } = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: `${title}`,
            body: `${body}`
        })

        saveNotes(notes)

        console.log(chalk.green("New Note added!"));
    } else {
        console.log(chalk.red("Note title taken!!"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green("note is removed!"));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red("No Note found!!"));
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blueBright("Your Notes..."))
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const exists = notes.find((note) => note.title === title)

    if (exists) {
        console.log(chalk.inverse(exists.title))
        console.log(exists.body);
    } else {
        console.log("No note found");
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNotes,
    readNote: readNote
}