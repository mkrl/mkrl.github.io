## A homepage of mine

Today is the era of previously unreachable download speeds, unlimited bandwidth and constantly increasing computing resources.
With an incredibly large amount of third-party libraries we sometimes tend to forget how to write pure, simple and lightweight code for simple tasks.

Can you build a responsive website that is modern, does look good, and works right? The answer is yes, you can at least try to.

### Stuff

[plainterm.js](https://github.com/mkrl/plainterm.js) - pure JS lightweight terminal "emulator".

[node.js](https://nodejs.org/) running [grunt](https://gruntjs.com/) as build tools.

Modify source @ `/source/mkrl.[file_extention]`

#### Build

```
npm i
git submodule update --init --recursive
grunt
```

(use `git submodule update --recursive --remote` if not running for the first time)

Check out the gruntfile for build steps details.

#### Build resume 

Make be sure to have [HackMyResume](https://github.com/hacksalot/HackMyResume) installed: `npm install hackmyresume -g` 

For optional PDF support, install [wkhtmltopd](https://wkhtmltopdf.org/).

Modify source @ `/resume/[language]/mkrl.json`, following the [JSON Resume schema](https://jsonresume.org/schema/). 

```
git submodule update --recursive --remote
grunt resume

```

A total amount of traffic required to download and view this site is: <<size>>, including all the code, design, graphics and a JavaScript library.
