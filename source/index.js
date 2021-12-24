import { initTerminal } from 'ttty'

const terminal = initTerminal({
    host: document.querySelector('#terminal'),
    welcomeMessage: `Hi. Make yourself at home. Don't hesitate to ask for help if you need it.`,
    prompt: 'guest@mkrl.xyz:~$ ',
    commands: {
        about: {
            name: 'about',
            description: 'about me and this place',
            func: ({ type }) => {
                type('Hi. I\'m Mikhail. I\'m a software engineer. This is my home page. By default you won\'t be greeted with a logotype, fancy design or a catchy title. If you need something, you can directly ask for the information you need, the good ol CLI way. This entire website is (probably) under 8 kb (under 4 gzipped). Whoa!',16)
            }
        },
        norris: {
            name: 'norris',
            description: 'fetch a Chuck Norris joke',
            func: ({ stop, start, print }) => {
                start()
                fetch('https://api.icndb.com/jokes/random?limitTo=[nerdy]')
                    .then(data=> data.json())
                    .then(res=> print(res.value.joke))
                    .catch(error=> print(error))
                    .finally(() => stop())
            }
        },
        contact: {
            name: 'contact',
            description: 'find ways to contact me',
            func: ({ print }) => {
                print(
                    '<a href="mailto:self@mkrl.xyz">self@mkrl.xyz</a><br><a href="https://t.me/mkrlk" target="blank">Telegram</a><br><a href="https://github.com/mkrl/" target="blank">GitHub</a><br><a href="https://stackoverflow.com/users/7753036/mkrl" target="blank">Stack Overflow</a><br><a href="https://dev.to/mkrl" target="blank">dev.to</a>'
                )}
        },
        keys: {
            name: "keys",
            description: "public ssh keys",
            func: ({ print }) => {
                print('<a href="/keys/work.pub" target="blank">work.pub</a><br><a href="/keys/server.pub" target="blank">server.pub</a>')
            }
        },
        repo: {
            name: 'repo',
            description: 'source code',
            func: ({ print }) => {
                print('<a href="https://github.com/mkrl/mkrl.github.io" target="blank">Click</a>')
            }
        },
    }
})

terminal.input.focus()
