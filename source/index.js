import { initTerminal } from 'ttty'
import { cd, DEFAULT_PROMPT, ls } from './commands'

const terminal = initTerminal({
    host: document.querySelector('#terminal'),
    welcomeMessage: `Hi. Make yourself at home. Don't hesitate to ask for help if you need it.`,
    prompt: DEFAULT_PROMPT,
    commands: {
        about: {
            name: 'about',
            description: 'about me and this place',
            func: ({ type }) => {
                type('Hi. I\'m Mikhail. I\'m a software engineer. This is my home page. By default you won\'t be greeted with a logotype, fancy design or a catchy title. If you need something, you can directly ask for the information you need, the good ol CLI way. This entire website is (probably) under 8 kb (under 4 gzipped). Whoa!',16)
            }
        },
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
    }
})


terminal.input.focus()
