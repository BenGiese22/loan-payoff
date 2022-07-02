
/*
    A = P (r (1+r)^n) / ( (1+r)^n -1 )

    A = Payment amount per period
    P = Initial principal or loan amount (in this example, $10,000)
    r = Interest rate per period (in our example, that's 7.5% divided by 12 months)
    n = Total number of payments or periods

    

    P = $10,000
    r = 7.5% per year / 12 months = 0.625% per period (0.00625 on your calculator)
    n = 5 years x 12 months = 60 total periods

    So, when we follow through on the arithmetic you find your monthly payment:

    10,000 (.00625 x (1.00625^60) / ((1.00625^60) - 1)
    10,000 (.00625 x 1.45329) / (1.45329 - 1)
    10,000 (.00908306 / .45329)
    10,000 (.02003808) = $200.38
    
    In this case, your monthly payment for your car’s loan term would be $200.38.
    If you have an interest-only loan, calculating the monthly payment is exponentially easier (if you'll pardon the expression). Here is the formula the lender uses to calculate your monthly payment:
    loan payment = loan balance x (annual interest rate/12)
    In this case, your monthly interest-only payment for the loan above would be $62.50.
*/


class Calculator {

}

export default Calculator;