import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ButtonWelcome() {
  return (
    <Button asChild className="w-25 h-10">
      <Link href="/store">Explor</Link>
    </Button>
  );
}
