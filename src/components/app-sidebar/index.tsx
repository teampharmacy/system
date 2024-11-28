import {
  ChevronRight,
  Settings,
  LayoutDashboard,
  Warehouse,
  ClipboardPlus,
  CreditCard,
  SquareUser,
  Bell,
  CircleHelp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const menuItems = [
  {
    group: "Client Menu",
    items: [
      {
        title: "Дашбоард",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Агуулах",
        url: "/inventory",
        icon: Warehouse,
        items: [
          {
            title: "Эмийн жагсаалт",
            url: "/medicine-list",
          },
          {
            title: "Эмийн төрөл",
            url: "/medicine-type",
          },
        ],
      },
      {
        title: "Тайлан",
        url: "/report",
        icon: ClipboardPlus,
        items: [
          {
            title: "Борлуулалтын тайлан",
            url: "/sales-report",
          },
          {
            title: "Санхүүгийн тайлан",
            url: "/finance-report",
          },
          {
            title: "Агуулахын тайлан",
            url: "storage-report",
          },
        ],
      },
      {
        title: "Төлбөр",
        url: "/payment",
        icon: CreditCard,
      },
    ],
  },
  {
    group: "Company Menu",
    items: [
      {
        title: "Холбоо барих",
        url: "#",
        icon: SquareUser,
      },
      {
        title: "Мэдэгдэл",
        url: "#",
        icon: Bell,
      },
    ],
  },
  {
    group: "Website Menu",
    items: [
      {
        title: "Тохиргоо",
        url: "#",
        icon: Settings,
      },
      {
        title: "Тусламж",
        url: "#",
        icon: CircleHelp,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-10 w-50 bg-gray-300">Pharmacy</div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((menuGroup) => (
          <SidebarGroup key={menuGroup.group}>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuGroup.items.map((item) =>
                  item.items ? (
                    <Collapsible
                      key={item.title}
                      title={item.title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger className="flex items-center w-full">
                        <SidebarMenuItem key={item.title} className="w-full">
                          <SidebarMenuButton asChild className="w-full">
                            <a href={item.url}>
                              <item.icon className="mr-2" />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-8">
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
            <Separator />
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="h-10 w-50 bg-gray-300">Footer</div>
      </SidebarFooter>
    </Sidebar>
  );
}
