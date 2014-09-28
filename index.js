#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .usage('[command] <options>')
  .command('generate-sql-script [name-for-script]')
  .alias('g-sql')
  .description('generate a SQL migration file in the correct format')
  .action(function (name) {

    type =  'migration';

    generate = require("./src/generate");
    generate.exec(type,name);

  });


program.parse(process.argv);
if (!program.args.length) program.help();