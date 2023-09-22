import * as core from '@actions/core'

enum VersionUpdateType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  PATCH = 'PATCH'
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // TypeScript doest not have anyting like ENUM.TryParse and does not throw an
    // error when trying to cast a string to the enum.
    // Per https://thoughtbot.com/blog/the-trouble-with-typescript-enums, what's implemented below
    // seems to be the best workaround
    const updateType: VersionUpdateType | undefined = Object.values(
      VersionUpdateType
    ).find(x => x === core.getInput('INPUT_UPDATE_TYPE'))

    if (updateType === undefined) {
      throw new Error('Update type is undefined')
    }

    processVersionJson(updateType)
  } catch (error) {
    console.log(error)

    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(
        'Invalid update type specified. Valid options: MAJOR, MINOR or PATCH.'
      )
    }
  }
}

async function processVersionJson(
  updateType: VersionUpdateType
): Promise<void> {
  interface Version {
    major: number
    minor: number
    patch: number
    build: number
    revision: number
    suffix: string
  }

  try {
    const version: Version = JSON.parse(core.getInput('INPUT_VERSION_JSON'))

    // NOTE: for Trading Toolbox, patch and reversion are the same.
    switch (updateType) {
      case VersionUpdateType.MAJOR: {
        // Increment major version component is unchanged.
        // Reset minor, patch/revision to 0.

        version.major++
        version.minor = 0
        version.patch = version.revision = 0

        break
      }
      case VersionUpdateType.MINOR: {
        // Major version component is unchanged.
        // Increment minor version component.
        // Reset patch/revision to 0.

        version.minor++
        version.patch = version.revision = 0

        break
      }
      case VersionUpdateType.PATCH: {
        // Major version component is unchanged.
        // Minor version component is unchanged.
        // Incremment patch/revision.

        version.patch = version.revision++
        break
      }
    }

    // Build version component always increments.
    version.build++

    // Set outputs for other workflow steps to use
    core.setOutput('major', version.major)
    core.setOutput('minor', version.minor)
    core.setOutput('patch', version.patch)
    core.setOutput('build', version.build)
    core.setOutput('revision', version.revision)
    core.setOutput('suffix', version.suffix)

    const versionString = `${version.major}.${version.minor}.${version.build}.${version.revision}`

    core.setOutput('version', versionString)
    core.setOutput('tag', `v${versionString}`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed('Invalid version json')
    }
  }
}
