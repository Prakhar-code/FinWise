"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Star, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample credit card data
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
  },
]

export function CreditCardComparisonTool() {
  const [filters, setFilters] = useState({
    creditScore: [650],
    annualFee: "any",
    cashbackRewards: "any",
    issuer: "any",
  })

  const [filteredCards, setFilteredCards] = useState(creditCards)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters
    let result = creditCards

    // Credit score filter
    if (newFilters.creditScore && newFilters.creditScore.length > 0) {
      const score = newFilters.creditScore[0]
      result = result.filter((card) => card.creditScoreMin <= score && card.creditScoreMax >= score)
    }

    // Annual fee filter
    if (newFilters.annualFee !== "any") {
      if (newFilters.annualFee === "0") {
        result = result.filter((card) => card.annualFee === 0)
      } else if (newFilters.annualFee === "under100") {
        result = result.filter((card) => card.annualFee < 100)
      } else if (newFilters.annualFee === "100plus") {
        result = result.filter((card) => card.annualFee >= 100)
      }
    }

    // Cashback/rewards filter
    if (newFilters.cashbackRewards !== "any") {
      if (newFilters.cashbackRewards === "cashback") {
        result = result.filter((card) => card.cashback > 0)
      } else if (newFilters.cashbackRewards === "travel") {
        result = result.filter((card) =>
          card.rewards.some(
            (reward) =>
              reward.toLowerCase().includes("travel") ||
              reward.toLowerCase().includes("flight") ||
              reward.toLowerCase().includes("hotel"),
          ),
        )
      }
    }

    // Issuer filter
    if (newFilters.issuer !== "any") {
      result = result.filter((card) => card.issuer === newFilters.issuer)
    }

    setFilteredCards(result)
  }

  const uniqueIssuers = Array.from(new Set(creditCards.map((card) => card.issuer)))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Credit Cards</CardTitle>
          <CardDescription>Adjust the filters to find cards that match your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="credit-score">Credit Score: {filters.creditScore[0]}</Label>
              <Slider
                id="credit-score"
                min={300}
                max={850}
                step={10}
                value={filters.creditScore}
                onValueChange={(value) => handleFilterChange("creditScore", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-fee">Annual Fee</Label>
              <Select value={filters.annualFee} onValueChange={(value) => handleFilterChange("annualFee", value)}>
                <SelectTrigger id="annual-fee">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0">No Annual Fee</SelectItem>
                  <SelectItem value="under100">Under $100</SelectItem>
                  <SelectItem value="100plus">$100 and above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewards-type">Rewards Type</Label>
              <Select
                value={filters.cashbackRewards}
                onValueChange={(value) => handleFilterChange("cashbackRewards", value)}
              >
                <SelectTrigger id="rewards-type">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="cashback">Cash Back</SelectItem>
                  <SelectItem value="travel">Travel Rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Card Issuer</Label>
              <Select value={filters.issuer} onValueChange={(value) => handleFilterChange("issuer", value)}>
                <SelectTrigger id="issuer">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {uniqueIssuers.map((issuer) => (
                    <SelectItem key={issuer} value={issuer}>
                      {issuer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Card key={card.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <CardDescription>{card.issuer}</CardDescription>
                  </div>
                  {card.popular && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-2 gap-2 mb-4">
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

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Rewards</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {card.rewards.map((reward, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Percent className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{reward}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {card.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <h3 className="text-lg font-medium">No cards match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more options</p>
          </div>
        )}
      </div>
    </div>
  )
}
