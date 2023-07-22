import fs from './fs.json'

export const USERNAME = '<span class="user">guest@mkrl.xyz</span>'

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

const insertSuggestion = (input, matches, wordToReplace, pre = '') => {
  if (matches.length > 0) {
    const shortestMatch = matches.reduce((a, b) => a.length <= b.length ? a : b)
    input.value = input.value.replace(`${pre}${wordToReplace}`, `${pre}${shortestMatch}`)
  }
}

export const autocomplete = (terminal) => {
  const { input } = terminal
  if (!input.value) return

  const words = input.value.trim().split(' ')

  // Autocomplete the command itself
  if (words.length === 1) {
    const matches = Object.keys(terminal.settings.commands).filter(command => command.startsWith(words[0]))
    insertSuggestion(input, matches, words[0])
  }

  // Autocomplete path to file or directory
  if (words.length > 1) {
    const lastWord = words.pop()
    const resolvedPath = resolvePath(lastWord)

    const directories = Object.keys(fs)
    const matches = directories.filter(command => command.startsWith(resolvedPath))
    insertSuggestion(input, matches, lastWord, ' ')
  }
}

export const createAutoComplete = (terminal) => {
  const { input } = terminal
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      autocomplete(terminal)
      e.preventDefault()
    }
  })
}