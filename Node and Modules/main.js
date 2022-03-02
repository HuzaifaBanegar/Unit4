let a= 10, b=5
console.log(`Numbers are: ${a} and ${b}`)
const add= require("./add.js");
const sub= require("./sub");
const div= require("./div");
const mult= require("./mult")
console.log(`Their Addition is: ${add(a,b)}`);
console.log(`Their Subtraction is: ${sub(a,b)}`);
console.log(`Their Division is: ${div(a,b)}`);
console.log(`Their Multiplication is: ${mult(a,b)}`);
