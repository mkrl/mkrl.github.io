import { constants } from 'fs'
import {
  lstat,
  readdir,
  writeFile,
  readFile,
  access
} from 'fs/promises'
import path from 'path'

const OUTPUT_FILE = './source/fs.json'
const FS_DIR = 'source/fs/'

async function exists(file) {
  try {
    await access(file, constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

async function getFileContents(file, extension) {
  const data = await readFile(file, 'utf-8')
  if (extension !== 'url') {
    return {
      data
    }
  }
  const [description, url] = data.split('\n')
  return {
    url,
    description,
  }
}

async function walkDirectory(dir) {
  const objMap = {}
  const traverse = async (entry) => {
    if (!(await exists(entry))) {
      return {}
    }

    const stats = await lstat(entry)
    const absolutePath = path.basename(entry) === 'fs' ? '/' : `/${entry.slice(FS_DIR.length)}`

    if (!stats.isDirectory()) {
      const extension = path.extname(entry).slice(1)
      const name = extension === 'url'
        ? path.basename(entry).slice(0, -4)
        : path.basename(entry)
      const sanitizedPath = extension === 'url'
        ? absolutePath.slice(0, -4)
        : absolutePath
      const contents = await getFileContents(entry, extension)
      objMap[sanitizedPath] = {
        name,
        type: extension,
        ...contents,
      }
      return {
        name,
        type: extension,
        ...contents,
      }
    }

    const files = await readdir(entry)
    const childEntries = await Promise.all(
      files.map((child) => traverse(path.join(entry, child)))
    )
    const hasReadme = childEntries.some((file) => file.name === 'README.txt')
    const readmeFile = hasReadme && await readFile(path.join(entry, 'README.txt'), 'utf-8')

    objMap[absolutePath] = {
      name: path.basename(entry),
      type: 'dir',
      description: readmeFile,
      entries: childEntries
    }
    return {
      name: path.basename(entry),
      type: 'dir',
      description: readmeFile,
      path: absolutePath,
    }
  }

  await traverse(dir)
  return objMap
}

(async () => {
  try {
    await writeFile(
      OUTPUT_FILE,
      JSON.stringify(
        await walkDirectory(FS_DIR),
        null,
        2
      )
    )
    console.log(`Wrote to ${OUTPUT_FILE}`)
  } catch (eh) {
    console.error('Stuff went wrong: ', eh)
  } finally {
    console.log('Stuff is done')
  }
})()
