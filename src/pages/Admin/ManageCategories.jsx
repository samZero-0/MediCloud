import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ categoryName: "", categoryImage: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get("https://assignment-12-blue.vercel.app/allCategories");
      setCategories(response.data);
    } catch (error) {
      /
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch categories. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle form submission (both add and update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    if (editingCategory) {
      // If editing, call handleUpdateCategory
      await handleUpdateCategory(editingCategory._id, newCategory);
    } else {
      // If adding, call handleAddCategory
      await handleAddCategory();
    }
    setIsLoading(false); // Stop loading
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      await axios.post("https://assignment-12-blue.vercel.app/categories", newCategory);
      setIsModalOpen(false);
      setNewCategory({ categoryName: "", categoryImage: "" });
      fetchCategories();

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Category added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      
      Swal.fire({
        title: "Success!",
        text: "Category added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async (id, updatedData) => {
    try {
      await axios.patch(`https://assignment-12-blue.vercel.app/categories/${id}`, updatedData);
      setIsModalOpen(false);
      setNewCategory({ categoryName: "", categoryImage: "" });
      fetchCategories();

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Category updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
     
      Swal.fire({
        title: "Error!",
        text: "Failed to update category. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    // Confirm deletion
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true); // Start loading
        try {
          await axios.delete(`https://assignment-12-blue.vercel.app/categories/${id}`);
          fetchCategories(); // Refresh the list

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          
          Swal.fire({
            title: "Error!",
            text: "Failed to delete category. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    });
  };

  // Open modal for adding or editing a category
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setNewCategory({ categoryName: category.category, categoryImage: category.image });
    } else {
      setEditingCategory(null);
      setNewCategory({ categoryName: "", categoryImage: "" });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* Add Category Button */}
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600"
      >
        Add Category
      </button>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Medicines</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{category.category}</td>
                <td className="px-6 py-4">
                  <img src={category.image} alt={category.category} className="w-16 h-16 rounded-md" />
                </td>
                <td className="px-6 py-4">{category.count}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  value={newCategory.categoryName}
                  onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category Image URL</label>
                <input
                  type="text"
                  value={newCategory.categoryImage}
                  onChange={(e) => setNewCategory({ ...newCategory, categoryImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;