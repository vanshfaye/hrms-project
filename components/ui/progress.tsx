import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  className?: string
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div className={`h-2 w-full bg-muted rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
}
