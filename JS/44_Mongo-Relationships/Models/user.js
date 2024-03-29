const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDEMO')
    .then(() => {
        console.log('MONGO  >> Connection Open!')
    })
    .catch(err => {
        console.log('MONGO  >> Connection Error!')
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    await User.deleteMany({});
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '12 Gimmold Place',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await user.save()
    console.log(res)
}


addAddress('61b6d18c8f6082bfff02ce1c')