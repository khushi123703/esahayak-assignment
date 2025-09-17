"use client";

import { useEffect, useState } from "react";
// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/buyers");
}


// type Buyer = {
//   id: string;
//   name: string;
//   email: string;
// };

// export default function BuyersPage() {
//   const [buyers, setBuyers] = useState<Buyer[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch buyers
//   useEffect(() => {
//     fetch("/api/buyers")
//       .then((res) => res.json())
//       .then((data) => setBuyers(data));
//   }, []);

//   // Add buyer
//   const handleAddBuyer = async () => {
//     if (!name || !email) return alert("Please fill in all fields");
//     setLoading(true);

//     const res = await fetch("/api/buyers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email }),
//     });

//     if (!res.ok) {
//       alert("Failed to add buyer");
//       setLoading(false);
//       return;
//     }

//     const newBuyer = await res.json();
//     setBuyers((prev) => [...prev, newBuyer]);
//     setName("");
//     setEmail("");
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Buyers List</h1>

//       {/* Add Buyer Form */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Name"
//           className="border border-gray-300 p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button
//           onClick={handleAddBuyer}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Adding..." : "Add Buyer"}
//         </button>
//       </div>

//       {/* Buyers Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">Name</th>
//               <th className="border border-gray-300 p-3 text-left">Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buyers.map((buyer) => (
//               <tr key={buyer.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 p-3">{buyer.name}</td>
//                 <td className="border border-gray-300 p-3">{buyer.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {buyers.length === 0 && (
//           <p className="text-center text-gray-500 py-4">No buyers yet</p>
//         )}
//       </div>
//     </div>
//   );
// }
