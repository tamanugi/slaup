const SLACK_API_URL = 'https://slack.com/api'
const request = require('request');
const fs = require('fs')

const Log = require('./log')

const objectMergeWithoutUndefined = (target, ...sources) => 
  Object.assign(target, ...sources.map(x =>
    Object.entries(x)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => (obj[key] = value, obj), {})
  ))

const fileupload = (path, token, channels, options) => {
  
  // build channens parameter
  let _channels = channels 
                    .split(',')
                    .map(v => v.startsWith('#')?v:`#${v}`)

  // send data
  let formData = {
    token: token,
    file: fs.createReadStream(path),
    channels: _channels
  }

  // options merge
  let mergedFormData = objectMergeWithoutUndefined({}, formData, options)

  request.post({url: `${SLACK_API_URL}/files.upload`, formData: mergedFormData}, (err, res, body) => {
    if(err){
      Log.error(err)
      return
    }

    let json = JSON.parse(body)
    if(json.ok){
      Log.success('✨ Uploaded') 
    }else{
      Log.error(json.error)
    }
  })
}

module.exports.fileupload = fileupload;