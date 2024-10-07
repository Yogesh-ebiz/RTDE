"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R = void 0;
class R {
    constructor(args) {
        var _a;
        this.result = args.result;
        this.message = args.message;
        if (args.error) {
            if (args.error in Error) {
                this.error = args.error.message;
            }
            this.errorLevel = (_a = args.errorLevel) !== null && _a !== void 0 ? _a : 100;
        }
    }
    get hasError() {
        return this.error != null;
    }
}
exports.R = R;
exports.default = R;
