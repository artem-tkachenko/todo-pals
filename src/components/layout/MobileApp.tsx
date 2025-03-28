
import { ReactNode } from "react";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface MobileAppProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function MobileApp({ children, title, className }: MobileAppProps) {
  return (
    <div className="mobile-app">
      <header className="mobile-header">
        <MobileHeader title={title} showMenu={false} />
      </header>
      
      <main className={cn("mobile-content pb-20", className)}>
        {children}
      </main>
      
      <footer className="mobile-footer">
        <BottomNav />
      </footer>
    </div>
  );
}
