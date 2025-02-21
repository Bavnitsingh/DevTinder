const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status`,
      },
      required: true,
    },
  },
  { timestamps: true }

);
connectionRequestSchema.pre("save", function (next) {
  // Check if fromUserId === toUserId
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
   throw new Error(
       "You cannot send the friend request to yourself",
    )
  }
  next();// never forgrt next() in middleware
})
// compound indexes -> Queries will become faster using index
connectionRequestSchema.index({ firstName: 1, toUserId: 1 })
const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);
module.exports = ConnectionRequestModel;