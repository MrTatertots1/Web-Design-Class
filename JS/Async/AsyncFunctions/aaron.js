const sing = async () => {
    return 'LA LA LA LA'
}

// sing()
//     .then((data) => {
//         console.log("PROMISE RESOLVED WITH:", data)
//     })
//     .catch((err) => {
//         console.log("OH NO, PROMISE REJECTED")
//         console.log(err)
//     })


const login = async (username, password) => {
    if (!username || !password) throw "Missing Credentials"
    if (password === '123456' && username === 'aaron') return 'Welcome Aaron'
    throw 'Invalid Username or Password'
}

// login('aaron', '123456')
//     .then(msg => {
//         console.log("LOGGED IN")
//         console.log(msg)
//     })
//     .catch(err => {
//         console.log('ERROR')
//         console.log(err)
//     })

const delayedColorChange = ((color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
})

async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
    return 'ALL DONE'
}

// rainbow().then(() => console.log("END OF RAINBOW"))

async function printRainbow() {
    await rainbow()
    console.log("END OF RAINBOW")
}
// printRainbow()

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}

async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1')
        console.log(data1)
        let data2 = await fakeRequest('/page2')
        console.log(data2)
    } catch (e) {
        console.log("CAUGHT AN ERROR")
        console.log("ERROR IS", e)
    }
}

