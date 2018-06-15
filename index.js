var AWS = require('aws-sdk');
var flatten = require('flat')
var sns = new AWS.SNS();
var uuid = require('uuid/v1')

exports.handler = (event, context, callback) => {
    
    var flatAlbum = flatten( JSON.parse(event.body));
    var returnMessage = JSON.stringify(flatAlbum);
    var id = uuidv1();

    var params = {
        Message: returnMessage, 
        Subject: id,
        TopicArn: Environment.GetEnvironmentVariable("FlatAlbumQueue")
    };
    sns.publish(params, context.done);

    var response = {
        "statusCode": 200,
        "body": returnMessage,
        "isBase64Encoded": false
    };
    callback(null, response);
};