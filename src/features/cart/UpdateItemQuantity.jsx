import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity} from "./cartSlice.js";

function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch()
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

    return(
        <div className="flex items-center gap-1 md:gap-3">
            <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
            <p>{currentQuantity}</p>
            <Button type="round" disabled={currentQuantity === 1} onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        </div>
    )
}

export default UpdateItemQuantity