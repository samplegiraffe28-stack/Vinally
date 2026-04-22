function createDeck(platform, containerId) {

    return {
        platform: platform,
        results: [],
        currentIndex: 0,
        container: document.getElementById(containerId)
    };

}


function enableDeckScroll(deck) {

        let isSrcolling = false;

    deck.container.addEventListener("wheel", function(event) {

        event.preventDefault();

        if(isSrcolling) return;

        isSrcolling = true;

        if(event.deltaY > 0){
            deck.currentIndex++;
        } else {
            deck.currentIndex--;
        }

        updateDeckDisplay(deck);

        setTimeout(() => {
            isSrcolling = false;
        }, 300);

    });

}