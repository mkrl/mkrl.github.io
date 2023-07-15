import fs from './fs.json'
import { cond, startsWith, stubTrue } from 'lodash/fp'

let currentPath = '/'


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


export const buildCommands = () => {
  console.log(fs.entries)
}