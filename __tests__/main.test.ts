/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('valid version json', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'MAJOR'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update major 1', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'MAJOR'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update major 2', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'Major'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update major 3', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'major'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update minor 1', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'MINOR'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update minor 2', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'Minor'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update minor 3', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'minor'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update patch 1', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'PATCH'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update patch 2', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'Patch'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update patch 3', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'patch'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update build 1', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'BUILD'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update build 2', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'Build'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('valid version json; update build 3', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'build'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })

  it('invalid update type', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'invalid'
        case 'version-json':
          return '{"major":31,"minor":1,"patch":0,"build":457,"revision":0,"versionSuffix":"alpha"}'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Invalid update type specified. Valid options: MAJOR, MINOR or PATCH.'
    )
  })

  it('invalid version json', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'release-type':
          return 'MAJOR'
        case 'version-json':
          return 'this is not valid version json'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(1, 'Invalid version json')
  })
})
