
const Role = require('../models/role');
const Endpoint = require('../models/endpoint');

module.exports.checkEndpointAccess = function(roleId, endpointId, callback){
    let authrizeendpoint = false;
    Role.getRoleById(roleId, (err, role)=>{
        Endpoint.getEndpoint(endpointId, (err, endpoint)=>{
            if(endpoint.accessCategory == 'R' && role.read == true){
                callback(true)
            } else if(endpoint.accessCategory == 'W' && role.write == true){
                callback(true)
            } else if(endpoint.accessCategory == 'D' && role.delete == true){
                callback(true)
            }else{
                callback(false)
            }
        })
    })
}


// API Response Util

module.exports.createResponder = function (success , code, message, data) {
     let responder = {
        success : success,
        code : code,
        message : message,
        data : data
    }
    return responder;
}

module.exports.sendResponder = function (response, responder) {
    response.status(responder.code).json({success: responder.success, message: responder.message, data : responder.data});
}

