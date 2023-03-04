const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
}

loadData();

const displayData = (data) => {
    console.log(data[0]);
    const hubs = data.slice(0, 6);
    const card = document.getElementById('card-container');
    for (const hub of hubs) {
        console.log(hub.features)
        const features = hub.features
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
                            <li id='li' >${hub.features[2] ? hub.features[2] : 'No other feature' }</li>
                            
                            
                        </ol>
                      </p>
                      <hr class="mx-2">
                      <h5 class="card-title">${hub.name}</h5>
                    </div>
                    

                </div>
        
        `
        card.appendChild(div);

        const featureId = document.getElementById('feature')
        
    }

    

}
