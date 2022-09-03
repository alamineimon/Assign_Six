
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
      


                        </div>
                      </div>
                    </div>
                  </div>
                `;
    categoryDetails.appendChild(catDiv);
  });

  

}
displayCategoryDetails()

