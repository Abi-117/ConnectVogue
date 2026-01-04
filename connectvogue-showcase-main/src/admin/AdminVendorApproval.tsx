
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Vendor {
    _id: string;
    email: string;
    name?: string;
    companyName?: string;
    createdAt: string;
}

export default function AdminVendorApproval() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVendors = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/admin/vendors/pending", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("adminToken"),
                },
            });
            if (!res.ok) throw new Error("Failed to fetch vendors");
            const data = await res.json();
            setVendors(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load pending vendors");
        } finally {
            setLoading(false);
        }
    };

    const approveVendor = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/admin/vendors/${id}/approve`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("adminToken"),
                },
            });

            if (!res.ok) throw new Error("Failed to approve vendor");

            toast.success("Vendor approved successfully");
            setVendors(vendors.filter(v => v._id !== id));
        } catch (err) {
            console.error(err);
            toast.error("Failed to approve vendor");
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Vendor Approvals</h1>

            {loading ? (
                <p>Loading...</p>
            ) : vendors.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
                    No pending vendor approvals
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Company</th>
                                <th className="p-4 font-medium text-gray-600">Email</th>
                                <th className="p-4 font-medium text-gray-600">Joined</th>
                                <th className="p-4 font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {vendors.map((vendor) => (
                                <tr key={vendor._id} className="hover:bg-gray-50">
                                    <td className="p-4">{vendor.companyName || "N/A"}</td>
                                    <td className="p-4">{vendor.email}</td>
                                    <td className="p-4">{new Date(vendor.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => approveVendor(vendor._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
