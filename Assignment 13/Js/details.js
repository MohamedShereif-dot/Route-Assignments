export class gameDetails{

    constructor(id="540"){
        this.id=id;
    }

    fetchDetails = async () => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`;
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
          console.log(result[0])
          return result;
        } catch (error) {
          console.error('Error fetching details:', error);
          throw error;
        }
    
    };

}