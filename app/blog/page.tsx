import { BlogList } from "@/components/blog-list"
import { BlogSidebar } from "@/components/blog-sidebar"

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Financial Education</h1>
        <p className="text-muted-foreground">Learn about personal finance, credit cards, loans, and investments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <BlogList />
        </div>
        <div className="md:col-span-1">
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}
