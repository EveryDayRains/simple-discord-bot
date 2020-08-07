
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: `>>` },
    pvch: { type: String, default: '0'},
    pvct: { type: String, default: '0'},
});
module.exports = mongoose.model("Guild", schema);