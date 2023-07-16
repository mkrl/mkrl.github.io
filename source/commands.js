import fs from './fs.json'

let currentPath = '/'

const USERNAME = 'guest@mkrl.xyz'
const VFS_URL_PREFIX = 'vfs://.'
export const DEFAULT_PROMPT = `${USERNAME}:/$ `

const formatAccessError = (command, path) =>
  `<span class="terminal-error">${command}: no such file or directory: ${path}</span>`

const formatDirItem = (item) =>
  `<span class="ls-item${item.type === 'dir' ? ' ls-dir' : ''}">${item.name}</span>`

const trimTrailingSlash = str => str.endsWith('/') ? str.slice(0, -1) : str

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

const resolvePath = (path) => {
  const trimPath = trimTrailingSlash(path)
  return trimPath.startsWith('/') || trimPath.startsWith('~')
    ? resolveAbsolutePath(trimPath) : resolveRelativePath(trimPath)
}

export const cd = ({ setPrompt, print }, ...args) => {
  const newPath = args[0] ?? '/'
  const resolvedPath = resolvePath(newPath)
  if (resolvedPath in fs) {
    currentPath = resolvedPath
    setPrompt(`${USERNAME}:<b>${resolvedPath}$ </b>`)
  } else {
    print(formatAccessError('cd', resolvedPath))
  }
}

export const ls = ({ print }, ...args) => {
  // TODO: handle -la shell-like flags
  const path = args.length === 0 ? currentPath : args[0]
  const resolvedPath = resolvePath(path)

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