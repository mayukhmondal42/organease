import { createOrder } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData?.Products) {
      setTimeout(() => {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 800);
    }
  } catch (error) { console.log(error); dispatch({ type: "loading", payload: false }); }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData) setState({ clientToken: responseData.clientToken, success: responseData.success });
  } catch (error) { console.log(error); }
};

export const pay = async (data, dispatch, state, setState, getPaymentProcess, totalCost, history) => {
  if (!state.address) return setState({ ...state, error: "Please provide your address" });
  if (!state.phone) return setState({ ...state, error: "Please provide your phone number" });

  try {
    const payment = await state.instance.requestPaymentMethod();
    dispatch({ type: "loading", payload: true });
    const res = await getPaymentProcess({ amountTotal: totalCost(), paymentMethod: payment.nonce });

    if (res) {
      const orderData = {
        allProduct: JSON.parse(localStorage.getItem("cart")),
        user: JSON.parse(localStorage.getItem("jwt")).user._id,
        amount: res.transaction.amount,
        transactionId: res.transaction.id,
        address: state.address,
        phone: state.phone,
      };
      const resposeData = await createOrder(orderData);
      if (resposeData.success) {
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch({ type: "cartProduct", payload: null });
        dispatch({ type: "cartTotalCost", payload: 0 });
        dispatch({ type: "orderSuccess", payload: true });
        setState({ clientToken: "", instance: {} });
        dispatch({ type: "loading", payload: false });
        return history.push("/");
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
    setState({ ...state, error: error.message || "Payment failed, try again" });
  }
};