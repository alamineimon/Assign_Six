const newsCategoriesLink = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    return data
}

const displayAllNewsCategories = async () => {
    const newsCategories = await newsCategoriesLink()
    const newsCategorie = newsCategories.data.news_category;
    // console.log(newsCategorie);
    const menu = document.getElementById('newsCategories')
    for (const categorie of newsCategorie) {
        // console.log(categorie.category_name);

        const li = document.createElement('li')
        li.innerHTML = `
            <a class="text-decoration-none px-4 text-black-50" type="button" >${categorie.category_name}</a>
            `
        menu.appendChild(li);

    }
}
// newsCategoriesLink()
displayAllNewsCategories()




document.getElementById('blogField').addEventListener('click', function () {
    const blog = document.getElementById('blogDisplay')
    const div = document.createElement('div')
    div.classList.add('div')
    div.innerHTML = `
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Difference between var, let and const keywords in JavaScript
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
             <strong>Var :</strong>
            Before the advent of ES6, var declarations ruled. There are issues associated with variables declared with var, though. That is why it was necessary for new ways to declare variables to emerge. First, let's get to understand var more before we discuss those issues.
            <br>
             <strong>Let :</strong>
            let is now preferred for variable declaration. It's no surprise as it comes as an improvement to var declarations. It also solves the problem with var that we just covered.
            <br>
             <strong>Const :</strong>
            Variables declared with the const maintain constant values. const declarations share some similarities with let declarations.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Difference between array function and normal function in javascript?
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            According to MDN, An arrow function expression is a syntactically compact alternative to a regular function expression, although without its own bindings to the this, arguments, super, or new.target keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.
            <br>
            <strong>No own this bindings</strong>
            <br>
            Arrow functions do not have their own this value. The value of this inside an arrow function is always inherited from the enclosing scope.
            <br>
            <strong>Arrow functions do not have a arguments array</strong>
            <br>
            In JS arguments array in functions is a special object that can be used to get all the arguments passed to the function. Similar to this, arrow functions do not have their own binding to a arguments object, they are bound to arguments of enclosing scope.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Why we use template string in javascript?
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            Before ES6, you use single quotes (') or double quotes (") to wrap a string literal. And the strings have very limited functionality.
            <br>
            To enable you to solve more complex problems,ES6 template literals provide the syntax that allows you to work with strings more safely and cleanly.
            <br>
            At this point, a template literal is just like a better version of a regular JavaScript string. The big difference between a template literal and a regular string is substitutions.
            <br>
            The substitutions allow you to embed variables and expressions in a string. The JavaScript engine will automatically replace these variables and expressions with their values. This feature is known as string interpolation.
        </div>
      </div>
    </div>
  </div>
    `
    blog.appendChild(div)
})

// newsLink()



const newsLink = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/category/01')
    const data = await res.json()
    // return data
    console.log(data.data[2]);
}
newsLink()
