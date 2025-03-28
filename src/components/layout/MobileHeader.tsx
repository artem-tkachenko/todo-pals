
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AppLayout } from "./AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
}

export function MobileHeader({ title, showMenu = true }: MobileHeaderProps) {
  return (
    <div className="h-16 px-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      {showMenu && (
        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-full w-10 h-10 flex items-center justify-center bg-muted/60">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarProvider>
              <AppLayout isSheet>{null}</AppLayout>
            </SidebarProvider>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
