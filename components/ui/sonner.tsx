"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-n-8/95 group-[.toaster]:text-n-1 group-[.toaster]:border-n-6 group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-md group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-n-3",
          actionButton: "group-[.toast]:bg-color-1 group-[.toast]:text-n-8 group-[.toast]:hover:bg-color-1/90 group-[.toast]:transition-colors",
          cancelButton: "group-[.toast]:bg-n-7 group-[.toast]:text-n-1 group-[.toast]:hover:bg-n-6 group-[.toast]:transition-colors",
          // Success toasts with gradient background
          success: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-green-500/20 group-[.toaster]:!to-green-600/10 group-[.toaster]:!text-green-300 group-[.toaster]:!border-green-500/40 [&>.sonner-icon]:!text-green-400",
          // Error toasts with gradient background
          error: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-red-500/20 group-[.toaster]:!to-red-600/10 group-[.toaster]:!text-red-300 group-[.toaster]:!border-red-500/40 [&>.sonner-icon]:!text-red-400",
          // Warning toasts with gradient background
          warning: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-yellow-500/20 group-[.toaster]:!to-yellow-600/10 group-[.toaster]:!text-yellow-300 group-[.toaster]:!border-yellow-500/40 [&>.sonner-icon]:!text-yellow-400",
          // Info toasts with gradient background
          info: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-blue-500/20 group-[.toaster]:!to-blue-600/10 group-[.toaster]:!text-blue-300 group-[.toaster]:!border-blue-500/40 [&>.sonner-icon]:!text-blue-400",
          // Loading toasts with animated gradient
          loading: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-color-1/20 group-[.toaster]:!to-color-2/10 group-[.toaster]:!text-color-1 group-[.toaster]:!border-color-1/40 [&>.sonner-spinner]:!text-color-1",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
