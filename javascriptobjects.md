##Passing Objects by reference

If you pass an object as a parameter to a function and the function
changes the object's properties, the change is visible outside the function

 ```js
    function myFunc(theObject) {
      theObject.name = "ScoobyDoo";
    }

    var myPet = {type: "Dog", name: "Snowy", age: 12};
    var x, y;

    x = myPet.name; // x gets the value "Snowy"

    myFunc(myPet);
    y = myPet.name; // y gets the value "ScoobyDoo"
                    // (the make property was changed by the function)
```

When myFunc is called with a parameter, the function receives a pointer that references the original object.
 e.g. when ```myFunc(myPet)``` is called, the function parameter ```'theObject'``` now points to ```'myPet'```.

So this allows the name property of the ```'myPet'``` object to be changed and this change is accessible outside the function.

However, when ```myFunc``` is changed to assign ```'theObject'``` parameter to a new object e.g ```theObject = {type: "Cat", name: "Cat", age: 5};```, the object referenced by ```myPet``` will not be changed. This is because the object that the ```myObject``` parameter points to is being changed rather than the value of one of the ```myPet``` object's properties i.e ```myFunc```'s parameter ```'theObject'``` now points
to a completely different object and not the object that ```myPet``` points to.

```js
  function myFunc(theObject) {
    theObject = {type: "Cat", name: "Cat", age: 5};
  }

  var myPet = {type: "Dog", name: "Snowy", age: 12};
  var x, y;

  x = myPet.name; // x gets the value "Snowy"

  myFunc(myPet);
  y = myPet.name; // y still gets the value "Snowy"
```

####Passing by Value

As an aside, all variables that are not objects are passed by value to functions - so inside the function a local copy of the variable is created and assigned to the function parameter. This variable is modified so the change is not visible outside the function and doesn't modify the variable the function was called with.

```js
function test(a) {
  a = 4;
});

var b = 2;
console.log(b); //b = 4;
test(b);
console.log(b);// b should still equal 4

```


##Functions are objects
####(and you can store functions on them as methods)

Javascript functions are just a special type of object that can do all the things that regular objects can do.
Methods are defined the way normal functions are defined,
except that they have to be assigned as the property of an object which in this case is
the function .

```js
  function myFunc() {
      console.log('myFunc');
  }

  myFunc.func2 = function() {
      console.log("func2");
  }

  //call the functions

  myFunc();

  myFunc.func2()

```
