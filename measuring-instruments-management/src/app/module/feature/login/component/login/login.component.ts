import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Observer} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";
import {LoginDto} from "../../model/LoginDto";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ConstantsService} from "../../../../shared/service/constants.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _loginService: LoginService,
              private _authService: AuthService,
              private _router: Router,
              public constantsService: ConstantsService) {
    const isLogged = (this._authService.getToken() !== null);
    if (isLogged) {
      Swal.fire({
        position: 'center',
        title: 'Bạn muốn thay đổi tài khoản?',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText: 'Đồng ý',
        showCancelButton: true,
        cancelButtonText: 'Hủy'
      }).then(result => {
        if (result.isConfirmed) {
          this._authService.deleteToken();
          this._authService.deleteRoles();
        } else {
          this._router.navigateByUrl('/instruments');
        }
      })
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,20}')]),
      password: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$|admin')])
    })

  }

  get username() {
    return this.loginForm?.get('username')
  }

  get password() {
    return this.loginForm?.get('password')
  }

  submit() {
    if (this.loginForm.valid) {
      const observer: Observer<LoginDto> = {
        next: (data: LoginDto) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thành công',
            showConfirmButton: false,
            timer: 2000
          })
          this._authService.setToken(data.jwt);
          this._authService.setAuthInfo(data.username, data.roles);
          this._router.navigateByUrl('/instruments');
        },
        error: (err: HttpErrorResponse) => {
          let message = err.message;
          if (err.status === 401) {
            message = this.constantsService.BAD_CREDENTIALS;
          }

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Lỗi',
            text: message
          })
        },
        complete: () => {
        }
      }

      Swal.fire({
        title: 'Đang tải...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this._loginService.login(this.loginForm.value).subscribe(observer);
        }
      });
    }
  }
}
