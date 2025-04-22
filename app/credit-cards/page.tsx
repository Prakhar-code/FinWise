import { CreditCardComparisonTool } from "@/components/credit-card-comparison-tool"
import { CreditCardRecommendations } from "@/components/credit-card-recommendations"

export default function CreditCardsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Credit Cards</h1>
        <p className="text-muted-foreground">Compare and find the best credit cards for your needs</p>
      </div>

      <CreditCardComparisonTool />

      <div className="pt-8">
        <CreditCardRecommendations />
      </div>
    </div>
  )
}
