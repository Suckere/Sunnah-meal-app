// MealPlan Class - OOP Concept with CRUD Operations
class MealPlan {
    constructor() {
        this.meals = this.loadFromStorage();
    }

    addMeal(meal) {
        this.meals.push(meal);
        this.display();
        this.saveToStorage();
    }

    display() {
        const list = document.getElementById('mealList');
        list.innerHTML = '';
        
        if (this.meals.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #666;">No meals in your plan yet. Add some recipes!</p>';
            return;
        }
        
        this.meals.forEach((meal, index) => {
            const li = document.createElement('li');
            li.className = 'meal-item';
            li.innerHTML = `
                <span>${meal}</span>
                <button class="delete-btn" onclick="mealPlan.removeMeal(${index})">Delete</button>
            `;
            list.appendChild(li);
        });
    }

    removeMeal(index) {
        this.meals.splice(index, 1);
        this.display();
        this.saveToStorage();
    }

    saveToStorage() {
        localStorage.setItem('sunnahMealPlan', JSON.stringify(this.meals));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('sunnahMealPlan');
        return saved ? JSON.parse(saved) : [];
    }
}