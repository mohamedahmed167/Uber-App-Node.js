import mongoose from "mongoose";
declare const RideModel: mongoose.Model<{
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
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
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    passengerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    dropoffLocation: string;
    status: "requested" | "accepted" | "started" | "completed" | "cancelled";
    phone: string;
    driverId?: mongoose.Types.ObjectId | null;
    fare?: number | null;
    startedAt?: NativeDate | null;
    completedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default RideModel;
//# sourceMappingURL=Ride.model.d.ts.map