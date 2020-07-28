// Functional programming

let animals = [
    { name: 'Hamilton', species: 'dog' },
    { name: 'Vettel', species: 'cat' }
]

// filter()
let isDog = function(animal) {
    return animal.species === 'dog'
}

let isAnimal = function(animal, filter) {
    return animal.species === filter
}

var dogs = animals.filter(isDog);

// var cats = animals.filter(isAnimal(this, 'cat'));

console.log(dogs);

// map()
let names = animals.map((animal) => animal.name);
let namesDescription = animals.map(function(animal) {
    return animal.name + ' is a ' + animal.species;
});

console.log(names);
console.log(namesDescription);

// reduce()
let orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
];

let totalAmount = orders.reduce(function(sum, order) {
    return sum + order.amount
}, 0);

console.log(totalAmount);

// reduce() advanced
const fs = require('fs');

let file = fs.readFileSync('data.txt', 'utf-8');

const output = file
    .trim()
    .split('\n')
    .map(line => line.split('\t'))
    .reduce((customers, line) => {
        console.log(customers)
        customers[line[0]] = customers[line[0]] || []
        customers[line[0]].push({
            name: line[1],
            price: line[2],
            qty: line[3]
        })
        return customers;
    }, {});

console.log(file);
console.log()
console.log(JSON.stringify(output, null, 2));