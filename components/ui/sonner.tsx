"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-n-8 group-[.toaster]:text-n-1 group-[.toaster]:border-n-6 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-n-4",
          actionButton: "group-[.toast]:bg-color-1 group-[.toast]:text-n-8",
          cancelButton: "group-[.toast]:bg-n-7 group-[.toast]:text-n-1",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
