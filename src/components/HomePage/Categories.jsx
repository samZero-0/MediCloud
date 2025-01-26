import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => (
  <Link to={`categories/${category.category}`}> 
  <div  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
  <img
    src={category.image || "/placeholder.svg"}
    alt={category.category}
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
    <p className="text-gray-600">{category.count} medicines</p>
  </div>
</div>
</Link>);

const CategoryCardSection = () => {
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
   
    axios
      .get("https://assignment-12-blue.vercel.app/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []); 

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Medicine Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0,8).map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCardSection;
