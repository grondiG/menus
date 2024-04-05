import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req: HttpRequest<object>, next: HttpHandlerFn) => {
  const token: string|null = localStorage.getItem('userToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
