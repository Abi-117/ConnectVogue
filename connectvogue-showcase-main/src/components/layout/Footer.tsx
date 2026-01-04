import { useEffect, useState } from "react";
import { fetchFooter } from "@/api/footer";

export const Footer = () => {
  const [f, setF] = useState<any>(null);

  useEffect(() => {
    fetchFooter().then(setF);
  }, []);

  if (!f) return null;

  return (
    <footer className="bg-noir text-silk p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-xl font-bold font-display mb-4">{f.brandName}</h2>
          <p className="space-y-4">{f.description}</p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          {f.quickLinks.map((l:any)=>(
            <a className="block mb-2" key={l.label} href={l.url}>{l.label}</a>
          ))}
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Customer Service</h4>
          {f.customerService.map((l:any)=>(
            <a className="block mb-2" key={l.label} href={l.url}>{l.label}</a>
          ))}
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
          <p>{f.contact.address}</p>
          <p>{f.contact.phone}</p>
          <p>{f.contact.email}</p>
          <p>{f.contact.workingHours}</p>
        </div>

      </div>
     <hr />
      <p className="text-center mt-1">{f.bottomText}</p>
    </footer>
  );
};
