document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game');
    const resetButton = document.querySelector('.reset');
    const winMessage = document.querySelector('.win-message');
    const container = document.querySelector('.container');
    
    // Emojis para o jogo (8 pares)
    const emojis = ['🐱', '🐶', '🐼', '🐸', '🐯', '🐵', '🐦', '🐠'];
    
    let cards = [...emojis, ...emojis];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    
    // Embaralhar cartas
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
    
    // Gerar o tabuleiro do jogo
    function generateBoard() {
        gameContainer.innerHTML = '';
        shuffleCards();
        
        cards.forEach(emoji => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.textContent = emoji;
            item.addEventListener('click', flipCard);
            gameContainer.appendChild(item);
        });
        
        matchedPairs = 0;
        winMessage.classList.remove('show');
        
        // Remover confetes antigos
        document.querySelectorAll('.confetti').forEach(confetti => {
            confetti.remove();
        });
    }
    
    // Virar carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('boxOpen')) return;
        
        this.classList.add('boxOpen');
        
        if (!firstCard) {
            // Primeira carta clicada
            firstCard = this;
            return;
        }
        
        // Segunda carta clicada
        secondCard = this;
        checkForMatch();
    }
    
    // Verificar se as cartas são iguais
    function checkForMatch() {
        let isMatch = firstCard.textContent === secondCard.textContent;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            
            if (matchedPairs === emojis.length) {
                // Criar efeito de confete
                for (let i = 0; i < 50; i++) {
                    createConfetti();
                }
                
                setTimeout(() => {
                    winMessage.classList.add('show');
                }, 1000);
            }
        } else {
            unflipCards();
        }
    }
    
    // Criar confete
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#ff6b6b', '#06d6a0', '#118ab2', '#ffd166', '#ef476f'][Math.floor(Math.random() * 5)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.width = (Math.random() * 15 + 5) + 'px';
        confetti.style.height = (Math.random() * 15 + 5) + 'px';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Desabilitar cartas combinadas
    function disableCards() {
        firstCard.classList.add('boxMatch');
        secondCard.classList.add('boxMatch');
        
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Desvirar cartas não combinadas
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('boxOpen');
            secondCard.classList.remove('boxOpen');
            
            resetBoard();
        }, 1000);
    }
    
    // Resetar tabuleiro após cada jogada
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
    
    // Reiniciar jogo
    resetButton.addEventListener('click', () => {
        generateBoard();
        container.classList.add('bounce');
        setTimeout(() => {
            container.classList.remove('bounce');
        }, 1000);
    });
    
    // Fechar mensagem de vitória ao clicar fora
    winMessage.addEventListener('click', (e) => {
        if (e.target === winMessage) {
            winMessage.classList.remove('show');
        }
    });
    
    // Iniciar jogo
    generateBoard();
});