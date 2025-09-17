// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { buyerSchema } from "../../../lib/validation";
// import styles from "./page.module.css";

// export default function BuyerDetailPage() {
//   const router = useRouter();
//   const params = useParams();
//   const id = params?.id as string;

//   const [form, setForm] = useState<any>({});
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // Prefill buyer data
//   useEffect(() => {
//     async function fetchBuyer() {
//       const res = await fetch(`/api/buyers/${id}`);
//       if (res.ok) {
//         const data = await res.json();
//         setForm(data);
//       }
//     }
//     if (id) fetchBuyer();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev: any) => ({ ...prev, [name]: value }));
//   };

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const result = buyerSchema.safeParse(form);
//     if (!result.success) {
//       if (result.error.issues.length > 0) {
//         setError(result.error.issues[0].message);
//       } else {
//         setError("Validation failed");
//       }
//       return;
//     }

//     const res = await fetch(`/api/buyers/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(result.data),
//     });

//     if (res.status === 409) {
//       setError("Record changed, please refresh.");
//       return;
//     }
//     if (!res.ok) {
//       setError("Update failed");
//       return;
//     }

//     setSuccess("Buyer updated successfully!");
//     router.refresh();
//   }

//   return (
//     <main className={styles.container}>
//       <h1 className={styles.title}>Edit Buyer</h1>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.label}>
//           Full Name
//           <input
//             name="fullName"
//             value={form.fullName || ""}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </label>

//         <label className={styles.label}>
//           Phone
//           <input
//             name="phone"
//             value={form.phone || ""}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </label>

//         <label className={styles.label}>
//           Email
//           <input
//             name="email"
//             type="email"
//             value={form.email || ""}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </label>

//         <label className={styles.label}>
//           Notes
//           <textarea
//             name="notes"
//             value={form.notes || ""}
//             onChange={handleChange}
//             className={styles.textarea}
//           />
//         </label>

//         <button type="submit" className={styles.button}>
//           Update
//         </button>
//       </form>

//       {error && <p className={styles.error}>{error}</p>}
//       {success && <p className={styles.success}>{success}</p>}
//     </main>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buyerSchema } from "../../../lib/validation";
import styles from "./page.module.css";

export default function BuyerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Prefill buyer data
  useEffect(() => {
    async function fetchBuyer() {
      const res = await fetch(`/api/buyers/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      }
    }
    if (id) fetchBuyer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = buyerSchema.safeParse(form);
    if (!result.success) {
      setError(
        result.error.issues.length > 0
          ? result.error.issues[0].message
          : "Validation failed"
      );
      return;
    }

    const res = await fetch(`/api/buyers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (res.status === 409) {
      setError("Record changed, please refresh.");
      return;
    }
    if (!res.ok) {
      setError("Update failed");
      return;
    }

    setSuccess("Buyer updated successfully!");
    router.push("/buyers"); // ✅ auto-redirect to list
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Edit Buyer</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Full Name
          <input
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Phone
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Notes
          <textarea
            name="notes"
            value={form.notes || ""}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.button}>
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/buyers")}
            className={`${styles.button} ${styles.secondary}`}
          >
            Back to Buyers List
          </button>
        </div>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </main>
  );
}
