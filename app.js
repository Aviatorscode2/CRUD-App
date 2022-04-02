// Variables
const tweetList = document.getElementById('tweet-list');



// Event Listeners
eventListeners();

function eventListeners() {
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    // Remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Function

function newTweet(e) {
    e.preventDefault();

    // read the textarea value
    const tweet = document.querySelector('#tweet').value;
    // this also achieve the same thing 
    // const tweet = document.getElementById('tweet').value;

    // create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X'
        // create an <li> element
    const li = document.createElement('li'); //who are creating a list for our tweets on the fly
    li.textContent = tweet;

    tweetList.appendChild(li);

    // add the remove button to each tweet
    li.appendChild(removeBtn);

    // add to the list
    tweetList.appendChild(li);

    // adds tweet to the localstorage
    addTweetLocalStorage(tweet);

    // print the alerts
    alert("Tweet added")

    this.reset();
}

// Remove the tweet from the DOM
function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // remove from storage
    removeTweetLocalStorage(e.target.parentElement.textContent)
}

// Adds the tweet into the localstorage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // add the tweet into the array
    tweets.push(tweet);

    // convert tweet array into a string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetLS = localStorage.getItem('tweets');
    if (tweetLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}

// prints local storage Tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // Loop through the storage and then print the values 

    tweets.forEach(function(tweet) {
        // create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X'
            // create an <li> element
        const li = document.createElement('li'); //who are creating a list for our tweets on the fly
        li.textContent = tweet;

        // add the remove button to each tweet
        li.appendChild(removeBtn);

        // add to the list
        tweetList.appendChild(li);
    })
}

// Remove  tweets from local storage

function removeTweetLocalStorage(tweet) {
    // get tweets from from storage
    let tweets = getTweetsFromStorage();

    // remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length - 1);

    // Loop through the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    // Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}