console.log("Hello, world!");

const anotherAny: any = 1;

console.log("Hello, any!");

const foo: any = 3;

// trigger noImplicitAny
function func(hi): void {}
