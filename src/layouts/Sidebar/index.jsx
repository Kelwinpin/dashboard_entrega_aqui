import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function SidebarLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger className="fixed top-0 left-0 z-50 md:hidden" />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}   