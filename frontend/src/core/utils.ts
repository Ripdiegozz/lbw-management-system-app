import { ApiError } from './models/ApiError';

export const handleError = (err: ApiError, toast: any) => {
  const errDetail = (err.body as any)?.detail;
  let errorMessage = errDetail || 'Error desconocido.';
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg;
  }
  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive'
  });
};
