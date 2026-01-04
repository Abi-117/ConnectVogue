import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function AdminNavbar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Navbar (Auto from Categories)</h1>

      {categories.map(cat => (
        <div key={cat._id} className="border-b py-2">
          <span className="font-medium">{cat.name}</span>
          <span className="text-gray-500 ml-2">
            /category/{cat.slug}
          </span>
        </div>
      ))}
    </div>
  );
}
