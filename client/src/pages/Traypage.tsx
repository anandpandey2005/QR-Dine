import { CartItem, PaymentButton } from "../components";

const Traypage = () => {
  return (
    <div>
      <h1 className="text-2xl text-center font-semibold px-4 pt-6 bg-primary-light pb-5 rounded-b-[50%] mb-2">
        Tray
      </h1>
      <CartItem></CartItem>
      <CartItem></CartItem>
      <CartItem></CartItem>
      <PaymentButton></PaymentButton>
    </div>
  );
};

export default Traypage;
