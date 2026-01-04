"use client";
import { useEffect, useState } from "react";

const iconsList = ["Award", "Users", "Globe", "Heart"];

export default function AdminAbout() {
  const [formData, setFormData] = useState<any>({
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    storyTitle: "",
    storyContent: "",
    storyImage: "",
    values: iconsList.map(icon => ({
      icon,
      title: "",
      description: "",
    })),
    stats: Array(4).fill({ value: "", label: "" }),
  });

  // Fetch About data
  useEffect(() => {
    fetch("http://localhost:5000/api/about")
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log("ADMIN ABOUT DATA 👉", data);
          setFormData(data);
        }
      })
      .catch(err => console.error("ADMIN FETCH ERROR", err));
  }, []);

  const handleChange = (e: any, i?: number, arr?: string, key?: string) => {
    const { name, value } = e.target;

    if (arr && typeof i === "number" && key) {
      const updated = [...formData[arr]];
      updated[i][key] = value;
      setFormData({ ...formData, [arr]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/about", {
        method: "PUT", // ✅ IMPORTANT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("About page updated successfully ✅");
    } catch {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin – About Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Hero */}
        <input name="heroTitle" value={formData.heroTitle} onChange={handleChange} placeholder="Hero Title" className="border p-2 w-full" />
        <input name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} placeholder="Hero Subtitle" className="border p-2 w-full" />
        <input name="heroImage" value={formData.heroImage} onChange={handleChange} placeholder="Hero Image URL" className="border p-2 w-full" />

        {/* Story */}
        <input name="storyTitle" value={formData.storyTitle} onChange={handleChange} placeholder="Story Title" className="border p-2 w-full" />
        <textarea name="storyContent" value={formData.storyContent} onChange={handleChange} placeholder="Story Content" className="border p-2 w-full" />
        <input name="storyImage" value={formData.storyImage} onChange={handleChange} placeholder="Story Image URL" className="border p-2 w-full" />

        {/* Values */}
        {formData.values.map((v: any, i: number) => (
          <div key={i} className="border p-2">
            <select value={v.icon} onChange={e => handleChange(e, i, "values", "icon")} className="border p-1 w-full">
              {iconsList.map(icon => <option key={icon}>{icon}</option>)}
            </select>
            <input value={v.title} onChange={e => handleChange(e, i, "values", "title")} placeholder="Title" className="border p-1 w-full" />
            <input value={v.description} onChange={e => handleChange(e, i, "values", "description")} placeholder="Description" className="border p-1 w-full" />
          </div>
        ))}

        {/* Stats */}
        {formData.stats.map((s: any, i: number) => (
          <div key={i} className="flex gap-2">
            <input value={s.value} onChange={e => handleChange(e, i, "stats", "value")} placeholder="Value" className="border p-1 w-1/2" />
            <input value={s.label} onChange={e => handleChange(e, i, "stats", "label")} placeholder="Label" className="border p-1 w-1/2" />
          </div>
        ))}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save About Page
        </button>
      </form>
    </div>
  );
}
