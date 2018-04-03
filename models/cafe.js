var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CafeSchema = new Schema({
    Name: { type: 'String', required: true },
    Adress: { type: 'String', },
    Contacts: { type: 'String' }
});

var Cafe = mongoose.model('Cafe', CafeSchema);
module.exports = Cafe;