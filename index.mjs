import getopts from 'getopts'
import { wordlist } from './wordlist.mjs'

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const supportedOptions = {
    alias: {
        help: ['h'],
        skip: ['s'],
        require: ['r'],
        first: ['1'],
        second: ['2'],
        third: ['3'],
        fourth: ['4'],
        fifth: ['5'],
        count: ['c'],
        word: ['w']
    },
    boolean: ['w', 'h'],
    help: {
        help: 'Show this help',
        skip: 'Letters which cannot be used',
        require: 'Letters which must be used',
        first: 'Specify which letters cannot be in the 1st position',
        second: 'Specify which letters which cannot be in the 2nd position',
        third: 'Specify which letters which cannot be in the 3rd position',
        fourth: 'Specify which letters which cannot be in the 4th position',
        fifth: 'Specify which letters which cannot be in the 5th position',
        word: 'Only show combinations which are valid words',
        count: 'Show count of valid words'
    }
}

function isWord(word) {
    return wordlist.includes(word.toLowerCase())
}

function replaceGap(template, firstGo) {
    if (template.indexOf('_') < 0) {
        let t = template
        if (require.every(letter => {
            if (t.indexOf(letter) < 0) {
                return false
            } else {
                t = t.replace(letter,'')
                return true
            }
        })) {
            if (!word || isWord(template)) line += template + ' '
            if (isWord(template)) count++
        }

    if (firstGo) console.log(line)
        return
    }
    for(let letter of letters) {
        if (skip.indexOf(letter) < 0) {
            let position = template.indexOf('_')
            let skipPosition = []
            switch(position) {
                case 0: skipPosition = first; break;
                case 1: skipPosition = second; break;
                case 2: skipPosition = third; break;
                case 3: skipPosition = fourth; break;
                case 4: skipPosition = fifth; break;
            }
            if (skipPosition.indexOf(letter) < 0) {
                replaceGap(template.replace('_', letter))
                if (firstGo) {
                    if (line) console.log(line)
                    line = ''
                }
            }
        }
    }
}

function help() {
    console.log(`
  Usage: node index.mjs [options] <template>

  In <template> specify letters in their position or '_' for unknown letter.

  Options:
  -h, --help .............. Show this help
  -s, --skip <letters> .... Specify which letters cannot be used
  -r, --require <letters> . Specify which letters must be used
  -w, --word .............. Only show combinations which are valid words
  -c, --count ............. Show count of valid words
  -1, --first <letters> ... Specify which letters cannot be in the first position
  -2, --second <letters> .. Specify which letters cannot be in the second position
  -3, --third <letters> ... Specify which letters cannot be in the third position
  -4, --fourth <letters> .. Specify which letters cannot be in the fourth position
  -5, --fifth <letters> ... Specify which letters cannot be in the fifth position
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

let template, require, skip, line, word, showCount
let first, second, third, fourth, fifth
let count = 0

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
    first = (options.first || '').toUpperCase().split('')
    second = (options.second || '').toUpperCase().split('')
    third = (options.third || '').toUpperCase().split('')
    fourth = (options.fourth || '').toUpperCase().split('')
    fifth = (options.fifth || '').toUpperCase().split('')
    word = options.word || false
    showCount = options.count || false

    console.log('Template: ', template)
    console.log('Require:  ',require.join(' ') || '(no required letters)')
    console.log('Skip:     ', skip.join(' ') || '(no skipped letters)')
    if (first.length > 0) console.log('Cannot be in position 1:     ', first.join(' '))
    if (second.length > 0) console.log('Cannot be in position 2:     ', second.join(' '))
    if (third.length > 0) console.log('Cannot be in position 3:     ', third.join(' '))
    if (fourth.length > 0) console.log('Cannot be in position 4:     ', fourth.join(' '))
    if (fifth.length > 0) console.log('Cannot be in position 5:     ', fifth.join(' '))

    line = ''

    console.log('\nPossible words:')
    replaceGap(template, true)

    if(showCount) {
        console.log(`
${count} possible valid words.`)
    }
}


