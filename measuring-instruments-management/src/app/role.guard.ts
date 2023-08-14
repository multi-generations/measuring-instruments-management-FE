import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./module/feature/login/service/auth.service";
import Swal from "sweetalert2";

export const roleGuard: CanActivateFn = (route, state) => {
  const requiredRoles: string[] = route.data['roles'];
  const userRoles: string[] | null = new AuthService().getRoles();

  if (userRoles !== null) {
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    if (hasRequiredRole) {
      return true;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Bạn không được phép sử dụng chức năng này!',
        showConfirmButton: false,
        timer: 2000
      });
      return new Router().createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
    }
  }
  Swal.fire({
    position: 'center',
    icon: "error",
    title: "Bạn phải đăng nhập để truy cập chức năng này!",
    showConfirmButton: false,
    timer: 2000
  })
  return new Router().createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
};
