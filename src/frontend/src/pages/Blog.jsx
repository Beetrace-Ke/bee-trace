import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Beekeeping: How Blockchain is Revolutionizing Honey Production",
    excerpt: "Discover how blockchain technology is transforming traditional beekeeping practices and creating new opportunities for sustainable agriculture.",
    author: "Dr. Sarah Mwangi",
    date: "2024-01-15",
    category: "Technology",
    readTime: "5 min read",
    image: "/lovable-uploads/457a733f-f8ef-400c-b010-9d6aa9be9f34.png"
  },
  {
    id: 2,
    title: "Carbon Credits from Pollination: A New Revenue Stream for Beekeepers",
    excerpt: "Learn how beekeepers can earn additional income through carbon credit programs while supporting environmental conservation.",
    author: "James Kariuki",
    date: "2024-01-10",
    category: "Sustainability",
    readTime: "7 min read",
    image: "/lovable-uploads/457a733f-f8ef-400c-b010-9d6aa9be9f34.png"
  },
  {
    id: 3,
    title: "Building Community Through Decentralized Beekeeping Networks",
    excerpt: "Explore how decentralized networks are connecting beekeepers across Kenya and creating stronger communities.",
    author: "Mary Njeri",
    date: "2024-01-05",
    category: "Community",
    readTime: "4 min read",
    image: "/lovable-uploads/457a733f-f8ef-400c-b010-9d6aa9be9f34.png"
  },
  {
    id: 4,
    title: "Getting Started: Your First Hive Investment",
    excerpt: "A beginner's guide to investing in beekeeping projects and understanding the potential returns.",
    author: "Peter Ochieng",
    date: "2024-01-01",
    category: "Investment",
    readTime: "6 min read",
    image: "/lovable-uploads/457a733f-f8ef-400c-b010-9d6aa9be9f34.png"
  }
];

const categories = ["All", "Technology", "Sustainability", "Community", "Investment"];

const Blog = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BeeTrace Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, updates, and stories from the world of blockchain-powered beekeeping
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden border-0 shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-3">{blogPosts[0].category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Button className="group">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get the latest insights on blockchain beekeeping, sustainability, and community building delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;