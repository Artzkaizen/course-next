/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
type SliderOrientation = "horizontal" | "vertical" | undefined;
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex cursor-pointer touch-none select-none items-center",
      orientation === "horizontal" ? "w-full" : "h-full flex-col",
      className,
    )}
    orientation={orientation as SliderOrientation}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative grow overflow-hidden rounded-full bg-primary/20",
        orientation === "horizontal" ? "h-1.5 w-full" : "h-full w-1.5",
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute bg-primary",
          orientation === "horizontal" ? "h-full" : "w-full",
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 cursor-pointer rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
Slider.displayName = SliderPrimitive.Root?.displayName;

export { Slider };
