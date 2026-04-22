function updateDeckDisplay(deck) {

    const cards = deck.container.querySelectorAll(".card");

    const total = cards.length;

    if(total === 0) return;


    if(deck.currentIndex >= total){
        deck.currentIndex = 0;
    }

    if(deck.currentIndex < 0){
        deck.currentIndex = total - 1;
    }


    cards.forEach((card, index) => {

        let position = index - deck.currentIndex;

        if(position < 0){
            position += total;
        }

        if(position === 0){

            card.style.transform = "translateY(0px) scale(1)";
            card.style.opacity = "1";
            card.style.zIndex = "3";

        }

        else if(position === 1){

            card.style.transform = "translateY(30px) scale(0.9)";
            card.style.opacity = "0.8";
            card.style.zIndex = "2";

        }

        else if(position === 2){

            card.style.transform = "translateY(60px) scale(0.8)";
            card.style.opacity = "0.6";
            card.style.zIndex = "1";

        }

        else{

            card.style.opacity = "0";

        }

    });

}