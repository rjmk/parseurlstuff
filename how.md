### Building up parseurl from url.parse

`url` is a standard node module. It's a pretty small library, with only 3 methods in the documentation. The one we need to know about for this is `url.parse`. This takes a url as a string (e.g. `'http://www.google.com'` or `'/find/word'`) and returns a javascript object.

The object it returns will have various properties that summarise the features of the url string. For example, `url.parse('http://www.google.com')` would return:
```javascript
{
  host: "www.google.com",
  hostname: "www.google.com",
  href: "http://www.google.com",
  path: "/",
  pathname: "/",
  protocol: "http:",
  slashes: true
}
```

Which is pretty simple and maybe not that useful. The only thing that may need explaining is the `slashes` property, that is `true` if the protocol requires double slashes after it (as in `http://`) and false otherwise.

Let's look at the output of a more complicated example:

`url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash')`

```javascript
{
  auth: "user:pass",
  hash: "#hash",
  host: "host.com:8080",
  hostname: "host.com",
  href: "http://user:pass@host.com:8080/p/a/t/h?query=string#hash",
  path: "/p/a/t/h?query=string",
  pathname: "/p/a/t/h",
  port: "8080",
  protocol: "http:",
  query: "query=string",
  search: "?query=string",
  slashes: true
}
```

***You do not need to understand what all the properties of this object are***. All you need to take away is that it makes it simple for you to get the information you're interested in from the URL.

So we can start writing our module as:

```javascript
var url = require('url');

module.exports = parse;

function parse(req){
  return url.parse(req.url);
}
```
