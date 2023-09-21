import * as core from '@actions/core'
import { wait } from './wait'

interface Version {
  major: number;
  minor: number;
  patch: number;
  build: number;
  revision: number;
  suffix: string;
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version: Version = core.getInput('version-json')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Parsing ${version_json} ...`)

    // Set outputs for other workflow steps to use
    core.setOutput('major', version.major)
    core.setOutput('minor', version.minor)
    core.setOutput('patch', version.patch)
    core.setOutput('build', version.build)
    core.setOutput('revision', version.revision)
    core.setOutput('suffix', version.suffix)
    
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
