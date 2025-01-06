import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginRequestBody as AccessToken } from '@/core';
import useAuth from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  identifier: z.string().email('Email inválido').nonempty('El email es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es requerida')
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { loginMutation, resetError } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AccessToken>({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(loginSchema)
  });

  const onFormSubmit: SubmitHandler<AccessToken> = async data => {
    if (isSubmitting) return;

    resetError();

    try {
      await loginMutation.mutateAsync(data);
    } catch {
      toast({
        title: 'Ocurrió un error',
        description: 'No pudimos iniciar sesión. Por favor, inténtalo de nuevo.',
        variant: 'destructive'
      });
    }
  };

  const isLoggingIn = isSubmitting;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="m@example.com"
                    {...register('identifier')}
                    aria-invalid={errors.identifier ? 'true' : 'false'}
                  />
                  {errors.identifier && <p className="text-red-500 text-xs">{errors.identifier.message}</p>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id="password" type="password" {...register('password')} aria-invalid={errors.password ? 'true' : 'false'} />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-red-700 hover:bg-red-600/80" disabled={isLoggingIn}>
                  {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en "Iniciar sesión", aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Políticas de Privacidad</a>.
      </div>
    </div>
  );
}
