(function (PaynowCall) {
  var Mobile = function () {
    function Mobile() {}
    Mobile.prototype.confirmPaynowMobile = function () {
      //   const { Paynow } = require("../../../node_modules/paynow/src/paynow");
      const { Paynow } = require("paynow");
      let paynow = new Paynow("7281", "60815208-3fc2-4826-b7ba-f8667c0b4e97");
      let payment = paynow.createPayment(
        "Packages paynow",
        "payments@globtorch.com"
      );
      payment.add("Single package", 30000);
      paynow
        .sendMobile(
          // The payment to send to Paynow
          payment,

          // The phone number making payment
          "0719702467",

          // The mobile money method to use.
          "onemoney"
        )
        .then(function (response) {
          if (response.success) {
            // These are the instructions to show the user.
            // Instruction for how the user can make payment
            let instructions = response.instructions; // Get Payment instructions for the selected mobile money method

            // Get poll url for the transaction. This is the url used to check the status of the transaction.
            // You might want to save this, we recommend you do it
            let pollUrl = response.pollUrl;

            console.log(instructions);
          } else {
            console.log(response.error);
          }
        })
        .catch((ex) => {
          // Ahhhhhhhhhhhhhhh
          // *freak out*
          console.log("Your application has broken an axle", ex);
        });
    };
  };
});

var Paynow = new PaynowCall();

export { Paynow };
