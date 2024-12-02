let budget = 0;
let totalExpense = 0;

$(document).ready(function () {
    $('#setBudgetBtn').click(function () {
        budget = parseFloat($('#budget').val());
        if (isNaN(budget) || budget <= 0) {
            $('#budgetWarning').text('Please enter a valid budget amount.');
        } else {
            $('#budgetWarning').text(`Budget set to $${budget}.`).addClass('success');
        }
    });

    $('#addExpenseBtn').click(function () {
        const category = $('#category').val();
        const amount = parseFloat($('#amount').val());
        const description = $('#description').val();

        if (!category || isNaN(amount) || amount <= 0) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        totalExpense += amount;
        $('#expenseList').append(
            `<li class="list-group-item">
                <strong>${category}</strong>: $${amount} - ${description}
            </li>`
        );

        updateWarnings();
        updateSummary();
        clearInputs();
    });

    function updateWarnings() {
        const warnings = $('#warnings');
        warnings.text('');

        if (totalExpense >= 0.8 * budget && totalExpense < budget) {
            warnings.text('Warning: You have spent 80% of your budget!');
        } else if (totalExpense >= budget) {
            warnings.text('Critical: You have exceeded your budget!');
        } else if (totalExpense < budget) {
            warnings.text('You are within your budget. Consider saving 10%.').addClass('success');
        }
    }

    function updateSummary() {
        $('#summary').html(
            `<h5>Total Expenses: $${totalExpense.toFixed(2)}</h5>
             <h5>Remaining Budget: $${(budget - totalExpense).toFixed(2)}</h5>`
        );
    }

    function clearInputs() {
        $('#category').val('');
        $('#amount').val('');
        $('#description').val('');
    }
});
