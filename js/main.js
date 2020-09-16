let productData;
let productHTML;
let filterdData;
let noResults = `<h3 style="text-align:center"> No Results found! </h3> `;
let newSearch = false;
fetch('http://localhost:3000/jsonArray')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    productData = data;
    filterdData = productData;
    setTimeout(paginationInit(productData),3000);
  })
  .catch((err) => {
    alert('Error Fetching data');
  });


  document.getElementById("collection").addEventListener("change",collectionFilter, false);
  document.getElementById("color").addEventListener("change",colorFilter, false);
  document.getElementById("category").addEventListener("change",categotyFilter, false);
  document.getElementById("customRange2").addEventListener("click", rangeFilter, false);

  function collectionFilter() {
    let collect = document.getElementById("collection").value;
    if (collect !== 0){
      filterdData = productData.filter(item => item.collection === collect);
    }
    newSearch = true;
    setTimeout(paginationInit(filterdData),3000);
  }

  function colorFilter() {
    let color = document.getElementById("color").value;
    if (color !== 0){
      filterdData = productData.filter(item => item.color === color);
    }
    newSearch = true;
    setTimeout(paginationInit(filterdData),3000);
  }

  function categotyFilter() {
    let category = document.getElementById("category").value;
    if (category !== 0){
      filterdData = productData.filter(item => item.category === category);
    }
    newSearch = true;
    setTimeout(paginationInit(filterdData),3000);
  }

  function rangeFilter() {
    let range = document.getElementById("customRange2").value;
    console.log(range);
    filterdData = productData.filter(item => item.price <= range);
    newSearch = true;
    setTimeout(paginationInit(filterdData),3000);
  }  

  function showProduct() {
    const pName = document.getElementById('productName').value;
    const pDetails = productData.filter(item => item.name === pName);
    return pDetails[0];
}

  function showData(actualData) {
    if (newSearch === true) {
      $('.product-list').empty();
    }
    productHTML = actualData.length > 0 ? actualData.map(product =>
      `<li class="item">
        <div class="product-img">
            <a onclick='imagePop()' style="cursor: pointer;">
            <img src="${product.img}" style="width:300px;height:300px;" class="w-100" alt="" id="productImg" />
            </a>
        </div>
        <div class="product-description">
            <p class="product-name m-0" id="productName">${product.name}</p>
            <p class="product-category d-flex justify-content-between m-0 text-uppercase">
                ${product.category}
                <span>$${product.price}</span></p>
            <div class="product-category d-flex justify-content-between align-items-center">
                <div class="star">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <a href="#">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                </a>
            </div>
        </div>
      </li>`
    ): '';
    if (productHTML.length > 0) {
      $('.product-list').append(productHTML);
    } else {
      $('.product-list').append(noResults);
    }
  }

  function imagePop() {
  popUp = `<section class="bg-light text-muted py-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
          <img src="./images/1.jpg" style="width:400px;height:350px;" alt="" class="img-fluid mb-3">
      </div>
      <div class="col-md-6">
          <p>Kappu Regualr Chair</p>
          <h3>Scandanavian Collection</h3>
          <p class="py-2">Vass Shoes make handcrafted men's shoes in the heart of Budapest. I made a concept
              product page for practice which in my opinion represents their qualities better than
              their current site.
          </p>
          <p class="mt-30">Color</p>
          <ul class="justify-content-start p-0" style="list-style-type: none; display: inline-flex;">
              <li><i class="fa fa-circle" aria-hidden="true"></i>
              </li>
              <li class="px-2">
                  <i class="fa fa-check-circle-o" aria-hidden="true"></i>
              </li>
          </ul>
          <p class="mt-100">
              Price per unit
          </p>
          <ul class="justify-content-start p-0" style="list-style-type: none; display: inline-flex;">
              <li class="pt-2">
                  <strong>$2,600</strong>
              </li>
              <li class="px-4">
                  <button class="btn btn-dark">Buy now</button>
              </li>
              <li class="pt-2">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </li>
          </ul>
      </div>
    </div>
  </div>
</section>`;
  $('.main').empty();
  $('.main').append(popUp);
}

function paginationInit(actualData) {
  setTimeout(showData(actualData),500);
  const PAGEOBJECT = {
    elements: document.querySelectorAll('.item'),
    paginator: document.getElementById('paginator'),
    page: 1,
    per_page: 6,
  }
  
  const showPage = (p) => {
    let selected = [];
    PAGEOBJECT.elements.forEach(el => selected.push(el));
    selected = selected.splice((p - 1) * PAGEOBJECT.per_page, PAGEOBJECT.per_page);
    PAGEOBJECT.elements.forEach(el => el.style.display = "none")
    selected.forEach(el => el.style.display = "")
    showPagination()
  }
  
  const nextPage = () => {
    const pages = Math.ceil(PAGEOBJECT.elements.length / PAGEOBJECT.per_page)
    if (PAGEOBJECT.page < pages) {
      PAGEOBJECT.page++
      showPage(PAGEOBJECT.page)
    }
  }

  const prevPage = () => {
  
    if (PAGEOBJECT.page > 1) {
      PAGEOBJECT.page--
      showPage(PAGEOBJECT.page)
    }
  }
  
  const showPagination = () => {
    const pages = Math.ceil(PAGEOBJECT.elements.length / PAGEOBJECT.per_page)
    PAGEOBJECT.paginator.innerHTML = '';
    PAGEOBJECT.paginator.innerHTML += `<span id="prev"><i class="fa fa-angle-left" aria-hidden="true">
    </i></span>`;
    let i = 0;
    for (i; i < pages; i++) {
      if (i + 1 === PAGEOBJECT.page) {
        PAGEOBJECT.paginator.innerHTML += `<span class="active">${i + 1}</span>`;   
      } else {
        PAGEOBJECT.paginator.innerHTML += `<span>${i + 1}</span>`;
      }
    }
    PAGEOBJECT.paginator.innerHTML += `<span id="next"><i class="fa fa-angle-right" aria-hidden="true">
    </i></span>`;
    document.getElementById("next").addEventListener("click",nextPage,false);
    document.getElementById("prev").addEventListener("click",prevPage,false);
  }
  showPage(PAGEOBJECT.page);
}