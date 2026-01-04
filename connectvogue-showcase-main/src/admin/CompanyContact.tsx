import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CompanyContact = () => {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    email: "",
    workingHours: "",
  });

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/company-contact");
    const data = await res.json();
    if (data) setForm(data);
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/company-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    toast.success("Contact details updated");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Company Contact Details</h1>

      <Textarea
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <Input
        placeholder="Phone"
        className="mt-4"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <Input
        placeholder="Email"
        className="mt-4"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        placeholder="Working Hours"
        className="mt-4"
        value={form.workingHours}
        onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
      />

      <Button className="mt-6" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default CompanyContact;
