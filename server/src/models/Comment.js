import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    isAttending: { type: Boolean, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})