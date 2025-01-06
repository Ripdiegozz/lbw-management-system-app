import { createFileRoute, redirect } from '@tanstack/react-router';
import { LibraryBig } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { isLoggedIn } from '@/hooks/use-auth';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: '/'
      });
    }
  }
});

export function LoginComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-700 text-primary-foreground">
            <LibraryBig className="size-4" />
          </div>
          Fundación Literaria León Bienvenido Weffer
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
