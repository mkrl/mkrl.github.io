import { initTerminal } from 'ttty'
import { cat, cd, DEFAULT_PROMPT, ls, sl, tree, uptime } from './commands'
import { createAutoComplete } from './path'
import { createEasterEgg } from './egg'

const terminal = initTerminal({
    host: document.querySelector('#terminal'),
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

createAutoComplete(terminal)
createEasterEgg(terminal)

const init = async () => {
    if (await terminal.type('cat /about.txt', 60, true)) {
        terminal.run('cat /about.txt')
        if (await terminal.type('help', 60, true)) {
            terminal.run('help')
            if (await terminal.type('ls -la /experiments', 60, true)) {
                terminal.run('ls -la /experiments')
            }
        }
    }
    terminal.input.focus()
}
init()
