const SLACK_API_URL = 'https://slack.com/api'
const request = require('request');
const fs = require('fs')
const path = require('path')

const Log = require('./log')

const objectMergeWithoutUndefined = (target, ...sources) => 
  Object.assign(target, ...sources.map(x =>
    Object.entries(x)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => (obj[key] = value, obj), {})
  ))

const fileupload = (filepath, token, channels, options, callback) => {

  // file path resolve
  if(!path.isAbsolute(filepath)){
    filepath = path.resolve(process.cwd(), filepath)
  }
  
  // build channens parameter
  let _channels = channels 
                    .split(',')
                    .map(v => v.startsWith('#')?v:`#${v}`)

  // send data
  let formData = {
    token: token,
    file: fs.createReadStream(filepath),
    channels: _channels
  }

  // options merge
  let mergedFormData = objectMergeWithoutUndefined({}, formData, options)

  request.post({url: `${SLACK_API_URL}/files.upload`, formData: mergedFormData}, (err, res, body) => {
    callback(err, body)
  })
}

module.exports.fileupload = fileupload;