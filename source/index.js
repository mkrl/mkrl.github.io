import { initTerminal } from 'ttty'
import { cat, cd, chainTypeCommands, DEFAULT_PROMPT, ls, sl, tree, uptime } from './commands'
import { createAutoComplete } from './path'
import { createEasterEgg } from './egg'

const hash = window.location.hash

const INIT_SEQUENCE = ['cat /about.txt', 'help', 'ls -la /experiments']
const INIT_SEQUENCE_CONTACT = ['ls -la /contact']

const terminal = initTerminal({
    host: document.querySelector('#terminal'),
    prompt: DEFAULT_PROMPT,
    history: [...INIT_SEQUENCE].reverse(),
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
        clear: {
            name: 'clear',
            description: 'wipe the terminal screen',
            func: ({ commandContainer }) => commandContainer.innerHTML = '',
        },
        uptime: {
            name: 'uptime',
            description: 'how long have you been here?',
            func: uptime,
        },
    }
})

const init = async () => {
    createAutoComplete(terminal)
    createEasterEgg(terminal)
    await chainTypeCommands(hash === '#contact' ? INIT_SEQUENCE_CONTACT : INIT_SEQUENCE, terminal)
    terminal.input.focus()
}
init()
