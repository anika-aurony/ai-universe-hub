const loadData = (limitData) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayData(data.data.tools, limitData))
}


const card = document.getElementById('card-container');
const displayData = (data, limitData) => {
    console.log(data[0]);
    let hubs = data;
    if (limitData == 6) {
        hubs = data.slice(0, 6);
        
    }
    if(limitData == 0){
        const button = document.getElementById('loadAll');
        button.classList.add('d-none')
    }

    for (const hub of hubs) {
        console.log(hub.features)
        const div = document.createElement('div');


        div.classList.add('col')
        div.innerHTML = `
                <div class="card h-100">
                    <img src="${hub.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>

                      <p class="card-text">
                        <ol>
                            <li>${hub.features[0]}</li>
                            <li>${hub.features[1]}</li>
                            <li id='li' >${hub.features[2] ? hub.features[2] : 'No other feature'}</li>
                            
                            
                        </ol>
                      </p>
                      <hr class="mx-1">
                      <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="card-title">${hub.name}</h5>
                            <p>${hub.published_in}</p>
                        </div>
                        <div>
                             <button type="button" class="btn btn-outline-secondary">Button</button>
                        </div>
                        </div>

                    </div>
                    

                </div>
        
        `
        card.appendChild(div);


    }



}

document.getElementById('loadAll').addEventListener('click', (data) => {
    card.innerText = ''
    loadData(0);

})


loadData(6);
