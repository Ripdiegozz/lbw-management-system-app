import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { sidebarItems } from '@/core/constants/sidebar-items';
import { NavHeader } from './nav-header';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import avatarPlaceholder from '@/assets/avatar_placeholder.png';
import useAuth from '@/hooks/use-auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: activeUser } = useAuth();
  const name = activeUser?.full_name ?? activeUser?.email ?? 'Invitado';

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader organization={sidebarItems.organization} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: avatarPlaceholder,
            email: activeUser?.email ?? '',
            name
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
