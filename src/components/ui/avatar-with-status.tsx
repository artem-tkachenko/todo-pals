
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarWithStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fallback: string;
  status?: "online" | "offline" | "busy" | "away" | null;
  size?: "sm" | "md" | "lg";
}

export function AvatarWithStatus({
  src,
  alt,
  fallback,
  status,
  size = "md",
  className,
  ...props
}: AvatarWithStatusProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <Avatar 
        className={cn(
          "ring-2 ring-background transition-all duration-300",
          size === "sm" && "h-8 w-8",
          size === "md" && "h-10 w-10",
          size === "lg" && "h-12 w-12",
        )}
      >
        <AvatarImage 
          src={src} 
          alt={alt} 
          className="object-cover" 
          loading="lazy" 
        />
        <AvatarFallback className="bg-primary/10 text-primary">
          {fallback}
        </AvatarFallback>
      </Avatar>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
            size === "sm" && "h-2.5 w-2.5",
            size === "md" && "h-3 w-3", 
            size === "lg" && "h-3.5 w-3.5",
            status === "online" && "bg-green-500",
            status === "offline" && "bg-gray-400",
            status === "busy" && "bg-red-500",
            status === "away" && "bg-yellow-500"
          )}
        />
      )}
    </div>
  );
}
