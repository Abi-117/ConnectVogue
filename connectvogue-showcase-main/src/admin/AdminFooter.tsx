import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API = "http://localhost:5000/api/footer";

export default function AdminFooter() {
  const [footer, setFooter] = useState<any>({
    brandName: "",
    description: "",
    socials: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
    quickLinks: [],
    customerService: [],
    contact: {
      address: "",
      phone: "",
      email: "",
      workingHours: "",
    },
    bottomText: "",
  });

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => data && setFooter(data));
  }, []);

  const saveFooter = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(footer),
    });
    alert("Footer updated successfully ✅");
  };

  const addLink = (key: "quickLinks" | "customerService") => {
  setFooter({
    ...footer,
    [key]:
      key === "customerService"
        ? [...footer[key], { label: "", page: "" }]
        : [...footer[key], { label: "", url: "" }],
  });
};

  const updateLink = (
    key: "quickLinks" | "customerService",
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...footer[key]];
    updated[index][field] = value;
    setFooter({ ...footer, [key]: updated });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Footer Management</h1>

      {/* Brand */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Brand Name"
            value={footer.brandName}
            onChange={(e) =>
              setFooter({ ...footer, brandName: e.target.value })
            }
          />
          <Textarea
            placeholder="Brand Description"
            value={footer.description}
            onChange={(e) =>
              setFooter({ ...footer, description: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Input
            placeholder="Instagram URL"
            value={footer.socials.instagram}
            onChange={(e) =>
              setFooter({
                ...footer,
                socials: { ...footer.socials, instagram: e.target.value },
              })
            }
          />
          <Input
            placeholder="Facebook URL"
            value={footer.socials.facebook}
            onChange={(e) =>
              setFooter({
                ...footer,
                socials: { ...footer.socials, facebook: e.target.value },
              })
            }
          />
          <Input
            placeholder="Twitter URL"
            value={footer.socials.twitter}
            onChange={(e) =>
              setFooter({
                ...footer,
                socials: { ...footer.socials, twitter: e.target.value },
              })
            }
          />
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {footer.quickLinks.map((link: any, i: number) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  updateLink("quickLinks", i, "label", e.target.value)
                }
              />
              <Input
                placeholder="URL"
                value={link.url}
                onChange={(e) =>
                  updateLink("quickLinks", i, "url", e.target.value)
                }
              />
            </div>
          ))}
          <Button variant="outline" onClick={() => addLink("quickLinks")}>
            + Add Quick Link
          </Button>
        </CardContent>
      </Card>

      {/* Customer Service */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Service Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {footer.customerService.map((link: any, i: number) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  updateLink("customerService", i, "label", e.target.value)
                }
              />
              <Input
                placeholder="URL"
                value={link.url}
                onChange={(e) =>
                  updateLink("customerService", i, "url", e.target.value)
                }
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addLink("customerService")}
          >
            + Add Customer Service Link
          </Button>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Address"
            value={footer.contact.address}
            onChange={(e) =>
              setFooter({
                ...footer,
                contact: { ...footer.contact, address: e.target.value },
              })
            }
          />
          <Input
            placeholder="Phone"
            value={footer.contact.phone}
            onChange={(e) =>
              setFooter({
                ...footer,
                contact: { ...footer.contact, phone: e.target.value },
              })
            }
          />
          <Input
            placeholder="Email"
            value={footer.contact.email}
            onChange={(e) =>
              setFooter({
                ...footer,
                contact: { ...footer.contact, email: e.target.value },
              })
            }
          />
          <Input
            placeholder="Working Hours"
            value={footer.contact.workingHours}
            onChange={(e) =>
              setFooter({
                ...footer,
                contact: {
                  ...footer.contact,
                  workingHours: e.target.value,
                },
              })
            }
          />
        </CardContent>
      </Card>

      {/* Bottom Text */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Bottom Text</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="© 2026 ConnectVogue. All rights reserved."
            value={footer.bottomText}
            onChange={(e) =>
              setFooter({ ...footer, bottomText: e.target.value })
            }
          />
        </CardContent>
      </Card>

      <div className="text-right">
        <Button size="lg" onClick={saveFooter}>
          Save Footer
        </Button>
      </div>
    </div>
  );
}
