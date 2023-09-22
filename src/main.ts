import * as core from '@actions/core'

interface Version {
  major: number
  minor: number
  patch: number
  build: number
  revision: number
  suffix: string
}

enum UpdateType {
  MAJOR = 1,
  MINOR = 2,
  PATCH = 3
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const updateType: keyof typeof UpdateType = core.getInput('INPUT_UPDATE_TYPE');
    const version: Version = JSON.parse(core.getInput('INPUT_VERSION_JSON'))

    // NOTE: for Trading Toolbox, patch and reversion are the same.
    switch (updateType) {
      case: UpdateType.MAJOR: {
        // Increment major version component is unchanged. 
        // Reset minor, patch/revision to 0.
        
        version.major++;
        version.minor = 0
        version.patch = version.revision = 0;
        
        break;
      }
      case: UpdateType.MINOR: {
        // Major version component is unchanged. 
        // Increment minor version component.
        // Reset patch/revision to 0.
        
        version.minor++;
        version.patch = version.revision = 0;

        break;
      }
      case: UpdateType.PATCH: {
        // Major version component is unchanged. 
        // Minor version component is unchanged. 
        // Incremment patch/revision.
        
        version.patch = version.revision++;
        break;
      }
    }

    // Build version component always increments.
    version.build++;
    
    // Set outputs for other workflow steps to use
    core.setOutput('major', version.major)
    core.setOutput('minor', version.minor)
    core.setOutput('patch', version.patch)
    core.setOutput('build', version.build)
    core.setOutput('revision', version.revision)
    core.setOutput('suffix', version.suffix)

    const versionString: String = `${version.major}.${version.minor}.${version.build}.${version.revision}`;
    
    core.setOutput('version', versionString)
    core.setOutput('tag', `v${versionString}`)
    
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed('Invalid version json')
    }
  }
}
