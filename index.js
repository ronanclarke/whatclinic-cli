#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .usage('[command] <options>')
  .command('generate [type]')
  .alias('g')
  .description('generate files such as SQL migration file')
  .action(function (type, options) {
    var mode = options.setup_mode || "normal";
    type = type || 'migration';

    generate = require("./src/generate");
    generate.exec(type);

  });


program.parse(process.argv);
if (!program.args.length) program.help();