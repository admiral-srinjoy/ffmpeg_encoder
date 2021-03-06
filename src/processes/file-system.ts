
/* MODULE FOR FS MANAGEMENT */

import promisify = require('promisify-node')
import * as path from 'path'
import * as config from '../config/config'
import * as status from '../control/status'
import { Stats } from 'fs'
import { WorkflowOptions } from '../control/workflow'
import { log, LogLevels } from './logger'
const fs = promisify('fs')
const rimraf = promisify('rimraf')

// Create all directories needed for workflow
export async function createDirs(options: WorkflowOptions) {
    status.updateStatusObject(options.statusURI, 'Creating Directories...')
    options.outputDirectory = path.join(__dirname, ('../../' + options.outputDir + options.timestamp))

    // Make parent directory for workflow
    await makeDirectory(options.outputDirectory)

    options.outputDirs = []
    if (typeof options.bitrates === 'string') options.bitrates = [options.bitrates]
    options.bitrates.forEach(async bitrate => {
        const directory = `${options.outputDirectory}/${bitrate}`
        options.outputDirs.push(directory)

        await makeDirectory(directory)
    })

    return options
}

// Cleanup local media directory
export async function cleanup(options) {
    status.updateStatusObject(options.statusURI, 'Finishing up...')

    // Array of files to clean, there's probably a better way to dynamically cleanup than this
    const cleanupArray = [path.join(__dirname, '../../' + options.inputURI), options.outputDirectory]

    cleanupArray.forEach(async directory => {
        await rimraf(directory)
        log(LogLevels.info, `cleaned up: ${directory}`)
    })
    return options
}

// Creates a directory if it doesn't exist
async function makeDirectory(directory) {
    if (!(fs.existsSync(directory))) {
        await fs.mkdir(directory)
    }
    return
}