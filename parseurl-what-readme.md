##What


* Parseurl is a dependency of Express, so it requires a lot of modules from Express. It has two main functions within it:

 * Parseurl(req) parses the URL for a request object (the url property (.url) of the HTTP request (req)) and caches that result. If that `req.url` does not change, the function will then return the cached parsed object, instead of parsing the object again.

 * Parseurl.original(req) parses the original URL of the request object (`req.originalUrl`) passed to it, and then acts the same as above. This allows you to rewrite `req.url` internally (which Express sometimes does with some of its methods) and still be able to use parseurl.
