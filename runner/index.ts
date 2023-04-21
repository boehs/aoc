#!/usr/bin/env bun
import yargs from 'yargs'
import { day } from './lib/dayRunner'
import all from './lib/all'

const now = new Date()

const y = await yargs(process.argv.slice(2))
    .scriptName('BAOCR')
    .command('* [year] [day]', 'Run a given AOC', (yargs) => yargs
        .positional('year', {
            type: 'number',
            default: now.getFullYear(),
        })
        .positional('day', {
            type: 'number',
            default: now.getDate(),
        })
        .option('long', {
            type: 'boolean',
            default: false,
            alias: 'l',
            description: 'marks day as long running. Only test against sample'
        })
        .option('test', {
            type: 'boolean',
            default: true,
            alias: 't',
        }),
        (yargs) => day(yargs.day, yargs.year, yargs.test, yargs.long)
    )
    .command('all [year]', 'run all the AOCs', (yargs) => yargs
        .positional('year', {
            type: 'number',
            default: now.getFullYear(),
        })
        .option('n', {
            description: 'Number of runs',
            type: 'number',
            default: 10
        }),
        (yargs) => all(yargs.year, yargs.n))
    .help()
    .argv