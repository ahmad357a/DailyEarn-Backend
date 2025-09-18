const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String },
  profileImage: { type: String },
  city: { type: String },
  bio: { type: String },
  website: { type: String },
  googleId: { type: String }, // for Google OAuth
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isAdmin: { type: Boolean, default: false }, // Admin role for entity approval
  balance: { type: Number, default: 0 }, // User's current balance
  additionalBalance: { type: Number, default: 0 }, // Admin-added additional balance
  referralBonusEarned: { type: Number, default: 0 }, // Total referral bonuses earned
  referralBonusBalance: { type: Number, default: 0 }, // Available referral bonus balance
  hasDeposited: { type: Boolean, default: false }, // Whether user has made their first deposit
  tasksUnlocked: { type: Boolean, default: false }, // Whether user has unlocked tasks
  referralCode: { type: String } // User's unique referral code
}, { timestamps: true });

// Add plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
 