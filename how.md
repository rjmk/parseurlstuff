### Building up parseurl from url.parse

`url` is a standard node module. It's a pretty small library, with only 3 methods in the documentation. The one we need to know about for this is `url.parse`. This takes a URL as a string (e.g. `'http://www.google.com'` or `'/find/word'`) and returns a javascript object.

The object it returns will have various properties that summarise the features of the URL string. For example, `url.parse('http://www.google.com')` would return:
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

What are the basic features we want to preserve from url.parse when we expand its functionality?

Well, we want it to be able to correctly parse a URL multiple times. And, if we manipulate the `url` property of the request, we want it to be able to correctly parse the *new* value.

In other, more 'test'-y words:

```javascript
  it('should parse multiple times', function () {
    var req = {url: '/foo/bar'}
    assert.equal(parseurl(req).pathname, '/foo/bar')
    assert.equal(parseurl(req).pathname, '/foo/bar')
    assert.equal(parseurl(req).pathname, '/foo/bar')
  })

  it('should reflect url changes', function () {
    var req = {url: '/foo/bar'}
    var url = parseurl(req)
    var val = Math.random()

    //store a token on the return value of url
    url._token = val
    assert.equal(url._token, val)
    assert.equal(url.pathname, '/foo/bar')

    req.url = '/bar/baz'
    // should return a *new* object even with caching
    url = parseurl(req)
    //check that a new object was returned without
    //the _token property
    assert.equal(url._token, undefined)
    assert.equal(parseurl(req).pathname, '/bar/baz')
  })
```

So we can start writing our module as:

```javascript
var url = require('url');

module.exports = parseurl;

function parseurl(req){
  return url.parse(req.url);
}
```

This will give us the parsed URL of a request! And if we call `parseurl` on the same request repeatedly, it will give us same object repeatedly if the URL hasn't changed. It will give us the new URL if it has changed. This is absolutely necessary for the parseurl function to be useful.

But what if we're passing the request around between different functions? Each function might need to reference features of the URL. Parsing the URL each time is OK, but we'd rather remember the parsing of each URL if we can. Here are some tests to reflect these requirements:

```javascript
it('should cache parsing', function () {
  var req = {url: '/foo/bar'}
  var url = parseurl(req)
  var val = Math.random()

  url._token = val
  //same as before ...
  assert.equal(url._token, val)
  assert.equal(url.pathname, '/foo/bar')

  url = parseurl(req)
  // but this time, it should return the SAME object
  // WITH the ._token property
  assert.equal(url._token, val)
  assert.equal(url.pathname, '/foo/bar')
})
```

How about something like the following in our parseurl function? *(Start at the bottom!)*

```javascript
//get result from previous parsing (undefined if we've not parsed it before)
var parsed = req._parsedUrl

if (parsed) {
  // Return cached URL parse
  return parsed
}

// Otherwise, parse the URL ...

parsed = url.parse(url)

// save it on the request object ('_' convention for our new properties(?))
return req._parsedUrl = parsed
```

This is awesome at caching! but our second test breaks! We can't change the url property of our request (something Express would apparently like to do ...) and reparse.

How are we going to fix our first test? Enter the confusingly named `fresh` function. `fresh` checks whether an object from a previous parsing already exists and if it does, whether it's still 'fresh'. In other words, it checks that it's **not** a fresh URL.

```javascript
function fresh(url, parsedUrl) {
  // we will return a boolean:
  // true if every line returns true
  // false if any return false
  //
  // line 1 checks that parsedUrl references
  // an object (and is therefore defined)
  return typeof parsedUrl === 'object'
    // making sure parsedUrl is not the falsy object
    && parsedUrl !== null
    // check that the variable hasn't changed
    && SOMEVARIABLE === url
}
```

Where should we store `SOMEVARIABLE`? Where should we set it?
