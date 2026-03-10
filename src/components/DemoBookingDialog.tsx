"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface DemoBookingDialogProps {
  children: React.ReactElement
}

export function DemoBookingDialog({ children }: DemoBookingDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-demo-dialog", handler)
    return () => window.removeEventListener("open-demo-dialog", handler)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://skills.slickshift.ai/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, skill: "homepage" }),
      })

      if (response.ok) {
        setOpen(false)
        setFormData({ name: "", companyName: "", email: "", phone: "" })
        toast("Mamy Twój kontakt 🙌", {
          description: "Odezwiemy się do Ciebie wkrótce.",
        })
      } else {
        throw new Error("Submission failed")
      }
    } catch {
      toast("Wystąpił błąd", {
        description: "Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold">
            Sprawdź, jak to działa
          </DialogTitle>
          <p className="text-left text-sm text-[#50565d]">
            Zostaw swoje dane, a odezwiemy się, by umówić demo.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-name" className="text-sm font-medium">
              Imię
            </Label>
            <Input
              id="dialog-name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-companyName" className="text-sm font-medium">
              Nazwa firmy
            </Label>
            <Input
              id="dialog-companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="dialog-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-phone" className="text-sm font-medium">
              Telefon
            </Label>
            <Input
              id="dialog-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[44px] rounded-xl text-[15px] font-semibold text-white shadow-[0px_1px_4px_0px_rgba(37,99,235,0.3)]"
            style={{ background: "#2563EB" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Umów demo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
