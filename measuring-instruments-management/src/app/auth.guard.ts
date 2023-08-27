import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./module/feature/login/service/auth.service";
import Swal from 'sweetalert2';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).getToken() === null) {
    Swal.fire({
      icon: "error",
      title: "Bạn phải đăng nhập để truy cập chức năng này!",
      showConfirmButton: true,
      timer: 2000
    })
    return inject(Router).createUrlTree(['login'], {queryParams: {returnUrl: state.url}});
  }
  return true;
};
