import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  // contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // company contact details
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/company-contact")
      .then((res) => res.json())
      .then((data) => setCompany(data))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative h-80 flex items-center justify-center mt-16">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=500&fit=crop"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/70" />
        <div className="relative z-10 text-center">
         
          <h1 className="text-silk/80 text-4xl">Let's Build the Future Together</h1>
          <p className="text-silk/8 text-primary px-10">Whether you're a customer seeking premium brands at great prices,
a seller ready to grow with low commissions,
a developer building the next unicorn,
a marketer scaling a brand,
or an investor believing in India's fashion revolution,
ConnectVogue is your destination.</p>
        </div>
        
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* COMPANY CONTACT DETAILS */}
          <div className="space-y-6">
            
            <h2 className="text-2xl font-bold">Get in Touch</h2>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin /></div>
              <p>{company?.address || "—"}</p>
            </div>
            

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone /></div>
              <p>{company?.phone || "—"}</p>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail /></div>
              <p>{company?.email || "—"}</p>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock /></div>
              <p>{company?.workingHours || "—"}</p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 md:p-8 shadow-soft">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Message</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button disabled={loading}>
                {loading ? "Sending..." : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
          </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Contact;
