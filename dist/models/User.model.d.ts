import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    password: string;
    role: "user" | "driver";
    passwordResetOTP?: string | null;
    passwordResetOTPExpires?: number | null;
    passwordResetOTPIsVaild?: boolean | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default UserModel;
//# sourceMappingURL=User.model.d.ts.map