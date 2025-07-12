// Lista de símbolos
const simbolos = [
    "imagens/Symbols/fortune-dragon_h1_coins.png", // 0
    "imagens/Symbols/fortune-dragon_h2_ribbon.png", // 1
    "imagens/Symbols/fortune-dragon_h3_firecracker.png", // 2
    "imagens/Symbols/fortune-dragon_h4_lantern.png", // 3
    "imagens/Symbols/fortune-dragon_h5_angbao.png", // 4
    "imagens/Symbols/fortune-dragon_h6_ingot.png", // 5
    "imagens/Symbols/fortune-dragon_s_wild.png" // 6 - Wild symbol
];

// Reference to DOM elements
const loadingScreen = document.getElementById('loading-screen');
const startButton = document.getElementById('start-button');
const horaDisplay = document.querySelector('.hora');
const carteiraDisplay = document.getElementById('carteira');
const apostaDisplay = document.getElementById('aposta');
const ganhoDisplay = document.getElementById('ganho');
const spinButton = document.querySelector('.spin');
const amountLessButton = document.querySelector('.amount-less');
const amountMoreButton = document.querySelector('.amount-more');
const turboButton = document.querySelector('.turbo');
const autoButton = document.querySelector('.auto');

// Game state variables
let bankroll = 100.00; // Starting bankroll
let currentBet = 0.40; // Initial bet amount
const betIncrements = [0.40, 0.80, 1.00, 1.50, 2.00, 2.50, 5.00, 10.00, 20.00, 50.00, 100.00, 200.00, 400.00]; // Possible bet amounts
let currentBetIndex = 1; // Index for currentBet in betIncrements array
let winAmount = 0.00;
let isSpinning = false;
let autoSpinInterval = null;
let isTurboMode = false;
const wildSymbol = simbolos[6]; // Easier reference to the Wild symbol

// --- Utility Functions ---

// Function to update the time display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    horaDisplay.textContent = `${hours}:${minutes}`;
}

// Function to update bankroll, bet, and win displays
function updateDisplays() {
    carteiraDisplay.textContent = `R$${bankroll.toFixed(2).replace('.', ',')}`;
    apostaDisplay.textContent = `R$${currentBet.toFixed(2).replace('.', ',')}`;
    ganhoDisplay.textContent = `R$${winAmount.toFixed(2).replace('.', ',')}`;
}

// Function to generate a random symbol
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * simbolos.length);
    return simbolos[randomIndex];
}

// Function to generate initial random symbols for a column
function generateInitialSymbols(columnId, numberOfVisibleSymbols = 3) {
    const column = document.getElementById(columnId);
    column.innerHTML = '';
    for (let i = 0; i < numberOfVisibleSymbols; i++) {
        const img = document.createElement("img");
        img.src = getRandomSymbol();
        img.classList.add("reel-symbol");
        column.appendChild(img);
    }
}

// Function to highlight a winning line
function highlightWin(lineElements) {
    lineElements.forEach(img => {
        img.classList.add('winning-symbol');
    });
}

// Function to clear all highlights
function clearHighlights() {
    document.querySelectorAll('.winning-symbol').forEach(img => {
        img.classList.remove('winning-symbol');
    });
}

// --- Game Logic Functions ---

// Function to start the game and reveal random images
function startGame() {
    const numberOfSymbolsPerColumn = 3;

    generateInitialSymbols("coluna1", numberOfSymbolsPerColumn);
    generateInitialSymbols("coluna2", numberOfSymbolsPerColumn);
    generateInitialSymbols("coluna3", numberOfSymbolsPerColumn);

    loadingScreen.style.display = 'none';
    updateDisplays();
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
}

// Function to handle the spinning of reels (Optimized for seamless downward spin)
async function spinReels() {
    if (isSpinning || bankroll < currentBet) {
        console.log("Cannot spin. Already spinning or insufficient funds.");
        return;
    }

    isSpinning = true;
    winAmount = 0.00;
    clearHighlights(); // Clear previous highlights
    updateDisplays();
    bankroll -= currentBet;
    carteiraDisplay.textContent = `R$${bankroll.toFixed(2).replace('.', ',')}`;

    const columns = [
        document.getElementById('coluna1'),
        document.getElementById('coluna2'),
        document.getElementById('coluna3')
    ];

    // Increased base spin duration significantly shorter for a faster "normal" spin
    const baseSpinDuration = 0.8; // Faster "normal" spin (was 1.0)
    // Turbo mode is even faster
    const spinDuration = isTurboMode ? 0.2 : baseSpinDuration; // Turbo is now very fast (was 0.3)
    const spinDelay = 0.1; // Reduced delay between column spins for faster staggered effect (was 0.15)

    // Determine final symbols for the spin (this array will hold the actual outcome)
    const finalSymbolsMatrix = [[], [], []];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            finalSymbolsMatrix[i].push(getRandomSymbol());
        }
    }

    // Number of "spinning" symbols above the final set.
    // Increased to ensure a longer, more convincing "tape" of symbols.
    // This makes it even harder to discern individual symbols during the spin.
    const numberOfSpinningSymbols = 25; 

    // Get the height of a single symbol (assuming all are the same size)
    const reelHeight = columns[0].children[0] ? columns[0].children[0].offsetHeight : 150; 

    // Use Promise.all to wait for all reel animations to complete
    const spinPromises = columns.map(async (column, colIndex) => {
        // Clear existing symbols from the column
        column.innerHTML = '';

        // Build the complete sequence of symbols for this reel:
        // First, the "spinning" symbols, then the 3 final symbols.
        const symbolsForThisReel = [];

        // Add a sufficient number of random symbols for the 'spin' effect
        for (let i = 0; i < numberOfSpinningSymbols; i++) {
            symbolsForThisReel.push(getRandomSymbol());
        }
        // Append the actual final symbols to the end of this sequence
        symbolsForThisReel.push(...finalSymbolsMatrix[colIndex]);

        // Now, append all these symbols to the column at once
        symbolsForThisReel.forEach(symbolSrc => {
            const img = document.createElement("img");
            img.src = symbolSrc;
            img.classList.add("reel-symbol");
            column.appendChild(img);
        });

        // Calculate the initial position (start of spin).
        // The column needs to be translated UP so that the *first* set of spinning symbols
        // is visible at the top, and the final symbols are hidden way up above.
        // We calculate the total height of all symbols minus the height of the 3 visible symbols.
        const totalContentHeight = symbolsForThisReel.length * reelHeight;
        const initialTranslateY = totalContentHeight - (3 * reelHeight); 
        
        // Instantly snap to the start position
        column.style.transition = 'none'; 
        column.style.transform = `translateY(-${initialTranslateY}px)`; 
        // Force reflow to ensure the transform is applied before the transition starts
        void column.offsetWidth; 

        // Start animation after a slight delay for staggered reels
        await new Promise(resolve => setTimeout(resolve, colIndex * spinDelay * 1000));

        // Apply transition and move the column DOWN to reveal the final symbols.
        // Moving to 0px effectively scrolls the content down until the last 3 symbols are visible.
        column.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        column.style.transform = `translateY(0px)`; 

        // Wait for the animation to complete for this specific reel
        await new Promise(resolve => setTimeout(resolve, spinDuration * 1000));

        // After the animation finishes, instantly clean up the DOM for the static state.
        // This ensures only the 3 final symbols are present, preventing any visual artifacts.
        column.style.transition = 'none'; 
        column.innerHTML = ''; 

        // Re-add ONLY the final three symbols for the clean stopped state.
        finalSymbolsMatrix[colIndex].forEach(symbolSrc => {
            const img = document.createElement("img");
            img.src = symbolSrc;
            img.classList.add("reel-symbol");
            column.appendChild(img);
        });
    });

    // Wait for all reel animations to fully complete before proceeding
    await Promise.all(spinPromises);

    // Now, after all visual changes are done, check for wins using the determined finalSymbolsMatrix
    checkWin(finalSymbolsMatrix, columns);
    isSpinning = false;
}

// Function to check for win conditions and highlight lines
function checkWin(finalSymbolsMatrix, columns) {
    // finalSymbolsMatrix[column][row] gives the symbol src
    const s = (col, row) => finalSymbolsMatrix[col][row];

    const basePayouts = {
        [simbolos[0]]: 0.40, // Coins (h1)
        [simbolos[1]]: 0.65,  // Ribbon (h2)
        [simbolos[2]]: 1,  // Firecracker (h3)
        [simbolos[3]]: 2,  // Lantern (h4)
        [simbolos[4]]: 5,  // Angbao (h5)
        [simbolos[5]]: 10,  // Ingot (h6)
        [simbolos[6]]: 20  // Wild (s_wild) - higher payout for 3 wilds
    };

    // Helper to check if symbols match, considering Wild
    const matches = (sym1, sym2) => sym1 === sym2 || sym1 === wildSymbol || sym2 === wildSymbol;

    // Helper to get the "true" symbol for payout if a wild is involved
    const getTrueSymbol = (sym1, sym2, sym3) => {
        if (sym1 !== wildSymbol) return sym1;
        if (sym2 !== wildSymbol) return sym2;
        return sym3;
    };

    let hasWin = false;
    let totalWinForSpin = 0;
    let linesWon = []; // Store arrays of [column, row] for winning lines

    // Define paylines and their symbol positions
    const line1 = [{ col: 0, row: 0 }, { col: 1, row: 0 }, { col: 2, row: 0 }];
    const line2 = [{ col: 0, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 }];
    const line3 = [{ col: 0, row: 2 }, { col: 1, row: 2 }, { col: 2, row: 2 }];
    const line4 = [{ col: 0, row: 0 }, { col: 1, row: 1 }, { col: 2, row: 2 }];
    const line5 = [{ col: 0, row: 2 }, { col: 1, row: 1 }, { col: 2, row: 0 }];

    const allPaylines = [line1, line2, line3, line4, line5];

    allPaylines.forEach(line => {
        const symA = s(line[0].col, line[0].row);
        const symB = s(line[1].col, line[1].row);
        const symC = s(line[2].col, line[2].row);

        const isWinningLine =
            (matches(symA, symB) && matches(symB, symC) && matches(symA, symC));

        if (isWinningLine) {
            let winningSymbol = getTrueSymbol(symA, symB, symC);
            if (symA === wildSymbol && symB === wildSymbol && symC === wildSymbol) {
                winningSymbol = wildSymbol;
            }

            const payoutRatio = basePayouts[winningSymbol];
            if (payoutRatio) {
                totalWinForSpin += currentBet * payoutRatio;
                hasWin = true;
                linesWon.push(line);
            }
        }
    });

    if (hasWin) {
        bankroll += totalWinForSpin;
        winAmount = totalWinForSpin;
        console.log(`WIN! You won R$${winAmount.toFixed(2)}!`);

        linesWon.forEach(line => {
            line.forEach(pos => {
                const imgElement = columns[pos.col].children[pos.row];
                if (imgElement) {
                    highlightWin([imgElement]);
                }
            });
        });
    } else {
        winAmount = 0.00;
        console.log("No win this spin.");
    }

    updateDisplays();
}

// --- Event Listeners ---

// Start button
startButton.addEventListener('click', startGame);

// Spin button
spinButton.addEventListener('click', () => {
    if (autoSpinInterval) {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
        autoButton.style.backgroundColor = '';
        console.log("Auto-spin stopped.");
    }
    spinReels();
});

// Amount Less button
amountLessButton.addEventListener('click', () => {
    if (isSpinning) return;
    if (currentBetIndex > 0) {
        currentBetIndex--;
        currentBet = betIncrements[currentBetIndex];
        updateDisplays();
        console.log(`Bet decreased to R$${currentBet.toFixed(2)}`);
    } else {
        console.log("Minimum bet reached.");
    }
});

// Amount More button
amountMoreButton.addEventListener('click', () => {
    if (isSpinning) return;
    if (currentBetIndex < betIncrements.length - 1) {
        currentBetIndex++;
        currentBet = betIncrements[currentBetIndex];
        updateDisplays();
        console.log(`Bet increased to R$${currentBet.toFixed(2)}`);
    } else {
        console.log("Maximum bet reached.");
    }
});

// Turbo button
turboButton.addEventListener('click', () => {
    isTurboMode = !isTurboMode;
    turboButton.style.backgroundColor = isTurboMode ? '#4caf4f8a' : '';
    console.log(`Turbo mode: ${isTurboMode ? 'ON' : 'OFF'}`);
    if (autoSpinInterval) {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
        autoButton.click(); // Re-trigger auto-spin to pick up new turbo setting
    }
});

// Auto button
autoButton.addEventListener('click', () => {
    if (autoSpinInterval) {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
        autoButton.style.backgroundColor = '';
        console.log("Auto-spin stopped.");
    } else {
        if (bankroll < currentBet) {
            console.log("Cannot start auto-spin: Insufficient funds.");
            return;
        }

        autoButton.style.backgroundColor = '#ffc1078f';
        console.log("Auto-spin started.");

        const startAutoSpin = async () => {
            if (bankroll >= currentBet) {
                await spinReels(); // Wait for the spin to complete
                // After spin, check bankroll again before next spin in interval
                if (bankroll < currentBet && autoSpinInterval) {
                    clearInterval(autoSpinInterval);
                    autoSpinInterval = null;
                    autoButton.style.backgroundColor = '';
                    console.log("Auto-spin stopped due to insufficient funds.");
                }
            } else {
                clearInterval(autoSpinInterval);
                autoSpinInterval = null;
                autoButton.style.backgroundColor = '';
                console.log("Auto-spin stopped due to insufficient funds.");
            }
        };

        startAutoSpin(); // Call the first spin immediately

        autoSpinInterval = setInterval(startAutoSpin, isTurboMode ? 1000 : 2000); // Spin every 1 or 2 seconds (faster)
    }
});

// Initial call to set time on load (before game starts)
updateTime();
setInterval(updateTime, 60000);