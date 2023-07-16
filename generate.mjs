import { constants } from 'fs'
import {
  lstat,
  readdir,
  writeFile,
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

async function walkDirectory(dir) {
  const objMap = {}
  const traverse = async (entry) => {
    if (!(await exists(entry))) {
      return {}
    }

    const stats = await lstat(entry)
    const absolutePath = path.basename(entry) === 'fs' ? '/' : `/${entry.slice(FS_DIR.length)}`

    if (!stats.isDirectory()) {
      objMap[absolutePath] = {
        name: path.basename(entry),
        type: path.extname(entry).slice(1)
      }
      return {
        name: path.basename(entry),
        type: path.extname(entry).slice(1)
      }
    }

    const files = await readdir(entry)
    const childEntries = await Promise.all(
      files.map((child) => traverse(path.join(entry, child)))
    )

    objMap[absolutePath] = {
      name: path.basename(entry),
      type: 'dir',
      entries: childEntries
    }
    return {
      name: path.basename(entry),
      type: 'dir',
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
