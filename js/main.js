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
    setTimeout(paginationInit(productData),1000);
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
    setTimeout(paginationInit(filterdData),1000);
  }

  function colorFilter() {
    let color = document.getElementById("color").value;
    if (color !== 0){
      filterdData = productData.filter(item => item.color === color);
    }
    newSearch = true;
    setTimeout(paginationInit(filterdData),1000);
  }

  function categotyFilter() {
    let category = document.getElementById("category").value;
    if (category !== 0){
      filterdData = productData.filter(item => item.category === category);
    }
    newSearch = true;
    setTimeout(paginationInit(filterdData),1000);
  }

  function rangeFilter() {
    let range = document.getElementById("customRange2").value;
    console.log(range);
    filterdData = productData.filter(item => item.price <= range);
    newSearch = true;
    setTimeout(paginationInit(filterdData),1000);
  }  

  function showData(actualData) {
    if (newSearch === true) {
      $('.product-list').empty();
    }
    productHTML = actualData.length > 0 ? actualData.map(product =>
      `<li class="item">
        <div class="product-img">
            <img src="${product.img}" style="width:300px;height:300px;" class="w-100" alt="" />
        </div>
        <div class="product-description">
            <p class="product-name m-0">${product.name}</p>
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
    if (productHTML.length>0) {
      $('.product-list').append(productHTML);
    } else {
      $('.product-list').append(noResults);
    }
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