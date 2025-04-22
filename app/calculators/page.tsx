import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanCalculator } from "@/components/loan-calculator"
import { InvestmentCalculator } from "@/components/investment-calculator"

export default function CalculatorsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Calculators</h1>
        <p className="text-muted-foreground">Plan your financial future with our interactive calculators</p>
      </div>

      <Tabs defaultValue="loan" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="loan">Loan Calculator</TabsTrigger>
          <TabsTrigger value="investment">Investment Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="loan">
          <LoanCalculator />
        </TabsContent>
        <TabsContent value="investment">
          <InvestmentCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
