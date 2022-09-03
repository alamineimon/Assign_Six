
const newsCategoriesLink = async () => {
  // try {
  //   const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
  //   const data = await res.json()
  //   return data
  // }
  // catch (error) {
  //   console.log(error);
  // }
  // 
  const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
  const data = await res.json()
  return data
  //
}

const displayAllNewsCategories = async () => {
  const newsCategories = await newsCategoriesLink()
  const newsCategorie = newsCategories.data.news_category;
  // console.log(newsCategorie);
  const menu = document.getElementById('newsCategories')
  // console.log(menu);
  for (const categorie of newsCategorie) {
    // console.log(categorie);
    // console.log(categorie.category_id);

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



const LoadTotalNewsDetaild = async (id) => {

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  // try {
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayCategoryDetails(data.data))
  // }
  // catch (error) {
  //   console.log(error);
  // }

  fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryDetails(data.data))

}


document.getElementById('blogPost').addEventListener('click', function () {
  const blog = document.getElementById('blogView')
  const div = document.createElement('div')
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
                <strong>Ans: </strong> The scope of a var variable is functional scope. The scope of a let variable is
                block scope. The scope of a const variable is block scope. It can be updated and re-declared into the
                scope.
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
                <strong>Ans:</strong> In regular JavaScript functions, arguments keywords can be used to access the
                passed arguments when the function is invoked. But, arrow functions do not have their own arguments and
                it uses the arguments from the outer function.
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
                <strong>Ans:</strong> Template literals provide an easy way to interpolate variables and expressions
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


const displayCategoryDetails = category => {
  // console.log(cat);
  const catCountElemnet = document.getElementById('categoryInputCount');
  catCountElemnet.innerText = (category.length);


  const categoryDetails = document.getElementById('categoryDetails');
  // const div = document.createElement('div')
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
                          <p class="card-text">${category.details.slice(0, 300)}...? ${category.details.slice(0, 300)}... : 'Category Not Found'</p>
                          <img src="${category.author.img ? category.author.img : 'Author Image Not Found'}" class="thumbnail-img" alt="...">
                          <span >${category.author.name ? category.author.name : 'Author Name Not Found '}</span>
                          <span class="mr-5 ps-5">View: ${category.total_view ? category.total_view : 'Total View Not Found'}</span>
                          <button type="button" class="btn btn-success ms-5 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
    
                          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                      <h5 class="card-title">${category.title ? category.title : 'Title Not Found'}</h5>
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
                      </div>
                    </div>
                  </div>
                `;
    categoryDetails.appendChild(catDiv);
  });



}
displayCategoryDetails()

