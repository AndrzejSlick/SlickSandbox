"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendDemoEmail } from "@/app/actions/sendDemo";

type Status = "idle" | "sending" | "success" | "error";

export function Demo() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendDemoEmail(form);
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="w-full bg-[#f6f6f8] py-14 md:py-24">
      <div className="max-w-[1080px] mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">

        {/* Left — heading */}
        <div className="flex flex-col gap-4 md:pt-4 md:max-w-[480px]">
          <h2 className="text-[36px] md:text-[56px] font-semibold leading-tight text-[#020a0f]">
            Sprawdź jak to działa
          </h2>
          <p className="text-[17px] text-[#50565d] leading-[24px]">
            Zostaw swoje dane, a odezwiemy się, by umówić demo.
          </p>
        </div>

        {/* Right — form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[0px_2px_4px_0px_rgba(103,103,103,0.08),0px_0px_0px_1px_rgba(103,103,103,0.08)] p-6 flex flex-col gap-4 w-full md:w-[396px] md:shrink-0"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Imię</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Nazwa firmy</Label>
            <Input id="company" name="company" value={form.company} onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          </div>

          {status === "success" && (
            <p className="text-[14px] text-[#2d6e16] font-medium text-center">
              Dziękujemy! Odezwiemy się wkrótce.
            </p>
          )}
          {status === "error" && (
            <p className="text-[14px] text-red-500 font-medium text-center">
              Coś poszło nie tak. Napisz do nas na alex@slickshift.ai
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 w-full h-[44px] bg-gradient-to-b from-[#1e1e28] to-[#141317] border border-[#333335] rounded-xl text-white text-[15px] font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Wysyłanie..." : "Umów demo ›"}
          </Button>
        </form>

      </div>
    </section>
  );
}
