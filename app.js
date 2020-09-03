//Each Object in JavaScript has a prototype and a prototype is an object itself. All objects inherit their properties and methods from their prototype.
//Dealing with object literals your inheriting from a prototype called object.prototype. When dealing with constructors, like a Person constructor, it will inherit from a Person.prototype

// Person constructor 
function Person(firstName, lastName, dob) {
    // this.name = name; // From these couple lines of code we can instantiate (Represent as or by instance) a person object from this.
    this.birthday = new Date(dob); // Notice the Date object which is a core object of javaScript also has a constructor (uses the new. key word) like how we call new Person, which is an object we created. new Date() is a core object that uses a constructor. 

    // The this. keyword is very important because it refers to the current instance of the this object. In this case it pertains to the Person function, and its function scope. 
    this.firstName = firstName;
    this.lastName = lastName;

    // console.log(this) // It should log twice as instatiated two objects.

    // Below we create a method - a method is a function that's inside an object. 
    // this.CalculateAge = function () {
    //     const diff = Date.now() - this.birthday.getTime();
    //     const ageDate = new Date(diff);
    //     return Math.abs(ageDate.getUTCFullYear() - 1970); // This gives us the year and specified date according to the universal time. This may look confusing but this is a common formula to calculate an age from a birthday. Wrapped in Math.abs to make sure the result/value is an absolute number. 
    // }
}

// We can add methods to the Person.prototype, they do not have to be inside of the actual object. 

// Calculate age
// Person.prototype.CalculateAge = function () {
//     const diff = Date.now() - this.birthday.getTime();
//     const ageDate = new Date(diff);
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
// }

// Get full name
// Person.prototype.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`
// }

// Gets married 
// Person.prototype.getsMarried = function (newLastName) {
//     this.lastName = newLastName
// }

// const john = new Person('John', 'Doe', '8-12-90');
// const mary = new Person('Mary', 'Johnson', 'March 20 1978');

// console.log(mary);

// console.log(john.CalculateAge());

// console.log(mary.getFullName());


// Here above we are not flooding our object (Person object) with functions, we are putting them inside the prototype. At this point our prototype methods are just getting data for us, we can also manipulate data i.e. (Gets married). We run the getsMarried method, then we log marys full name again, and we get Mary Smith.

// mary.getsMarried('Smith');

// console.log(mary.getFullName());

// These methods are not stored in the object, but if you look in the prototype in dev tools console, we have all three of those methods. 

// console.log(mary.hasOwnProperty('firstName')) // Is actually a property of the original object so we get 'true'.
// console.log(mary.hasOwnProperty('getFullName')) // Is NOT actually a property of the original object so we get 'false'.

//////////////////////////////////////////////////////////////

// Prototypal Inheritance
// How dow allow one object or object type inherit from another? Here we have a Person object again, and then a customer object that will inherit its prototype

// Person Constructor
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Greeting 
Person.prototype.greeting = function() {
    return `Hello there ${this.firstName} ${this.lastName}`;
}

const person1 = new Person('John', 'Doe');

console.log(person1.greeting());

// Now what we want to do is create a constructor for a customer

// Customer constructor
function Customer(firstName, lastName, phone, membership) {
    Person.call(this, firstName, lastName); // .call() is a function that allows us to call another function from somewhere else in the current context. 
    this.phone = phone;
    this.membership = membership;
}

// Inherit the Person prototype methods
Customer.prototype = Object.create(Person.prototype);

// Make customer.prototype return Customer
Customer.prototype.constructor = Customer;


// Create customer
 const customer1 = new Customer('Patrick', 'Nyeko', '07940493153', 'Gold');

console.log(customer1);

// We can also over write the Person.prototypes with new prototypes. If we wanted to create a seperate greeting for a customer we can as follows..
// Customer greeting
Customer.prototype.greeting = function () {
    return `Hello there ${this.firstName} ${this.lastName} welcome to our company`;
} // Any prototype method added to the Person, will now be accessable through the Customer with the the ability to over write it. And thats how we can do inheritance. 


console.log(customer1.greeting()); // This will not work yet because its not inheriting the greeting prototype. So we add some extra lines of code to make this happen (Inherit the Person prototype methods )


