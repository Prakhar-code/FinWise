"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample credit card data (same as in comparison tool)
const creditCards = [
  {
    id: 1,
    name: "Premium Rewards Card",
    issuer: "Global Bank",
    apr: 18.99,
    annualFee: 95,
    cashback: 2,
    rewards: ["5% on travel", "3% on dining", "1% on everything else"],
    creditScoreMin: 720,
    creditScoreMax: 850,
    benefits: ["No foreign transaction fees", "Airport lounge access", "$200 travel credit"],
    popular: true,
    category: "travel",
  },
  {
    id: 2,
    name: "Cash Back Plus",
    issuer: "National Credit",
    apr: 15.99,
    annualFee: 0,
    cashback: 1.5,
    rewards: ["3% on groceries", "2% on gas", "1.5% on everything else"],
    creditScoreMin: 680,
    creditScoreMax: 850,
    benefits: ["No annual fee", "0% intro APR for 15 months", "Cell phone protection"],
    popular: true,
    category: "cashback",
  },
  {
    id: 3,
    name: "Travel Elite",
    issuer: "Voyager Bank",
    apr: 20.99,
    annualFee: 250,
    cashback: 1,
    rewards: ["10x points on hotels", "5x points on flights", "1x points on everything else"],
    creditScoreMin: 750,
    creditScoreMax: 850,
    benefits: ["Priority boarding", "$300 travel credit", "Global Entry credit", "Hotel upgrades"],
    popular: false,
    category: "travel",
  },
  {
    id: 4,
    name: "Student Builder",
    issuer: "Education First",
    apr: 19.99,
    annualFee: 0,
    cashback: 1,
    rewards: ["2% on textbooks", "2% on dining", "1% on everything else"],
    creditScoreMin: 630,
    creditScoreMax: 720,
    benefits: ["No annual fee", "Credit score monitoring", "Late payment forgiveness"],
    popular: false,
    category: "student",
  },
  {
    id: 5,
    name: "Secured Starter",
    issuer: "Build Credit Inc",
    apr: 22.99,
    annualFee: 0,
    cashback: 0.5,
    rewards: ["0.5% on all purchases"],
    creditScoreMin: 300,
    creditScoreMax: 650,
    benefits: ["No credit check", "Reports to all 3 bureaus", "Path to unsecured card"],
    popular: false,
    category: "secured",
  },
]

export function CreditCardRecommendations() {
  const [formData, setFormData] = useState({
    creditScore: [650],
    spendingCategory: "",
    annualFeePreference: "",
    submitted: false,
  })

  const [recommendations, setRecommendations] = useState<typeof creditCards>([])

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
      submitted: false,
    })
  }

  const handleSubmit = () => {
    // Simple recommendation algorithm
    let result = creditCards
    const score = formData.creditScore[0]

    // Filter by credit score
    result = result.filter((card) => card.creditScoreMin <= score && card.creditScoreMax >= score)

    // Filter by spending category preference
    if (formData.spendingCategory) {
      if (formData.spendingCategory === "travel") {
        result = result.filter((card) => card.category === "travel")
      } else if (formData.spendingCategory === "groceries") {
        result = result.filter((card) => card.rewards.some((reward) => reward.toLowerCase().includes("groceries")))
      } else if (formData.spendingCategory === "dining") {
        result = result.filter((card) => card.rewards.some((reward) => reward.toLowerCase().includes("dining")))
      } else if (formData.spendingCategory === "cashback") {
        result = result.filter((card) => card.cashback >= 1.5)
      }
    }

    // Filter by annual fee preference
    if (formData.annualFeePreference) {
      if (formData.annualFeePreference === "no_fee") {
        result = result.filter((card) => card.annualFee === 0)
      } else if (formData.annualFeePreference === "rewards_worth_fee") {
        // For this example, we'll just include cards with annual fees
        result = result.filter((card) => card.annualFee > 0)
      }
    }

    // Sort by best match (simplified algorithm)
    result.sort((a, b) => {
      // Prioritize cards that match credit score better
      const aScoreDiff = Math.abs(a.creditScoreMin - score)
      const bScoreDiff = Math.abs(b.creditScoreMin - score)

      if (aScoreDiff !== bScoreDiff) {
        return aScoreDiff - bScoreDiff
      }

      // Then prioritize by popularity
      if (a.popular !== b.popular) {
        return a.popular ? -1 : 1
      }

      // Then by cashback percentage
      return b.cashback - a.cashback
    })

    setRecommendations(result.slice(0, 3)) // Top 3 recommendations
    setFormData({
      ...formData,
      submitted: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Personalized Recommendations</h2>
        <p className="text-muted-foreground">Tell us about your preferences to get tailored credit card suggestions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
          <CardDescription>We'll use this information to find the best cards for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="credit-score-rec">Your Credit Score: {formData.creditScore[0]}</Label>
            <Slider
              id="credit-score-rec"
              min={300}
              max={850}
              step={10}
              value={formData.creditScore}
              onValueChange={(value) => handleInputChange("creditScore", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor (300)</span>
              <span>Fair (580)</span>
              <span>Good (670)</span>
              <span>Excellent (800+)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spending-category">Where do you spend the most?</Label>
            <Select
              value={formData.spendingCategory}
              onValueChange={(value) => handleInputChange("spendingCategory", value)}
            >
              <SelectTrigger id="spending-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="dining">Dining Out</SelectItem>
                <SelectItem value="cashback">General Purchases (Cashback)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Annual Fee Preference</Label>
            <RadioGroup
              value={formData.annualFeePreference}
              onValueChange={(value) => handleInputChange("annualFeePreference", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no_fee" id="no-fee" />
                <Label htmlFor="no-fee">I prefer no annual fee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rewards_worth_fee" id="rewards-worth-fee" />
                <Label htmlFor="rewards-worth-fee">I'm okay with an annual fee if the rewards are worth it</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Get Recommendations</Button>
        </CardFooter>
      </Card>

      {formData.submitted && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Your Personalized Recommendations</h3>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {recommendations.map((card, index) => (
                <Card key={card.id} className={index === 0 ? "border-primary" : ""}>
                  {index === 0 && <Badge className="absolute right-4 top-4">Best Match</Badge>}
                  <CardHeader>
                    <CardTitle>{card.name}</CardTitle>
                    <CardDescription>{card.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">APR</span>
                        <span className="font-medium">{card.apr}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Annual Fee</span>
                        <span className="font-medium">${card.annualFee}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Cash Back</span>
                        <span className="font-medium">{card.cashback}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Credit Score</span>
                        <span className="font-medium">{card.creditScoreMin}+</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Key Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {card.benefits.slice(0, 2).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p>No cards match your criteria. Try adjusting your preferences.</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
