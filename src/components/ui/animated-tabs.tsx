
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnimatedTabsProps {
  tabs: {
    label: string;
    value: string;
    path: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

export function AnimatedTabs({ tabs, className }: AnimatedTabsProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(() => {
    return tabs.find((tab) => tab.path === location.pathname)?.value || tabs[0].value;
  });
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname)?.value;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname, tabs]);

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center rounded-full p-1 text-muted-foreground",
        className
      )}
    >
      <div className="absolute inset-0 z-0 flex p-1">
        <span
          className={cn(
            "relative z-10 flex h-full flex-1 items-center justify-center rounded-full bg-accent px-3 text-accent-foreground transition-all duration-300",
            hoveredTab && hoveredTab !== activeTab
              ? "opacity-0"
              : "opacity-100"
          )}
          style={{
            transform: `translateX(${
              tabs.findIndex((tab) => tab.value === activeTab) * 100
            }%)`
          }}
        />
      </div>

      {tabs.map((tab) => (
        <Link
          key={tab.value}
          to={tab.path}
          className={cn(
            "relative z-20 flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
            tab.value === activeTab ? "text-accent-foreground" : "hover:text-foreground"
          )}
          onMouseEnter={() => setHoveredTab(tab.value)}
          onMouseLeave={() => setHoveredTab(null)}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.icon}
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
