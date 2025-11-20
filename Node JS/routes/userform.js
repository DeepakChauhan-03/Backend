function userForm(req,resp){
    resp.write("i am userform");
    resp.end();
}

//Export the module
module.exports = userForm;