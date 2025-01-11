import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { PublicRoutesLabelsES } from '@/core/enums/routes.enum';
import { BreadcrumbItemData } from '@/core/types';
import { Link, useLocation } from '@tanstack/react-router';
import { LucideIcon, Slash } from 'lucide-react';

type Props = {
  Separator: LucideIcon;
};

export function GenericBreadcrumb({ Separator = Slash }: Props) {
  const { href } = useLocation();
  const readBreadcrumbs = () => {
    const items = href.split('/').filter(Boolean);
    const itemsWithHref = items.map((item, index) => {
      const href = `/${
        items
          .slice(0, index + 1)
          .join('/')
          .split('?')[0]
      }`;
      const capitalizedName = item.charAt(0).toUpperCase() + item.slice(1).split('?')[0];
      const translatedCapitalized =
        PublicRoutesLabelsES[capitalizedName as keyof typeof PublicRoutesLabelsES].charAt(0).toUpperCase() +
        PublicRoutesLabelsES[capitalizedName as keyof typeof PublicRoutesLabelsES].slice(1);

      return { label: translatedCapitalized, href };
    });

    return [{ label: 'Inicio', href: '/' }, ...itemsWithHref];
  };

  const breadcrumbItems: BreadcrumbItemData[] = readBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link className="" to={item.href}>
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator>
                <Separator />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
