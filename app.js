const mealPlan = new MealPlan();

async function searchRecipes() {
    const input = document.getElementById('ingredientInput');
    const resultsDiv = document.getElementById('recipeResults');
    
    const ingredient = input.value.trim();
    if (!ingredient) {
        alert('Please enter an ingredient (e.g., dates, honey, olives)');
        return;
    }
    resultsDiv.innerHTML = '<p class="loading">Searching for recipes with ' + ingredient + '...</p>';

    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=0285958f1ed24baaaa0057983eceaf31&ingredients=${encodeURIComponent(ingredient)}`
        );
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        resultsDiv.innerHTML = '<p class="error">Error loading recipes. Please check your internet connection.</p>';
    }
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('recipeResults');
    
    if (!recipes || recipes.length === 0) {
        resultsDiv.innerHTML = '<p class="loading">No recipes found. Try different ingredients like "dates" or "honey".</p>';
        return;
    }

    resultsDiv.innerHTML = '';
    
    recipes.forEach(recipeData => {
        const recipe = new Recipe(
            recipeData.id,
            recipeData.title,
            recipeData.image,
            recipeData.usedIngredients,
            recipeData.missedIngredients
        );
        
        // SAFER: Create element instead of innerHTML
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = recipe.display();
        resultsDiv.appendChild(recipeElement);
    });
}

function addToMealPlan(mealName) {
    mealPlan.addMeal(mealName);
    alert('Added "' + mealName + '" to your meal plan!');
}

function addMeal() {
    const input = document.getElementById('mealInput');
    const mealName = input.value.trim();
    
    if (mealName) {
        mealPlan.addMeal(mealName);
        input.value = '';
    } else {
        alert('Please enter a meal name');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBtn').addEventListener('click', searchRecipes);
    document.getElementById('addMealBtn').addEventListener('click', addMeal);
    
    document.getElementById('ingredientInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });

    document.getElementById('mealInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addMeal();
        }
    });

    mealPlan.display();
    searchRecipes();
    // Add error handling for initial search
    try {
        searchRecipes();
    } catch (error) {
        console.log('Initial search failed:', error);
    }
});