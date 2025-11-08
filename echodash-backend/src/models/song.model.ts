import mongoose, { Schema, Document } from "mongoose";

export interface ISongDocument extends Document {
  title: string;
  artist: string;
  album?: string | null;
  genre?: string | null;
  createdAt?: Date; 
  updatedAt?: Date;
}

const SongSchema = new Schema<ISongDocument>(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, trim: true, default: null },
    genre: { type: String, trim: true, default: null }
  },
  { timestamps: false, versionKey: false }
);

SongSchema.index({ title: 1, artist: 1 }, { unique: true });
SongSchema.index({ title: "text", artist: "text", album: "text", genre: "text" });

SongSchema.set("toJSON", {
  virtuals: true,      
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

export const SongModel = mongoose.model<ISongDocument>("Song", SongSchema);
