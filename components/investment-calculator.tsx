"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, DollarSign, Calendar, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Custom chart component for investment growth
const InvestmentGrowthChart = ({
  initialAmount,
  monthlyContribution,
  years,
  rate,
}: {
  initialAmount: number
  monthlyContribution: number
  years: number
  rate: number
}) => {
  // This would be replaced with actual chart implementation
  return (
    <div className="w-full h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
      <div className="text-center">
        <LineChart className="h-10 w-10 mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">
          Investment growth chart would render here with initial: ${initialAmount}, monthly: ${monthlyContribution},
          years: {years}, rate: {rate}%
        </p>
      </div>
    </div>
  )
}

export function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [annualReturnRate, setAnnualReturnRate] = useState(7)
  const [investmentYears, setInvestmentYears] = useState(20)
  const [compoundingFrequency, setCompoundingFrequency] = useState("monthly")
  const [includeInflation, setIncludeInflation] = useState(false)
  const [inflationRate, setInflationRate] = useState(2.5)

  const [futureValue, setFutureValue] = useState(0)
  const [totalContributions, setTotalContributions] = useState(0)
  const [totalInterestEarned, setTotalInterestEarned] = useState(0)
  const [yearlyBreakdown, setYearlyBreakdown] = useState<any[]>([])

  // Calculate investment growth
  useEffect(() => {
    // Determine compounding periods per year
    let periodsPerYear = 12 // default monthly
    if (compoundingFrequency === "annually") periodsPerYear = 1
    if (compoundingFrequency === "quarterly") periodsPerYear = 4
    if (compoundingFrequency === "daily") periodsPerYear = 365

    // Adjust for inflation if selected
    let effectiveRate = annualReturnRate
    if (includeInflation) {
      effectiveRate = ((1 + annualReturnRate / 100) / (1 + inflationRate / 100) - 1) * 100
    }

    // Convert annual rate to rate per period
    const ratePerPeriod = effectiveRate / 100 / periodsPerYear

    // Total number of periods
    const totalPeriods = investmentYears * periodsPerYear

    // Monthly contribution converted to per period
    const contributionPerPeriod = monthlyContribution * (12 / periodsPerYear)

    let currentValue = initialInvestment
    const yearlyData = []

    // Calculate year by year
    for (let year = 1; year <= investmentYears; year++) {
      // Calculate compound interest for this year
      for (let period = 1; period <= periodsPerYear; period++) {
        // Add interest for this period
        currentValue = currentValue * (1 + ratePerPeriod)

        // Add contribution for this period
        if (period < periodsPerYear || year < investmentYears) {
          currentValue += contributionPerPeriod
        }
      }

      // Store yearly data
      yearlyData.push({
        year,
        value: currentValue.toFixed(2),
      })

      // Only keep first 5 years for display
      if (yearlyData.length > 5) {
        yearlyData.shift()
      }
    }

    // Calculate totals
    const totalMonthlyContributions = monthlyContribution * 12 * investmentYears

    setFutureValue(currentValue)
    setTotalContributions(initialInvestment + totalMonthlyContributions)
    setTotalInterestEarned(currentValue - initialInvestment - totalMonthlyContributions)
    setYearlyBreakdown(yearlyData)
  }, [
    initialInvestment,
    monthlyContribution,
    annualReturnRate,
    investmentYears,
    compoundingFrequency,
    includeInflation,
    inflationRate,
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>Adjust the values to calculate your investment growth</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="initial-investment">Initial Investment: ${initialInvestment.toLocaleString()}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInitialInvestment(Math.max(0, initialInvestment - 1000))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInitialInvestment(initialInvestment + 1000)}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="initial-investment"
              min={0}
              max={100000}
              step={1000}
              value={[initialInvestment]}
              onValueChange={(value) => setInitialInvestment(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$50,000</span>
              <span>$100,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="monthly-contribution">Monthly Contribution: ${monthlyContribution}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setMonthlyContribution(Math.max(0, monthlyContribution - 50))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setMonthlyContribution(monthlyContribution + 50)}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="monthly-contribution"
              min={0}
              max={2000}
              step={50}
              value={[monthlyContribution]}
              onValueChange={(value) => setMonthlyContribution(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$1,000</span>
              <span>$2,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="annual-return">Annual Return Rate: {annualReturnRate}%</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setAnnualReturnRate(Math.max(1, annualReturnRate - 0.5))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setAnnualReturnRate(Math.min(15, annualReturnRate + 0.5))}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="annual-return"
              min={1}
              max={15}
              step={0.5}
              value={[annualReturnRate]}
              onValueChange={(value) => setAnnualReturnRate(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>7%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="investment-years">Investment Period: {investmentYears} years</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInvestmentYears(Math.max(1, investmentYears - 1))}
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setInvestmentYears(Math.min(50, investmentYears + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              id="investment-years"
              min={1}
              max={50}
              step={1}
              value={[investmentYears]}
              onValueChange={(value) => setInvestmentYears(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>25 years</span>
              <span>50 years</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="compounding-frequency">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger id="compounding-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="include-inflation" checked={includeInflation} onCheckedChange={setIncludeInflation} />
            <Label htmlFor="include-inflation">Account for inflation</Label>
          </div>

          {includeInflation && (
            <div className="space-y-2">
              <Label htmlFor="inflation-rate">Inflation Rate: {inflationRate}%</Label>
              <Slider
                id="inflation-rate"
                min={0}
                max={10}
                step={0.1}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Projection</CardTitle>
          <CardDescription>Your calculated investment growth over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <DollarSign className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Future Value</p>
                <p className="text-xl font-bold">
                  ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Calendar className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-xl font-bold">
                  ${totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <TrendingUp className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm text-muted-foreground">Interest Earned</p>
                <p className="text-xl font-bold">
                  ${totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Year by Year Breakdown (Last 5 Years)</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyBreakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>Year {row.year}</TableCell>
                      <TableCell>
                        ${Number.parseFloat(row.value).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <InvestmentGrowthChart
            initialAmount={initialInvestment}
            monthlyContribution={monthlyContribution}
            years={investmentYears}
            rate={annualReturnRate}
          />
        </CardContent>
      </Card>
    </div>
  )
}
