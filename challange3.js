// Function to calculate NSSF deduction
function calculateNSSF(grossSalary) {
    const tier1 = Math.min(grossSalary, 7000) * 0.06;
    const tier2 = Math.max(0, Math.min(grossSalary - 7000, 29000)) * 0.06;
    return tier1 + tier2;
}

// Function to calculate NHIF deduction
function calculateNHIF(grossSalary) {
    const nhifBands = [
        [5999, 150], [7999, 300], [11999, 400], [14999, 500],
        [19999, 600], [24999, 750], [29999, 850], [34999, 900],
        [39999, 950], [44999, 1000], [49999, 1100], [59999, 1200],
        [69999, 1300], [79999, 1400], [89999, 1500], [99999, 1600],
        [Infinity, 1700]
    ];
    for (const [limit, rate] of nhifBands) {
        if (grossSalary <= limit) {
            return rate;
        }
    }
    return 0;
}

// Function to calculate PAYE (tax)
function calculatePAYE(taxableIncome) {
    const taxBands = [
        [24000, 0.1], [32333, 0.25], [500000, 0.3], [800000, 0.325], [Infinity, 0.35]
    ];
    let tax = 0;
    for (const [limit, rate] of taxBands) {
        if (taxableIncome <= limit) {
            tax += taxableIncome * rate;
            break;
        } else {
            tax += limit * rate;
            taxableIncome -= limit;
        }
    }
    return tax;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const nssf = calculateNSSF(grossSalary);
    const nhif = calculateNHIF(grossSalary);
    const taxableIncome = grossSalary - nssf;
    const paye = calculatePAYE(taxableIncome);
    const netSalary = grossSalary - (nssf + nhif + paye);

    return {
        grossSalary: grossSalary,
        nssfDeduction: nssf,
        nhifDeduction: nhif,
        paye: paye,
        netSalary: netSalary
    };
}

// Example usage
const basicSalary = 50000;
const benefits = 10000;
const netSalaryDetails = calculateNetSalary(basicSalary, benefits);

console.log(`Gross Salary: ${netSalaryDetails.grossSalary}`);
console.log(`NSSF Deduction: ${netSalaryDetails.nssfDeduction}`);
console.log(`NHIF Deduction: ${netSalaryDetails.nhifDeduction}`);
console.log(`PAYE: ${netSalaryDetails.paye}`);
console.log(`Net Salary: ${netSalaryDetails.netSalary}`);
