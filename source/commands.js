import fs from './fs.json'
import { getCurrentPath, resolvePath, setCurrentPath, USERNAME } from './path'
import { startLocomotive } from './sl'

export const DEFAULT_PROMPT = `${USERNAME}:/$ `

const startDate = new Date()

const fileTypeMap = {
  url: ' ls-url',
  dir:  ' ls-dir'
}

const isDirectory = (path) => fs[path].type === 'dir'

const formatCommandError = (command, path, message) =>
  `<span class="terminal-error">${command}: ${message} ${path}</span>`

const formatAccessError = (command, path) =>
  formatCommandError(command, path, 'no such file or directory:')

const formatNotAFolderError = (path) =>
  formatCommandError('cd', path, 'not a directory:')

const formatDirItem = (item) =>
  `<span class="ls-item${fileTypeMap[item.type] ?? ''}">${item.name}</span>`

const formatFolder = (entries) => {
  const table = document.createElement('table')
  entries.forEach(entry => {
    const row = document.createElement('tr')
    const name = document.createElement('td')
    const description = document.createElement('td')
    name.innerHTML = formatDirItem(entry)
    description.innerText = entry.description ?? ''
    row.append(name, description)
    table.append(row)
  })
  return table.outerHTML
}

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
  const [argsWithoutFlags, flags] = getFlagsFromArguments(args)

  const tableView = flags.includes('l')
  const listAll = flags.includes('a')

  const path = argsWithoutFlags.length === 0 ? getCurrentPath() : argsWithoutFlags[0]
  const resolvedPath = resolvePath(path)

  if (!(resolvedPath in fs)) {
    print(formatAccessError('ls', resolvedPath))
    return
  }

  if (!isDirectory(resolvedPath)) {
    print(fs[resolvedPath].name)
    return
  }

  const items = !listAll
    ? fs[resolvedPath].entries
    : [{ name: '.' }, { name: '..' }, ...fs[resolvedPath].entries ]

  if (tableView) {
    print(`${items.length} total`)
    print(formatFolder(items))
    return
  }
  print(
    items
      .map(formatDirItem)
      .join('')
  )
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

  const isUrlFile = fs[resolvedPath].type === 'url'

  start()
  fetch(new URL(resolvedPath, location.origin))
    .then(response => response.text())
    .then(text => {
      if (isUrlFile) {
        const [details, url] = text.split('\n')
        print(details)
        print(`<a href="${url}" class="ls-url" target="_blank">${url}</a>`)
        return
      }
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

const formatUptime = (now) => {
  const diff = now - startDate
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const timeUnits = [
    { unit: 'day', value: days },
    { unit: 'hour', value: hours % 24 },
    { unit: 'minute', value: minutes % 60 },
    { unit: 'second', value: seconds % 60 }
  ]

  return timeUnits
    .filter(unit => unit.value > 0)
    .map(unit => `${unit.value} ${unit.unit}${unit.value > 1 ? 's' : ''}`)
    .join(', ')
}

export const uptime = ({ print }) => {
  const timeFormat = new Intl.DateTimeFormat(
    'en-en',
    {
      hour: 'numeric', minute: 'numeric',
      second: 'numeric',
      hour12: false
    }
  )

  const now = new Date()
  print(`${timeFormat.format(new Date())} up ${formatUptime(now)}, 1 user, load average: 0.00, 0.00, 0.00`)
}
