const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Friday'];
console.log(daysOfWeek);

console.log("\n");

// push and pop
daysOfWeek.push('Saturday'); // Adds 'Saturday' to the end of the array
console.log(daysOfWeek);
daysOfWeek.pop(); // This removes the last value
console.log(daysOfWeek);
daysOfWeek.push('Saturday'); // Readding 'Saturday' to the end of the array

console.log("\n");

// shift and unshift
daysOfWeek.shift(); // Removes the first value from the string
console.log(daysOfWeek);
daysOfWeek.unshift("Sunday", "Monday"); // Adds values into front of string (finished same order as shows)
console.log(daysOfWeek);

console.log("\n");

// splice
daysOfWeek.splice(4, 0, 'Thurday'); // Takes in the arguments (position, number of elements wished to be removed, items to add in)
console.log(daysOfWeek);