// Animation on Content
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        
        // else {
        //     entry.target.classList.remove('show')
        // }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));

// Global variable declaration
let pDisplayScore;
let eDisplayScore;
let pScore;
let eScore;
let npDisplayScore;
let neDisplayScore;
let messageGuide;
let roundDisplayMessage;
let hintDisplayMessage;
let playStatus = false;
const enemyMoves = ["rock", "paper", "scissors"];

const scissorsMessages = [
    `"Scissors are the kings of this game, and I'm here to reign supreme!"`,
    `"Scissors always cuts through the competition. Prepare to be snipped!"`,
    `"Your paper may fold, but my scissors will unfold your defeat!"`,
    `"I hope you're ready to be sliced and diced by my unstoppable scissors!"`,
    `"They say paper covers rock, but scissors shred paper into tiny pieces!"`,
    `"You might think you're smooth as rock, but my scissors will leave you shattered!"`,
    `"Scissors are like a sharp blade, cutting through your hopes of victory!"`,
    `"I'm like a pair of precision scissors, ready to cut down your dreams!"`,
    `"I'm about to give you a haircut you'll never forget with my scissor skills!"`,
    `"They say fortune favors the bold, and my bold scissors are about to snatch your luck away!"`
]

const rockMessages = [
    `"Prepare to get crushed by the mighty power of my rock!"`,
    `"You might as well call me 'The Boulder' because my rock is unstoppable!"`,
    `"Rock smashes scissors into oblivion. It's time for you to feel the impact!"`,
    `"I hope you're ready to be buried under the weight of my victorious rock!"`,
    `"You can try all you want, but there's no escaping the rock's dominance!"`,
    `"Rock is the solid foundation of this game, and I'm about to build my victory on it!"`,
    `"You're about to learn the hard way that paper is no match for my rock!"`,
    `"My rock is a force of nature, and you're about to be swept away in its wake!"`,
    `"You can't chip away at my confidence because my rock is unbreakable!"`,
    `"They say diamonds are forever, but my rock's reign of triumph is eternal!"`
]

const paperMessages = [
    `"Get ready to be enveloped by the might of my victorious paper!"`,
    `"Paper always wraps up the competition. Prepare to be tightly sealed!"`,
    `"Your feeble rock doesn't stand a chance against the power of my strategic paper!"`,
    `"I hope you have a spare tissue because my paper is about to make you cry!"`,
    `"While you're busy trying to smash with rock, my paper will gracefully flutter to victory!"`,
    `"Paper covers rock, suffocating your hopes of triumph!"`,
    `"You might be tough, but my paper is as thin and sharp as a razor!"`,
    `"Prepare to be wrapped up in defeat. My paper is the ultimate straitjacket!"`,
    `"You can't tear through the strength of my paper. It's unbreakable!"`,
    `"They say the pen is mightier than the sword, but my paper is mightier than your rock!"`
]

const tipMessages = [
    `"Be unpredictable: Avoid falling into patterns or routines. Mix up your choices to keep your opponent guessing."`,
    `"Observe your opponent: Pay attention to their tendencies and patterns. Look for any cues that may indicate their next move."`,
    `"Use psychology: Try to bluff or deceive your opponent by giving subtle hints or gestures that mislead them."`,
    `"Stay confident: Believe in your choices and project confidence. It can help intimidate your opponent."`,
    `"Play defensively: If you're on a winning streak, consider playing defensively to throw off your opponent's strategy."`,
    `"React quickly: Make your decision swiftly, without hesitation. This can catch your opponent off guard."`,
    `"Use the element of surprise: Occasionally throw an unexpected move to catch your opponent off balance."`,
    `"Adjust your strategy: If your opponent is consistently beating you with a specific move, adapt your strategy accordingly."`,
    `"Play the probabilities: Statistically, players tend to throw rock most frequently, so consider countering it with paper."`,
    `"Play mind games: Try to get inside your opponent's head. Make eye contact, smile, or show subtle confidence to distract them."`,
    `"Be observant: Look for any signs of tension or excitement in your opponent's body language that may give away their choice."`,
    `"Stay calm: Don't let frustration or emotions affect your decision-making. Stay focused and composed."`,
    `"Use reverse psychology: Occasionally, play a move that counters what you believe your opponent expects you to throw."`,
    `"Analyze patterns: Look for patterns in your opponent's previous choices and adjust your strategy accordingly."`,
    `"Trust your instincts: Sometimes, your gut feeling can guide you towards the right move. Trust your intuition."`,
    `"Play strategically: Consider the psychology of the game. For example, players often avoid throwing the same move three times in a row."`,
    `"Study your opponent's history: If you've played against your opponent before, try to recall their previous moves and use that knowledge to your advantage."`,
    `"Stay focused: Keep your attention on the game and avoid distractions. Concentration can give you a competitive edge."`,
    `"Play with confidence: Believe in your ability to win and visualize yourself making the right moves."`,
    `"Practice, practice, practice: The more you play Rock Paper Scissors, the better you'll become at recognizing patterns and making strategic decisions."`
]

// Onclick Event Listeners
document.getElementById("rockButton").addEventListener("click", processResultRock);
document.getElementById("paperButton").addEventListener("click", processResultPaper);
document.getElementById("scissorsButton").addEventListener("click", processResultScissors);
document.getElementById("playButton").addEventListener("click", hideAction);


function hideAction() {
  playStatus = true;
  var x = document.getElementById("playButton");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
  x.style.display = "none";
  messageGuide = document.getElementById("messageGuide");
  pDisplayScore = document.getElementById("pDisplayScore");
  eDisplayScore = document.getElementById("eDisplayScore");
  pScore = document.getElementById("pScore");
  eScore = document.getElementById("eScore");
  roundDisplayMessage = document.getElementById("roundMessage");
  hintDisplayMessage = document.getElementById("hintMessage");
  messageGuide.style.visibility = "visible";
  pDisplayScore.style.visibility = "visible";
  eDisplayScore.style.visibility = "visible";
  npDisplayScore = 0;
  neDisplayScore = 0;

  roundDisplayMessage.innerHTML = "";
  hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;
}

function processResultRock() {
    if(playStatus===true) {
        let tempMessage = "";
        let tempNum = randomizeMove();
        if(tempNum==="scissors") {
            tempMessage = `You chose Rock - Computer chose ${tempNum} = You won this round!`
            npDisplayScore++;
            pScore.innerHTML = npDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = randomize(rockMessages);
            
            endGame(npDisplayScore, "win");

        } else if (tempNum==="rock") {
            tempMessage = `You chose Rock - Computer chose ${tempNum} = This round is a tie!`
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;
        } else {
            tempMessage = `You chose Rock - Computer chose ${tempNum} = You lose this round!`
            neDisplayScore++;
            eScore.innerHTML = neDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;

            endGame(neDisplayScore, "lose");

        }
    }
}

function endGame (score, roundStatus) {
    if(score === 5) {
        if(roundStatus === "win") {
            let temp = document.getElementById("finish");
            temp.style.display = "none";
            hintDisplayMessage.innerHTML = `Congratulations on winning the Game`;
        } else {
            let temp = document.getElementById("finish");
            temp.style.display = "none";
            hintDisplayMessage.innerHTML = `Better luck next time. Try Again?`;
        }
    } else {
        return
    }
}

function processResultPaper() {
    if(playStatus===true) {
        let tempMessage = "";
        let tempNum = randomizeMove();
        if(tempNum==="rock") {
            tempMessage = `You chose Paper - Computer chose ${tempNum} = You won this round!`
            npDisplayScore++;
            pScore.innerHTML = npDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = randomize(paperMessages);

            endGame(npDisplayScore, "win");

        } else if (tempNum==="paper") {
            tempMessage = `You chose Paper - Computer chose ${tempNum} = This round is a tie!`
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;
        } else {
            tempMessage = `You chose Paper - Computer chose ${tempNum} = You lose this round!`
            neDisplayScore++;
            eScore.innerHTML = neDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;

            endGame(neDisplayScore, "lose");

        }
    }
}
function processResultScissors() {
    if(playStatus===true) {
        let tempMessage = "";
        let tempNum = randomizeMove();
        if(tempNum==="paper") {
            tempMessage = `You chose Scissors - Computer chose ${tempNum} = You won this round!`
            npDisplayScore++;
            pScore.innerHTML = npDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = randomize(scissorsMessages);

            endGame(npDisplayScore, "win");

        } else if (tempNum==="scissors") {
            tempMessage = `You chose Scissors - Computer chose ${tempNum} = This round is a tie!`
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;
        } else {
            tempMessage = `You chose Scissors - Computer chose ${tempNum} = You lose this round!`
            neDisplayScore++;
            eScore.innerHTML = neDisplayScore;
            roundDisplayMessage.innerHTML = tempMessage;
            hintDisplayMessage.innerHTML = `TIP: ${randomize(tipMessages)}`;

            endGame(neDisplayScore, "lose");

        }
    }
}

function randomizeMove() {
    let num = Math.floor(Math.random() * enemyMoves.length)
    // alert(`Computer played ${enemyMoves[num]}`);
    return enemyMoves[num];
}

function processMessage(gameStatus, weapon) {
    if(gameStatus === "win") {
        if(weapon === "rock") {
            alert(randomize(rockMessages));

        } else if (weapon === "paper") {
            alert(randomize(paperMessages));
        } else {
            alert(randomize(scissorsMessages));
        }
    } else {
        alert(`TIP: ${randomize(tipMessages)}`);
    }
}

function randomize(list) {
    let number = Math.floor(Math.random() * list.length);
    return list[number];
}
