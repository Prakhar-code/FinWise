"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, DollarSign, Calendar, Percent } from "lucide-react"

// Custom chart component for loan amortization
const AmortizationChart = ({ principal, interest, term }: { principal: number; interest: number; term: number }) => {
  // This would be replaced with actual chart implementation
  return (
    <div className="w-full h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
      <div className="text-center">
        <BarChart className="h-10 w-10 mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">
          Loan amortization chart would render here with principal: ${principal}, interest: {interest}%, term: {term}{" "}
          months
        </p>
      </div>
    </div>
  )
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(36) // months
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])

  // Calculate loan details
  useEffect(() => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12

    // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)

    setMonthlyPayment(payment)
    setTotalPayment(payment * loanTerm)
    setTotalInterest(payment * loanTerm - loanAmount)

    // Generate amortization schedule (first 6 months)
    let balance = loanAmount
    const schedule = []

    for (let month = 1; month <= Math.min(6, loanTerm); month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = payment - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        payment: payment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: balance.toFixed(2),
      })
    }

    setAmortizationSchedule(schedule)
  }, [loanAmount, interestRate, loanTerm])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Adjust the values to calculate your loan payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-amount">Loan Amount: ${loanAmount.toLocaleString()}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLoanAmount(Math.max(1000, loanAmount - 1000))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLoanAmount(loanAmount + 1000)}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="loan-amount"
              min={1000}
              max={100000}
              step={1000}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1,000</span>
              <span>$50,000</span>
              <span>$100,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interest-rate">Interest Rate: {interestRate}%</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInterestRate(Math.max(0.1, interestRate - 0.5))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInterestRate(Math.min(20, interestRate + 0.5))}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="interest-rate"
              min={0.1}
              max={20}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.1%</span>
              <span>10%</span>
              <span>20%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-term">
                Loan Term: {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLoanTerm(Math.max(12, loanTerm - 12))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLoanTerm(Math.min(360, loanTerm + 12))}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="loan-term"
              min={12}
              max={360}
              step={12}
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>15 years</span>
              <span>30 years</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
          <CardDescription>Your calculated loan payments and details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <DollarSign className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-xl font-bold">${monthlyPayment.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Calendar className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Total Payment</p>
                <p className="text-xl font-bold">${totalPayment.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Percent className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-xl font-bold">${totalInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Amortization Schedule (First 6 Months)</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>${row.payment}</TableCell>
                      <TableCell>${row.principal}</TableCell>
                      <TableCell>${row.interest}</TableCell>
                      <TableCell>${row.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <AmortizationChart principal={loanAmount} interest={interestRate} term={loanTerm} />
        </CardContent>
      </Card>
    </div>
  )
}
