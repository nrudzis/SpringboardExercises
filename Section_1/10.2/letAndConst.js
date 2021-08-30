//  # ES5 Global Constants
var PI = 3.14;
PI = 42; // stop me from doing this

//  # ES2015 Global Constants
const PI = 3.14;
PI = 42; // error

/*
What is the difference between var and let?
  * Both can be reassigned. Var can be redeclared; let cannot be redeclared. Var is function scoped; let is block scoped.

What is the difference between var and const?
  * Var can be reassigned; const cannot be reassigned. Var can be redeclared; const cannot be redeclared. Var is function scoped; const is block scoped.

What is the difference between let and const?
  * Let can be reassigned; const cannot be reassigned. Neither can be redeclared. Both are function scoped.

What is hoisting?
  * Hoisting is the behavior of allocating memory to a declation before it is executed. With var, before execution it is intialized to undefined by default. With let and const, it is not initialized, and so throws an exception before execution.
*/
