const loadAiDataFetch = () => {
  spinnerLoad(true);
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => loadAIData(data.data.tools.slice(0, 6)))
    .catch((err) => {
      console.log(err);
    });
};

const loadAIData = (showData) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";

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
                <button class="rounded-circle border-0"><i class="fas fa-arrow-right text-danger"></i></button>
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
