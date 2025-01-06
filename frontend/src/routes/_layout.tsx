import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import useAuth, { isLoggedIn } from '../hooks/use-auth';
import { Loader } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/common/app-sidebar';

export const Route = createFileRoute('/_layout')({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/login'
      });
    }
  }
});

function Layout() {
  const { isLoading } = useAuth();

  return (
    <div className="flex flex-col w-full h-screen">
      <SidebarProvider>
        <AppSidebar />
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader className="w-10 h-10 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-800 ml-2">Cargando...</h2>
          </div>
        ) : (
          <div className="flex flex-1 flex-wrap">
            <SidebarTrigger />
            <Outlet />
          </div>
        )}
      </SidebarProvider>
    </div>
  );
}