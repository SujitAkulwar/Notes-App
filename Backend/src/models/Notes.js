import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    noteId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    content: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    aiSummary: {
      type: String,
      default: null
    },

    expiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

NoteSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

NoteSchema.index({ createdAt: -1 });

export default model("Note", NoteSchema);