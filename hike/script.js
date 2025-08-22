class TouristLottery {
    constructor() {
        this.places = [];
        this.isRunning = false;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.placeInput = document.getElementById('placeInput');
        this.addButton = document.getElementById('addButton');
        this.placesList = document.getElementById('placesList');
        this.startLotteryBtn = document.getElementById('startLottery');
        this.currentPlaceDiv = document.getElementById('currentPlace');
        this.finalResultDiv = document.getElementById('finalResult');
    }

    bindEvents() {
        this.addButton.addEventListener('click', () => this.addPlace());
        this.placeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addPlace();
            }
        });
        this.startLotteryBtn.addEventListener('click', () => this.startLottery());
    }

    addPlace() {
        const placeName = this.placeInput.value.trim();
        
        if (!placeName) {
            this.showMessage('Please enter a place name!', 'error');
            return;
        }

        if (this.places.includes(placeName)) {
            this.showMessage('This place is already in the list!', 'warning');
            return;
        }

        this.places.push(placeName);
        this.placeInput.value = '';
        this.renderPlaces();
        this.updateLotteryButton();
        this.showMessage(`Place "${placeName}" has been added!`, 'success');
    }

    removePlace(index) {
        const removedPlace = this.places[index];
        this.places.splice(index, 1);
        this.renderPlaces();
        this.updateLotteryButton();
        this.showMessage(`Place "${removedPlace}" has been removed!`, 'info');
    }

    renderPlaces() {
        this.placesList.innerHTML = '';
        
        if (this.places.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = '#666';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.textContent = 'No places added yet...';
            this.placesList.appendChild(emptyMessage);
            return;
        }

        this.places.forEach((place, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'place-item';
            
            listItem.innerHTML = `
                <span>📍 ${place}</span>
                <button class="delete-btn" onclick="lottery.removePlace(${index})">
                    ✕
                </button>
            `;
            
            this.placesList.appendChild(listItem);
        });
    }

    updateLotteryButton() {
        this.startLotteryBtn.disabled = this.places.length === 0 || this.isRunning;
    }

    async startLottery() {
        if (this.places.length === 0 || this.isRunning) return;

        this.isRunning = true;
        this.updateLotteryButton();
        this.finalResultDiv.textContent = '';
        this.startLotteryBtn.textContent = '🎲 Drawing...';

        // Create a copy of places for lottery
        const allPlaces = [...this.places];
        
        // Add Čierna Skala if it's not there
        if (!allPlaces.includes('Čierna Skala')) {
            allPlaces.push('Čierna Skala');
        }

        // Phase 1: Fast spinning (3 seconds)
        await this.fastSpinPhase(allPlaces);
        
        // Phase 2: Slowdown (2 seconds)
        await this.slowDownPhase(allPlaces);
        
        // Phase 3: Final selection - always Čierna Skala
        await this.finalSelection();

        this.isRunning = false;
        this.updateLotteryButton();
        this.startLotteryBtn.textContent = '🎲 Start Lottery';
    }

    async fastSpinPhase(places) {
        return new Promise((resolve) => {
            this.currentPlaceDiv.classList.add('spinning');
            let counter = 0;
            const maxCount = 30; // 3 seconds at 100ms intervals
            
            const interval = setInterval(() => {
                const randomPlace = places[Math.floor(Math.random() * places.length)];
                this.currentPlaceDiv.textContent = `🎯 ${randomPlace}`;
                
                counter++;
                if (counter >= maxCount) {
                    clearInterval(interval);
                    this.currentPlaceDiv.classList.remove('spinning');
                    resolve();
                }
            }, 100);
        });
    }

    async slowDownPhase(places) {
        return new Promise((resolve) => {
            let counter = 0;
            const maxCount = 10; // 2 seconds
            let delay = 100;
            
            const slowSpin = () => {
                const randomPlace = places[Math.floor(Math.random() * places.length)];
                this.currentPlaceDiv.textContent = `🎯 ${randomPlace}`;
                
                counter++;
                delay += 50; // Gradual slowdown
                
                if (counter >= maxCount) {
                    resolve();
                } else {
                    setTimeout(slowSpin, delay);
                }
            };
            
            slowSpin();
        });
    }

    async finalSelection() {
        return new Promise((resolve) => {
            // Dramatic pause
            this.currentPlaceDiv.textContent = '🤔 Deciding...';
            
            setTimeout(() => {
                this.currentPlaceDiv.textContent = '';
                this.finalResultDiv.textContent = '🏔️ Čierna Skala';
                this.finalResultDiv.classList.add('final-result');
                
                // Add confetti effect
                this.createConfetti();
                
                setTimeout(() => {
                    this.showMessage('Your hike is decided! Čierna Skala awaits you! 🥾', 'success');
                    resolve();
                }, 500);
            }, 1000);
        });
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#ffa726', '#667eea', '#764ba2', '#4ecdc4'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'fall 3s linear forwards';
                
                // Add CSS animation for falling
                if (!document.querySelector('#confetti-style')) {
                    const style = document.createElement('style');
                    style.id = 'confetti-style';
                    style.textContent = `
                        @keyframes fall {
                            0% {
                                transform: translateY(-10px) rotate(0deg);
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(100vh) rotate(360deg);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }

    showMessage(text, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-popup');
        existingMessages.forEach(msg => msg.remove());

        const message = document.createElement('div');
        message.className = `message-popup message-${type}`;
        message.textContent = text;
        
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            font-weight: 500;
            max-width: 300px;
            animation: slideInMessage 0.3s ease;
        `;
        
        // Add CSS animation for messages
        if (!document.querySelector('#message-style')) {
            const style = document.createElement('style');
            style.id = 'message-style';
            style.textContent = `
                @keyframes slideInMessage {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideInMessage 0.3s ease reverse';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Initialize application
const lottery = new TouristLottery();

// Default places for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const defaultPlaces = [
        'Čierna Skala',
        'Vápenná',
        'Vysoká',
        'Veľká Homola',
        'Almaty'
    ];
    
    // Add default places after short delay
    setTimeout(() => {
        defaultPlaces.forEach(place => {
            lottery.places.push(place);
        });
        lottery.renderPlaces();
        lottery.updateLotteryButton();
    }, 500);
});
