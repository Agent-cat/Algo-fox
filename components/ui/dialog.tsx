"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
  open: boolean
  onOpenChangeAction: (open: boolean) => void
} | null>(null)

export function Dialog({
  open,
  onOpenChangeAction,
  children,
  className
}: {
  open: boolean,
  onOpenChangeAction: (open: boolean) => void,
  children: React.ReactNode,
  className?: string
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const childrenArray = React.Children.toArray(children)
  const hasContent = childrenArray.some(
    (child) => React.isValidElement(child) && (child.type === DialogContent)
  )

  if (!mounted) return null

  if (hasContent) {
    return (
      <DialogContext.Provider value={{ open, onOpenChangeAction }}>
        {children}
      </DialogContext.Provider>
    )
  }

  return (
    <DialogContext.Provider value={{ open, onOpenChangeAction }}>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </DialogContext.Provider>
  )
}

export function DialogTrigger({
  children,
  asChild,
  onClickAction
}: {
  children: React.ReactNode,
  asChild?: boolean,
  onClickAction?: () => void
}) {
  const context = React.useContext(DialogContext)
  if (!context) return null

  const handleClick = (e: React.MouseEvent) => {
    onClickAction?.()
    context.onOpenChangeAction(true)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e)
        handleClick(e)
      },
    })
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

export function DialogContent({
  children,
  className,
  role,
  "aria-modal": ariaModal,
  "aria-labelledby": ariaLabelledby
}: {
  children: React.ReactNode,
  className?: string,
  role?: string,
  "aria-modal"?: string | boolean,
  "aria-labelledby"?: string
}) {
  const context = React.useContext(DialogContext)
  if (!context) return null

  return createPortal(
    <AnimatePresence>
      {context.open && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => context.onOpenChangeAction(false)}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            role={role}
            aria-modal={ariaModal as any}
            aria-labelledby={ariaLabelledby}
            className={cn(
              "relative z-50 w-full rounded-2xl bg-white dark:bg-[#0f0f0f] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden",
              className || "max-w-lg p-6"
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  )
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function DialogClose({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  const context = React.useContext(DialogContext)
  if (!context) return null

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e)
        context.onOpenChangeAction(false)
      },
    })
  }

  return (
    <button onClick={() => context.onOpenChangeAction(false)}>
      {children}
    </button>
  )
}
