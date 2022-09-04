
// Blog start here-------------------------------------------------------------------------
document.getElementById('blogPost').addEventListener('click', function () {
  const blog = document.getElementById('blogView')
  const div = document.createElement('div')

  blog.innerHTML = ''

// Blog inter HTML here-------------------------------------------------------------------------
  div.innerHTML = `
    <div class="accordion col" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                What is the difference between let and var and const in javascript?
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Var: <br>
                Earlier only var is there and he is the king of variable declarations. But there are some issues associated with variables declared with var, though. That is why let and const introduced.
                <br>
                Var declarations are globally scoped or function scoped. That means if a variable is declared with var outside a function then it is in the global scope(accessible anywhere). Otherwise, if they are inside a function we can only access them inside the function.
                <br>
                Let:<br>
                It’s an enhanced version of var, it solves all the problems that come with the var keyword. Like, let is a block-scoped variable and we cannot re-declared but can be updated(re-assigned). You’ll see in the below example as it shows that let is preferable over var.
                <br>
                Here we can see that we can update the variable but cannot be re-declared that is why it throws an error and variables that are declared with let and const in block statements( if-else, while, for loop, etc..) are not accessible anywhere.
                <br>
                Const:<br>
                Const declarations share some similarities with let declarations, but const variables cannot be updated or re-declared. It maintains the constant values.
                Unlike var and let, if we are using const then it must be initialized at the same time when we declared the variable.
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                What is the difference between array function and normal function in javascript?
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Arrow function — also called fat arrow function— is a new feature introduced in ES6 that is a more concise syntax for writing function expressions. While both regular JavaScript functions and arrow functions work in a similar manner, there are certain differences between them.
                <br>
                Arrow functions do not have an arguments binding. However, they have access to the arguments object of the closest non-arrow parent function. Named and rest parameters are heavily relied upon to capture the arguments passed to arrow functions.
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Why we use template string in javascript?
            </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Template literals provide an easy way to interpolate variables and expressions
                into strings. The method is called string interpolation.Template literals are sometimes informally
                called template strings, because they are used most commonly for string interpolation (to create strings
                by doing substitution of placeholders). However, a tagged template literal may not result in a string;
                it can be used with a custom tag function to perform whatever operations you want on the different parts
                of the template literal.
            </div>
        </div>
    </div>
</div>
  `
  blog.appendChild(div)
})


// Get All Category from Api-----------------------------------------------------------------------------
const newsCategoriesLink = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    return data
  }
  catch (error) {
    console.log(error);
  }
  // 
  // const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
  // const data = await res.json()
  // return data
  //
}

// Add  All Category Item And Set Them To The Button-------------------------------------------------------------------------
const displayAllNewsCategories = async () => {
  const newsCategories = await newsCategoriesLink()
  const newsCategorie = newsCategories.data.news_category;
  // console.log(newsCategorie);
  const menu = document.getElementById('newsCategories')
  // console.log(menu);
  
  for (const categorie of newsCategorie) {
    // console.log(categorie);
    // console.log(categorie.category_id);
    
    // Add Button In All Category Item-------------------------------------------------------------------------
    const li = document.createElement('li')
    li.innerHTML = `
            <a onclick="LoadTotalNewsDetaild('${categorie.category_id}')" class="text-decoration-none px-4 text-black-50" type="button" >${categorie.category_name}</a>
            `
            menu.appendChild(li);       
            // console.log(li.innerText);
  }
}
// newsCategoriesLink()
displayAllNewsCategories()


// Get All Button Post Items Forom Another Api-------------------------------------------------------------------------
const LoadTotalNewsDetaild = async (id) => {
  // spiner  start---------------------------------------------------------------------------------------------
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  try {
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryDetails(data.data))
  }
  catch (error) {
    console.log(error);
  }
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayCategoryDetails(data.data))
  
}

// Create A Function to Get Category Input-------------------------------------------------------------------------
const displayCategoryDetails = category => {
  
  category.sort(function (a, b) {
    return b.total_view - a.total_view
  });
  // console.log(cat);
  const catCountElemnet = document.getElementById('categoryInputCount');
 
 
  // data found---------------------------------------------------------------
  if (category.length === 0) {
    catCountElemnet.innerText = ('No data found')
  }
  else {
    catCountElemnet.innerText = (category.length + ' ' + 'items Found in this category');
  }


  const categoryDetails = document.getElementById('categoryDetails');
  const div = document.createElement('div')



  // spinner stop here ------------------------------------------------------------------------
  spinner.classList.add('d-none')
  
  // Category Card Styling  ------------------------------------------------------------------------

  categoryDetails.innerHTML = ``;
  category.forEach(category => {
    const catDiv = document.createElement('div');
    catDiv.classList.add('col');
    catDiv.innerHTML = `  
      <div class="card mb-3 " style="max-width: 1200px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${category.image_url ? category.image_url : 'Image Not Found'}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${category.title ? category.title : 'Title Not Found'}</h5>
              <p class="card-text">${category.details.slice(0, 300) ? category.details.slice(0, 300) : 'Describtion Not Found'}...</p>
              <img src="${category.author.img ? category.author.img : 'Author Image Not Found'}" class="thumbnail-img" alt="...">
              <span >${category.author.name ? category.author.name : 'Author Name Not Found '}</span>
              <span class="mr-5 ps-5">View: ${category.total_view ? category.total_view : 'Total View Not Found'}</span>
              <button id="modal-btn" onclick="modalDetails('${category._id}')" type="button" class="btn btn-primary ms-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Show Details
            </button>
            </div>
          </div>
        </div>
      </div>
      `;
    categoryDetails.appendChild(catDiv);
  });
}
const modalDetails = categoryDetails_Id => {
  const url = `https://openapi.programming-hero.com/api/news/${categoryDetails_Id}`

  fetch(url)
    .then(Response => Response.json())
    .then(data => showModalDetails(data.data[0]))
}



const showModalDetails = modalInfo => {
  const modaltitle = document.getElementById('modalTittle')
  modaltitle.innerText = `${modalInfo.title}`

  const modal = document.getElementById('modalBody');
  modal.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = `
   <img src="${modalInfo.image_url ? modalInfo.image_url : 'Image Not Found'}" class="img-fluid rounded-start" alt="...">
  <p class="card-text m-5">${modalInfo.details.slice(0, 500) ? modalInfo.details.slice(0, 300) : 'Describtion Not Found'}...</p>
  <div class='d-flex'>
    <img src="${modalInfo.author.img ? modalInfo.author.img : 'Author Image Not Found'}" class="thumbnail-img" alt="...">
    <div class='d-flex'>
      <div></div>
      <p>Author Name: ${modalInfo.author.name} </p>
        <p>${modalInfo.author.published_date ? modalInfo.author.published_date : 'Publish Date Not Found'} </p>
      <span class="mr-5 ps-5">View: ${modalInfo.total_view ? modalInfo.total_view : 'Total View Not Found'}</span>
    </div>
  </div>

    `;
  modal.appendChild(div)
}

modalDetails()




displayCategoryDetails()
LoadTotalNewsDetaild()





/*

// Blog start here-------------------------------------------------------------------------
document.getElementById('blogPost').addEventListener('click', function () {
  const blog = document.getElementById('blogView')
  const div = document.createElement('div')

  blog.innerHTML = ''

// Blog inter HTML here-------------------------------------------------------------------------
  div.innerHTML = `
    <div class="accordion col" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                What is the difference between let and var and const in javascript?
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Var: <br>
                Earlier only var is there and he is the king of variable declarations. But there are some issues associated with variables declared with var, though. That is why let and const introduced.
                <br>
                Var declarations are globally scoped or function scoped. That means if a variable is declared with var outside a function then it is in the global scope(accessible anywhere). Otherwise, if they are inside a function we can only access them inside the function.
                <br>
                Let:<br>
                It’s an enhanced version of var, it solves all the problems that come with the var keyword. Like, let is a block-scoped variable and we cannot re-declared but can be updated(re-assigned). You’ll see in the below example as it shows that let is preferable over var.
                <br>
                Here we can see that we can update the variable but cannot be re-declared that is why it throws an error and variables that are declared with let and const in block statements( if-else, while, for loop, etc..) are not accessible anywhere.
                <br>
                Const:<br>
                Const declarations share some similarities with let declarations, but const variables cannot be updated or re-declared. It maintains the constant values.
                Unlike var and let, if we are using const then it must be initialized at the same time when we declared the variable.
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                What is the difference between array function and normal function in javascript?
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Arrow function — also called fat arrow function— is a new feature introduced in ES6 that is a more concise syntax for writing function expressions. While both regular JavaScript functions and arrow functions work in a similar manner, there are certain differences between them.
                <br>
                Arrow functions do not have an arguments binding. However, they have access to the arguments object of the closest non-arrow parent function. Named and rest parameters are heavily relied upon to capture the arguments passed to arrow functions.
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Why we use template string in javascript?
            </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                Template literals provide an easy way to interpolate variables and expressions
                into strings. The method is called string interpolation.Template literals are sometimes informally
                called template strings, because they are used most commonly for string interpolation (to create strings
                by doing substitution of placeholders). However, a tagged template literal may not result in a string;
                it can be used with a custom tag function to perform whatever operations you want on the different parts
                of the template literal.
            </div>
        </div>
    </div>
</div>
  `
  blog.appendChild(div)
})


// Get All Category from Api-----------------------------------------------------------------------------
const newsCategoriesLink = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    return data
  }
  catch (error) {
    console.log(error);
  }
  // 
  // const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
  // const data = await res.json()
  // return data
  //
}

// Add  All Category Item And Set Them To The Button-------------------------------------------------------------------------
const displayAllNewsCategories = async () => {
  const newsCategories = await newsCategoriesLink()
  const newsCategorie = newsCategories.data.news_category;
  // console.log(newsCategorie);
  const menu = document.getElementById('newsCategories')
  // console.log(menu);
  
  for (const categorie of newsCategorie) {
    // console.log(categorie);
    // console.log(categorie.category_id);
    
    // Add Button In All Category Item-------------------------------------------------------------------------
    const li = document.createElement('li')
    li.innerHTML = `
            <a onclick="LoadTotalNewsDetaild('${categorie.category_id}')" class="text-decoration-none px-4 text-black-50" type="button" >${categorie.category_name}</a>
            `
            menu.appendChild(li);       
            // console.log(li.innerText);
  }
}
// newsCategoriesLink()
displayAllNewsCategories()


// Get All Button Post Items Forom Another Api-------------------------------------------------------------------------
const LoadTotalNewsDetaild = async (id) => {
  // spiner  start---------------------------------------------------------------------------------------------
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  try {
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryDetails(data.data))
  }
  catch (error) {
    console.log(error);
  }
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayCategoryDetails(data.data))
  
}

// Create A Function to Get Category Input-------------------------------------------------------------------------
const displayCategoryDetails = category => {
  
  category.sort(function (a, b) {
    return b.total_view - a.total_view
  });
  // console.log(cat);
  const catCountElemnet = document.getElementById('categoryInputCount');
 
 
  // data found---------------------------------------------------------------
  if (category.length === 0) {
    catCountElemnet.innerText = ('No data found')
  }
  else {
    catCountElemnet.innerText = (category.length + ' ' + 'items Found in this category');
  }


  const categoryDetails = document.getElementById('categoryDetails');
  const div = document.createElement('div')



  // spinner stop here ------------------------------------------------------------------------
  spinner.classList.add('d-none')
  
  // Category Card Styling  ------------------------------------------------------------------------

  categoryDetails.innerHTML = ``;
  category.forEach(category => {
    const catDiv = document.createElement('div');
    catDiv.classList.add('col');
    catDiv.innerHTML = `  
      <div class="card mb-3 " style="max-width: 1200px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${category.image_url ? category.image_url : 'Image Not Found'}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${category.title ? category.title : 'Title Not Found'}</h5>
              <p class="card-text">${category.details.slice(0, 300) ? category.details.slice(0, 300) : 'Describtion Not Found'}...</p>
              <img src="${category.author.img ? category.author.img : 'Author Image Not Found'}" class="thumbnail-img" alt="...">
              <span >${category.author.name ? category.author.name : 'Author Name Not Found '}</span>
              <span class="mr-5 ps-5">View: ${category.total_view ? category.total_view : 'Total View Not Found'}</span>
              <button type="button" class="btn btn-success ms-5 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
              
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${category.title ? category.title : 'Title Not Found'}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <img src="${category.image_url ? category.image_url : 'Image Not Found'}" class="img-thumbnail" alt="...">
                          <p class="card-text">${category.details.slice(0, 300)}...? ${category.details.slice(0, 300)}... : 'Category Not Found'</p>
                          <img src="${category.author.img ? category.author.img : 'Author Image Not Found'}" class="thumbnail-img" alt="...">
                          <span >${category.author.name ? category.author.name : 'Author Name Not Found '}</span>
                          <span class="mr-5 ps-5">View: ${category.total_view ? category.total_view : 'Total View Not Found'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      `;
    categoryDetails.appendChild(catDiv);
  });
}




displayCategoryDetails()
LoadTotalNewsDetaild()
*/