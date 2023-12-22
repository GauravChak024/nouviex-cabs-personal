function initiatePayment() {
    $.ajax({
      url: 'http://localhost:5000/cabs/newTrip/initiate-payment',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        totalPrice: 500, 
      }),
      success: function (response) {
        const { orderId, orderAmount } = response;
        const options = {
          key: "rzp_test_OIdqJlsnLGgI8j",
          amount: orderAmount,
          currency: 'INR',
          name: 'Cabs Trip 1',
          description: 'Payment for Trip 1',
          order_id: orderId,
          handler: function (response) {
            verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  
  function verifyPayment(orderId, paymentId, signature) {
    $.ajax({
      url: 'http://localhost:5000/cabs/newTrip/verify-payment',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        orderId,
        paymentId,
        signature,
      }),
      success: function (response) {
        if (response.success) {
          alert('Payment successful!');
          sendDummyData(orderId,paymentId);
        } else {
          alert('Payment failed!');
        }
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  
  function sendDummyData(orderId, razorpayPaymentId) {
    $.ajax({
      url: 'http://localhost:5000/cabs/newTrip/submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        mode: 'Outstation',
        source: 'Pickup 0909',
        destination: 'Destination 07',
        selectedCarName: 'WagonR',
        totalPrice: '500',
        selectedDateTime: '11/12/2023',
        phoneNumber: 9009090900,
        name: 'John Doe 0909',
        email: 'johndoe0909@example.com',
        pickupAddress: 'Pickup 07',
        orderId: orderId,
        razorpayPaymentId: razorpayPaymentId,
      }),
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }