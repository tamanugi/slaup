Slaup
-----------------

Simple CLI tool for upload file to Slack.

# Install

```
$ npm install -g slaup
```

# File Upload to Slack
Please generate slack token from [hear](https://api.slack.com/custom-integrations/legacy-tokens)

```
$ slaup -t <token> -c general,hoge /path/to/file.txt 
```

Or if set enviroment variable `$SLAUP_SLACK_TOKEN` `$SLAUP_CHANNELS`

```
$ export SLAUP_SLACK_TOKE=<token>
$ export SLAUP_CHANNELS=general,hoge
$ slaup /path/to/file.txt
```

You can add options, `filename` `filetype` `initail comment`

```
$ slaup -f sample.js -k javascript -m "sample js file" /path/to/test.js
```

# Usage
```
$ slaup -h

   slaup 1.0.0
     
   USAGE

     slaup <filepath>

   ARGUMENTS

     <filepath>      Path to upload file      required      

   OPTIONS

     -t <token>         Slack API Token                            optional      
     -c <channels>      Comma-separated list of channel names      optional      
     -f <filename>      Filename of file                           optional      
     -m <comment>       Initial comment to add to file             optional      
     -k <filetype>      A file type identifier                     optional      

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    

````
