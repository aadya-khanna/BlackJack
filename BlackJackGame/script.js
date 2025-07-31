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
    
    deck.splice(randNum, 1); // Remove the card from the deck 

    return card;
}

function hit() {
    getRandomCard(); 

    const cardImage = document.createElement('img');
    cardImage.src = 'assets/cards/' + getRandomCard() + '.png';

    cardImage.classList.add("w-24", "shadow-md")

    const cardContainer = document.getElementById('card-area');
    cardContainer.appendChild(cardImage);
}

