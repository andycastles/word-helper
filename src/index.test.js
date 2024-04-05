import { describe, expect, test } from 'vitest';
import { execSync } from 'child_process';

describe('wordle utility', () => {
    test('generates error and help without params', () => {
        try {
            const output = execSync('node index.mjs', { stdio: 'pipe' }).toString().trim();
            expect(output).toMatchSnapshot();
        } catch (error) {
            expect(error.message).toMatchSnapshot();
        }
    });
    test('correct output with first letter specified', () => {
        try {
            const output = execSync(
                'node index.mjs __xxx -1 bcdefghijklmnopqrstuvwxyz', { stdio: 'pipe', maxBuffer: 1024 * 1024 }
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
            const output = execSync('node index.mjs great', { stdio: 'pipe' }).toString().trim();
            expect(output).toMatchSnapshot();
        } catch (error) {
            expect(error.message).toMatchSnapshot();
        }
    });
});
