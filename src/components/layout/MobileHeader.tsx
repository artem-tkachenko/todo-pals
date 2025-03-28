
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
}

export function MobileHeader({ title, showMenu = false }: MobileHeaderProps) {
  return (
    <div className="h-16 px-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
