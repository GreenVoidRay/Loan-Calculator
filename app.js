// Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e){
    document.querySelector('#loading').style.display = "block";
    setTimeout(calc(e), 2000);
    e.preventDefault();
});

function calc(){
    const amountEl = document.querySelector('#amount');
    const interestEl = document.querySelector('#interest');
    const yearsEl = document.querySelector('#years');
    const monthlyPaymentEl = document.querySelector('#monthly-payment');
    const totalPaymentEl = document.querySelector('#total-payment');
    const totalInterestEl = document.querySelector('#total-interest');
    
    const principal = parseFloat(amountEl.value);
    const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsEl.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const montly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(montly)){
        monthlyPaymentEl.value = montly.toFixed(2);
        totalPaymentEl.value = (montly*calculatedPayments).toFixed(2);
        totalInterestEl.value = ((montly*calculatedPayments) - principal).toFixed(2);
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
    }
    else{
        if(!document.querySelector('.alert')){
            showError('Please check your numbers');
        }
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'none';
    }

}

function showError(msg){
    const errorDiv = document.createElement('div');
    const cardEl = document.querySelector('.card');
    const headingEl = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(msg));
    cardEl.insertBefore(errorDiv, headingEl);
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}
