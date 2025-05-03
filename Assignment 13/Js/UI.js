export class UI{

    display(games) {
        var cartona=``

        for (let i = 0; i < games.length; i++) {
            cartona+=`
            <div class="col">
                  <div class="card h-100 p-3">
                        <div class='d-none' num='${games[i]['id']}'></div>
                    <img class="card-img rounded-bottom-0" src="${games[i]['thumbnail']}" alt="thumbnail">
                    <div class="card-body p-0">
                      <div class="card-title m-0 mt-3 d-flex justify-content-between">
                        <h5>${games[i]['title']}</h5>
                        <span>Free</span>
                      </div>

                        <p class="card-text">${games[i]['short_description'].split(' ').slice(0, 8).join(',')}</p>
                    </div>
                    
                    <div class="card-footer d-flex justify-content-between p-0">
                        <small class="game_Type">${games[i]['genre']}</small>
                        <small>${games[i]['platform']}</small>
                    </div>
                      
                  </div>
                </div>
            `
        }

        return cartona;
    }

    displayDetails(data) {
        let details=`
        
        <div class="col-md-4 mb-4">
            <img src="${data.thumbnail}" alt="${data.title}" class="w-100">
        </div>
        <div class="col-md-8">
            <h3 class="id d-none">${data.id}</h3>
            <h3 class="title">Title: <span>${data.title}</span></h3>
            <h4 class="category">Category: <span>${data.genre}</span></h4>
            <h4 class="Platform">Platform: <span>${data.platform}</span></h4>
            <h4 class="Status">Status: <span>${data.status || 'Live'}</span></h4>
            <p class="details">${data.description || data.short_description}</p>
            <button class="show" onclick="">Show Game</button>
        </div>
    `;
        return details;
    }
}

