import { Fragment, useRef, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { CheckoutInput } from "../../Components/CheckoutInput";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { SocialMedia } from "../../Containers/SocialMedia";
import { ILocalState, initialLocalState } from "./types";
import { PageProps } from "../../globalTypes";

export const Checkout: React.FC<PageProps> = ({
  state,
  dispatch,
}): JSX.Element => {
  const { totalAmount, shoppingCart } = state;
  const navigate: NavigateFunction = useNavigate();
  const [localState, setLocalState] = useState<ILocalState>(initialLocalState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const errorRef = useRef<HTMLSpanElement>(null);
  const handleConfirmation = () => {
    setIsModalOpen(false);
    if (dispatch) {
      dispatch({ type: "FILTER", payload: "All items" });
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "RESET" });
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    navigate("/");
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setLocalState((prev) => ({
      ...prev,
      [evt.target.id]: evt.target.value,
    }));
  };

  const handleSubmit = () => {
    let flag: boolean = true;

    const orderItems = shoppingCart.map((item) => {
      return {
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity,
        product: item._id,
      };
    });

    Object.values(localState).forEach((value) => {
      if (!value) flag = false;
    });

    if (flag) {
      errorRef.current?.classList.remove("error");

      try {
        fetch( 
          "https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/order",
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
              user: "John Doe",
              orderItems,
              shippingAddress: {
                address: localState.address,
                city: "Cebu",
                postalCode: localState.zipCode,
                country: localState.country,
              },
              paymentMethod: "card", //@TOD mke dynamic
              currency: "USD", //@TOD mke dynamic
              taxPrice: 12, //@TODO make dynamic
              shippingPrice: 70,
              totalPrice: 100,
              isPaid: true,
              isDelivered: false,

            }),
          }
        )
          .then((res) => res.json())
          .then(() => setIsModalOpen(true));
      } catch (err) {
        alert(`Something went wrong ${err}`);
      }
    } else {
      errorRef.current?.classList.add("error");
      window.scroll({
        top: 10000,
        behavior: "smooth",
      });
    }
  };

  return (
    <Fragment>
      <section className="Checkout">
        <form className="Checkout__form">
          <CheckoutInput
            name="Full Name"
            id="fullName"
            type="text"
            placeholder="John Doe"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Email"
            id="email"
            type="email"
            placeholder="john@doe.com"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Country"
            id="country"
            type="select"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Address"
            id="address"
            type="text"
            placeholder="Street address"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Card Number"
            id="cardNumber"
            type="number"
            placeholder="1234 1234 1234 1234"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Expiration Date"
            id="expirationDate"
            type="number"
            placeholder="MM / YY"
            onchange={handleChange}
          />
          <CheckoutInput
            name="Zip code"
            id="zipCode"
            type="number"
            placeholder="11655"
            onchange={handleChange}
          />
          <span className="Checkout__error" ref={errorRef}>
            Please filled all the text boxes above
          </span>
        </form>

        <button className="Checkout__cta" onClick={handleSubmit}>
          <h2>Pay ${totalAmount}</h2>
        </button>
      </section>

      {isModalOpen && (
        <section className="Modal">
          <div className="Modal__card">
            <h2>
              <span>
                Your order has been submitted, check your database to verify!)
              </span>
            </h2>
            <div className="Modal__card--footer">
              <SocialMedia />

              <ButtonCTA content="OK" onclick={handleConfirmation} />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};
