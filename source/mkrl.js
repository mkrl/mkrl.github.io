function getNorris() {
    const url = 'http://api.icndb.com/jokes/random?limitTo=[nerdy]';
    fetch(url).then(data=>{return data.json();})
    .then(res=>{plainterm.print(res.value.joke);})
    .catch(error=>plainterm.print(error));
}


var settings = {
    welcome: "Hi. Make yourself at home. Don't hesitate to ask for help if you need it.",
    id: "terminal",
    prompt: "user@mkrl.xyz:~$ ",
    commands: {
        about: {
            name: "about",
            description: "about me and this place",
            func: function(){plainterm.type('Hi. I\'m Michael. I\'m a Web Developer. This is my home page. By default you won\'t be greeted with a logotype, fancy design and a catchy title. If you need something, you can directly ask for the information you need. Just like some of us are used to.',16);}
        },
        startx: {
            name: "startx",
            description: "starts an x session",
            func: function(){document.body.classList.toggle('x'); window.scrollTo(0, 0);}
        },
        contact: {
            name: "contact",
            description: "find ways to contact me",
            func: function(){plainterm.print('<a href="mailto:self@mkrl.xyz">self@mkrl.xyz</a><br><a href="https://t.me/mkrlk" target="blank">Telegram</a><br><a href="https://github.com/mkrl/" target="blank">GitHub</a><br><a href="https://stackoverflow.com/users/7753036/mkrl" target="blank">Stack Overflow</a><br><a href="https://dev.to/mkrl" target="blank">dev.to</a>');}
        },
        keys: {
            name: "keys",
            description: "public ssh keys",
            func: function(){plainterm.print('<a href="/keys/work.pub" target="blank">work.pub</a><br><a href="/keys/server.pub" target="blank">server.pub</a>');}
        },
        dotfiles: {
            name: "dotfiles",
            description: "for the sake of not setting stuff up every time",
            func: function(){plainterm.print('<a href="https://github.com/mkrl/.dotfiles" target="blank">Click</a>');}
        },
        roadmap: {
            name: "roadmap",
            description: "rough skills roadmap",
            func: function(){plainterm.print('Working on it(tm)');}
        },
        resume: {
            name: "resume",
            description: "download my resume",
            func: function(){plainterm.print('Working on it(tm)');}
        },
        chuck: {
            name: "chuck",
            description: "fetch a Chuck Norris joke",
            func: function(){getNorris();}
        },
        repo: {
            name: "repo",
            description: "source code",
            func: function(){plainterm.print('<a href="https://github.com/mkrl/mkrl.github.io" target="blank">Click</a>');}
        }
    }
};

plainterm.init(settings);