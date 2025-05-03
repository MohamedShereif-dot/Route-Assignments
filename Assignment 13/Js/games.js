
export class Card{

    constructor(category="shooter"){
        this.category=category;
    }
    
    async fetchGames (){
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '6ae9469d02mshb971e3a7e76c2dfp1cb4c8jsn2d293d001827',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
      
        try {
          const response = await fetch(url, options);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json(); 
          return result;
        } catch (error) {
          console.error('Error fetching game:', error);
          throw error;
        }
    
    
    };

}
