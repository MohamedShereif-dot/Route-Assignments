import {UI} from '/Js/UI.js';
import {Card} from '/Js/games.js';
import {gameDetails} from '/Js/details.js';

let row = document.getElementsByClassName("row")[0]
let spiner = document.getElementsByClassName("load_screen")[0]
let main = document.querySelectorAll(".game_reviews")[0];
let game_Details = document.querySelector(".game_details");
let details_Row = document.querySelector('.row.details')
let nav = document.querySelector('nav')
let exit = document.querySelector('button.btn-close')

var games =""
let screen = new UI();


document.addEventListener('DOMContentLoaded',function(){
    
    games = new Card('shooter');
    games.fetchGames()
    .then(data => {
                spiner.classList.add('d-none');
                document.querySelector(".nav-link").classList.add("active")
                row.innerHTML=screen.display(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener('click',function(e){
            e.preventDefault();
            document.querySelectorAll(".nav-link").forEach(navLink => {
                navLink.classList.remove("active");
            });
            spiner.classList.remove('d-none');
            this.classList.add("active")
            const category = link.innerHTML.toLowerCase();
            games = new Card(category);
            games.fetchGames()
            .then(data => {
                spiner.classList.add('d-none');
                row.innerHTML=screen.display(data);
            })
            .catch(error => {
                console.error("Error: fetchGames ", error);
            });
        })
    })


    document.querySelector('.row').addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (!card) return;
    
        const hiddenDiv = card.querySelector('[num]');
        if (!hiddenDiv) return;

        var gameId = hiddenDiv.getAttribute('num');
        if (!gameId) return;
        
        spiner.classList.remove('d-none');
        void spiner.offsetWidth;
        const detail = new gameDetails(gameId);
        
        detail.fetchDetails()
            .then(de => {
                main.classList.add('d-none');
                nav.classList.add('d-none');
                
                spiner.classList.add('d-none');
                game_Details.classList.remove('d-none');
                details_Row.innerHTML = screen.displayDetails(de);
            })
            .catch(error => {
                console.error("Error: fetchDetails ", error);
            });
    });

    exit.addEventListener('click',function(){
        main.classList.remove('d-none');
        nav.classList.remove('d-none');
        game_Details.classList.add('d-none');
    })
})

