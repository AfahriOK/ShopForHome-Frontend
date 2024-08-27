import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem("jwt");
  
    if (jwt) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + jwt)
      });

      return next(cloned);

    } 
    else {
      return next(req);
    }
};
