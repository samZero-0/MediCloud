

const healthTips = [
  {
    id: 1,
    title: "5 Simple Ways to Boost Your Immune System",
    excerpt: "Discover easy, natural methods to strengthen your body's defenses and stay healthy year-round.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Dr. Jane Smith",
    date: "May 15, 2023",
  },
  {
    id: 2,
    title: "The Importance of Staying Hydrated",
    excerpt: "Learn about the numerous benefits of proper hydration and how it affects your overall health.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Dr. Michael Johnson",
    date: "May 10, 2023",
  },
  {
    id: 3,
    title: "Understanding and Managing Stress",
    excerpt: "Explore effective strategies to recognize and cope with stress in your daily life.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Dr. Emily Brown",
    date: "May 5, 2023",
  },
]

const BlogCard = ({ post }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  </div>
)

const HealthTipsBlog = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Health Tips Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            View All Health Tips
          </button>
        </div>
      </div>
    </section>
  )
}

export default HealthTipsBlog

