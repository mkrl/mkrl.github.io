function getNorris() {
    const url = 'https://api.icndb.com/jokes/random?limitTo=[nerdy]';
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
            func: function(){plainterm.type('Hi. I\'m Mikhail. I\'m a front-end engineer. This is my home page. By default you won\'t be greeted with a logotype, fancy design or a catchy title. If you need something, you can directly ask for the information you need, the good ol CLI way. This entire website is under 30 kb (under 15 gzipped). Whoa!',16);}
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
            func: function(){plainterm.print('<a href="https://github.com/mkrl/ubuntu-post-install" target="blank">Click</a>');}
        },
        resume: {
            name: "resume",
            description: "download my resume",
            func: function(){plainterm.print('English: <a href="./resume/en/mkrl.html" target="blank">HTML</a>, <a href="./resume/en/mkrl.pdf" target="blank">PDF</a>, <a href="https://github.com/mkrl/mkrl.github.io/tree/master/resume/en" target="blank">other formats</a><br>Русский: <a href="./resume/ru/mkrl.html" target="blank">HTML</a>, <a href="./resume/ru/mkrl.pdf" target="blank">PDF</a>, <a href="https://github.com/mkrl/mkrl.github.io/tree/master/resume/ru" target="blank">другие форматы</a>');}
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
