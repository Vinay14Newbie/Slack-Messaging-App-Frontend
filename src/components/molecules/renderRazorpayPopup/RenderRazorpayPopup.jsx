import { useCaptureOrder } from "@/hooks/apis/payment/useCaptureOrder";
import { useEffect } from "react";

const loadRazorpayScript = (src) => {
  return new Promise((res) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("Razorpay script loaded");
      return res(true);
    };

    script.onerror = () => {
      console.log("Error in loading razorpay script");
      return res(false);
    };

    document.body.appendChild(script);
  });
};

export const RenderRazorpayPopup = ({ amount, orderId, keyId, currency }) => {
  console.log("RenderRazorpayPopup: ", amount, orderId, keyId, currency);
  const { captureOrderMutation } = useCaptureOrder();

  const display = async function (options) {
    const scriptResponse = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!scriptResponse) {
      console.log("Error in loading script");
      return;
    }

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", async (response) => {
      console.log("Payment failed: ", response.error.code);
      await captureOrderMutation({
        orderId: options.order_id,
        status: "failed",
        paymentId: "",
      });
    });

    rzp.open();
  };

  useEffect(() => {
    display({
      key: keyId,
      amount,
      currency,
      name: "Vinay Duryodhan", //name of the company
      description: "Testing purpose",
      order_id: orderId,
      handler: async (response) => {
        console.log("Payment success", response);
        console.log("Signature ", response.razorpay_signature);

        await captureOrderMutation({
          orderId: orderId,
          status: "success",
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        //after this redirect user to custom succeed page
      },
    });
  }, [orderId]);

  return null;
};
