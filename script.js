tailwind.config = {
    darkMode: 'class', 
    theme: {
      extend: {
        fontFamily: {
          script: ['Script', 'serif'],
        }
        
      }
    }
  }

// light and dark mode 
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-btn');
const moonIcon = document.getElementById('moon-btn');
const root = document.documentElement;

alert("Welcome to Blackjack! Click 'hit' to draw a card, 'stand' to end your turn, and 'play' to reset the game. Objective: Get your card total as close to 21 as possible without going over. Face cards are worth 10, Aces are 1 or 11, and number cards are their value. You can hit to take another card or stand to stop. You are playing against the dealer, whoever is closer to 21 without busting wins. Beat the dealer to win!");


// if theme in localstorage is dark, then make them dark, hide sun, unhide moon 
if(localStorage.getItem('theme') === 'dark') {
    root.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
} else {
    root.classList.remove('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark');

    const isDark = root.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
}); 


// showing card pngs
const suits = ['clover', 'diamond', 'heart', 'spade'];
const nums = new Array(13)

for(let i = 1; i < 14; i++) {
    nums[i - 1] = i;
}

const deck = new Array(52);

for(let i = 0; i < 52; i++) 
{
    deck[i] = "card_" + nums[i % 13] + "_" + suits[i % 4];
}

function getRandomCard() {
    if(deck.length === 0) {
        alert("No more cards left in the deck.");
    }

    const randNum = Math.floor(Math.random() * deck.length);
    const card = deck[randNum];
    
    deck.splice(randNum, 1); 

    return card;
}

let score = 0;


function hit() 
{
    // everytime you get a card, you calculate score 
    const card = getRandomCard(); 
    
    const curScore = card.substring(card.indexOf('_') + 1, card.lastIndexOf('_'));

    console.log("Current Card: " + card);
    console.log("Current Score: " + curScore);

    if(curScore === '1') {
        alert("You drew an Ace! Do you want it to be 1 or 11?");
        const aceValue = prompt("Enter '1' for 1 or '11' for 11");
        if(aceValue === '1') {
            score += 1; 
        } else if(aceValue === '11') {
            score += 11;
        }
        else {
            alert("Invalid input. Ace will be counted as 11.");
            score += 10; 
        }
    }
    else if(curScore === '11' || curScore === '12' || curScore === '13') {
        score += 10; 
    } else {
        score += parseInt(curScore); 
    }

    if(score > 21) {
        alert("You busted! Your score is over 21.");
    }

    if(score === 21) {
        alert("Congratulations! You hit 21!");
    }

    document.getElementById('score').innerText = "Score: " + score;

    const cardImage = document.createElement('img');
    cardImage.src = 'assets/cards/' + card + '.png';

    cardImage.classList.add("w-24", "shadow-md")

    const cardContainer = document.getElementById('card-area');
    cardContainer.appendChild(cardImage);
}

function stand() {
    // the dealers cards are drawn here (choose randomly) 
    const dealerCards = [];
    let dealerScore = 0;
    
    while(dealerScore < 17) 
    {
        const dealerCard = getRandomCard();
        let dealerCardImage = document.createElement('img');
        dealerCardImage.src = 'assets/cards/' + dealerCard + '.png';
        dealerCardImage.classList.add("w-24", "shadow-md");
        const dealerCardArea = document.getElementById('dealer-card-area');
        dealerCardArea.appendChild(dealerCardImage);
        console.log("Dealer Card: " + dealerCard);
        console.log("Dealer Score: " + dealerScore);

        dealerCards.push(dealerCard);
        
        const curDealerScore = dealerCard.substring(dealerCard.indexOf('_') + 1, dealerCard.lastIndexOf('_'));
        
        if(curDealerScore === '1') {
            dealerScore += 11; 
        } else if(curDealerScore === '11' || curDealerScore === '12' || curDealerScore === '13') {
            dealerScore += 10;
        } else {
            dealerScore += parseInt(curDealerScore);
        }
    }
    if(dealerScore > 21) {
        alert(`Dealer busted with a score of ${dealerScore}! You win!`);
    }
    else if(dealerScore === score) {
        alert("It's a tie!");
    }
    else if(dealerScore > score) {
        alert("Dealer wins with a score of " + dealerScore + ". You lose!");
    }
    else {
        alert("Blackjack! You win 🥳");
    }
}

function playgame() {
    score = 0; // Reset score
    document.getElementById('score').innerText = "Score: " + score;

    const cardContainer = document.getElementById('card-area');
    cardContainer.innerHTML = ''; 

    const dealerCardContainer = document.getElementById('dealer-card-area');
    dealerCardContainer.innerHTML = '';

    deck.length = 52; 

}