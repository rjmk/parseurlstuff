why

why parse a url?

The primary method of communication between clients and web servers as you know is the HTTP protocol. Whenever you go to a website your browser makes a request to a web server somewhere and this request is sent via HTTP. You make this request by typing in the URL of the web page that you wish to view into your browser, your browser then makes the request using the URL that you typed to the server that holds the web pages.

Your browser sends a request object that includes the URL, and the URL part of the request object contains a host of properties that can be used by the server which receives the request. Typically when the URL is parsed it will include properties like:
url.auth : It provides us with the authorization portion of the URL.

This property contains any authorization data that the client might have sent. If no authorization then this field will be null.

url.href : It gives us the full URL.

url.hash : It gives us the fragment that is present in the URL.

url.host : It provides us the full hostname and port of the URL.

url.hostname : It gives us full name of the host in the URL.

url.path : It gives us the pathname.

url.pathname : It gives us pathname, hostname and port of the URL.

url.port : It gives us the port specified in the URL.

url.protocol : It gives us the protocol of the Request.

url.search : It gives us the query string of the URL.

Memoization

Without the 'r' in memorization, what is memoization? Here's an answer from wikipedia: "In computing, memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again."

why memoize?

As far as our parseurl library is concerned it means that it will not parse a URL more than once if it doesn't need to, so for example if a URL comes in such as: 'http://localhost:8080/test1/test2?query=value' parseurl will first check to see if the URL has been parsed already (by calling a function called fresh()) and if it has it will just return the cached parsed version of the URL, which has been stored on the request object as a property, to the function and saves the need to compute another parse execution. This is very efficient and can help your app on the server to run faster if you are computing multiple functions on the same request. This is important, because a server will typically deal with hundreds of different URLs over the course of session with a client and with each URL it computes multiple functions and eah function will need the enire request object.
