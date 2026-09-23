import Link from "next/link";
import { buttonClassName } from "@/components/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Order dashboard</h1>
      <Link href="/onboarding" className={buttonClassName("primary")}>
        Start onboarding
      </Link>
    </div>
  );
}
