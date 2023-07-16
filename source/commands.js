import fs from './fs.json'
import { getCurrentPath, resolvePath, setCurrentPath, USERNAME } from './path'

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
  // TODO: handle -la shell-like flags
  const path = args.length === 0 ? getCurrentPath() : args[0]
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