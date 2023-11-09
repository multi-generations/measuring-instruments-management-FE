import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  private _NOT_CHOOSE_FOR_DELETE = 'Bạn chưa chọn đối tượng để xóa!';
  private _FIELD_REQUIRED = 'Không được để trống!';
  private _NOT_MORE_THAN_TODAY = 'Không được quá ngày hiện tại!';
  private _BAD_CREDENTIALS = 'Thông tin đăng nhập chưa chính xác!';
  private _USERNAME_REQUIRED = 'Tài khoản không được để trống!';
  private _USERNAME_PATTERN = 'Tài khoản dài 4-20 ký tự và không chứa các ký tự có dấu và ký tự đặc biệt!';
  private _PASSWORD_REQUIRED = 'Mật khẩu không được để trống!';
  private _PASSWORD_PATTERN = 'Mật khẩu chứa ít nhất 8 ký tự, bao gồm 1 ký tự in hoa, 1 ký tự số và 1 ký tự đặc biệt!';
  private _INSTRUMENTS_NOT_FOUND = 'Không tin thấy thiết bị!';
  private _INFO_NOT_FOUND = 'Không tin thông tin!';
  private _YEAR_LIST: number[] = [];
  private _QUANTITY_LEVEL_LIST = [1, 2, 3, 4];
  private _COUNTRY_LIST = ["Andorra","Các Tiểu vương quốc Ả Rập Thống nhất","Afghanistan","Antigua và Barbuda",
    "Anguilla","Albania","Armenia","Đảo Antilles của Hà Lan","Angola","Antarctica","Argentina","Samoa thuộc Hoa Kỳ",
    "Áo","Úc","Aruba","Azerbaijan","Bosnia và Herzegovina","Barbados","Bangladesh","Bỉ","Burkina Faso","Bulgaria",
    "Bahrain","Burundi","Benin","Bermuda","Brunei","Bolivia","Brazil","Bahamas","Bhutan","Đảo Bouvet","Botswana",
    "Belarus","Belize","Canada","Quần đảo Cocos [Keeling]","Congo [CHDCND]","Cộng hòa Trung Phi","Congo [Cộng hòa]",
    "Thuỵ Sĩ","Bờ Biển Ngà","Quần đảo Cook","Chile","Cameroon","Trung Quốc","Colombia","Costa Rica","Cuba",
    "Cape Verde","Đảo Christmas","Síp","Cộng hòa Séc","Đức","Djibouti","Đan Mạch","Dominica","Cộng hoà Dominica",
    "Algeria","Ecuador","Estonia","Ai Cập","Tây Sahara","Eritrea","Tây Ban Nha","Ethiopia","Phần Lan","Fiji",
    "Quần đảo Falkland [Islas Malvinas]","Micronesia","Quần đảo Faroe","Pháp","Gabon","Vương quốc Anh","Grenada",
    "Gruzia","Guiana thuộc Pháp","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe",
    "Guinea Xích Đạo","Hy Lạp","Nam Georgia và quần đảo Nam Sandwich","Guatemala","Guam","Guinea-Bissau","Guyana",
    "Dải Gaza","Hong Kong","Đảo Heard và Quần đảo McDonald","Honduras","Croatia","Haiti","Hungary","Indonesia",
    "Ireland","Israel","Đảo Man","Ấn Độ","Lãnh thổ Ấn Độ Dương thuộc Anh","Iraq","Iran","Iceland","Ý","Jersey",
    "Jamaica","Jordan","Nhật Bản","Kenya","Kyrgyzstan","Campuchia","Kiribati","Comoros","Saint Kitts và Nevis",
    "Triều Tiên","Hàn Quốc","Kuwait","Quần đảo Cayman","Kazakhstan","Lào","Liban","Saint Lucia","Liechtenstein",
    "Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova",
    "Montenegro","Madagascar","Quần đảo Marshall","Macedonia [FYROM]","Mali","Myanma (Miến Điện)","Mông Cổ","Macau",
    "Quần đảo Bắc Mariana","Martinique","Mauritius","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico",
    "Malaysia","Mozambique","Namibia","New Caledonia","Niger","Đảo Norfolk","Nigeria","Nicaragua","Hà Lan","Na Uy",
    "Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","Polynesia thuộc Pháp","Papua New Guinea",
    "Philippines","Pakistan","Ba Lan","Saint Pierre và Miquelon","Quần đảo Pitcairn","Puerto Rico",
    "Lãnh thổ Palestin","Bồ Đào Nha","Palau","Paraguay","Qatar","Réunion","Romania","Serbia","Nga","Rwanda",
    "Ả Rập Xê Út","Quần đảo Solomon","Seychelles","Sudan","Thuỵ Điển","Singapore","Saint Helena","Slovenia",
    "Svalbard và Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname",
    "São Tomé và Príncipe","El Salvador","Syria","Swaziland","Quần đảo Turks và Caicos","Chad",
    "Lãnh thổ Phía Nam nước Pháp","Togo","Thái Lan","Tajikistan","Tokelau","Đông Timor","Turkmenistan","Tunisia",
    "Tonga","Thổ Nhĩ Kỳ","Trinidad và Tobago","Tuvalu","Đài Loan","Tanzania","Ukraina","Uganda",
    "Các tiểu đảo xa của Hoa Kỳ","Hoa Kỳ","Uruguay","Uzbekistan","Thành Vatican","Saint Vincent và Grenadines",
    "Venezuela","Quần đảo Virgin thuộc Anh","Quần đảo Virgin thuộc Hoa Kỳ","Việt Nam","Vanuatu","Wallis và Futuna",
    "Samoa","Kosovo","Yemen","Mayotte","Nam Phi","Zambia","Zimbabwe"];

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

  get INFO_NOT_FOUND(): string {
    return this._INFO_NOT_FOUND;
  }

  get YEAR_LIST(): number[] {
    this._YEAR_LIST = [];
    for (let y = new Date().getFullYear(); y > 1000; y--) {
      this._YEAR_LIST.push(y);
    }
    return this._YEAR_LIST;
  }

  get COUNTRY_LIST(): string[] {
    return this._COUNTRY_LIST;
  }

  get QUANTITY_LEVEL_LIST(): number[] {
    return this._QUANTITY_LEVEL_LIST;
  }

  get FIELD_REQUIRED(): string {
    return this._FIELD_REQUIRED;
  }

  get NOT_MORE_THAN_TODAY(): string {
    return this._NOT_MORE_THAN_TODAY;
  }
}
