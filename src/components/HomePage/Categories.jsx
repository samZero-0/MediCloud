import React from "react"

// Mock data for categories
const categories = [
  { id: 1, name: "Pain Relief", image: "/placeholder.svg?height=200&width=200", medicineCount: 45 },
  { id: 2, name: "Antibiotics", image: "/placeholder.svg?height=200&width=200", medicineCount: 32 },
  { id: 3, name: "Cardiovascular", image: "/placeholder.svg?height=200&width=200", medicineCount: 28 },
  { id: 4, name: "Respiratory", image: "/placeholder.svg?height=200&width=200", medicineCount: 37 },
  { id: 5, name: "Gastrointestinal", image: "/placeholder.svg?height=200&width=200", medicineCount: 41 },
  { id: 6, name: "Dermatology", image: "/placeholder.svg?height=200&width=200", medicineCount: 23 },
]

const CategoryCard = ({ category }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
    <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-gray-600">{category.medicineCount} medicines</p>
    </div>
  </div>
)

const CategoryCardSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Medicine Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryCardSection

