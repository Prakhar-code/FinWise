import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function BlogSidebar() {
  // Sample categories with post counts
  const categories = [
    { name: "Credit Cards", count: 12 },
    { name: "Loans", count: 8 },
    { name: "Investing", count: 15 },
    { name: "Savings", count: 10 },
    { name: "Debt", count: 7 },
    { name: "Retirement", count: 9 },
    { name: "Budgeting", count: 11 },
    { name: "Taxes", count: 6 },
  ]

  // Sample popular posts
  const popularPosts = [
    { id: 1, title: "10 Credit Card Mistakes to Avoid" },
    { id: 2, title: "How to Build Credit from Scratch" },
    { id: 3, title: "Investing for Beginners: Getting Started" },
    { id: 4, title: "The Ultimate Guide to Emergency Funds" },
    { id: 5, title: "Understanding Credit Scores" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search articles..." className="pl-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.name} variant="outline" className="cursor-pointer hover:bg-muted">
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {popularPosts.map((post) => (
              <li key={post.id}>
                <a href={`/blog/${post.id}`} className="text-sm hover:underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
          <CardDescription>Get the latest financial tips and advice delivered to your inbox</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="email" placeholder="Your email address" className="mb-2" />
          <Button className="w-full">Subscribe</Button>
        </CardContent>
      </Card>
    </div>
  )
}
