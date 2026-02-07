import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import ProductFormSheet from "./ProductFormSheet";
import DeleteProductButton from "./components/DeleteProductButton";
import UpdateProductButton from "./components/UpdateProductButton";
import Link from "next/link";

export default async function DashboardPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your products and inventory in real-time.
          </p>
        </div>

        <ProductFormSheet mode="add">
          <button className="flex items-center gap-2 bg-slate-900 text-white rounded-lg shadow-xl hover:shadow-md transition-all px-6 py-3 text-base font-semibold">
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        </ProductFormSheet>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px] py-5 pl-6 font-bold text-slate-700">
                Preview
              </TableHead>
              <TableHead className="py-5 font-bold text-slate-700">
                Product Details
              </TableHead>
              <TableHead className="py-5 font-bold text-slate-700">
                Category
              </TableHead>
              <TableHead className="py-5 font-bold text-slate-700">
                Price
              </TableHead>
              <TableHead className="py-5 font-bold text-slate-700 text-center">
                In Stock
              </TableHead>
              <TableHead className="py-5 pr-6 font-bold text-slate-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-muted-foreground italic"
                >
                  No products found. Start by adding your first item!
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow
                  key={p.id}
                  className="group hover:bg-slate-50/50 transition-colors border-b last:border-0"
                >
                  <TableCell className="py-5 pl-6">
                    <img
                      src={p.img}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                      alt={p.title}
                    />
                  </TableCell>
                  <TableCell className="py-5 font-bold text-slate-800 text-base">
                    {p.title}
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border-0 capitalize font-medium"
                    >
                      {p.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 font-bold text-emerald-600 text-lg">
                    ${p.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-5 text-center font-semibold text-slate-600">
                    {p.quantity}{" "}
                    <span className="text-xs text-slate-400 block font-normal leading-none mt-1">
                      units
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/update/${p.id}`}
                        className="transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <UpdateProductButton />
                      </Link>

                      <div className="transition-all duration-200 hover:scale-110 active:scale-95">
                        <DeleteProductButton id={p.id} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
