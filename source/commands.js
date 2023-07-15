import fs from './fs.json'
import { cond, startsWith, stubTrue, map } from 'lodash/fp'

let currentPath = '/'

const USERNAME = 'guest@mkrl.xyz'
export const DEFAULT_PROMPT = `${USERNAME}:~$ `

const formatAccessError = (command, path) =>
  `${command}: no such file or directory: ${path}`

const formatDirItem = (item) =>
  `<span class="ls-item${item.type === 'dir' ? ' ls-dir' : ''}">${item.name}</span>`

const resolveAbsolutePath = path => {

}

// get /foo/bar from ../bar
const resolveRelativePath = path => {

}

const traverse = direction => {

}

const navigate = (path) => {
  const targetDir = cond([
    [startsWith('/'), resolveAbsolutePath],
    [startsWith('~'), resolveAbsolutePath],
    [stubTrue, resolveRelativePath],
  ])

}


export const cd = (terminal, ...args) => {
  const newPath = args[0] ?? '/'
  terminal.settings.prompt = `${USERNAME}:${newPath}$ `
  currentPath = newPath
}

export const ls = ({ print }, ...args) => {
  // TODO: handle -la shell-like flags
  const path = args.length === 0 ? currentPath : args[0]


  try {
    print(
      map(formatDirItem, fs[path].entries)
        .join('')
    )
  } catch (e) {
    print(formatAccessError('ls', path))
  }
}