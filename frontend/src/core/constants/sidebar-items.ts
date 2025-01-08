import { BookOpen, House, LibrarySquare, PersonStanding, PlusCircle } from 'lucide-react';

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
          url: '/books',
          action: null,
          icon: null,
          type: 'link'
        },
        {
          title: 'Agregar',
          url: '/books/add',
          action: null,
          icon: PlusCircle,
          type: 'link'
        }
      ]
    },
    {
      title: 'Autores',
      url: '#',
      icon: PersonStanding,
      items: [
        {
          title: 'Ver Todos',
          url: '/authors',
          action: null,
          icon: null,
          type: 'link'
        },
        {
          title: 'Agregar',
          url: null,
          action: 'create-author',
          icon: PlusCircle,
          type: 'button'
        }
      ]
    },
    {
      title: 'Collecciones',
      url: '#',
      icon: LibrarySquare,
      items: [
        {
          title: 'Ver Todas',
          url: '/collections',
          action: null,
          icon: null,
          type: 'link'
        },
        {
          title: 'Agregar',
          url: null,
          action: 'create-collection',
          icon: PlusCircle,
          type: 'button'
        }
      ]
    },
    {
      title: 'Editoriales',
      url: '#',
      icon: House,
      items: [
        {
          title: 'Ver Todas',
          url: '/publishers',
          action: null,
          icon: PlusCircle,
          type: 'link'
        },
        {
          title: 'Agregar',
          url: null,
          action: 'create-publisher',
          icon: PlusCircle,
          type: 'button'
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
