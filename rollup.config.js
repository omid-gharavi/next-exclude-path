import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import PeerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
const preserveDirectivesPkg = require('rollup-plugin-preserve-directives');
const preserveDirectives = preserveDirectivesPkg.default ?? preserveDirectivesPkg;

const packageJson = require('./package.json')

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                dir: 'dist',
                format: 'cjs',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].cjs'
            },
            {
                dir: 'dist',
                format: 'esm',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].mjs'
            }
        ],
        plugins: [
            preserveDirectives(),
            PeerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            postcss(),
        ],
        external: ['react', 'react-dom', 'next/navigation'],
    },
    {
        input: 'src/index.ts',
        output: [{ file: packageJson.types }],
        plugins: [dts()],
        external: [/\.css/],
    },
]