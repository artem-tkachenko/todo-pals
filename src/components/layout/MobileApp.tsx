
import { ReactNode } from "react";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      
      <main className="h-[calc(100vh-8rem)] overflow-hidden">
        <ScrollArea className="h-full pb-6">
          <div className={cn("mobile-content", className)}>
            {children}
          </div>
        </ScrollArea>
      </main>
      
      <footer className="mobile-footer">
        <BottomNav />
      </footer>
    </div>
  );
}
