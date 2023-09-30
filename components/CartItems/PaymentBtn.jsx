import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import getStripe from "../../lib/get-stripe";
import { useContext } from "react";
import { Context } from "../Layout";
import { useRouter } from "next/router";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function PaymentBtn({ totalPrice }) {
  const context = useContext(Context);
  const router = useRouter();
  const { success, canceled } = router.query;
  const { session, cart, setCart } = context;

  const confirmOrder = () => {
    const body = {
      totalPrice,
      createdAt: Date.now(),
      isPaid: true,
      paidAt: Date.now(),
      quantity: cart.length,
      userid: session?.user.id,
    };
    return fetch(`/api/orders`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("order created", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearCart = () => {
    fetch(`/api/cart?userid=${session?.user.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (success !== undefined || canceled !== undefined) {
      if (success && session && cart.length!=0) {
        confirmOrder()
          .then((data)=>{clearCart()})

        alert("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        alert(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, canceled, session,cart]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = cart.map((item) => ({ price: item.stripeid, quantity: 1 }));
    const result = await fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify({ cart: body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    const { id } = data;
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <button onClick={onSubmit} className="btn btn-warning text-white">
      Proceed to pay
    </button>
  );
}
