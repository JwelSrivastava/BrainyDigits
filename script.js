// Simple Guess The Number game
(function () {
  const min = 1;
  const max = 100;
  const maxAttempts = 10;

  const display = document.getElementById('display');
  const guessInput = document.getElementById('guessInput');
  const submitBtn = document.getElementById('submitBtn');
  const hintBtn = document.getElementById('hintBtn');
  const restartBtn = document.getElementById('restartBtn');
  const message = document.getElementById('message');
  const attemptsLeftSpan = document.getElementById('attemptsLeft');
  const guessesList = document.getElementById('guessesList');

  let secret, attemptsLeft, guesses, finished;

  function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function startGame() {
    secret = randInt(min, max);
    attemptsLeft = maxAttempts;
    guesses = [];
    finished = false;
    attemptsLeftSpan.textContent = attemptsLeft;
    guessesList.textContent = '—';
    display.textContent = '?';
    message.textContent = 'I\'m thinking of a number. Good luck!';
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    console.log('Secret number:', secret); // for testing
  }

  function endGame(win) {
    finished = true;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    if (win) {
      message.textContent = `Nice! You guessed it: ${secret}.`;
      display.textContent = secret;
    } else {
      message.textContent = `Out of attempts! The number was ${secret}.`;
      display.textContent = secret;
    }
  }

  function renderGuesses() {
    guessesList.textContent = guesses.length ? guesses.join(', ') : '—';
  }

  function handleGuess() {
    if (finished) return;

    const val = Number(guessInput.value);
    if (!Number.isInteger(val) || val < min || val > max) {
      message.textContent = `Please enter an integer between ${min} and ${max}.`;
      return;
    }

    if (guesses.includes(val)) {
      message.textContent = `You already guessed ${val}. Try a different number.`;
      return;
    }

    guesses.push(val);
    attemptsLeft--;
    attemptsLeftSpan.textContent = attemptsLeft;
    renderGuesses();

    if (val === secret) {
      endGame(true);
      return;
    }

    if (val < secret) {
      message.textContent = `${val} is too low.`;
    } else {
      message.textContent = `${val} is too high.`;
    }

    const diff = Math.abs(val - secret);
    if (diff <= 3) message.textContent += ' You are very close!';
    else if (diff <= 10) message.textContent += ' Getting warmer.';

    if (attemptsLeft <= 0) {
      endGame(false);
    }
  }

  submitBtn.addEventListener('click', handleGuess);
  guessInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') handleGuess();
  });

  hintBtn.addEventListener('click', function () {
    if (finished) return;
    const hintType = randInt(1, 3);
    if (hintType === 1) {
      message.textContent = `Hint: The number is ${secret % 2 === 0 ? 'even' : 'odd'}.`;
    } else if (hintType === 2) {
      const div = [3, 4, 5, 7][randInt(0, 3)];
      message.textContent = `Hint: ${secret % div === 0 ? 'It is' : 'It is not'} divisible by ${div}.`;
    } else {
      const span = Math.min(15, Math.max(3, Math.floor(max / 10)));
      let low = Math.max(min, secret - span);
      let high = Math.min(max, secret + span);
      message.textContent = `Hint: The number is between ${low} and ${high}.`;
    }
  });

  restartBtn.addEventListener('click', startGame);

  // Initialize game
  startGame();
})();
