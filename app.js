document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const milesInput = document.getElementById('miles');
    const mpgInput = document.getElementById('mpg');
    const gasPriceInput = document.getElementById('gasPrice');
    const rateInput = document.getElementById('rate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const gasCostEl = document.getElementById('gasCost');
    const earningsEl = document.getElementById('earnings');
    const profitEl = document.getElementById('profit');
    
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };
    
    // Calculate trip costs and profits
    const calculate = () => {
        // Get input values and convert to numbers
        const miles = parseFloat(milesInput.value) || 0;
        const mpg = parseFloat(mpgInput.value) || 1; // Avoid division by zero
        const gasPrice = parseFloat(gasPriceInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        
        // Calculate values
        const gasUsed = miles / mpg;
        const gasCost = gasUsed * gasPrice;
        const earnings = miles * rate;
        const profit = earnings - gasCost;
        
        // Update UI
        gasCostEl.textContent = formatCurrency(gasCost);
        earningsEl.textContent = formatCurrency(earnings);
        profitEl.textContent = formatCurrency(profit);
        
        // Add pulse animation to profit for better UX
        profitEl.classList.add('pulse');
        setTimeout(() => profitEl.classList.remove('pulse'), 300);
    };
    
    // Reset form
    const resetForm = () => {
        milesInput.value = '';
        mpgInput.value = '';
        gasPriceInput.value = '';
        rateInput.value = '';
        gasCostEl.textContent = '$0.00';
        earningsEl.textContent = '$0.00';
        profitEl.textContent = '$0.00';
        
        // Focus on first input
        milesInput.focus();
    };
    
    // Event Listeners
    calculateBtn.addEventListener('click', () => {
        calculate();
        // Add click effect
        calculateBtn.classList.add('pulse');
        setTimeout(() => calculateBtn.classList.remove('pulse'), 300);
    });
    
    resetBtn.addEventListener('click', resetForm);
    
    // Allow calculation on Enter key
    const inputs = [milesInput, mpgInput, gasPriceInput, rateInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculate();
            }
        });
    });
    
    // Initial focus
    milesInput.focus();
});
