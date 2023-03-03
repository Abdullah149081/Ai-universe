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
  const { description, pricing, features } = data;
  const [item, item2, item3] = pricing;

  // console.log(s);

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
            <p class="bg-light p-3 rounded fw-bold text-center  text-success">${item.price ? item.price : "Free of Cost/Basic"} <br />${item.plan ? item.plan : "no"}</p>
            <p class="bg-light p-3 rounded fw-bold text-center  text-warning">${item2.price} <br />${item2.plan}</p>
            <p class="bg-light p-3 rounded fw-bold text-center  text-danger">${item3.price} <br />${item3.plan}</p>
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
           <ul></ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">.col-md-4 .ms-auto</div>
  </div>
</div>


 
 `;
  const feaValues = Object.values(features);
  feaValues.forEach((values) => {
    const liTag = document.createElement("li");
    liTag.innerText = values.feature_name;
    document.getElementById(features).appendChild(liTag);
  });
};
