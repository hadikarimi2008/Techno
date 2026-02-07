import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProduct } from "@/app/(private)/dashboard/actions";
import { ChevronLeft, Image as ImageIcon, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UpdatePage({ params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-black selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Dashboard
            </span>
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Edit Product
            </h1>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
              Reference ID: {product.id}
            </p>
          </div>
        </div>

        <form action={updateProductWithId} className="space-y-12">
          {/* Section: Basic Info */}
          <section className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100/50 space-y-8">
            <div className="grid gap-8">
              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Product Title
                </Label>
                <Input
                  name="title"
                  required
                  defaultValue={product.title}
                  className="h-12 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl text-base font-medium"
                />
              </div>

              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Description
                </Label>
                <Textarea
                  name="description"
                  defaultValue={product.description || ""}
                  className="min-h-[140px] border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl text-base resize-none p-4"
                  placeholder="Tell more about this product..."
                />
              </div>
            </div>

            {/* Price & Rating Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Price (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    defaultValue={product.price}
                    className="h-12 pl-8 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl font-bold"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Rating (0-5)
                </Label>
                <Input
                  name="rate"
                  type="number"
                  step="0.1"
                  max="5"
                  required
                  defaultValue={product.rate}
                  className="h-12 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl font-bold"
                />
              </div>
            </div>
          </section>

          {/* Section: Inventory & Logistics */}
          <section className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Inventory Stock
                </Label>
                <Input
                  name="quantity"
                  type="number"
                  defaultValue={product.quantity || 0}
                  className="h-12 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl font-medium"
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Category Tag
                </Label>
                <Select name="category" defaultValue={product.category}>
                  <SelectTrigger className="h-12 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="Phones">Phones</SelectItem>
                    <SelectItem value="laptops">Laptops</SelectItem>
                    <SelectItem value="watches">Watches</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Section: Media & Styles */}
          <section className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100/50 space-y-8">
            <div className="grid gap-3">
              <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> Image Assets (URL)
              </Label>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                  <img
                    src={product.img}
                    alt="Preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <Input
                  name="img"
                  required
                  defaultValue={product.img}
                  className="h-12 flex-1 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
                Available Colorways
              </Label>
              <Input
                name="colors"
                placeholder="Black, Silver, Midnight"
                defaultValue={product.colors?.join(", ")}
                className="h-12 border-none bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-black/5 rounded-xl"
              />
            </div>
          </section>

          {/* Footer Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-[11px] font-mono text-slate-400 uppercase leading-relaxed tracking-wider">
              <p>
                Entry Created:{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p>
                Last Activity:{" "}
                {product.updatedAt
                  ? new Date(product.updatedAt).toLocaleTimeString()
                  : "None"}
              </p>
            </div>

            <div className="mb-10">
              <Button
                type="submit"
                className="w-full sm:w-auto h-14 px-12 bg-black text-black hover:bg-slate-800 rounded-full transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center gap-3 text-sm font-bold uppercase tracking-widest"
              >
                <Save className="w-4 h-4" /> Save Record
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
