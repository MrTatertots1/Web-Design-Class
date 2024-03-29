// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log(res.data.ticker.price)
//     })
//     .catch(e => {
//         console.log('ERROR', e)
//     })

const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log(res.data.ticker.price)
    } catch (e) {
        console.log('ERROR', e)
    }
}

const jokes = document.querySelector('#jokes')
const button = document.querySelector('button')

const addNewJoke = async () => {
    const jokeText = await getDadJoke()
    const newLI = document.createElement('li')
    newLI.append(jokeText)
    jokes.append(newLI)
}
const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke
    }
    catch (e) {
        return "NO JOKES AVAILABLE"
    }
}

button.addEventListener('click', addNewJoke)



