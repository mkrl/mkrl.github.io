import { initTerminal } from 'ttty'
import { cat, cd, DEFAULT_PROMPT, ls, sl, tree } from './commands'
import { createAutoComplete } from './path'
import { createEasterEgg } from './egg'

const terminal = initTerminal({
    host: document.querySelector('#terminal'),
    welcomeMessage: `Hi. Make yourself at home. Don't hesitate to ask for help if you need it.`,
    prompt: DEFAULT_PROMPT,
    commands: {
        cd: {
            name: 'cd',
            description: 'navigate to a directory',
            func: cd,
        },
        ls: {
            name: 'ls',
            description: 'list directory contents',
            func: ls,
        },
        sl: {
            name: 'sl',
            description: 'run a steam locomotive',
            func: sl,
        },
        cat: {
            name: 'cat',
            description: 'view a file',
            argDescriptions: ['file path'],
            func: cat,
        },
        tree: {
            name: 'tree',
            description: 'list all files and directories in a tree-like format',
            func: tree,
        },
    }
})

createAutoComplete(terminal)

terminal.input.focus()

createEasterEgg(terminal)

