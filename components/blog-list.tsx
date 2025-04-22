import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Credit Card for Your Lifestyle",
    excerpt:
      "With hundreds of credit cards available, finding the right one can be overwhelming. Learn how to match a card to your spending habits and financial goals.",
    date: "April 2, 2023",
    author: "Sarah Johnson",
    category: "Credit Cards",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Understanding APR: What It Means for Your Finances",
    excerpt:
      "Annual Percentage Rate (APR) is a critical number when comparing loans and credit cards. We break down what it means and how it affects your payments.",
    date: "March 15, 2023",
    author: "Michael Chen",
    category: "Credit",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "The Power of Compound Interest in Long-Term Investing",
    excerpt:
      "Einstein called compound interest the eighth wonder of the world. Discover how it works and why starting to invest early can lead to significant wealth.",
    date: "February 28, 2023",
    author: "David Rodriguez",
    category: "Investing",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Emergency Funds: How Much Should You Save?",
    excerpt:
      "Financial experts recommend having an emergency fund, but how much should you actually save? We explore different approaches based on your situation.",
    date: "February 10, 2023",
    author: "Emily Parker",
    category: "Savings",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Debt Snowball vs. Debt Avalanche: Which Method Is Right for You?",
    excerpt:
      "When paying off multiple debts, should you tackle the smallest balance first or the highest interest rate? We compare these popular debt repayment strategies.",
    date: "January 22, 2023",
    author: "James Wilson",
    category: "Debt",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function BlogList() {
  return (
    <div className="space-y-8">
      {blogPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>
                  By {post.author} • {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
