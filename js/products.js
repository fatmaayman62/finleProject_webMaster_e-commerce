let shopping_list_fatma;

if (localStorage.getItem("shppping_list")) {
  shopping_list_fatma = JSON.parse(localStorage.getItem("shppping_list"));
  show_product_inSidebar_fatma();
  counter_shoppingList_fatma();
} else {
  shopping_list_fatma = [];
}

//start function to get products
async function getProducts_fatma() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let data = await response.json();
  console.log(data.data);
  display_products_fatma(data.data);
}
//end function to get products

getProducts_fatma();

//start function to display products
function display_products_fatma(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].imageCover);
    cartona += `
          <div class="col-3">
              <div class="box_fatma text-center mb-2">
                <figure>
                  <img
                    class="w-100 h-100"
                    src="${data[i].imageCover}"
                    alt="img product"
                  />
                </figure>
                <div
                  class="details_product_fatma mb-2 d-flex justify-content-between"
                >
                  <h2 class="h6">${data[i].title
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}</h2>
                  <span>${data[i].price}$</span>
                </div>
                <div
                  class="details_product_fatma d-none justify-content-between"
                >
                  <p class="mb-1">rating</p>
                  <span>${data[i].ratingsAverage} <i class="fa-solid fa-star text-warning"></i></span>
                </div> 
                <div
                  class="btn btn-brown-fatma w-100"
                  onclick="click_add_product_fatma(this)"
                >
                  add to cart
                </div>
              </div>
            </div>
    `;
  }
  document.querySelector(".products_fatma .row").innerHTML = cartona;
  click_img_product_fatma();
}
//end function to display products

// start when click on any img product
function click_img_product_fatma() {
  let all_products_fatma = Array.from(document.querySelectorAll(".box_fatma"));

  all_products_fatma.forEach((item) => {
    item.children[0].children[0].addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("imgs", item.children[0].children[0]);
      let cartona = ` 
      <div class="w-50 h-50  bg-light rounded-5 p-4 box_fatma">
      <figure class="w-50 h-50 mx-auto">
      ${item.children[0].children[0].outerHTML}
      </figure>
      <div class="details_product_fatma d-flex justify-content-between">
        ${item.children[1].children[0].outerHTML}
        ${item.children[1].children[1].outerHTML}
      </div>
      <div class="details_product_fatma mb-3 d-flex justify-content-between">
        ${item.children[2].children[0].outerHTML}
        ${item.children[2].children[1].outerHTML}
      </div> 

      ${item.children[3].outerHTML}
    </div>
`;
      console.log(cartona);
      document.querySelector(".container_product_fatma").innerHTML = cartona;
      document
        .querySelector(".show_detail_fatma")
        .classList.remove("display_none_fatma");
    });
  });
}

 

//////////////////////////////////////////////////////

document.querySelector(".show_detail_fatma").addEventListener("click", (e) => {
  e.stopPropagation();
  if (
    !document
      .querySelector(".container_product_fatma .box_fatma")
      .contains(e.target)
  ) {
    document
      .querySelector(".show_detail_fatma")
      .classList.add("display_none_fatma");
  }
});
// end when click on any img product

// start sidebar

// start toggle sidebar
function toggle_sidebar_fatma() {
  document
    .querySelector(".sidebar_showProducts_shopping_fatma aside")
    .classList.toggle("display_none_fatma");
}
// end toggle sidebar

// start when click btn add to cart

function counter_shoppingList_fatma() {
  let x;

  if (shopping_list_fatma.length === 0) {
    document.querySelector(".cart_counter_fatma").classList.add("d-none");
  } else {
    document.querySelector(".cart_counter_fatma").classList.remove("d-none");
  }

  x = shopping_list_fatma.length;
  document.querySelector(".cart_counter_fatma").textContent = x;
}
function click_add_product_fatma(btn) {
  let flag=false;
    let allproducts = Array.from(document.querySelectorAll("aside .box_fatma"));
    for(let i=0;i<allproducts.length;i++){
  
      if(allproducts[i].children[0].children[0].src ==btn.parentElement.children[0].children[0].src  ){
        flag=true;
      }
    }

    if(!flag){
      // increase_numProduct_fatma(x) 
      add_product_inSidebar_fatma(btn.parentElement);
    }
}

function add_product_inSidebar_fatma(product) {
  let cartona = `
    <div class="box_fatma text-center mb-2 mx-4 my-2 position-relative">
            <figure>
               ${product.children[0].children[0].outerHTML}
            </figure>
           <div class="w-100 mx-2">
             <div class="details_product_fatma d-flex justify-content-between">
               ${product.children[1].children[0].outerHTML}
               ${product.children[1].children[1].outerHTML}
            </div>
            <div class="details_product_fatma d-flex justify-content-between">
               ${product.children[2].children[0].outerHTML}
               ${product.children[2].children[1].outerHTML}
               </div>
                    <div
                  class="btns  w-100" 
                > 
                  <button class="btn btn-brown-fatma number_products">1</button>
                  <button class="btn btn-brown-fatma" onclick="increase_numProduct_fatma(this)"><i class="fa-solid fa-plus"></i></button>
                  <button class="btn btn-brown-fatma" onclick="decrease_numProduct_fatma(this)"><i class="fa-solid fa-minus"></i></button>
                </div>
               <i class="fa-solid fa-close position-absolute end-0 top-0" onclick="removeProduct_fatma(this)"></i>
           </div>
             
    </div>
  `;
  shopping_list_fatma.push(cartona);
  localStorage.setItem("shppping_list", JSON.stringify(shopping_list_fatma));
  show_product_inSidebar_fatma();
  counter_shoppingList_fatma();
}

function show_product_inSidebar_fatma() {
  let container = ``;
  for (let i = 0; i < shopping_list_fatma.length; i++) {
    container += `
    ${shopping_list_fatma[i]}
    `;
  }

  document.querySelector(
    ".sidebar_showProducts_shopping_fatma aside"
  ).innerHTML = container;
}
// end when click btn add to cart

function removeProduct_fatma(btn) {
  console.log(shopping_list_fatma);
  let box_remove = btn.parentElement.parentElement;
  box_remove.remove();
  let allproducts = Array.from(document.querySelectorAll("aside .box_fatma"));

  shopping_list_fatma = allproducts.map(
    (item) =>
      `<div class="box_fatma text-center mb-2 mx-4 my-2 position-relative">
       ${item.innerHTML}
    </div>`
  );
  localStorage.setItem("shppping_list", JSON.stringify(shopping_list_fatma));
  counter_shoppingList_fatma();

  console.log(allproducts, shopping_list_fatma);
}

function increase_numProduct_fatma(x) {
  let btn = x.parentElement.children[0];
  let num = btn.textContent;
  num = Number(num) + 1;
  btn.textContent = num;
  let allproducts = Array.from(document.querySelectorAll("aside .box_fatma"));

  shopping_list_fatma = allproducts.map(
    (item) =>
      `<div class="box_fatma text-center mb-2 mx-4 my-2 position-relative">
       ${item.innerHTML}
    </div>`
  );
  localStorage.setItem("shppping_list", JSON.stringify(shopping_list_fatma));
  console.log(num);
}
function decrease_numProduct_fatma(x) {
  let btn = x.parentElement.children[0];
  let num = btn.textContent;
  if (num !== "1") {
    num = Number(num) - 1;
    btn.textContent = num;

    let allproducts = Array.from(document.querySelectorAll("aside .box_fatma"));

    shopping_list_fatma = allproducts.map(
      (item) =>
        `<div class="box_fatma text-center mb-2 mx-4 my-2 position-relative">
       ${item.innerHTML}
    </div>`
    );
    localStorage.setItem("shppping_list", JSON.stringify(shopping_list_fatma));
    console.log(num);
  }
}
// end sidebar
