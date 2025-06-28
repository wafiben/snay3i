"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRequest = exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "PENDING";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["DECLINED"] = "DECLINED";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var BookingRequest = /** @class */ (function () {
    function BookingRequest(id, clientId, freelancerId, serviceName, dateTime, status) {
        this.id = id;
        this.clientId = clientId;
        this.freelancerId = freelancerId;
        this.serviceName = serviceName;
        this.dateTime = dateTime;
        this.status = status;
    }
    return BookingRequest;
}());
exports.BookingRequest = BookingRequest;
