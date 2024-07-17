import Button from "../buttton/Button";
import "./cart.css";
import { totalPrice } from "../../units/total-price";

const Cart = ({ cartItems, onCheckOut }) => {
  return (
    <div className="cart__container">
      {/* {cartItems.length > 0 ? ( */}
        <p>
          <span>Общая сумма: {totalPrice(cartItems).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}</span>
        <Button title={`${cartItems.length === 0 ? "Заказать " : "Оплата"}`} type={"checkout"} disable={cartItems.length === 0 ? true : false}
          onClick={onCheckOut}
        />
        </p>
      {/* ) : (
        <p>Корзина пуста</p>
      )} */}
    </div>
  );
};

export default Cart;
