import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ContactMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();

      // 👇 VERY IMPORTANT
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (data.contacts) {
        setMessages(data.contacts);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE",
    });
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages found</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="border p-4 rounded">
            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Phone:</b> {msg.phone}</p>
            <p><b>Message:</b> {msg.message}</p>

            <Button
              variant="destructive"
              className="mt-3"
              onClick={() => deleteMessage(msg._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessages;
