import { BookOpen, LibrarySquare, Users } from 'lucide-react';

const sidebarItems = {
  navMain: [
    {
      title: 'Libros',
      url: '#',
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: 'Ver Todos',
          url: '/books'
        },
        {
          title: 'Agregar',
          url: '/books/add'
        }
      ]
    },
    {
      title: 'Usuarios',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'Ver Todos',
          url: '#'
        },
        {
          title: 'Agregar',
          url: '#'
        }
      ]
    }
  ],
  organization: {
    name: 'Fundación Literaria León Bienvenido Weffer',
    logo: LibrarySquare
  }
};

export { sidebarItems };
