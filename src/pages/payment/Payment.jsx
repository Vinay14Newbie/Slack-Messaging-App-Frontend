import { useCreateOrder } from "@/hooks/apis/payment/useCreateOrder";
import { useState } from "react";

export const Payment = () => {
  const [amount, setAmount] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);
  const { createOrderMutation, isPending, isSuccess, error } = useCreateOrder();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await createOrderMutation(amount);
    console.log("order response ", response);
    setOrderResponse(response);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Make a Payment
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="amount"
            >
              Amount:
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-sm "
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
