"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart, LineChart, Users, CreditCard, Calculator, BookOpen } from "lucide-react"

// Sample chart components (would be replaced with actual chart implementations)
const PopularCreditCardsChart = () => {
  return (
    <div className="w-full h-[250px] flex items-center justify-center bg-muted/50 rounded-md">
      <div className="text-center">
        <BarChart className="h-10 w-10 mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Bar chart showing popular credit card selections</p>
      </div>
    </div>
  )
}

const CreditScoreDistributionChart = () => {
  return (
    <div className="w-full h-[250px] flex items-center justify-center bg-muted/50 rounded-md">
      <div className="text-center">
        <PieChart className="h-10 w-10 mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Pie chart showing credit score distribution of users</p>
      </div>
    </div>
  )
}

const LoanCalculatorUsageChart = () => {
  return (
    <div className="w-full h-[250px] flex items-center justify-center bg-muted/50 rounded-md">
      <div className="text-center">
        <LineChart className="h-10 w-10 mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Line chart showing loan calculator usage over time</p>
      </div>
    </div>
  )
}

export function InsightsDashboard() {
  // Sample statistics
  const stats = [
    {
      title: "Total Users",
      value: "24,521",
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Card Comparisons",
      value: "87,432",
      icon: CreditCard,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Calculator Usage",
      value: "56,899",
      icon: Calculator,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Article Views",
      value: "102,387",
      icon: BookOpen,
      change: "+15%",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Popular Credit Cards</CardTitle>
            <CardDescription>Most selected cards by our users</CardDescription>
          </CardHeader>
          <CardContent>
            <PopularCreditCardsChart />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Credit Score Distribution</CardTitle>
            <CardDescription>User credit score ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <CreditScoreDistributionChart />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Calculator Usage</CardTitle>
            <CardDescription>Trends in financial calculator usage</CardDescription>
          </CardHeader>
          <CardContent>
            <LoanCalculatorUsageChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Insights</CardTitle>
          <CardDescription>Aggregated data from user interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Credit Card Selection Patterns</h3>
            <ul className="space-y-2 text-sm">
              <li>• 78% of users with credit scores above 720 select travel rewards cards</li>
              <li>• 65% of users with credit scores below 650 apply for secured credit cards</li>
              <li>• 82% of users aged 25-34 prioritize no annual fee over higher rewards</li>
              <li>• 91% of frequent travelers select cards with no foreign transaction fees</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Loan Calculator Insights</h3>
            <ul className="space-y-2 text-sm">
              <li>• Average mortgage loan amount calculated: $325,000</li>
              <li>• Most common loan term selected: 30 years</li>
              <li>• 72% of users adjust interest rates multiple times to compare scenarios</li>
              <li>• Users who calculate loan payments are 3x more likely to apply for pre-approval</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Investment Trends</h3>
            <ul className="space-y-2 text-sm">
              <li>• Average initial investment amount: $15,000</li>
              <li>• Most common monthly contribution: $500</li>
              <li>• 68% of users select investment periods of 20+ years</li>
              <li>• Users who account for inflation project 22% lower returns on average</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
