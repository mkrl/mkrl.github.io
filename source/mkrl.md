## A homepage of mine

Today is the era of previously unreachable download speeds, unlimited bandwidth and constantly increasing computing resources.
With an incredibly large amount of third-party libraries we sometimes tend to forget how to write pure, simple and lightweight code for simple tasks.

Can you build a responsive website that is modern, does look good, and works right? The answer is yes, you can at least try to.

### Stuff

[plainterm.js](https://github.com/mkrl/plainterm.js) - pure JS lightweight terminal "emulator".

[node.js](https://nodejs.org/) running [grunt](https://gruntjs.com/) as build tools.

Modify source @ `/source/mkrl.[file_extention]`

Build with:

```
npm install
git submodule update --remote --merge
grunt
```

Build resume:

Make be sure to have [HackMyResume](https://github.com/hacksalot/HackMyResume) installed: `npm install hackmyresume -g` 

For optional PDF support, install [wkhtmltopd](https://wkhtmltopdf.org/).

```
cd resume
hackmyresume build mkrl.json TO resume.all -t positive

```

Check out the gruntfile for build steps details.

A total amount of traffic required to download and view this site is: <<size>>, including all the code, design, graphics and a JavaScript library.