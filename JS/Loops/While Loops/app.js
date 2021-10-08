let input = prompt("Hey, say something!")

while (true) {
    input = prompt(input);
    if (input.toLowerCase() === "stop") break; // break keyword causes the loop to stop
}
console.log("OK YOU WIN!");


