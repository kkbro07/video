
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Film, LayoutGrid } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
              <h2 className="text-xl font-semibold">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/movies" className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  <span>Movies</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
