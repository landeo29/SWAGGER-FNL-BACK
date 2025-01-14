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
exports.UserResponses = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const ageRange_1 = require("./ageRange");
const hierarchical_level_1 = require("./hierarchical_level");
const responsabilityLevel_1 = require("./responsabilityLevel");
const gender_1 = require("./gender");
let UserResponses = class UserResponses extends sequelize_typescript_1.Model {
};
exports.UserResponses = UserResponses;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserResponses.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], UserResponses.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ageRange_1.AgeRange),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserResponses.prototype, "age_range_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ageRange_1.AgeRange),
    __metadata("design:type", ageRange_1.AgeRange)
], UserResponses.prototype, "age_range", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => hierarchical_level_1.Hierarchical_level),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserResponses.prototype, "hierarchical_level_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => hierarchical_level_1.Hierarchical_level),
    __metadata("design:type", hierarchical_level_1.Hierarchical_level)
], UserResponses.prototype, "hierarchical_level", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => responsabilityLevel_1.ResponsabilityLevel),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserResponses.prototype, "responsability_level_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => responsabilityLevel_1.ResponsabilityLevel),
    __metadata("design:type", responsabilityLevel_1.ResponsabilityLevel)
], UserResponses.prototype, "responsability_level", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => gender_1.Gender),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserResponses.prototype, "gender_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => gender_1.Gender),
    __metadata("design:type", gender_1.Gender)
], UserResponses.prototype, "gender", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], UserResponses.prototype, "created_at", void 0);
exports.UserResponses = UserResponses = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "user_responses",
    })
], UserResponses);
