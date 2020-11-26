require("./node_modules/fraction.js/fraction.js")
require("./node_modules/complex.js/complex.js")
var Polynomial = require("./node_modules/polynomial/polynomial.js")

var q = new Polynomial("2x^8+2x^7+2x^6+4x^5+4x^4+4x^3+3x^2+2x+2");
var w = new Polynomial("2");

// console.log(q.toString());
// console.log(w.toString());
// console.log(q.mul(w).toString());
// Polynomial.setField("Zp");
// console.log(q.lc(6).toString());
// console.log(q.lm(w).toString());
// console.log(q.monic(w).toString());
// console.log(q.gcd(w).toString());
// console.log(q.mod('2').toString());

// // Polynomial.setField("C")
// // console.log(Polynomial("4x+3i"));

// // Polynomial.trace = true;
// var q = new Polynomial("x^4+3x^3+2x^2+6x");
// var w = new Polynomial("2x");
//         // .div("x^4+3x^3+2x^2");
// console.log(q.toString());
// console.log(w.toString());
// console.log(q.mul(w).toString());
// // console.log(Polynomial.trace.map(x => x.toString())); // ["x^4+3x^3", "2x^2+6x", "0"]
console.log(1%3);