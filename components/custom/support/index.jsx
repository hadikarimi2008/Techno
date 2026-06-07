import { Headset } from "lucide-react";
import Link from "next/link";

export default function Support() {
  return (
    <Link href="/support">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 fixed bottom-4 left-4">
        <Headset className="h-8 w-8 text-[#0056B3]" strokeWidth={2.2} />
      </div>
    </Link>
  );
}
