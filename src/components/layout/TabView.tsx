
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabViewProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export function TabView({ tabs, defaultTab, onTabChange, className }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn("w-full", className)}
    >
      <TabsList className="w-full mb-4 rounded-full p-1 bg-muted">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2 rounded-full data-[state=active]:shadow-sm"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="animate-in">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
