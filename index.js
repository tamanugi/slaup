#!/usr/bin/env node

const version = require('./package.json').version;
const prog = require('caporal');

const SlackApi = require('./lib/slackapi')
const Log = require('./lib/log')
const ora = require('ora')

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

    let token = options.t?options.t:process.env.SLAUP_SLACK_TOKEN
    let channels = options.c?options.c:process.env.SLAUP_CHANNELS

    // validation
    if(!token) {
      Log.error('Token empty. Please input -t <token> or set enviroment $SLAUP_SLACK_TOKEN')
      return
    }
    if(!channels){
      Log.error('Channels empty. Please input -c <channels> or set enviroment $SLAUP_CHANNELS')
      return
    } 

    const spinner = ora('Uploading...')
    spinner.start()

    let apiOptions = {
      filename: options.f,
      initial_comment: options.m,
    }

    // exceution time measure start
    let start = new Date();
    SlackApi.fileupload(args.filepath, token, channels, apiOptions, (err, body) => { 
      spinner.stop()
      // exceution time measure end
      let end = new Date() - start

      if(err){
        Log.error(err)
        return
      }

      let json = JSON.parse(body)
      if(json.ok){
        Log.success(`✨ Uploaded in ${end}ms`) 
      }else{
        Log.error(json.error)
      }
    })

  });

prog.parse(process.argv);
