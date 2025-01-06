/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutUsersImport } from './routes/_layout/users'
import { Route as LayoutBooksIndexImport } from './routes/_layout/books/index'
import { Route as LayoutBooksAddImport } from './routes/_layout/books/add'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUsersRoute = LayoutUsersImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutBooksIndexRoute = LayoutBooksIndexImport.update({
  id: '/books/',
  path: '/books/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutBooksAddRoute = LayoutBooksAddImport.update({
  id: '/books/add',
  path: '/books/add',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_layout/users': {
      id: '/_layout/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof LayoutUsersImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/books/add': {
      id: '/_layout/books/add'
      path: '/books/add'
      fullPath: '/books/add'
      preLoaderRoute: typeof LayoutBooksAddImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/books/': {
      id: '/_layout/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof LayoutBooksIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutUsersRoute: typeof LayoutUsersRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutBooksAddRoute: typeof LayoutBooksAddRoute
  LayoutBooksIndexRoute: typeof LayoutBooksIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutUsersRoute: LayoutUsersRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutBooksAddRoute: LayoutBooksAddRoute,
  LayoutBooksIndexRoute: LayoutBooksIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/users': typeof LayoutUsersRoute
  '/': typeof LayoutIndexRoute
  '/books/add': typeof LayoutBooksAddRoute
  '/books': typeof LayoutBooksIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/users': typeof LayoutUsersRoute
  '/': typeof LayoutIndexRoute
  '/books/add': typeof LayoutBooksAddRoute
  '/books': typeof LayoutBooksIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/_layout/users': typeof LayoutUsersRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/books/add': typeof LayoutBooksAddRoute
  '/_layout/books/': typeof LayoutBooksIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/login' | '/users' | '/' | '/books/add' | '/books'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/users' | '/' | '/books/add' | '/books'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/_layout/users'
    | '/_layout/'
    | '/_layout/books/add'
    | '/_layout/books/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/login"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/users",
        "/_layout/",
        "/_layout/books/add",
        "/_layout/books/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_layout/users": {
      "filePath": "_layout/users.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/books/add": {
      "filePath": "_layout/books/add.tsx",
      "parent": "/_layout"
    },
    "/_layout/books/": {
      "filePath": "_layout/books/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
