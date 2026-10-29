import type { Metadata } from "next";
import { CheckoutPreview } from "@/components/CheckoutPreview";

export const metadata: Metadata = { title: "Checkout Preview", description: "Demo checkout preview – no payment is collected." };

export default function Page() {
  return <CheckoutPreview />;
}
