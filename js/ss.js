let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btn = document.getElementById("btn");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let delAll = document.getElementById("delAll");
let mood = "create";
let defSearch = "title";
let node;

function totalPrice() {
  if (price.value != "") {
    total.style.backgroundColor = "yellow";
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

btn.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
    if (mood == "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct)
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[node] = newProduct;
      count.style.display = "block";
      btn.innerText = "Create";
      mood = "create";
  }
  localStorage.setItem("product", JSON.stringify(dataProduct));
  showData()
  clear()
}


function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "red";
  count.value = "";
  category.value = "";
}

function showData() {
  totalPrice();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    let adds = (+dataProduct[i].taxes + +dataProduct[i].ads - +dataProduct[i].discount);
    table += `
     <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${adds}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button class="btn" onclick=updateData(${i})>update</button></td>
            <td><button class="btn" onclick=deletePro(${i}) >delete</button></td>
     </tr>
     `;
  }
  tbody.innerHTML = table;
  if (dataProduct.length > 0) {
    delAll.innerHTML = `
    <button class="m-2 btn w-100" onclick=deleteAll()>Delete All (${dataProduct.length})</button>
    `;
  } else {
    delAll.innerHTML = "";
  }
}
showData();

function deletePro(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataProduct = "";
  showData();
}

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  totalPrice();
  category.value = dataProduct[i].category;
  btn.innerText = "Update";
  count.style.display = "none";
  mood = "update";
  node = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function searchBy(id) {
  if (id == "search By Title") {
    defSearch = "title";
  } else {
    defSearch = "category";
  }
  search.placeholder = id;
  search.focus();
  search.value = "";
  showData();
}

function getSearch(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (defSearch == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
     <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick=updateData(${i})>update</button></td>
            <td><button id="btn" onclick=deletePro(${i}) >delete</button></td>
     </tr>
     `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
     <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick=updateData(${i})>update</button></td>
            <td><button id="btn" onclick=deletePro(${i}) >delete</button></td>
     </tr>`;
      }
    }
    tbody.innerHTML = table;
  }
}
