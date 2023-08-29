import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import {useSelector} from "react-redux";
import {clearItems, getCart, getCartPrice} from "../cart/cartSlice.js";
import Button from "../../ui/Button.jsx";
import {useState} from "react";
import store from "../../store.js";
import {formatCurrency} from "../../utils/helpers.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

/*
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const actionData = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const username = useSelector(state => state.user.username)
  const totalCartPrice = useSelector(getCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice


  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow"
                 type="text"
                 name="customer"
                 defaultValue={username}
                 required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {actionData?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {actionData.phone}
                </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
            {/*Use below input only for sending data to action function :) */}
            <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <Button type="primary" disabled={isSubmitting}>
            {
              isSubmitting ? "placing order..." : `Order now ${formatCurrency(totalPrice)}`
            }
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === "true"
  }

  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone = "Please give us your correct phone number, we might need it to contact you."
  } else {
    delete errors.phone
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const newOrder = await createOrder(order)

  // Clear items manually, because can't use useDispatch here.
  // Do NOT overuse
  store.dispatch(clearItems())
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
