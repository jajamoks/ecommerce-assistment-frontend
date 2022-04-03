import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { Product } from "../../Components/Product";
import { PageProps, ActionType } from "../../globalTypes";
import { ITotalAmount, totalAmountInitial } from "./types";

export const Cart: React.FC<PageProps> = ({ state, dispatch }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { shoppingCart } = state;
  const [totalAmount, setTotalAmount] =
    React.useState<ITotalAmount>(totalAmountInitial);

  React.useEffect(() => {
    if (shoppingCart.length) {
      let subtotal = 0;
      let taxes = 0;
      let total = 0;

      shoppingCart.forEach((product) => {
        subtotal += product.price * (product.quantity as number);
        taxes += subtotal * 0.16;
        total += subtotal + taxes;
      });

      setTotalAmount({
        subtotal: Math.round(subtotal),
        taxes: Math.round(taxes),
        total: Math.round(total),
      });
    }
  }, [shoppingCart]);

  return (
    <section className="Cart">
      {shoppingCart.length ? (
        <section className="Cart__content">
          <article className="Cart__products">
            {shoppingCart.map((product) => (
              <Product
                key={product._id}
                title={product.name}
                price={product.price}
                quantity={product.quantity as number}
                img={product.image}
                dispatch={dispatch as React.Dispatch<ActionType>}
                id={product._id}
                currency={state.currency}
              />
            ))}
          </article>

          <article className="Cart__info">
            <div className="Cart__total">
              <div className="Cart__total--subtotal">
                <h2>Subtotal</h2>
                <span>{state.currency} {totalAmount.subtotal}</span>
              </div>

              <div className="Cart__total--subtotal">
                <h2>Taxes</h2>
                <span>{state.currency} {totalAmount.taxes}</span>
              </div>

              <div className="Cart__total--total">
                <h2>Total</h2>
                <span>{state.currency} {totalAmount.total}</span>
              </div>
            </div>

            <ButtonCTA
              content="Proceed to Checkout"
              onclick={() => {
                const cartItems = shoppingCart.map((item) => {
                  return {
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: item.quantity,
                    product: item._id,
                  };
                });

                try {
                  fetch(
                    "https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/cart",
                    {
                      method: "POST",
                      mode: "cors",
                      body: JSON.stringify({ user: "John Doe", cartItems }),
                    }
                  )
                    .then((res) => res.json())
                    .then(() => ({
                      type: "MOVING",
                      payload: {
                        current: "/shopping-cart",
                        history: "/checkout",
                      },
                    }));
                } catch (err) {
                  alert(`Something went wrong ${err}`);
                }

                dispatch &&
                  dispatch({
                    type: "AMOUNT",
                    payload: totalAmount.total,
                  });
                navigate("/checkout");
              }}
            />
          </article>
        </section>
      ) : (
        <span className="Cart__msg">The cart is empty</span>
      )}
    </section>
  );
};
