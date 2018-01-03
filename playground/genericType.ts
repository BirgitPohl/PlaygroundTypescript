// Identity function is not a generic function.
// It will return the type that is passed into the function.
function identity(arg: number): number {
    return arg;
}

// identity function with type "any".
// If we pass an argument of type number we don't know what information it has, instead that the return value has any type.
function identity2(arg: any): any {
    return arg;
}

// Let's denote what the function should return.
// T will be a type variable
function identity3<T>(arg: T): T {
    return arg;
}
let output = identity3<string>("myString");  // type of output will be 'string'
let output2 = identity3<number>(3); // type of output2 will be number


// Generic Type Variables

// Array length error:
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Error: T doesn't have .length
//     return arg;
// }

// Array with length without error
function identity4<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// Generic Types
function identity5<T>(arg: T): T {
    return arg;
}
let myIdentity: <T>(arg: T) => T = identity5;
// different Type Parameter can be used
let myIdentity2: <U>(arg: U) => U = identity5;
// A call signature of an object literal type:
let myIdentity3: {<T>(arg: T): T} = identity5;

// Generic Interface
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity6<T>(arg: T): T {
    return arg;
}

let myIdentity4: GenericIdentityFn = identity6;

// Making the type Parameter visible to all other members of the interface:
// A non-generic function signature is part of a generic type.
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

function identity7<T>(arg: T): T {
    return arg;
}
// When using the interface, we need to specify a corresponding type argument
let myIdentity5: GenericIdentityFn2<number> = identity7;

// Generic classes

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
// Nothing is restricting the class to only use number, but also string, etc.

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

alert(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Generic Contrains
// Take a look at Generic Type Variables -> commented function
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
// loggingIdentity(3);  // Error, number doesn't have a .length propert
//	Argument of type '3' is not assignable to parameter of type 'Lengthwise'.

// pass all required properties
loggingIdentity({length: 10, value: 3});


// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// Using Class Types in Generics

function create<T>(c: {new(): T; }): T {
    return new c();
}


// Prototype property to infer and contrain relationships bewteen constructor and function and instance side of class Types
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
