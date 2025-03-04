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
    let selectedTip = null
    function validateInputs(){
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

        return valid ? { billAmount, peopleNumber } : null;
    }
    function tipCalculate() {
        const values = validateInputs()
        // if (!values||selectedTip ===null) return;
        if (!values) return;
        if (selectedTip===null){
            tipAmountDisplay.textContent = "$0.00";
            totalAmountDisplay.textContent = "$0.00";
            return;
        }
        const {billAmount,peopleNumber} = values
        const tipAmount = (billAmount * (selectedTip / 100)) / peopleNumber;
        const totalAmount = (billAmount / peopleNumber) + tipAmount;

        console.log("Tip amount:", tipAmount);
        console.log("Total amount:", totalAmount);

        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }

    tipBtns.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Button clicked");
            selectedTip = parseInt(button.getAttribute('data-tip'));
            customTipInput.value = "";
            tipCalculate();
        });
    });
    billAmountInput.addEventListener('input',tipCalculate);
    peopleNumberInput.addEventListener('input',tipCalculate);
    customTipInput.addEventListener('input', () => {
        console.log("Custom tip input changed");
        let customTipPercentage = parseInt(customTipInput.value);
        console.log("Custom tip percentage:", customTipPercentage);
        if (!isNaN(customTipPercentage) && customTipPercentage>=0) {
            selectedTip = customTipPercentage;
        }else if (customTipPercentage>100){
            customTipInput.value = 100;
            selectedTip = 100;
        }else{
            selectedTip = null
        }
        tipCalculate();
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
        selectedTip = null;
    });
});
