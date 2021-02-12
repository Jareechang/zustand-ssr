const path = require('path')
const fs = require('fs')

// Relative file path
const filePath = process.env.FILE_PATH
const workingDir = process.cwd()

function waitUntilFileExists(
    // Interval of the file check
    interval
) {
    const file = path.join(__dirname, filePath)
    const fileExists = fs.existsSync(file)
    const timeout = setInterval(function() {
        const file = path.join(workingDir, filePath)
        const fileExists = fs.existsSync(file)
        if (fileExists) {
            clearInterval(timeout)
        }
    }, interval)
};

waitUntilFileExists(1000)
