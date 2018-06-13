var AWS = require('aws-sdk');
var flatten = require('flat')
var sqs = new AWS.SQS({region : 'eu-west-1'});

exports.handler = (event, context, callback) => {
    
    var flatAlbum = flatten( JSON.parse(event.body));
    var returnMessage = JSON.stringify(flatAlbum);
    
    var params = {
      MessageBody: returnMessage,
      QueueUrl: Environment.GetEnvironmentVariable("FlatAlbumQueue")
    };
    
    sqs.sendMessage(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    var response = {
        "statusCode": 200,
        "body": returnMessage,
        "isBase64Encoded": false
    };
    callback(null, response);
};