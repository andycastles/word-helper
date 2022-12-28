import getopts from 'getopts'

const letters = [
	'A', 'E', 'I', 'O', 'U',
	'B', 'C', 'D', 'F', 'G', 'H', 'J',
	'K', 'L', 'M', 'N', 'P', 'Q', 'R',
	'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
];
const supportedOptions = {
    alias: {
        help: ['h'],
        skip: ['s'],
        require: ['r']
    },
    help: {
        help: 'Show this help',
        skip: 'Letters which cannot be used',
        require: 'Letters which must be used'
    }
}

function replaceGap(template, replacements) {
	if (template.indexOf('.') < 0) {
		if (require.every(letter => template.indexOf(letter) >= 0)) {
			line += template + ' '
		} else {
		}
		return
	}
	for(let letter of letters) {
		if (skip.indexOf(letter) < 0) {
			replaceGap(template.replace('.', letter), replacements + 1)
			if (replacements === 0) {
				if (line) console.log(line)
				line = ''
			}
		}
	}
}

function help() {
    console.log(`Synax: node index.mjs [TEMPLATE] [OPTIONS]

  In TEMPLATE specify letters in their position or '.' for unknown letter.

  OPTIONS:
  -h --help     Show this help
  -s --skip     Letters which cannot be used
  -r --require  Letters which must be used
`);
}

function invalidArgs(options,supportedOptions) {
    let validArgs = Object.keys(supportedOptions.alias)
    Object.keys(supportedOptions.alias).forEach(key => {
        validArgs = [...validArgs, ...supportedOptions.alias[key]]
    })
    const invalid = []
    Object.keys(options).forEach(key => {
        if(key !== '_' && !validArgs.find(arg => arg === key)) invalid.push(key)
    })
    return invalid
}

// Parse command line options
const options = getopts(process.argv.slice(2), supportedOptions)

const invalidSwitches = invalidArgs(options, supportedOptions)

let template, require, skip, line

if (options.help) {
    help()
} else if (options._.length !== 1) {
    console.log(`No template was supplied.`);
    help();
    process.exit(1);
} else if (invalidSwitches.length) {
    console.log(`The following options are not supported:
    ${invalidSwitches.join('\n    ')}
`)
    help();
} else {
    template = options._[0].toUpperCase()
    require = (options.require || '').toUpperCase().split('')
    skip = (options.skip || '').toUpperCase().split('')

    console.log('Template: ', template)
    console.log('Require:  ',require.join(' ') || '(no required letters)')
    console.log('Skip:     ', skip.join(' ') || '(no skipped letters)')

    line = ''

    console.log('\nPossible words:')
    replaceGap(template, 0)
}


