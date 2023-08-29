import LinkButton from "../../ui/LinkButton.jsx";

function EmptyCart() {
  return (
    <div>
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="font-semibold mt-7">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
