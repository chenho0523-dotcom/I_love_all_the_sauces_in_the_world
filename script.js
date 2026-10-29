const tomato = document.getElementById('tomato');
const tomatoBlur = document.getElementById('tomato_blur');
tomato.addEventListener('click', function () {
    tomatoBlur.style.display = tomatoBlur.style.display === 'block' ? 'none' : 'block';
});

const lemon = document.getElementById('lemon');
const lemonBlur = document.getElementById('lemon_blur');
lemon.addEventListener('click', function () {
    lemonBlur.style.display = lemonBlur.style.display === 'block' ? 'none' : 'block';
});

const garlic = document.getElementById('garlic');
const garlicBlur = document.getElementById('garlic_blur');
garlic.addEventListener('click', function () {
    garlicBlur.style.display = garlicBlur.style.display === 'block' ? 'none' : 'block';
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

const recipeText = document.getElementById('recipe_text');
const recipeList = document.getElementById('recipe_list');
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function renderList() {
    recipeList.innerHTML = '';
    recipes.forEach(function (text) {
        const li = document.createElement('li');
        li.textContent = text;
        recipeList.appendChild(li);
    });
}

document.getElementById('add_recipe').addEventListener('click', function () {
    const text = recipeText.value.trim();
    if (text === '') return;
    recipes.push(text);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    recipeText.value = '';
    renderList();
});

renderList();