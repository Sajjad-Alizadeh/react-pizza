import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            //Payload must be an item

            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            // Payload must be an id
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            // Payload must be an id
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            // Payload must be an id
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice

            // Use other action here
            // if (item.quantity === 0) {
            //     cartSlice.caseReducers.deleteItem(state, action)
            // }
        },
        clearItems(state) {
            state.cart = []
        },
    }
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearItems
} = cartSlice.actions

export default cartSlice.reducer

export const getCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const getCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getCart = state => state.cart.cart

export const getCurrentQuantityById = id => state =>
    state.cart.cart.find(value => value.pizzaId === id)?.quantity ?? 0

// export function getCurrentQuantityById1(id) {
//     return function (state) {
//         return state.cart.cart.find(value => value.pizzaId === id)?.quantity ?? 0
//     }
// }

// "reselect"