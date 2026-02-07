"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "../actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function DeleteProductButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const notify = () =>
    toast.success("Product deleted successfully!", {
      duration: 3000,
      position: "bottom-right",
      style: {
        color: "#343A40",
        background: "#fff",
        borderRadius: "16px",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "16px",
        border: "1px solid rgba(0,0,0,0.05)",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    });

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:text-red-600 transition-colors"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this product?")) {
          startTransition(async () => {
            const result = await deleteProduct(id);
            if (result?.success) {
              notify();
            } else {
              toast.error("Failed to delete product");
            }
          });
        }
      }}
    >
      <Trash2
        className={`w-4 h-4 ${isPending ? "animate-spin opacity-50" : ""}`}
      />
    </Button>
  );
}
