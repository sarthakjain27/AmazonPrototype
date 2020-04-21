//const Database=require('./Database');
var connection = new require("./kafka/Connection");
var connection_string = new require("./config");

//passport service
const passportService = require("./services/passport");
//account services
const accountService = require("./services/account");
//seller profile services
const sellerProfileService = require("./services/Seller/Profile");
//customer profile service
const customerProfileService = require("./services/customer/profile");
//customer product service
const customerProductService = require("./services/customer/Product");
//seller product service
const sellerProductService = require("./services/Seller/Product");
//admin product service
const adminProductService = require("./services/admin/Product");
//customer Payment service
const customerPaymentService = require("./services/customer/payment");
//customer Address service
const customerAddressService = require("./services/customer/address");
//saved and Cart Product Service
const savedAndCartProductService = require("./services/customer/savedAndCartProducts");

//connect to MongoDB
const Mongoose = require("mongoose");
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  //   ,
  //   reconnectInterval: 500,
  //   poolSize: 50,
  //   bufferMaxEntries: 0
};
Mongoose.connect(connection_string.connection_string, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });

//handle topic's request
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Kafka server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    // Handling the make request that was called from backend server here in this function.
    fname.handle_request(data.data, function(err, res) {
      console.log("after handle: " + JSON.stringify(err));
      var result;
      if (err) {
        result = err;
      } else {
        result = res;
      }
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: result
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

//topics
handleTopicRequest("accounts", accountService);
handleTopicRequest("passport", passportService);
handleTopicRequest("sellerProfileService", sellerProfileService);
handleTopicRequest("customerProfile", customerProfileService);
handleTopicRequest("customerProductService", customerProductService);
handleTopicRequest("sellerProductService", sellerProductService);
handleTopicRequest("adminProductService", adminProductService);
handleTopicRequest("customerPaymentService", customerPaymentService);
handleTopicRequest("customerAddressService", customerAddressService);
handleTopicRequest("savedAndCartProductService", savedAndCartProductService);

