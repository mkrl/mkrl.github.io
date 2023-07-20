import fs from './fs.json'
import { getCurrentPath, resolvePath, setCurrentPath, USERNAME } from './path'
import { startLocomotive } from './sl'

export const DEFAULT_PROMPT = `${USERNAME}:/$ `

const isDirectory = (path) => fs[path].type === 'dir'

const formatCommandError = (command, path, message) =>
  `<span class="terminal-error">${command}: ${message} ${path}</span>`

const formatAccessError = (command, path) =>
  formatCommandError(command, path, 'no such file or directory:')

const formatNotAFolderError = (path) =>
  formatCommandError('cd', path, 'not a directory:')

const formatDirItem = (item) =>
  `<span class="ls-item${item.type === 'dir' ? ' ls-dir' : ''}">${item.name}</span>`

const getFlagsFromArguments = (args) => {
  const flags = new Set()
  const restArgs = args.filter(arg => {
    if (arg.startsWith('-')) {
      arg
        .replace('-', '')
        .split('')
        .forEach(flag => flags.add(flag))
      return false
    }
    return true
  })
  return [restArgs, Array.from(flags)]
}

export const cd = ({ setPrompt, print }, ...args) => {
  const path = args[0] ?? '/'
  const resolvedPath = resolvePath(path)
  if (resolvedPath in fs) {
    if (!isDirectory(resolvedPath)) {
      print(formatNotAFolderError(resolvedPath))
    }
    setCurrentPath(resolvedPath)
    setPrompt(`${USERNAME}:<b>${resolvedPath}$ </b>`)
  } else {
    print(formatAccessError('cd', resolvedPath))
  }
}

export const ls = ({ print }, ...args) => {
  const [argsWithoutFlags] = getFlagsFromArguments(args)
  // TODO: handle -la shell-like flags
  const path = argsWithoutFlags.length === 0 ? getCurrentPath() : argsWithoutFlags[0]
  const resolvedPath = resolvePath(path)

  if (!isDirectory(resolvedPath)) {
    print(fs[resolvedPath].name)
    return
  }
  try {
    print(
      fs[resolvedPath].entries
        .map(formatDirItem)
        .join('')
    )
  } catch (e) {
    print(formatAccessError('ls', resolvedPath))
  }
}

export const cat = ({ print, start, stop }, ...args) => {
  const [argsWithoutFlags] = getFlagsFromArguments(args)
  const resolvedPath = resolvePath(argsWithoutFlags[0])

  if (!(resolvedPath in fs)) {
    print(formatAccessError('cat', resolvedPath))
    return
  }

  if (isDirectory(resolvedPath)) {
    print(formatCommandError('cat', resolvedPath, 'is a directory'))
    return
  }

  start()
  const url = new URL(resolvedPath, location.origin)
  fetch(url)
    .then(response => response.text())
    .then(text => {
      print(text)
    })
    .finally(stop)
}

const TREE_PREFIX = '└──'

const listTreeDirectory = (path, level, print) => {
  const dir = fs[path]
  dir.entries.map(entry => {
    const prefix = TREE_PREFIX.repeat(level + 1)
    const formattedEntry = `${prefix} ${formatDirItem(entry)}`
    print(formattedEntry)
    if (entry.type === 'dir') {
      listTreeDirectory(entry.path, level + 1, print)
    }
  })
}

export const tree = ({ print }) => {
  const root = fs['/']
  print('/')
  root.entries.forEach((entry, level) => {
    print(`${TREE_PREFIX} ${formatDirItem(entry)}`)
    if (entry.type === 'dir') {
      listTreeDirectory(entry.path, 1, print)
    }
  })
}

export const sl = ({ start, stop }) => {
  start()
  startLocomotive()
    .finally(stop)
}

