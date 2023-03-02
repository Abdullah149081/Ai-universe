const loadAiDataFetch = () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => loadAIShow(data.data.tools))
    .catch((err) => {
      console.log(err);
    });
};

const loadAIShow = (showDAta) => {
  const aiContainer = document.getElementById("ai-container");

  showDAta.forEach((data) => {
    const { image, features, name, published_in } = data;

    const divTag = document.createElement("div");
    divTag.classList.add("col");
    divTag.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Features:${features}</h5>
                

                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    
    
    `;
    aiContainer.appendChild(divTag);
  });

  console.log(showDAta);
};
