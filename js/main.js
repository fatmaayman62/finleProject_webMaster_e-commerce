let input_name_register_abdo = document.getElementById("name");
let input_email_register_abdo = document.getElementById("email");
let input_password_register_abdo = document.getElementById("password");
let input_Repassword_register_abdo = document.getElementById("Repassword");
 let check_reg_abdo={index1:1,index2:1,index3:1,index4:1};
let container_localStorage_abdo;

if (localStorage.getItem("user_register_abdo")) {
  container_localStorage_abdo = JSON.parse(
    localStorage.getItem("user_register_abdo")
  );
  document
    .querySelector(".logOut_icon_abdo")
    .classList.remove("display_none_abdo");
  document
    .querySelector(".register_icon_abdo")
    .classList.add("display_none_abdo");
} else {
  container_localStorage_abdo = [];
}
//start function slider
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  autoplay:{
    delay: 3000
  }
});
//end function slider

//start function to get products
async function getProducts_abdo() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let data = await response.json();
  console.log(data.data);
  display_products_abdo(data.data);
}
//end function to get products

getProducts_abdo();

//start function to display products
function display_products_abdo(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].imageCover);
    cartona += `
    <div class="swiper-slide box_abdo text-center">
    <img
    src="${data[i].imageCover}"
    class="img-fluid"
    />
    <span>${data[i].title.split(" ").slice(0, 2).join(" ")}</span>
    </div>
    `;
  }
  document.querySelector(".swiper-wrapper").innerHTML = cartona;
}
//end function to display products

//start function to get products
async function getShopCollection_abdo() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  let data = await response.json();
  console.log("nm", data.data);
  display_shopCollection_abdo(data.data);
}
//end function to get products

getShopCollection_abdo();

//start function to display shops
function display_shopCollection_abdo(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].imageCover);
    cartona += `
   <div class="col-lg-4 col-md-6 col-12">
               <div>
                <figure class="rounded-3 text-center position-relative">
                  <img
                    class="rounded-3"
                    src="${data[i].image}"
                    alt="img1"
                  />
                  <span class="position-absolute bg-white py-1 px-3 rounded-2">${data[i].name}</span>
                </figure>
               </div>
              </div>
    `;
  }
  document.querySelector(".shop_collection_abdo .row").innerHTML = cartona;
}
//end function to display shops

// start register page
let register_btn_abdo = document.querySelector(".register_icon_abdo");
let register_form_btn_abdo = document.querySelector(".register_form_btn_abdo");

document.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!document.querySelector(".register_abdo form").contains(e.target)) {
    document.querySelector(".register_abdo").classList.add("display_none_abdo");
  }
});

register_btn_abdo.addEventListener("click", (e) => {
  e.stopPropagation();

  document
    .querySelector(".register_abdo")
    .classList.remove("display_none_abdo");
});
 
function stored_data_abdo() {
  let cartona = {
    name: input_name_register_abdo.value,
    email: input_email_register_abdo.value,
    password: input_password_register_abdo.value,
    repassword: input_Repassword_register_abdo.value,
  };

  container_localStorage_abdo.push(cartona);

  input_name_register_abdo.value = "";
  input_email_register_abdo.value = "";
  input_password_register_abdo.value = "";
  input_Repassword_register_abdo.value = "";
}

input_name_register_abdo.addEventListener("keyup", (e) => {
  e.stopPropagation();

  let name_warning = document.querySelector(".name_warnig_reg_abdo");
  let value = input_name_register_abdo.value.trim();
  let pattern = /^[a-z]/i;

  if (value === "") {
    name_warning.innerHTML = "This input is required";
  } else if (!pattern.test(value)) {
    name_warning.innerHTML = "Must start with a letter";
  } else {
    name_warning.innerHTML = "";
    check_reg_abdo.index1=0;
    
  }
});


input_email_register_abdo.addEventListener("keyup", (e) => {
  e.stopPropagation();

  let email_warning = document.querySelector(".email_warnig_reg_abdo");
  let value = input_email_register_abdo.value.trim();
  let pattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  if (value === "") {
    email_warning.innerHTML = "this input required";
  } else if (!pattern.test(value)) {
    email_warning.innerHTML = "email must like this test@example.com";
  } else {
    email_warning.innerHTML = ""; 
    check_reg_abdo.index2=0;
  }
});

 
  
input_password_register_abdo.addEventListener("keyup", (e) => {
  e.stopPropagation();

  let pattern = /^[0-9]{5,8}/;
  let password_warning = document.querySelector(".password_warnig_reg_abdo");
  if (input_password_register_abdo.value.trim() == "") {
    password_warning.innerHTML = "this input required";
  } else if (!pattern.test(input_password_register_abdo.value.trim())) {
    password_warning.innerHTML = "must min letter 5 max 8";
  } else {
    password_warning.innerHTML = ""; 
     check_reg_abdo.index3=0;
  }
});


input_Repassword_register_abdo.addEventListener("keyup", (e) => {
  e.stopPropagation();

  let repassword_warning = document.querySelector(".repassword_warnig_reg_abdo");

  if (input_Repassword_register_abdo.value.trim() == "") {
    repassword_warning.innerHTML = "this input required";
  } else if (input_Repassword_register_abdo.value.trim() !== input_password_register_abdo.value.trim() ) {
    repassword_warning.innerHTML = "not matched";
  } else {
    repassword_warning.innerHTML = "";
   check_reg_abdo.index4=0;
  }
});


register_form_btn_abdo.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
 
  if(check_reg_abdo.index1 == 0 && check_reg_abdo.index2 == 0 && check_reg_abdo.index3==0 && check_reg_abdo.index4 ==0){
    document.querySelector(".reg_message_abdo").classList.add('d-none');

    document
      .querySelector(".register_abdo")
      .classList.add("display_none_abdo");
    document.querySelector(".login_abdo").classList.remove("display_none_abdo");
    stored_data_abdo();
  }else{
    document.querySelector(".reg_message_abdo").innerHTML="please complete all inputs";
    document.querySelector(".reg_message_abdo").classList.remove('d-none');
  }
 

});

// end register page 

// start login page
let login_form_btn_abdo = document.querySelector(".login_form_btn_abdo");

document.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!document.querySelector(".login_box_abdo form").contains(e.target)) {
    document.querySelector(".login_abdo").classList.add("display_none_abdo");
  }
});

login_form_btn_abdo.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  let email = document.getElementById("email_login").value;
  let password = document.getElementById("password_login").value;
  let flag=false;

  for (let i = 0; i < container_localStorage_abdo.length; i++) {
    if (
      container_localStorage_abdo[i].email === email &&
      container_localStorage_abdo[i].password === password
    ) {
      flag=true;
      document
        .querySelector(".logOut_icon_abdo")
        .classList.remove("display_none_abdo");
      document
        .querySelector(".register_icon_abdo")
        .classList.add("display_none_abdo");
      document.querySelector(".login_abdo").classList.add("display_none_abdo");

      localStorage.setItem(
        "user_register_abdo",
        JSON.stringify(container_localStorage_abdo)
      );

      i = container_localStorage_abdo.length;
      email = "";
      password = "";
      document.querySelector('.log_message_abdo').classList.remove('d-none');
      document.querySelector('.log_message_abdo').classList.add('d-none');

    }
  }

 
      if(!flag){
        document.querySelector('.log_message_abdo').classList.remove('d-none');
      document.querySelector('.log_message_abdo').innerHTML="incorrect login please try again";
   
      }

});

document.querySelector(".logOut_icon_abdo").addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  localStorage.removeItem("user_register_abdo");
  document
    .querySelector(".logOut_icon_abdo")
    .classList.add("display_none_abdo");
  document
    .querySelector(".register_icon_abdo")
    .classList.remove("display_none_abdo");
});

// end login page
