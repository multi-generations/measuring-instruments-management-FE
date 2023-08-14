import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./module/feature/login/service/auth.service";
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  if (new AuthService().getToken() === null) {
    Swal.fire({
      icon: "error",
      title: "Bạn phải đăng nhập để truy cập chức năng này!",
      showConfirmButton: false,
      timer: 2000
    })
    return new Router().createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
  }
  return true;
};
