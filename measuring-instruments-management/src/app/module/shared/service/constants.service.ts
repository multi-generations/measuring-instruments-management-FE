import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  private _NOT_CHOOSE_FOR_DELETE = 'Bạn chưa chọn đối tượng để xóa!';
  private _BAD_CREDENTIALS = 'Thông tin đăng nhập chưa chính xác!';
  private _USERNAME_REQUIRED = 'Tài khoản không được để trống!';
  private _USERNAME_PATTERN = 'Tài khoản dài 4-20 ký tự và không chứa các ký tự có dấu và ký tự đặc biệt!';
  private _PASSWORD_REQUIRED = 'Mật khẩu không được để trống!';
  private _PASSWORD_PATTERN = 'Mật khẩu chứa ít nhất 8 ký tự, bao gồm 1 ký tự in hoa, 1 ký tự số và 1 ký tự đặc biệt!';
  private _INSTRUMENTS_NOT_FOUND = 'Không tin thấy thiết bị!';

  get NOT_CHOOSE_FOR_DELETE(): string {
    return this._NOT_CHOOSE_FOR_DELETE;
  }

  get BAD_CREDENTIALS(): string {
    return this._BAD_CREDENTIALS;
  }

  get USERNAME_REQUIRED(): string {
    return this._USERNAME_REQUIRED;
  }

  get USERNAME_PATTERN(): string {
    return this._USERNAME_PATTERN;
  }

  get PASSWORD_REQUIRED(): string {
    return this._PASSWORD_REQUIRED;
  }

  get PASSWORD_PATTERN(): string {
    return this._PASSWORD_PATTERN;
  }

  get INSTRUMENTS_NOT_FOUND(): string {
    return this._INSTRUMENTS_NOT_FOUND;
  }
}
