import { UtensilsCrossed } from "lucide-react";

const PaymentButton = ({ props }: any) => {
  return (
    <button className="mt-2 flex border-2 py-4 px-5 rounded-2xl  gap-2 items-center mx-auto text-[#f9fafb] bg-primary-light hover:bg-primary active:scale-90 transition-all duration-75">
      <UtensilsCrossed />
      Buy now
    </button>
  );
};

export default PaymentButton;
