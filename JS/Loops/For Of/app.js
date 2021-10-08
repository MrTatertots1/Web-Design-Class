const subreddits = ['cringe', 'books', 'chickens', 'funny', 'pics', 'soccer'];

for (let i = 0; i < subreddits.length; i++) { // BAD
    console.log(subreddits[i]);
}

console.log('\n\n');

for (let subreddit of subreddits) { // GOOD
    console.log(subreddit);
}



