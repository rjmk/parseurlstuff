var url = require('url');

module.exports = parse;

function parse(req){
  return url.parse(req.url);
}
