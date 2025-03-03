import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => (
  <Link to={`categories/${category.category}`}> 
  <div  className="bg-white dark:bg-transparent dark:text-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 dark:border">
  <img
    src={category.image || "/placeholder.svg"}
    alt={category.category}
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
    <p className="text-gray-600 h-[50px] dark:text-gray-300">{category.count} medicines are available for {category.category}</p>
  </div>

  <div>
 
  </div>

  <div className="p-3 ">
    <button className="btn bg-[#FCA311] font-bold text-white">See More</button>
  </div>
</div>
</Link>);

const CategoryCardSection = () => {
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
   
    axios
      .get("https://assignment-12-blue.vercel.app/allCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
       
        err
      });
  }, []); 

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Medicine Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {categories.slice(0,8).map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCardSection;
