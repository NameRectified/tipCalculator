document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    const billAmountInput = document.getElementById('bill-amount');
    const peopleNumberInput = document.getElementById('people-number');
    const tipAmountDisplay = document.getElementById('tip-amount-display');
    const totalAmountDisplay = document.getElementById('total-amount-display');
    const resetBtn = document.getElementById('reset-btn');
    const tipBtns = document.querySelectorAll('.tip-btn');
    const customTipInput = document.querySelector('.custom-tip');

    const billAlert = document.getElementById('bill-alert');
    const peopleAlert = document.getElementById('people-alert');


    function tipCalculate(tipPercentage) {
        const billAmount = parseFloat(billAmountInput.value);
        const peopleNumber = parseInt(peopleNumberInput.value);
        let valid = true;

        if (isNaN(billAmount) || billAmount <= 0 ) {
            billAlert.style.display='block';
            billAmountInput.style.border='2px solid red';
            valid=false;
        }else{
            billAlert.style.display='none';
            billAmountInput.style.border='none';
        }
        
        if (isNaN(peopleNumber) || peopleNumber <= 0) {
            peopleAlert.style.display='block';
            peopleNumberInput.style.border='2px solid red';
            valid=false;
        }else{
            peopleAlert.style.display='none';
            peopleNumberInput.style.border='none';
        }

        if(!valid){

            return;
        }

        const tipAmount = (billAmount * (tipPercentage / 100)) / peopleNumber;
        const totalAmount = (billAmount / peopleNumber) + tipAmount;

        console.log("Tip amount:", tipAmount);
        console.log("Total amount:", totalAmount);

            tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
            totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }

    tipBtns.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Button clicked");
            const tipPercentage = parseInt(button.getAttribute('data-tip'));
            tipCalculate(tipPercentage);
        });
    });

    customTipInput.addEventListener('input', () => {
        console.log("Custom tip input changed");
        const customTipPercentage = parseInt(customTipInput.value);
        console.log("Custom tip percentage:", customTipPercentage);
        if (!isNaN(customTipPercentage)) {
            tipCalculate(customTipPercentage);
        }
    });

    resetBtn.addEventListener('click', () => {
        billAmountInput.value = '';
        peopleNumberInput.value = '';
        customTipInput.value = '';
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        billAlert.style.display="none";
        billAmountInput.style.border = "none";
        peopleAlert.style.display="none";
        peopleNumberInput.style.border = "none";
    });
});

