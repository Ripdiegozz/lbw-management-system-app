import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { ModalType, useModal } from '@/hooks/use-modal';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string | null;
      action?: string | null;
      icon: LucideIcon | null;
      type: string;
    }[];
  }[];
}) {
  const { href } = useLocation();
  const { onOpen } = useModal();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => {
                    const path = href.split('?')[0];
                    const type = subItem.type === 'button' ? 'button' : 'link';
                    const action = subItem.action;
                    const url = subItem.url ?? '#';

                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          {type === 'link' ? (
                            <Link
                              to={url}
                              className={cn(
                                'flex items-center w-full px-4 py-2',
                                path === url.split('?')[0] && 'bg-gray-200 font-semibold'
                              )}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          ) : (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-200"
                              onClick={() => onOpen(action as ModalType)}
                            >
                              {subItem.icon && <subItem.icon />}
                              {subItem.title}
                            </button>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
