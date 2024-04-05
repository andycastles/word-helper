import { describe, expect, test } from 'vitest';
import { execSync } from 'child_process';

describe('wordle utility', () => {
    test('generates error and help without params', () => {
        try {
            const output = execSync('node index.mjs').toString().trim();
            expect(output).toMatchSnapshot();
        } catch (error) {
            expect(error.message).toMatchSnapshot();
        }
    });
    test('correct output with first letter specified', () => {
        try {
            const output = execSync(
                'node index.mjs -1 abcdefghijklmnopqrstuvwxy'
            )
                .toString()
                .trim();
            expect(output).toMatchSnapshot();
        } catch (error) {
            expect(error.message).toMatchSnapshot();
        }
    });
    test('correct output with all letters specified', () => {
        try {
            const output = execSync('node index.mjs shite').toString().trim();
            expect(output).toMatchSnapshot();
        } catch (error) {
            expect(error.message).toMatchSnapshot();
        }
    });
});
