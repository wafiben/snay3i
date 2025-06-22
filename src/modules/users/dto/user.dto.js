"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
var UserDto = /** @class */ (function () {
    function UserDto(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
    return UserDto;
}());
exports.UserDto = UserDto;
