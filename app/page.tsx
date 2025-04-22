import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Calculator, BookOpen, BarChart, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Make Smarter Financial Decisions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Compare credit cards, calculate loans, and learn about personal finance with FinWise.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/credit-cards">Compare Credit Cards</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/calculators">Try Our Calculators</Link>
                </Button>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=550&width=550"
              alt="Financial Dashboard"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to make informed financial decisions
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
                <CreditCard className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Compare</div>
                <p className="text-xs text-muted-foreground">Find the best credit cards based on your preferences</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/credit-cards">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calculators</CardTitle>
                <Calculator className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Calculate</div>
                <p className="text-xs text-muted-foreground">Plan loans, investments, and savings with our tools</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/calculators">
                    Try Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Education</CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Learn</div>
                <p className="text-xs text-muted-foreground">Read articles and guides about personal finance</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/blog">
                    Read Articles <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Insights</CardTitle>
                <BarChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Analyze</div>
                <p className="text-xs text-muted-foreground">Discover trends and make data-driven decisions</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/insights">
                    View Insights <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
