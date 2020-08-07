const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    money: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    bio: { type: String, default: `Не указано` },
    marks: { type: String, default: `Нет` },
    cd: { type: Number, default: 0 },
    cookie: { type: Number, default: 0}
});
module.exports = mongoose.model("User", schema);