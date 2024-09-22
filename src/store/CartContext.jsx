import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // ,,, update state
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        // state.item.push(action.item)


        const updateItem = [...state.items]

        if (existingCartItemIndex > -1) {
            const existingCartItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            }

            updateItem[existingCartItemIndex] = updatedItem
        } else {
            updateItem.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updateItem }

    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        // ....remove an item from the state 

        const existingCartItem = state.items[existingCartItemIndex]

        if (existingCartItem.quantity === 1) {
            const updatedItem = [...state.items]
            updatedItem.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }

            updatedItem[existingCartItem] = updateItem
        }

        return { ...state, items: updateItem }


    }

    return state
}


export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item })
    }
    function removeItem(item) {
        dispatchCartAction({ type: 'REMOVE_ITEM', item: item })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };
    console.log(cartContext)

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext