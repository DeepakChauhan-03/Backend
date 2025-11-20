function userData(req,resp){
    resp.write("User data submitted");
    resp.end();
}

//Exporting module
module.exports = userData;