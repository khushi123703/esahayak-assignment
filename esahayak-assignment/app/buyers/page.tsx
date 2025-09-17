// "use client";

// import { useEffect, useState } from "react";
// // app/page.tsx
// import { redirect } from "next/navigation";




// interface Buyer {
//   id: string;
//   fullName: string;
//   email: string;
//   phone?: string;
//   status?: string;
//   budgetMin?: number;
//   budgetMax?: number;
//   timeline?: string;
//   source?: string;
//   tags?: string;
//   notes?: string;
// }

// export default function BuyersListPage() {
//   const [buyers, setBuyers] = useState<Buyer[]>([]);

//   useEffect(() => {
//     const fetchBuyers = async () => {
//       const res = await fetch("/api/buyers");
//       const data = await res.json();
//       setBuyers(data);
//     };
//     fetchBuyers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-gray-900">Buyers List</h1>

//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 rounded-lg shadow-sm">
//             <thead>
//               <tr className="bg-gray-200 text-left text-gray-800 font-semibold">
//                 <th className="border border-gray-300 px-4 py-2">Full Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//                 <th className="border border-gray-300 px-4 py-2">Phone</th>
//                 <th className="border border-gray-300 px-4 py-2">Status</th>
//                 <th className="border border-gray-300 px-4 py-2">Budget</th>
//                 <th className="border border-gray-300 px-4 py-2">Timeline</th>
//                 <th className="border border-gray-300 px-4 py-2">Source</th>
//                 <th className="border border-gray-300 px-4 py-2">Tags</th>
//                 <th className="border border-gray-300 px-4 py-2">Notes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {buyers.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="text-center py-6 text-gray-500 italic"
//                   >
//                     No buyers found
//                   </td>
//                 </tr>
//               ) : (
//                 buyers.map((buyer, index) => (
//                   <tr
//                     key={buyer.id}
//                     className={`${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-gray-100`}
//                   >
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">
//                       {buyer.fullName}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.email}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.phone || "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.status || "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.budgetMin && buyer.budgetMax
//                         ? `₹${buyer.budgetMin} - ₹${buyer.budgetMax}`
//                         : "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.timeline || "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.source || "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.tags || "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-gray-700">
//                       {buyer.notes ? buyer.notes.slice(0, 40) + "..." : "-"}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Buyer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status?: string;
  budgetMin?: number;
  budgetMax?: number;
  timeline?: string;
  source?: string;
  tags?: string;
  notes?: string;
}

export default function BuyersListPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  useEffect(() => {
    const fetchBuyers = async () => {
      const res = await fetch("/api/buyers");
      const data = await res.json();
      setBuyers(data);
    };
    fetchBuyers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Buyers List</h1>
          <div className="flex gap-4">
            <Link href="/buyers/new">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Create New Buyer
              </button>
            </Link>
            <Link href="/buyers/edit">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                ✎ Edit Buyers
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-800 font-semibold">
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Budget</th>
                <th className="border border-gray-300 px-4 py-2">Timeline</th>
                <th className="border border-gray-300 px-4 py-2">Source</th>
                <th className="border border-gray-300 px-4 py-2">Tags</th>
                <th className="border border-gray-300 px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {buyers.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No buyers found
                  </td>
                </tr>
              ) : (
                buyers.map((buyer, index) => (
                  <tr
                    key={buyer.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">
                      {buyer.fullName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.phone || "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.status || "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.budgetMin && buyer.budgetMax
                        ? `₹${buyer.budgetMin} - ₹${buyer.budgetMax}`
                        : "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.timeline || "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.source || "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.tags || "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {buyer.notes ? buyer.notes.slice(0, 40) + "..." : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
