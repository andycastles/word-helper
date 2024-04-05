#!/usr/bin/env node

import { wordlist } from './wordlist.js';
import { Command } from 'commander';

const letters: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

let requiredLetters: string[];
let skip: string[];
let line: string;
let word: boolean;
let showCount: boolean;
let first: string[];
let second: string[];
let third: string[];
let fourth: string[];
let fifth: string[];
let count = 0;

function isWord(word: string): boolean {
    return wordlist.includes(word.toLowerCase());
}

function replaceGap(template: string, firstGo: boolean = false): void {
    if (template.indexOf('_') < 0) {
        let t = template;
        if (requiredLetters.every(letter => {
            if (t.indexOf(letter) < 0) {
                return false;
            } else {
                t = t.replace(letter, '');
                return true;
            }
        })) {
            if (!word || isWord(template)) line += template + ' ';
            if (isWord(template)) count++;
        }
        if (firstGo) console.log(line);
        return;
    }
    for (let letter of letters) {
        if (skip.indexOf(letter) < 0) {
            let position = template.indexOf('_');
            let skipPosition: string[] = [];
            switch (position) {
                case 0: skipPosition = first; break;
                case 1: skipPosition = second; break;
                case 2: skipPosition = third; break;
                case 3: skipPosition = fourth; break;
                case 4: skipPosition = fifth; break;
            }
            if (skipPosition.indexOf(letter) < 0) {
                replaceGap(template.replace('_', letter));
                if (firstGo) {
                    if (line) console.log(line);
                    line = '';
                }
            }
        }
    }
}

const program = new Command();
program
    .name('wordle')
    .description('Wordle helper utility')
    .argument('<template>', 'Specify letters in their position or \'_\' for unknown letter')
    .option('-s, --skip <letters>', 'Specify which letters cannot be used', '')
    .option('-r, --require <letters>', 'Specify which letters must be used', '')
    .option('-w, --word', 'Only show combinations which are valid words')
    .option('-c, --count', 'Show count of valid words')
    .option('-1, --first <letters>', 'Specify which letters cannot be in the first position', '')
    .option('-2, --second <letters>', 'Specify which letters cannot be in the second position', '')
    .option('-3, --third <letters>', 'Specify which letters cannot be in the third position', '')
    .option('-4, --fourth <letters>', 'Specify which letters cannot be in the fourth position', '')
    .option('-5, --fifth <letters>', 'Specify which letters cannot be in the fifth position', '')
    .showHelpAfterError()
    .action((template: string, options: any) => {
        template = template.toUpperCase();
        requiredLetters = (options.require || '').toUpperCase().split('');
        skip = (options.skip || '').toUpperCase().split('');
        first = (options.first || '').toUpperCase().split('');
        second = (options.second || '').toUpperCase().split('');
        third = (options.third || '').toUpperCase().split('');
        fourth = (options.fourth || '').toUpperCase().split('');
        fifth = (options.fifth || '').toUpperCase().split('');
        word = options.word;
        showCount = options.count;

        console.log('Template: ', template);
        console.log('Require:  ', requiredLetters.join(' ') || '(no required letters)');
        console.log('Skip:     ', skip.join(' ') || '(no skipped letters)');
        if (first.length > 0 || second.length > 0 || third.length > 0 || fourth.length > 0 || fifth.length > 0) {
            console.log('');
        }

        if (first.length > 0) console.log('Cannot be in position 1:     ', first.join(' '));
        if (second.length > 0) console.log('Cannot be in position 2:     ', second.join(' '));
        if (third.length > 0) console.log('Cannot be in position 3:     ', third.join(' '));
        if (fourth.length > 0) console.log('Cannot be in position 4:     ', fourth.join(' '));
        if (fifth.length > 0) console.log('Cannot be in position 5:     ', fifth.join(' '));

        console.log('\nPossible words:');

        line = '';
        replaceGap(template, true);
        if (showCount) {
            console.log(`${'\n'}${count} possible valid words.`);
        }
    })
    .parse();
