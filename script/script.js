const loadData = (limitData) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayData(data.data.tools, limitData))
}


const card = document.getElementById('card-container');
const displayData = (data, limitData) => {

    console.log(data)
    // Data sort by Date
    if (limitData == 1) {
        data.sort(function (a, b) {
            return new Date(a.published_in) - new Date(b.published_in)
        })
        data.sort(function (a, b) {
            return new Date(a.published_in) - new Date(b.published_in)
        })

    }
    // Display 6 hubs
    let hubs = data;
    if (limitData == 6) {
        hubs = data.slice(0, 6);

    }

    //Hide show all button for all display 
    if (limitData == 0) {
        const button = document.getElementById('loadAll');
        button.classList.add('d-none')
    }

    // Display data
    for (const hub of hubs) {

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
                            <div class="d-flex">
                            
                            <i class="fa-regular fa-calendar m-1"></i>
                            <p>${hub.published_in}</p>
                            </div>
                        </div>
                        <div>
                         <i class="fa-solid fa-circle-arrow-right h-1 text-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadDetails('${hub.id}')"></i>
                            
                        </div>
                        </div>

                    </div>
                    

                </div>
        
        `
        card.appendChild(div);
    }
    // stop loader
    toggleSpinner(false);
}

// Display All data
document.getElementById('loadAll').addEventListener('click', () => {
    // start loader
    toggleSpinner(true);
    card.innerText = ''
    loadData(0);

})


loadData(6);

// Load Details
const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => hubDetails(data.data))
}

const hubDetails = details => {
    console.log(details)

    const modalTitle = document.getElementById('Modal-html');

    modalTitle.innerHTML = `   

    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card">
        
        <div class="card-body bg">
          
          <p class="card-text fw-semibold">${details.description}</p>

          <div class="d-flex justify-content-between mb-3">
                    <div class="price-box fw-bold" style="color: green">${details.pricing ? details.pricing[0].price : 'Free of cost'} ${details.pricing ? details.pricing[0].plan : '/Basic'} </div>
                    <div class="price-box fw-bold" style="color: orange">${details.pricing ? details.pricing[1].price : "Free of cost "} ${details.pricing ? details.pricing[1].plan : "/Pro"}</div>
                    <div class="price-box fw-bold" style="color: red">${details.pricing ? details.pricing[2].price : "Free of cost"} ${details.pricing ? details.pricing[2].plan : "/Enterprise"}</div>
         </div>

          <div class="d-flex justify-content-between">
            <div class="" >
                <h5 class="card-title">Features</h5>
                <ul>
                    <li style="font-size: small;">${details.features[1].feature_name}</li>
                    <li style="font-size: small;">${details.features[2].feature_name}</li>
                    <li style="font-size: small;">${details.features[3].feature_name}</li>
                </ul>
            </div>
            <div>
                <h5 class="card-title text-center">Integrations</h5>
                <ul>
                    <li style="font-size: small;">${details.integrations ? details.integrations[0] : "no data found"}</li>
                    <li style="font-size: small;" id="integration1">${details.integrations ? details.integrations[1] : 'no data found'}</li>
                    <li style="font-size: small;" id="integration2">${details.integrations ? details.integrations[2] : 'no data found'}</li>

                </ul>
            </div>
        </div>
          
          
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="${details.image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">${details.input_output_examples ? details.input_output_examples[0].input : "Can you give any example"}</h5>
          <p class="card-text">${details.input_output_examples ? details.input_output_examples[0].output : 'No! Not yet take a break'}</p>
        </div>
        <p class="text-bg-danger p-1 rounded-3 position-absolute top-0 end-0" style = "width: 110px" id="accuracy" >${details.accuracy.score * 100}% accuracy</p>
      </div>
    </div>
    
  </div>
        
    `
    if (details.accuracy.score == null) {
        const accurate = document.getElementById('accuracy');
        accurate.classList.add('d-none')
    }
    if (details.integrations[1] == undefined) {
        const integration1 = document.getElementById('integration1');
        integration1.classList.add('d-none')
    }
    if (details.integrations[2] == undefined) {
        const integration2 = document.getElementById('integration2');
        integration2.classList.add('d-none')
    }
}

// Toggle Spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

toggleSpinner(true);

// Sort by date 
document.getElementById('sortByDate').addEventListener('click', () => {
    card.innerText = ''
    loadData(1);
})

