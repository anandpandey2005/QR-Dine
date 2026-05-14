/*
In this file I'm going  to write cart logic where : 
-> add to cart button triggerer
-> update quantity trigger (increment / decrement)
-> update / sets customization of cart that are in cart
-> remove all the item from the cart basically make cart clear all item
-> remove single item from the cart 
*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
}


interface CartState {
    items: CartItem[];
    totalAmount: number;
}

const loadCartFromStorage = (): CartState => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            return JSON.parse(storedCart);
        } catch (error) {
            console.error("Failed to parse cart from storage", error);
        }
    }

    return { items: [], totalAmount: 0 };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromStorage(),
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
            state.totalAmount += (action.payload.price * action.payload.quantity);
            localStorage.setItem('cart', JSON.stringify(state));
        },
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;