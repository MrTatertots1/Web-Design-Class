const button = document.querySelector('button');
const h1 = document.querySelector('h1');
button.addEventListener('click', function () {

    document.body.style.backgroundColor = randColor();
    h1.innerText = randColor();
})


function randColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}



const section = document.querySelector('section');
const btn = document.querySelector('#changeColor');

btn.addEventListener('click', function (e) {
    e.stopPropagation();
    section.style.backgroundColor = randColor();
})
section.addEventListener('click', function () {
    section.classList.toggle('hide');
})

