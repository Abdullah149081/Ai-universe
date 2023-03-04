const loadAIUniverseHub = () => {
  loadAiDataFetch(6);
};

const loadAiDataFetch = (dataLimit) => {
  spinnerLoad(true);
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => loadAIData(data.data.tools, dataLimit))
    .catch((err) => {
      console.log(err);
    });
};

const loadAIData = (showData, dataLimit) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";

  const showBtn = document.getElementById("show-btn");
  if (dataLimit && showData.length > 6) {
    showData = showData.slice(0, 6);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }

  showData.forEach((data) => {
    const { image, features, name, published_in, id } = data;

    const divTag = document.createElement("div");
    divTag.classList.add("col");
    divTag.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="card-img-top p-3 h-50" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Features</h5>
               <ol id="${id}">
                </ol>
                <hr>
                <p class="card-text fw-bold name-title">${name}</p>

         <div class="d-flex justify-content-between align-items-center">
            <p class="fw-bold"><i class="fa fa-calendar" aria-hidden="true"></i> ${published_in}</p>
                <div>
                <button onclick="aiModal('${id}')" class="rounded-circle border-0"><i class="fas fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#AiUniverseModal"></i></button>
                </div>
        </div>

                
            </div>
        </div>
    
    `;
    aiContainer.appendChild(divTag);

    features.forEach((name) => {
      const liTag = document.createElement("li");
      liTag.innerText = name;
      document.getElementById(id).appendChild(liTag);
    });
  });

  spinnerLoad(false);
};

const showAllData = async () => {
  spinnerLoad(true);
  const URL = "https://openapi.programming-hero.com/api/ai/tools";

  try {
    const res = await fetch(URL);
    const data = await res.json();
    loadAIData(data.data.tools);
  } catch (err) {
    console.log(err);
  }
};

const spinnerLoad = (isLoading) => {
  const spinner = document.getElementById("spinner");
  isLoading === true ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
};

const aiModal = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => modalShow(data.data))
    .catch((err) => {
      console.log(err);
    });
};

const modalShow = (data) => {
  const { description, pricing, features, integrations, image_link, accuracy, input_output_examples } = data;

  const modalDetails = document.getElementById("modal-details");
  modalDetails.innerHTML = `

  <div class="container-fluid">
  <div class="row">                
    <div class="col-lg-6">
      <div class="border border-danger border-3 rounded p-4 bg-danger bg-opacity-10">
        <p class="fw-bold">${description}</p>
        <!-- 3 div  -->
        <div>
          <div class="d-flex gap-3 flex-md-row flex-column">
            <p class="bg-light p-3 rounded fw-bold text-center  text-success">${pricing === null || pricing[0].price === "0" ? "Free of Cost/" : pricing[0].price} <br />${
    pricing ? pricing[0].plan : "Basic"
  }</p>
            <p class="bg-light p-3 rounded fw-bold text-center  text-warning">${pricing ? pricing[1].price : "Free Of Cost/"} <br />${pricing ? pricing[1].plan : "Pro"}</p>
            <p class="bg-light p-3 rounded fw-bold text-center  text-danger">${pricing ? pricing[2].price : "Free of Cost /"} <br />${pricing ? pricing[2].plan : "Enterprise"}</p>
          </div>
          <!-- flex  -->
          <div class="d-flex gap-2 justify-content-between mx-3 flex-md-row flex-column">
            <!-- first  -->
            <div>
             <h4>Features</h4>
             <ul id="${features}"></ul>

            </div>
          <!-- second -->
            <div>
           <h4>Integrations</h4>
           <ul id="${integrations}"></ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 mt-4 mt-md-0">
    
    
      <div class="border border-success h-100 rounded shadow ">
          <div class="p-2 position-relative">
            <img src="${image_link[0]}" alt="" class="img-fluid border border-success rounded  " />
            <button id="accuracy-btn" class="btn position-absolute end-0  d-none ">${accuracy.score * 100}% accuracy</button>
          </div>
          <div class="text-center p-3">
            <h4>${input_output_examples ? input_output_examples[0].input : "No! Not Yet! Take a break!!!"}</h4>
            <p class="w-50 mx-auto">${input_output_examples ? input_output_examples[0].output : ""}</p>
          </div>
        </div>
    
    
    

    
    </div>
  </div>
</div>


 
 `;
  const feaValues = Object.values(features);
  feaValues.forEach((values) => {
    const liTag = document.createElement("li");
    liTag.innerText = values.feature_name;
    document.getElementById(features).appendChild(liTag);
  });

  integrations?.forEach((items) => {
    const liTag = document.createElement("li");
    liTag.innerText = items;
    document.getElementById(integrations).appendChild(liTag);
  });
  const accuracyBtn = document.getElementById("accuracy-btn");
  accuracy.score === null ? accuracyBtn.classList.add("d-none") : accuracyBtn.classList.remove("d-none");
};
