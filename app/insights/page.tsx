import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightsDashboard } from "@/components/insights-dashboard"

export default function InsightsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Insights</h1>
        <p className="text-muted-foreground">Discover trends and make data-driven financial decisions</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="credit-cards">Credit Card Trends</TabsTrigger>
          <TabsTrigger value="loans">Loan Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <InsightsDashboard />
        </TabsContent>
        <TabsContent value="credit-cards">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Trends</CardTitle>
              <CardDescription>Detailed analysis of credit card usage and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12">Credit card trends data visualization would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Loan Insights</CardTitle>
              <CardDescription>Analysis of loan applications and approval rates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12">Loan insights data visualization would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
