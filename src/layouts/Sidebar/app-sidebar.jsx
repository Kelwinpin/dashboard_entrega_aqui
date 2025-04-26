import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import menuItems from "@/tools/menuItens"
import { useNavigate } from 'react-router-dom';


export function AppSidebar() {
  const navigate = useNavigate();
  
  const redirect = (url) => {
    navigate(url);
  }

  return (
    <Sidebar className="shadow-sm shadow-black elevation-1">
      <SidebarContent className="flex flex-col gap-2 p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-lg text-black">
            Módulos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="cursor-pointer">
                  <SidebarMenuButton asChild>
                    <a onClick={() => redirect(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
