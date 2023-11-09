const BASE_URL = "http://127.0.0.1:5000/api";

const sizeContainer = document.querySelector(".sizeContainer")


function createCupcakeHTML(cupcake){
    return `
    
    <div class="cupcakeShell" data-cupcake-id=${cupcake.id}>
      <button class="delete-button">X</button>
      <h2 class="cupcakeFlavor">${cupcake.flavor}</h2>
      <img class="cupcakeImg"src="${cupcake.image}"alt="(no image provided)">
      <section class="rating_sizeShell">
        <div class="ratingContainer">
          <span class="cupcakeRating">${cupcake.rating}</span>
        </div>
        <div class="sizeContainer">
          ${cupcake.size}    
        </div> 
      </section>
    </div>
  `;
}

function appendCupcakeSizeImg(cupcakeData){
  let newImg = document.createElement('img');

  if(cupcakeData.size === 'large'){
    newImg.src = "https://sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg"
  }

  sizeContainer.appendChild(newImg);

}


async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);
  
    for (let cupcakeData of response.data.cupcakes) {
      let newCupcake = $(createCupcakeHTML(cupcakeData));
      $("#cupcakesList").append(newCupcake);

      // appendCupcakeSizeImg(cupcakeData);
    }
  }


$("#newCupcakeForm").on("submit", async function(e){
    e.preventDefault();

    let flavor = $("#form_flavor").val()
    let rating = $("#form_rating").val();
    let size = $("#form_size").val();
    let image = $("#form_image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(createCupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcakesList").append(newCupcake);
    $("#newCupcakeForm").trigger("reset");
});


$("#cupcakesList").on("click", ".delete-button", async function(e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});



$(showInitialCupcakes);  
  