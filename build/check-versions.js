'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    // exact 운영 버전(6.0.0 / 3.0.0)과 다르면 경고
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' (운영 환경: ' +
        chalk.green(mod.versionRequirement) + ')'
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('운영 환경과 버전이 다릅니다. 가능하면 아래 버전을 사용하세요:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      console.log('  ' + warnings[i])
    }
    console.log()
  }
}
