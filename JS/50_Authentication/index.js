const bcrypt = require('bcrypt')

const hashPass = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt)
    console.log(hash)
}

const login = async (pw, hash) => {
    const result = await bcrypt.compare(pw, hash)
    if (result) {
        console.log("LOGGED YOU IN")
    }
    else {
        console.log('INCORRECT PASSWORD')
    }
}

// hashPass('monkey')
login('monkey', '$2b$12$sUz80LhyO0cDNS40qMnCTOEUkt2h/p078lSPvUBBltnhpzFpWR3FO')