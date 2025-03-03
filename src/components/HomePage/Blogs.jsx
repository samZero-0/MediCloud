

const healthTips = [
  {
    id: 1,
    title: "5 Simple Ways to Boost Your Immune System",
    excerpt: "Discover easy, natural methods to strengthen your body's defenses and stay healthy year-round.",
    image: "https://medicalwesthospital.org/wp-content/uploads/2022/02/How-to-Boost-Your-Immune-System-in-5-Easy-Ways.jpg",
    author: "Dr. Jane Smith",
    date: "May 15, 2023",
  },
  {
    id: 2,
    title: "The Importance of Staying Hydrated",
    excerpt: "Learn about the numerous benefits of proper hydration and how it affects your overall health.",
    image: "https://portcrossfit.com/wp-content/uploads/2023/08/staying-hydrated-summer.jpg",
    author: "Dr. Michael Johnson",
    date: "May 10, 2023",
  },
  {
    id: 3,
    title: "Understanding and Managing Stress",
    excerpt: "Explore effective strategies to recognize and cope with stress in your daily life.",
    image: "https://englishpluspodcast.com/wp-content/uploads/2023/05/Understanding-and-Managing-Stress.jpg",
    author: "Dr. Emily Brown",
    date: "May 5, 2023",
  },
]

const BlogCard = ({ post }) => (
  <div className="bg-white dark:bg-transparent dark:border  rounded-lg shadow-md overflow-hidden">
    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h3>
      <p className="text-gray-600 mb-4 dark:text-gray-200">{post.excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  </div>
)

const HealthTipsBlog = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Health Tips Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button  className="bg-[#14213D] text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
           <a href="https://www.health.harvard.edu/blog" target="_blank">View more blogs</a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HealthTipsBlog

