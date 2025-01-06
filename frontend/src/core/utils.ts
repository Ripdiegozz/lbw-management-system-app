import { Errors } from './enums/errors.enum';
import { ApiError } from './models/ApiError';

export const handleError = (err: ApiError, toast: any) => {
  const errDetail = err.statusText;
  let errorMessage = errDetail || 'Error desconocido.';

  if (errDetail === Errors.BadRequest) errorMessage = 'Petición incorrecta.';
  if (errDetail === Errors.Unauthorized) errorMessage = 'No autorizado.';
  if (errDetail === Errors.Forbidden) errorMessage = 'Prohibido.';
  if (errDetail === Errors.NotFound) errorMessage = 'No encontrado.';
  if (errDetail === Errors.MethodNotAllowed) errorMessage = 'Método no permitido.';
  if (errDetail === Errors.NotAcceptable) errorMessage = 'No aceptable.';
  if (errDetail === Errors.ProxyAuthenticationRequired) errorMessage = 'Se requiere autenticación de proxy.';
  if (errDetail === Errors.RequestTimeout) errorMessage = 'Tiempo de espera de la solicitud.';
  if (errDetail === Errors.Conflict) errorMessage = 'Conflicto.';
  if (errDetail === Errors.Gone) errorMessage = 'Se fue.';
  if (errDetail === Errors.LengthRequired) errorMessage = 'Longitud requerida.';
  if (errDetail === Errors.UnprocessableEntity) errorMessage = 'Entidad no procesable.';
  if (errDetail === Errors.TooManyRequests) errorMessage = 'Demasiadas solicitudes.';
  if (errDetail === Errors.InternalServerError) errorMessage = 'Error interno del servidor.';

  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg;
  }
  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive'
  });
};
