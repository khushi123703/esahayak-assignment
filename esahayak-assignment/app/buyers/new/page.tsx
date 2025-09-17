// "use client";

// import { useState } from "react";
// import { buyerSchema } from "@/lib/schema";

// export default function NewBuyerPage() {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     status: "New",
//     budgetMin: "",
//     budgetMax: "",
//     timeline: "<1m",
//     source: "Referral",
//     notes: "",
//     tags: "",
//   });

//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const parsed = buyerSchema.safeParse({
//       ...form,
//       budgetMin: Number(form.budgetMin),
//       budgetMax: Number(form.budgetMax),
//     });

//     if (!parsed.success) {
//       setError(parsed.error.errors.map((err) => err.message).join(", "));
//       return;
//     }

//     const res = await fetch("/api/buyers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(parsed.data),
//     });

//     if (!res.ok) {
//       setError("Failed to create buyer");
//       return;
//     }

//     setSuccess("Buyer created successfully!");
//     setForm({
//       fullName: "",
//       email: "",
//       phone: "",
//       status: "New",
//       budgetMin: "",
//       budgetMax: "",
//       timeline: "<1m",
//       source: "Referral",
//       notes: "",
//       tags: "",
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Buyer</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//           />
//           <input
//             name="phone"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//           />
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900"
//           >
//             <option>New</option>
//             <option>Qualified</option>
//             <option>Contacted</option>
//             <option>Visited</option>
//             <option>Negotiation</option>
//             <option>Converted</option>
//             <option>Dropped</option>
//           </select>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="budgetMin"
//               type="number"
//               placeholder="Budget Min"
//               value={form.budgetMin}
//               onChange={handleChange}
//               className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//             />
//             <input
//               name="budgetMax"
//               type="number"
//               placeholder="Budget Max"
//               value={form.budgetMax}
//               onChange={handleChange}
//               className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//             />
//           </div>
//           <select
//             name="timeline"
//             value={form.timeline}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900"
//           >
//             <option value="<1m">&lt;1m</option>
//             <option value="1-3m">1-3m</option>
//             <option value="3-6m">3-6m</option>
//             <option value=">6m">&gt;6m</option>
//           </select>
//           <select
//             name="source"
//             value={form.source}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900"
//           >
//             <option>Referral</option>
//             <option>Website</option>
//             <option>Social Media</option>
//             <option>Other</option>
//           </select>
//           <textarea
//             name="notes"
//             placeholder="Notes"
//             value={form.notes}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//           />
//           <input
//             name="tags"
//             placeholder="Tags (comma separated)"
//             value={form.tags}
//             onChange={handleChange}
//             className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
//           >
//             Create
//           </button>
//         </form>

//         {error && <p className="mt-4 text-red-600">{error}</p>}
//         {success && <p className="mt-4 text-green-600">{success}</p>}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { buyerSchema } from "@/lib/schema";

export default function NewBuyerPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "New",
    budgetMin: "",
    budgetMax: "",
    timeline: "<1m",
    source: "Referral",
    notes: "",
    tags: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const parsed = buyerSchema.safeParse({
      ...form,
      budgetMin: Number(form.budgetMin),
      budgetMax: Number(form.budgetMax),
    });

    if (!parsed.success) {
      setError(parsed.error.errors.map((err) => err.message).join(", "));
      return;
    }

    const res = await fetch("/api/buyers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      setError("Failed to create buyer");
      return;
    }

    setSuccess("Buyer created successfully!");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      status: "New",
      budgetMin: "",
      budgetMax: "",
      timeline: "<1m",
      source: "Referral",
      notes: "",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Buyer</h1>
          <Link href="/buyers">
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              ← Back to Buyers
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900"
          >
            <option>New</option>
            <option>Qualified</option>
            <option>Contacted</option>
            <option>Visited</option>
            <option>Negotiation</option>
            <option>Converted</option>
            <option>Dropped</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="budgetMin"
              type="number"
              placeholder="Budget Min"
              value={form.budgetMin}
              onChange={handleChange}
              className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
            />
            <input
              name="budgetMax"
              type="number"
              placeholder="Budget Max"
              value={form.budgetMax}
              onChange={handleChange}
              className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
            />
          </div>
          <select
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900"
          >
            <option value="<1m">&lt;1m</option>
            <option value="1-3m">1-3m</option>
            <option value="3-6m">3-6m</option>
            <option value=">6m">&gt;6m</option>
          </select>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900"
          >
            <option>Referral</option>
            <option>Website</option>
            <option>Social Media</option>
            <option>Other</option>
          </select>
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
          />
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-3 rounded text-gray-900 placeholder-gray-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
          >
            Create
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>
    </div>
  );
}
