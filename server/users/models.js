var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var userSchema = new mongoose.Schema({
        username: {
                type: String, 
                required:[true, "Please enter a User name"], 
                minlength:[3, "User Name must be 3 characters or longer"], 
                unique: [true, "That name is already used, please try another name"]
        },

        email: {type: String},

        password: {
                type: String, 
                required:[true, "Please enter a password"], 
                minlength:[3, "password must be 3 characters or longer"],
                bcrypt: true 
        },

        location: {type: String},

        description: {type: String},

        picture:{type: String},

        webinars: [String],  //list of webinar ids

        certification:{type:String},

        isMentor:{type: Boolean}

}, {timestamps:true})

userSchema.plugin(uniqueValidator);
userSchema.plugin(require('mongoose-bcrypt'));
module.exports={
        user: mongoose.model('user', userSchema)
};