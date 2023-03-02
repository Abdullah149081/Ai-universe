const loadAiDataFetch = () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => loadAIShow(data.data.tools.slice(0, 6)))
    .catch((err) => {
      console.log(err);
    });
};

const loadAIShow = (showDAta) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";

  showDAta.forEach((data) => {
    const { image, features, name, published_in } = data;
    const [a, b, c] = features;

    // console.log(features);

    const divTag = document.createElement("div");
    divTag.classList.add("col");
    divTag.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="card-img-top p-3 h-50" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Features :</h5>
               <ol>
                <li>${a ? a : "not available"}</li>
                <li>${b ? a : "not available"}</li>
                <li>${c ? c : "not available"}</li>
                </ol>
                <hr>
                <p class="card-text fw-bold ">${name}</p>

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
  });

  //   console.log(showDAta);
};

const showMore = async () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";

  try {
    const res = await fetch(URL);
    const data = await res.json();
    loadAIShow(data.data.tools);
  } catch (err) {
    console.log(err);
  }
};
