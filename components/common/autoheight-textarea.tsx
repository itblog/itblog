import {
  ChangeEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface AutoHeightTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number
}

export const AutoHeightTextarea = forwardRef<
  HTMLTextAreaElement,
  AutoHeightTextareaProps
>(
  (
    {
      value,
      onChange,
      defaultValue,
      rows = 1,
      maxRows = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = typeof value != "undefined"

    const [internalValue, setInternalValue] = useState(
      defaultValue ? defaultValue : "",
    )

    const text = isControlled ? value : internalValue

    let max = Math.max(rows, String(text).split("\n").length)
    if (max > maxRows) {
      max = maxRows
    }

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (e) => {
        if (onChange) {
          onChange(e)
        }
        if (!isControlled) {
          setInternalValue(e.target.value)
        }
      },
      [isControlled, onChange],
    )

    return (
      <textarea
        ref={ref}
        rows={max}
        value={text}
        onChange={handleChange}
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    )
  },
)
