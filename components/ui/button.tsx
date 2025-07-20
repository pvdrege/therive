'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"  
  loading?: boolean
  children?: React.ReactNode
  type?: "button" | "submit" | "reset"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, children, disabled, type, onClick, ...props }, ref) => {
    const variants = {
      default: "bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
      outline: "border border-gray-600 hover:border-therive-accent text-therive-text hover:text-therive-accent bg-transparent",
      secondary: "bg-gray-700 hover:bg-gray-600 text-therive-text",
      ghost: "hover:bg-gray-800 text-therive-text",
      link: "text-therive-accent underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-9 px-4 py-2 text-sm",
      lg: "h-14 px-8 py-4 text-lg",
      icon: "h-10 w-10",
    }

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-hover",
          variants[variant],
          sizes[size],
          loading && "opacity-75 cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
        {...(props as any)}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </div>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button } 