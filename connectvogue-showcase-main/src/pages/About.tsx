"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Award, Users, Globe, Heart } from "lucide-react";

const iconsMap: any = { Award, Users, Globe, Heart };

export default function About() {
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/about")
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(() => {});
  }, []);

  if (!about) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center mt-16">
        <img
          src={about.heroImage}
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/70" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-silk mb-4">
            {about.heroTitle}
          </h1>
          <p className="text-silk/80 text-lg max-w-2xl mx-auto px-4">
            {about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              {about.storyTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{about.storyContent}</p>
          </div>
          <div className="relative animate-fade-in">
            <img
              src={about.storyImage}
              alt="Our Story"
              className="rounded-lg shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-silk">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((val: any, i: number) => {
              const Icon = iconsMap[val.icon];
              return (
                <div key={i} className="bg-card rounded-lg p-6 shadow-soft text-center hover:shadow-elegant transition-shadow animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {about.stats.map((stat: any, i: number) => (
            <div key={i} className="animate-fade-in">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
