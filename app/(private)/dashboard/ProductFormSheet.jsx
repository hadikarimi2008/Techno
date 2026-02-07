"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { saveProduct } from "./actions"; // فرض بر این است که اکشن شما هر دو حالت را مدیریت می‌کند
import ImageUploader from "@/components/custom/ImageUploader/ImageUploader";

export default function ProductFormSheet({ children, mode, product }) {
  const [rateError, setRateError] = useState(false);
  const [open, setOpen] = useState(false);
  // استیت برای ذخیره فایل انتخابی
  const [selectedFile, setSelectedFile] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleRateChange = (e) => {
    const value = parseFloat(e.target.value);
    setRateError(value > 5);
  };

  async function handleSubmit(formData) {
    // اگر فایلی انتخاب شده باشد، آن را به formData اضافه می‌کنیم
    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    }

    // ارسال formData و ID محصول به اکشن
    await saveProduct(formData, product?.id);
    setOpen(false);
    setSelectedFile(null); // ریست کردن فایل بعد از ارسال
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">
            {mode === "edit" ? "Edit Product" : "Add New Product"}
          </SheetTitle>
          <SheetDescription>Enter product details below.</SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="space-y-4 pb-10 px-15">
          <div className="space-y-1">
            <Label>Product Title</Label>
            <Input name="title" required defaultValue={product?.title} />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter product description..."
              defaultValue={product?.description}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Price ($)</Label>
              <Input
                name="price"
                required
                type="number"
                step="0.01"
                defaultValue={product?.price}
              />
            </div>
            <div className="space-y-1">
              <Label>Rate (0 - 5)</Label>
              <div className="flex flex-col gap-1">
                <Input
                  name="rate"
                  required
                  type="number"
                  step="0.1"
                  max="5"
                  defaultValue={product?.rate}
                  onChange={handleRateChange}
                  className={rateError ? "border-red-500 text-red-600" : ""}
                />
                {rateError && (
                  <span className="text-red-500 text-[10px]">
                    Rate must be ≤ 5
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Stock</Label>
              <Input
                name="quantity"
                type="number"
                defaultValue={product?.quantity}
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                name="category"
                defaultValue={product?.category || "Phones"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phones">Phones</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="watches">Watches</SelectItem>
                  <SelectItem value="accessories">Tablets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* بخش آپلودر عکس */}
          <div className="space-y-1">
            <Label>Product Image</Label>
            {/* فیلد مخفی برای نگه داشتن URL فعلی در حالت ویرایش */}
            <Input type="hidden" name="img" defaultValue={product?.img} />
            <ImageUploader
              onFileSelect={(file) => setSelectedFile(file)}
              defaultValue={product?.img}
            />
          </div>

          <div className="space-y-1">
            <Label>Colors</Label>
            <Input name="colors" defaultValue={product?.colors?.join(", ")} />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-1">
              <Label>Created Date</Label>
              <Input
                name="createdAt"
                type="date"
                defaultValue={formatDate(product?.createdAt || new Date())}
              />
            </div>
            <div className="space-y-1">
              <Label>Updated Date (Optional)</Label>
              <Input
                name="updatedAt"
                type="date"
                defaultValue={formatDate(product?.updatedAt || new Date())}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={rateError}
            className="w-full mt-6 py-6"
          >
            {mode === "edit" ? "Save Changes" : "Confirm & Add"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
