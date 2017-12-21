const version = require('./package.json').version;
const prog = require('caporal');

const SlackApi = require('./lib/slackapi')

// version
prog
  .version(version)
  
// action
prog
  // .command('create', 'Create a new application')
  .argument('<filepath>', 'Path to upload-file')
  .option('-t <token>', 'slack token')
  .option('-c <channels>', 'channel name for upload file')
  .option('-f <filename>', 'channel name for upload file')
  .option('-m <comment>', 'channel name for upload file')
  .action((args, options, logger) => {
    console.log({
      args: args,
      options: options
    });

    let apiOptions = {
      filename: options.f,
      initial_comment: options.m,
    }

    SlackApi.fileupload(args.filepath, options.t, options.c, options)
  });

prog.parse(process.argv);
