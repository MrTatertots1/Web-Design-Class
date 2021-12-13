const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/relationshipDEMO')
    .then(() => {
        console.log('MONGO  >> Connection Open!')
    })
    .catch(err => {
        console.log('MONGO  >> Connection Error!')
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number
})
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

// const makeTweets = async () => {
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'BAK BAK BAK', likes: 467321789 })
//     tweet2.user = user
//     await tweet2.save()
// }
// makeTweets()

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}
findTweet()


