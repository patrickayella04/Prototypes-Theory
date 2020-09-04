//Each Object in JavaScript has a prototype and a prototype is an object itself. All objects inherit their properties and methods from their prototype.
//Dealing with object literals your inheriting from a prototype called object.prototype. When dealing with constructors, like a Person constructor, it will inherit from a Person.prototype

// Person constructor 
// function Person(firstName, lastName, dob) {
    // this.name = name; // From these couple lines of code we can instantiate (Represent as or by instance) a person object from this.
    // this.birthday = new Date(dob); // Notice the Date object which is a core object of javaScript also has a constructor (uses the new. key word) like how we call new Person, which is an object we created. new Date() is a core object that uses a constructor. 

    // The this. keyword is very important because it refers to the current instance of the this object. In this case it pertains to the Person function, and its function scope. 
    // this.firstName = firstName;
    // this.lastName = lastName;

    // console.log(this) // It should log twice as instatiated two objects.

    // Below we create a method - a method is a function that's inside an object. 
    // this.CalculateAge = function () {
    //     const diff = Date.now() - this.birthday.getTime();
    //     const ageDate = new Date(diff);
    //     return Math.abs(ageDate.getUTCFullYear() - 1970); // This gives us the year and specified date according to the universal time. This may look confusing but this is a common formula to calculate an age from a birthday. Wrapped in Math.abs to make sure the result/value is an absolute number. 
    // }
// }

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
// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// Greeting 
// Person.prototype.greeting = function() {
//     return `Hello there ${this.firstName} ${this.lastName}`;
// }

// const person1 = new Person('John', 'Doe');

// console.log(person1.greeting());

// Now what we want to do is create a constructor for a customer

// Customer constructor
// function Customer(firstName, lastName, phone, membership) {
    // Person.call(this, firstName, lastName); // .call() is a function that allows us to call another function from somewhere else in the current context. 
//     this.phone = phone;
//     this.membership = membership;
// }

// Inherit the Person prototype methods
// Customer.prototype = Object.create(Person.prototype);

// Make customer.prototype return Customer
// Customer.prototype.constructor = Customer;


// Create customer
//  const customer1 = new Customer('Patrick', 'Nyeko', '07940493153', 'Gold');

// console.log(customer1);

// We can also over write the Person.prototypes with new prototypes. If we wanted to create a seperate greeting for a customer we can as follows..
// Customer greeting
// Customer.prototype.greeting = function () {
//     return `Hello there ${this.firstName} ${this.lastName} welcome to our company`;
// } // Any prototype method added to the Person, will now be accessable through the Customer with the the ability to over write it. And thats how we can do inheritance. 


// console.log(customer1.greeting()); // This will not work yet because its not inheriting the greeting prototype. So we add some extra lines of code to make this happen (Inherit the Person prototype methods )

/////////////////////////////////////////////////////////////////////

// Using Object.create

// Another way to create objects using object.create. Allows to create objects inside of a perent object, and then have different properties with different prototype methods/functions. 

// const personPrototypes = {
//     greeting: function () {
//         return `Hello there ${this.firstName} ${this.lastName}`;
//     },

//     getsMarried: function (newLastName) {
//         this.lastName = newLastName;
//     }
// }

//Object.creat will take in our prototypes

// const mary = Object.create(personPrototypes);
// mary.firstName = 'Mary';
// mary.lastName = 'Williams';
// mary.age = 30;

// mary.getsMarried('Thompson');

// console.log(mary.greeting()) // Its an easier way to create an object without using consturctors and various inheritance. 

// const patrick = Object.create(personPrototypes, { 
//     firstName: { value: 'Patrick' },
//     lastName: { value: 'Nyeko' }, 
//     age: {value: 31}
// }); // we added a second prarameter of an object, and each property going to have to be an object aswell with VALUE as a KEY and then the acutal value as the value. 

// console.log(patrick);

// console.log(patrick.greeting())

// Ultimately this is an alternative way to create objects using the Object.create method. 

///////////////////////////////////////////////////////////////////////////

// ES6 classes - Under the hood in js engine, this method of creating an object works in the exact same way. Thats why 'classes' are called syntatic sugar or convenience sysntax because it's basically only changing the way we write our methods of creating objects. Not the way that it works under the hood. 
class Person { // Just with this we can create an object. 
    constructor(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = new Date(dob);
    }
    greeting() { // Any method we add to the class is going to be added to the proto
        return `Hello there ${this.firstName} ${this.lastName}`
    }
    calculateAge() {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    getsMarried(newLastName) {
        this.lastName = newLastName;
    }

    static addNumbers(x, y) { // stand alone function in class. not a part of the mary object. Thus to run this method you write Person.addNumbers() instead of mary.addNumbers. Just a quick example of static methods.
        return x + y;
    }
}

const mary = new Person('Mary', 'Williams', '11-13-1980'); // Instantiate means when we create an object from the class. 

mary.getsMarried('Fantana');

console.log(mary);

console.log(mary.calculateAge())

console.log(Person.addNumbers(1,2))
