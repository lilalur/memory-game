    // based on arrays and loops
    document.addEventListener('DOMContentLoaded', () => {
        //card options
            const listOfPossibeCards = ['aries', 'bat', 'bird', 'camel', 'cat', 'dog', 'elephant', 'fox', 'frog', 'unicorn']
            let cardArray = []
        // fill up thew array twice with each cards
            for (let i = 0; i < listOfPossibeCards.length; i++) {
                objectCreator = []
                Object.assign(objectCreator, {"name":listOfPossibeCards[i]})
                Object.assign(objectCreator, {"img":"images/"+listOfPossibeCards[i]+".png"})
                cardArray.push(objectCreator, objectCreator)
            }
        //mix the pack
            cardArray.sort(() => 0.5 - Math.random())
    
            const grid = document.querySelector('.grid')
            const resultDisplay = document.querySelector('#result')
            const messageDisplay = document.querySelector('#message')
            let cardsChosen = [];
            let cardsChosenId = [];
            let cardsWon = [];
    
        // create gameboard
            function createBoard() {
                for (let i=0; i<cardArray.length; i++) {
                    var card = document.createElement('img')
                    card.setAttribute('src', 'images/blank.png')
                    card.setAttribute('data-id', i)
                    card.addEventListener('click', flipCard)
                    grid.appendChild(card)
                }
            }
    
        // check matches
            function checkForMatch() {
                const cards = document.querySelectorAll('img')
                const optionOneId = cardsChosenId[0]
                const optionTwoId = cardsChosenId[1]
                if (cardsChosen[0] === cardsChosen[1]) {
                    cards[optionOneId].setAttribute('src', 'images/empty.png')
                    cards[optionTwoId].setAttribute('src', 'images/empty.png')
                    cardsWon.push(cardsChosen)
                    messageDisplay.textContent = 'You have clicked the same image!'
                    setTimeout(checkForMatchTextClear, 700)
                } else {
                    cards[optionOneId].setAttribute('src', 'images/blank.png')
                    cards[optionTwoId].setAttribute('src', 'images/blank.png')
                    cards[optionOneId].setAttribute('class', 'checked')
                    cards[optionTwoId].setAttribute('class', 'checked')
                    messageDisplay.textContent = 'Sorry, try again'
                    setTimeout(checkForMatchTextClear, 700)
                }
                function checkForMatchTextClear() {
                    messageDisplay.textContent = ''
                }
                cardsChosen = []
                cardsChosenId = []
                resultDisplay.textContent = cardsWon.length
                if (cardsWon.length === cardArray.length/2) {
                    messageDisplay.textContent = ''
                    resultDisplay.textContent = 'Congratulations! You found them all!'
                }
            }
    
        // flip your card to
            function flipCard() {
                let cardId = this.getAttribute('data-id')
                cardsChosen.push(cardArray[cardId].name)
                cardsChosenId.push(cardId)
                this.setAttribute('src', cardArray[cardId].img)
                this.setAttribute('class', 'disabled')
                if (cardsChosen.length === 2) {
                    setTimeout(checkForMatch, 500)
                }
            }
            createBoard()
        })