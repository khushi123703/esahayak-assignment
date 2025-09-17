"use client";

import { useEffect, useState } from "react";
// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/buyers");
}

