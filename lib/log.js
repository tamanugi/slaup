const chalk = require('chalk')

exports.error = message => console.log(`${chalk.bgRed('Error')} ${chalk.red(message)}`)
exports.success = message => console.log(`${chalk.bgGreen('Success')} ${chalk.green(message)}`)
exports.info = message => console.log(message)