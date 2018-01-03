"use strict";
// Identity function is not a generic function.
// It will return the type that is passed into the function.
function identity(arg) {
    return arg;
}
// identity function with type "any".
// If we pass an argument of type number we don't know what information it has, instead that the return value has any type.
function identity2(arg) {
    return arg;
}
// Let's denote what the function should return.
// T will be a type variable
function identity3(arg) {
    return arg;
}
let output = identity3("myString"); // type of output will be 'string'
let output2 = identity3(3); // type of output2 will be number
// Generic Type Variables
// Array length error:
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Error: T doesn't have .length
//     return arg;
// }
// Array with length without error
function identity4(arg) {
    console.log(arg.length);
    return arg;
}
// Generic Types
function identity5(arg) {
    return arg;
}
let myIdentity = identity5;
// different Type Parameter can be used
let myIdentity2 = identity5;
// A call signature of an object literal type:
let myIdentity3 = identity5;
function identity6(arg) {
    return arg;
}
let myIdentity4 = identity6;
function identity7(arg) {
    return arg;
}
// When using the interface, we need to specify a corresponding type argument
let myIdentity5 = identity7;
// Generic classes
class GenericNumber {
}
let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
// Nothing is restricting the class to only use number, but also string, etc.
let stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };
alert(stringNumeric.add(stringNumeric.zeroValue, "test"));
function loggingIdentity(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
// loggingIdentity(3);  // Error, number doesn't have a .length propert
//	Argument of type '3' is not assignable to parameter of type 'Lengthwise'.
// pass all required properties
loggingIdentity({ length: 10, value: 3 });
// Using Type Parameters in Generic Constraints
function getProperty(obj, key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
// Using Class Types in Generics
function create(c) {
    return new c();
}
// Prototype property to infer and contrain relationships bewteen constructor and function and instance side of class Types
class BeeKeeper {
}
class ZooKeeper {
}
class Animal {
}
class Bee extends Animal {
}
class Lion extends Animal {
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag; // typechecks!
createInstance(Bee).keeper.hasMask; // typechecks!
