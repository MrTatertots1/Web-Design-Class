const btn = document.querySelector("#v2");
const btn3 = document.querySelector("#v3");
const btnTAS = document.querySelector("#tas");

btn.onclick = function () {
    console.log("YOU CLICKED ME");
    console.log("I HOPE IT WORKED");
}

function scream() {
    console.log("AAAAAAAAAAAAAAAAAAAAHHHHHH");
    console.log("STOP TOUCHING ME");
}

btn.onmouseenter = twist; // Will never run.
btn.onmouseenter = scream; // Because this will overwrite it

btn3.addEventListener('mouseup', () => {
    alert("WHAT ARE YOU DOING");
});


function twist() {
    console.log("TWIST");
}
function shout() {
    console.log("SHOUT");
}

// Adds multiple events to the same event type
btnTAS.addEventListener('click', twist, { once: true }); //will only run once
btnTAS.addEventListener('click', shout);



