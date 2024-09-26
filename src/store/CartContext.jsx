import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
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
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        // ....remove an item from the state 

        const existingCartItem = state.items[existingCartItemIndex]
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const newItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }


            updatedItems[existingCartItemIndex] = newItem
        }

        console.log(updatedItems)

        return { ...state, items: updatedItems };
    }


    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: []
        }
    }

    return state
}


export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item })
    }
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART', id })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        dispatchCartAction
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext