var settings = {
    welcome: "Hi. Make yourself at home.",
    help: false,
    id: "terminal",
    prompt: "user@mkrl.xyz:~$ ",
    commands: {
        about: {
            name: "about",
            description: "about me",
            func: function(){plainterm.print('Hi. I\'m Michael. I\'m a Web Developer. This is my home page.');}
        },
        ls: {
            name: "ls",
            description: "command",
            func: function(){plainterm.type('This is the wrong terminal you are typing in...', 30);}
        },
        cd: {
            name: "cd",
            description: "command",
            func: function(){plainterm.type('This is the wrong terminal you are typing in...', 30);}
        },
        su: {
            name: "su",
            description: "command",
            func: function(){plainterm.type('This is the wrong terminal you are typing in...', 30);}
        },
        repo: {
            name: "repo",
            description: "GitHub repository",
            func: function(){plainterm.print('<a href="https://github.com/mkrl/plainterm.js" target="blank">Click</a>');}
        },
        startx: {
            name: "startx",
            description: "starts an x session",
            func: function(){document.body.classList.toggle('x'); window.scrollTo(0, 0);}
        }
    }
};

plainterm.init(settings);