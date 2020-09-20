// Classes

class Budget {
    constructor(budget) {
        // Changing aue inot a number
        this.budget = Number (budget),
        this.budgetLeft = this.budget;
    }

    // Substract from budget
    substractFromBudget(amount) {
        return this.budget -= amount;
    }
}

// UPDATE UI Class

class HTML {

    // Inserts the budget when user submits it
    insertBudget(amount) {
        // insert into HTML
        budgetTotal.innerHTML = `${amount}`;
          budgetLeft.innerHTML = `${amount}`;
    
    }

    // Displays message (correct or invalid) to user
    printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    // Insert into HTML
    // inserBefore can have two parameters
    document.querySelector(".primary").insertBefore(messageWrapper, addExpenseForm)


        // Clear the error
    setTimeout( function () {
        document.querySelector(".primary .alert").remove();
    }, 3000);

    }

    // Displays expenses from form to list
    addExpenseToList(name, amount)  {
        const expensesList = document.querySelector("#expenses ul");

        // Create a li
        const li = document.createElement("li");
        li.classList = "list-group-item d-flex justify-content-between align-items-center";

        // Create the template
        li.innerHTML = `
        ${name}
        <span class="badge badge-primary badge-pill" >${amount}</span>
        `;


        // Insert to HTML
        expensesList.appendChild(li)

    }

    // Substract expense amount from budget
    trackBudget(amount) {
        const budgetLeftPound = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftPound}`;

        // Check when 25% is spent
        if( (budget.budget / 4 ) > budgetLeftPound ){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

       } else if( (budget.budget / 2 ) > budgetLeftPound  ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');

       }

    }

}


// Variables
const addExpenseForm = document.querySelector("#add-expense"),
      budgetTotal = document.querySelector("span#total"),
      budgetLeft = document.querySelector("span#left")

let budget, userBudget;

// Instantiate html class
const html = new HTML()


// Event Listeners
eventListeners();

function eventListeners(){


    document.addEventListener("DOMContentLoaded", function(){
        // Asks the user for their weekly budget
        userBudget = prompt(" What is your budget for the week ");

        // validate user budget
        if(userBudget === null || userBudget === ""  || userBudget === 0) {
            window.location.reload();
        } else {
            // Budget is valid then instanstiate class
            // Class is created here as when class loads the budget class is available
            budget = new Budget(userBudget);

            // Update UI
            html.insertBudget(budget.budget);
        }
    });



}


addExpenseForm.addEventListener("submit", function(e){

    // Read values from budget form

    const expenseName = document.querySelector("#expense").value;

    const amount = document.querySelector("#amount").value;

    if ( expenseName == "" || amount == "" ){
        html.printMessage("All Fields are Mandatory", "alert-danger")
    } else {
        html.addExpenseToList(expenseName, amount);
        html.trackBudget(amount);
        html.printMessage("Added...", "alert-success");
    }
});
