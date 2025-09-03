//start function to get products
async function getShop_fatma() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  let data = await response.json();
  console.log("nm", data.data);
  display_shop_fatma(data.data);
}
//end function to get products

getShop_fatma();

//start function to display shops
function display_shop_fatma(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].imageCover);
    cartona += `
             <div class="col-3">
                <figure class="rounded-3 text-center position-relative">
                  <img
                    class="w-100 h-100 rounded-3"
                    src="${data[i].image}"
                    alt="img1"
                  />
                </figure>
              </div>
    `;
  }
  document.querySelector(".shop_fatma .row").innerHTML = cartona;
}
//end function to display shops