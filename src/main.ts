import { getInput, setFailed, setOutput } from '@actions/core'

interface Version {
  major: number
  minor: number
  patch: number
  build: number
  revision: number
  suffix: string
}

enum VersionReleaseType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  PATCH = 'PATCH',
  BUILD = 'BUILD'
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const inputReleaseType: string = getInput('release-type')

    // TypeScript doest not have anyting like ENUM.TryParse and does not throw an
    // error when trying to cast a string to the enum. Created stringToEnum as a workaround
    // to convert a string to an enum. If fails, returns a null.
    const releaseType: VersionReleaseType | null =
      stringToEnum(inputReleaseType)

    if (releaseType === null) {
      throw new Error('Update type is undefined')
    }

    try {
      const inputVersionJson: string = getInput('version-json')
      const version: Version = JSON.parse(inputVersionJson)

      // If releaseType is BUILD then major, minor, patch and revision components will NOT be updated and ONLY
      // the build version component will be updated as it's always incremented.

      // NOTE: for Trading Toolbox, patch and reversion are the same.
      switch (releaseType) {
        case VersionReleaseType.MAJOR: {
          // Increment major version component is unchanged.
          // Reset minor, patch/revision to 0.

          version.major++
          version.minor = 0
          version.patch = version.revision = 0

          break
        }
        case VersionReleaseType.MINOR: {
          // Major version component is unchanged.
          // Increment minor version component.
          // Reset patch/revision to 0.

          version.minor++
          version.patch = version.revision = 0

          break
        }
        case VersionReleaseType.PATCH: {
          // Major version component is unchanged.
          // Minor version component is unchanged.
          // Incremment patch/revision.

          // NOTE: for Trading Toolbox, patch and reversion are the same.
          version.patch++
          version.revision = version.patch
          break
        }
      }

      // Build version component always increments.
      version.build++

      // Set outputs for other workflow steps to use
      setOutput('major', version.major)
      setOutput('minor', version.minor)
      setOutput('patch', version.patch)
      setOutput('build', version.build)
      setOutput('revision', version.revision)
      setOutput('suffix', version.suffix)

      const versionString = `${version.major}.${version.minor}.${version.build}.${version.revision}`

      setOutput('version', versionString)
      setOutput('tag', `v${versionString}`)
    } catch (error) {
      // Fail the workflow run if an error occurs
      if (error instanceof Error) {
        setFailed('Invalid version json')
      }
    }
  } catch (error) {
    console.log(error)

    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      setFailed(
        'Invalid update type specified. Valid options: MAJOR, MINOR or PATCH.'
      )
    }
  }
}

function stringToEnum(value: string): VersionReleaseType | null {
  const uc: string = value.toUpperCase()
  if (Object.values(VersionReleaseType).findIndex(x => x === uc) >= 0) {
    return uc as VersionReleaseType
  }
  return null
}
