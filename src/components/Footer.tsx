import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <section className="grid-cols-1">
      <p className="mx-auto my-4 flex gap-2 text-center font-semibold">
        Copyright <Copyright className="text-primary" />
        <span className="text-primary">BashBuilder</span> All rights reserved.
        <span>{new Date().getFullYear()}</span>
      </p>
    </section>
  );
}
