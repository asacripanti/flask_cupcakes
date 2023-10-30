const BASE_URL = "http://127.0.0.1:5000/api";

function createCupcakeHTML(cupcake){
    return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
}

async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);
  
    for (let cupcakeData of response.data.cupcakes) {
      let newCupcake = $(createCupcakeHTML(cupcakeData));
      $("#cupcakesList").append(newCupcake);
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
  