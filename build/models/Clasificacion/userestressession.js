"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEstresSession = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../User/user");
const estres_niveles_1 = require("./estres_niveles");
let UserEstresSession = class UserEstresSession extends sequelize_typescript_1.Model {
};
exports.UserEstresSession = UserEstresSession;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserEstresSession.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], UserEstresSession.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => estres_niveles_1.EstresNiveles),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserEstresSession.prototype, "estres_nivel_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => estres_niveles_1.EstresNiveles),
    __metadata("design:type", estres_niveles_1.EstresNiveles)
], UserEstresSession.prototype, "estres_nivel", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.NOW),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], UserEstresSession.prototype, "created_at", void 0);
exports.UserEstresSession = UserEstresSession = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "user_estres_sessions"
    })
], UserEstresSession);
