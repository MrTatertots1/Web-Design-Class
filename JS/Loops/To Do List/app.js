const todoList = [];
let isRunning = true;

while (isRunning) {
    let input = prompt("What would you like to do?");
    switch (input.toLowerCase()) {
        case 'new':
            let inp = prompt("Enter new todo");
            console.log(`${inp} added to list`);
            todoList.push(inp);
            break;
        case 'list':
            console.log("**********");
            for (let item of todoList) {
                console.log(`${todoList.indexOf(item)}: ${item}`);
            }
            console.log("**********");
            break;
        case 'delete':
            let index = parseInt(prompt("Enter item's index"));
            if (index === NaN || index >= todoList.length) console.log("INVALID INDEX");
            else {
                console.log(`TODO ${index} REMOVED`);
                todoList.splice(index, 1);
            }
            break;
        case 'quit':
            isRunning = false;
            break;
        case 'q':
            isRunning = false;
            break;
    }


}


