const chalk = require('chalk');
const { string } = require('yargs');
const yargs = require('yargs')
const notes = require('./notes')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: "adding some note title",
            demandOption: true,
            type: string
        },
        body: {
            describe: "body",
            demandOption: true,
            type: string
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove new note',
    builder: {
        title: {
            describe: "removing notes",
            demandOption: true,
            type: string
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'listing note',
    handler() {
        notes.listNote()
    }
})

yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            describe: "reading notes",
            demandOption: true,
            type: string
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})


console.log(yargs.argv);