"use client";
import { useEffect, useState } from "react";

export default function AdminHero() {
  const [slides, setSlides] = useState<any[]>([]);

  // FETCH HERO SLIDES
  useEffect(() => {
    fetch("http://localhost:5000/api/hero")
      .then(res => res.json())
      .then(data => setSlides(data || []));
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (i: number, key: string, value: string) => {
    const updated = [...slides];
    updated[i] = { ...updated[i], [key]: value };
    setSlides(updated);
  };

  // ADD NEW SLIDE
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        title: "",
        subtitle: "",
        description: "",
        image: "",

        btn1Text: "",
        btn1Link: "",
        btn2Text: "",
        btn2Link: "",
        btn3Text: "",
        btn3Link: "",
      },
    ]);
  };

  // DELETE SLIDE
  const deleteSlide = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
  };

  // SAVE SLIDES
  const saveSlides = async () => {
    await fetch("http://localhost:5000/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slides),
    });
    alert("Hero slides updated ✅");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin – Hero Slider</h1>

      {slides.map((s, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3 relative">

          {/* DELETE */}
          <button
            onClick={() => deleteSlide(i)}
            className="absolute top-2 right-2 text-red-600 text-sm"
          >
            Delete ✖
          </button>

          <input
            value={s.title}
            onChange={e => handleChange(i, "title", e.target.value)}
            placeholder="H1 Title"
            className="border p-2 w-full"
          />

          <input
            value={s.subtitle}
            onChange={e => handleChange(i, "subtitle", e.target.value)}
            placeholder="H2 Subtitle"
            className="border p-2 w-full"
          />

          <textarea
            value={s.description}
            onChange={e => handleChange(i, "description", e.target.value)}
            placeholder="Paragraph Description"
            className="border p-2 w-full"
          />

          <input
            value={s.image}
            onChange={e => handleChange(i, "image", e.target.value)}
            placeholder="Background Image URL"
            className="border p-2 w-full"
          />

          {/* BUTTON 1 */}
          <div className="grid grid-cols-2 gap-2">
            <input
              value={s.btn1Text}
              onChange={e => handleChange(i, "btn1Text", e.target.value)}
              placeholder="Button 1 Text"
              className="border p-2"
            />
            <input
              value={s.btn1Link}
              onChange={e => handleChange(i, "btn1Link", e.target.value)}
              placeholder="Button 1 Link"
              className="border p-2"
            />
          </div>

          {/* BUTTON 2 */}
          <div className="grid grid-cols-2 gap-2">
            <input
              value={s.btn2Text}
              onChange={e => handleChange(i, "btn2Text", e.target.value)}
              placeholder="Button 2 Text"
              className="border p-2"
            />
            <input
              value={s.btn2Link}
              onChange={e => handleChange(i, "btn2Link", e.target.value)}
              placeholder="Button 2 Link"
              className="border p-2"
            />
          </div>

          {/* BUTTON 3 */}
          <div className="grid grid-cols-2 gap-2">
            <input
              value={s.btn3Text}
              onChange={e => handleChange(i, "btn3Text", e.target.value)}
              placeholder="Button 3 Text"
              className="border p-2"
            />
            <input
              value={s.btn3Link}
              onChange={e => handleChange(i, "btn3Link", e.target.value)}
              placeholder="Button 3 Link"
              className="border p-2"
            />
          </div>

        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={addSlide}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          + Add Slide
        </button>

        <button
          onClick={saveSlides}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Slides
        </button>
      </div>
    </div>
  );
}
