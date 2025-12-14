const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24
    }
});

// blacklistTokenSchema.statics.isBlacklisted = async function (token) {
//     return !!(await this.findOne({ token }).exec());
// };

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);