class Recipe {
    constructor(id, title, image, usedIngredients, missedIngredients) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.usedIngredients = usedIngredients;
        this.missedIngredients = missedIngredients;
    }

    display() {
        const usedList = this.usedIngredients.map(ing => ing.name).join(', ');
        const missedList = this.missedIngredients.map(ing => ing.name).join(', ');
        
       
        const safeTitle = this.title.replace(/'/g, "\\'").replace(/"/g, '\\"');
        
        return `
            <div class="recipe-card">
                <h3>${this.title}</h3>
                <img src="${this.image}" alt="${this.title}" width="150">
                <p><strong>✅ Used Ingredients:</strong> ${usedList}</p>
                <p><strong>🛒 Missing Ingredients:</strong> ${missedList}</p>
                <button onclick="addToMealPlan('${safeTitle}')">
                    Add to Meal Plan
                </button>
            </div>
        `;
    }

}
