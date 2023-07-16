export const USERNAME = 'guest@mkrl.xyz'
import fs from './fs.json'
const VFS_URL_PREFIX = 'vfs://.'
let currentPath = '/'

const trimTrailingSlash = str =>
  str.endsWith('/') && str.length > 1
    ? str.slice(0, -1)
    : str

export const setCurrentPath = path => currentPath = path
export const getCurrentPath = () => currentPath


const resolveAbsolutePath = path => path.startsWith('~') ? `/${path.slice(1)}` : path
// get /foo/bar from ../bar
// I'm using the URL constructor to resolve relative paths, because it's a lot easier than doing it manually
// needs some hackin' with the imaginary protocol and trimming extra slashes
const resolveRelativePath = path => {
  const vfsUrl = new URL(path, `${VFS_URL_PREFIX}${currentPath === '/' ? '' : currentPath}/`)
  const resolved = vfsUrl.href
    .slice(VFS_URL_PREFIX.length)
  return resolved === '/'
    ? resolved
    : trimTrailingSlash(resolved)
}


export const resolvePath = (path) => {
  const trimPath = trimTrailingSlash(path)
  return trimPath.startsWith('/') || trimPath.startsWith('~')
    ? resolveAbsolutePath(trimPath) : resolveRelativePath(trimPath)
}

export const autocomplete = (input) => {
  const words = input.value.split(' ')
  const directories = Object.keys(fs)
  if (words.length > 1) {
    const lastWord = words.pop()
    const resolvedPath = resolvePath(lastWord)
    const matches = directories.filter(command => command.startsWith(resolvedPath))
    const exactMatch = matches.find(command => command === resolvedPath)
    if (matches.length > 0 && !exactMatch) {
      const foundMatch = matches.reduce((a, b) => a.length <= b.length ? a : b)
      input.value = input.value.replace(lastWord, foundMatch)
    }
  }
}

export const createAutoComplete = (terminal) => {
  const { input } = terminal
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      autocomplete(input)
      e.preventDefault()
    }
  })
}