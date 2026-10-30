const nameInput = document.getElementById('recipe_name');
const ingredientsInput = document.getElementById('recipe_ingredients');

const ingredientIds = ['tomato', 'lemon', 'garlic', 'lime', 'mushroom', 'chilipepper', 'mayo', 'soysauce', 'salt','pepper'];

ingredientIds.forEach(function (id) {
    const img = document.getElementById(id);
    const blur = document.getElementById(id + '_blur');

    img.style.cursor = 'pointer';

    img.addEventListener('click', function () {
        // 1) 기존 blur 토글
        blur.style.display = blur.style.display === 'block' ? 'none' : 'block';

        // 2) Ingredients 칸에 이름 추가/제거
        let list = ingredientsInput.value
            .split(',')
            .map(function (s) { return s.trim(); })
            .filter(Boolean);

        if (list.includes(id)) {
            list = list.filter(function (item) { return item !== id; });
        } else {
            list.push(id);
        }
        ingredientsInput.value = list.join(', ');
    });
});

const saveButton = document.getElementById('save_button');
const recipebook = document.getElementById('recipebook');
saveButton.addEventListener('click', function () {
    recipebook.classList.toggle('show');
});

const createPage = document.getElementById('create_page');
const listPage = document.getElementById('list_page');

document.getElementById('create_tab').addEventListener('click', function () {
    createPage.classList.add('show');
    listPage.classList.remove('show');
});

document.getElementById('list_tab').addEventListener('click', function () {
    listPage.classList.add('show');
    createPage.classList.remove('show');
});

// const recipeText = document.getElementById('recipe_text');
// const recipeList = document.getElementById('recipe_list');
// let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// function renderList() {
//     recipeList.innerHTML = '';
//     recipes.forEach(function (text) {
//         const li = document.createElement('li');
//         li.textContent = text;
//         recipeList.appendChild(li);
//     });
// }

// document.getElementById('add_recipe').addEventListener('click', function () {
//     const text = recipeText.value.trim();
//     if (text === '') return;
//     recipes.push(text);
//     localStorage.setItem('recipes', JSON.stringify(recipes));
//     recipeText.value = '';
//     renderList();
// });

// renderList();

const recipeList = document.getElementById('recipe_list');
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function renderList() {
    recipeList.innerHTML = '';
    recipes.forEach(function (recipe) {
        const li = document.createElement('li');

        const dateEl = document.createElement('span');
        dateEl.className = 'recipe_date';
        dateEl.textContent = recipe.date || '';

        const title = document.createElement('strong');
        title.textContent = recipe.name || '';

        const ingredients = document.createElement('div');
        ingredients.textContent = recipe.ingredients;

        li.append(dateEl, title, ingredients);
        recipeList.appendChild(li);
    });
}

document.getElementById('add_recipe').addEventListener('click', function () {
    const ingredients = ingredientsInput.value.trim();
    if (ingredients === '') return;

    const now = new Date();
    const date = now.toLocaleString('de-CH', {
        timeZone: 'Europe/Zurich',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    fetch('https://formspree.io/f/mvkkbabz', {   // ← 본인 주소로 교체
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ recipe: ingredients, date: date })
    })
    .then(function (res) {
        if (!res.ok) throw new Error('send failed');
        ingredientsInput.value = '';
        ingredientIds.forEach(function (id) {
            document.getElementById(id + '_blur').style.display = 'none';
        });
        alert('Thank you! Your recipe was successfully submitted. It will be uploaded to the list in a few days');
    })
    .catch(function () {
        alert('Sorry, something went wrong. Please try again.');
    });
});

const aboutButton = document.getElementById("about_button");
const title = document.getElementById("title");
const aboutText = document.getElementById("about_text");

aboutButton.addEventListener("mouseenter", () => {
	title.classList.add("hidden");
	aboutText.style.display = "block";
});

aboutButton.addEventListener("mouseleave", () => {
	title.classList.remove("hidden");
	aboutText.style.display = "none";
});
