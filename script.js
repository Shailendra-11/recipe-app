
const searchbox = document.querySelector(".searchbox")
const btn = document.querySelector(".btn")
const recipecontainer = document.querySelector(".recipe-container")
const closebtn = document.querySelector(".recipe-closebtn")
// const recipeConatiner = document.querySelector(".recipe-details")
const recipeDeatailsConatiner = document.querySelector(".recipe-deatails-content")

// console.log(recipecontainer);

const fetchReecipes = async (query) => {
    recipecontainer.innerHTML = " <h2>Fetching Recipe...</h2>"
   
   try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    //  console.log(response);
    recipecontainer.innerHTML = " "
    response.meals.forEach(meal => {
        // console.log(meal);
        const recipeDev = document.createElement('div');
        recipeDev.classList.add('recipe');
        recipeDev.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs <span>${meal.strCategory}</snap> Category</p>
         `
        //  <a href="${meal.strYoutube}" target="_blank">Link-Youtube</a>
        const button = document.createElement('button');
        button.textContent = "View Recipe"
        recipeDev.appendChild(button);
        //   adding addEventListener to recipe button
        button.addEventListener('click', (e) => {
            e.preventDefault();
            opnepopRecipe(meal);
        });
        recipecontainer.appendChild(recipeDev);

    });
} 
catch (error) {
    recipecontainer.innerHTML = " <h2> Error in Fetching Recipe....</h2>"
}
}
const opnepopRecipe = (meal) => {
    recipeDeatailsConatiner.innerHTML = `
       <a class="a" href="${meal.strYoutube}" target="_blank">Link-Youtube</a>
          <h2 class="recipename">${meal.strMeal}</h2>
          <h3 class="intgredents">Intgredents:</h3>
           <ul class="ingredientList">${fetchIngredinet(meal)}</ul>
           <div class="recipeInstructions">
            <h3> Instruction:</h3>
            <p>${meal.strInstructions}</p>
            </div>
       `
    recipeDeatailsConatiner.parentElement.style.display = "block";

}
// function to fetch ingredient and measurment
const fetchIngredinet = (meal) => {
    // console.log(meal);
    let ingredients_list = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredients_list += `<li>${measure}${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredients_list;
}

closebtn.addEventListener('click' ,(e) =>{
    //  e.preventDefault();
    recipeDeatailsConatiner.parentElement.style.display ="none";
})
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
      if (!searchInput) {
          recipecontainer.innerHTML =`
          <h2> Type the meal in the search box. </h2>`
          return;
      }
    fetchReecipes(searchInput);
    //  console.log("button-click");
})

