import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import Input from "./UI/Input.jsx"
import CartContext from "../store/CartContext.jsx"
import { currencyFormatter } from "../util/formatting.js"
import Button from "./UI/Button.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx"


export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgfressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleClose() {
        userProgfressCtx.hideCheckOut();
    }

    function handleSumit(event) {
        event.preventDefault()

        const fb = new FormData(event.target)
        const customerData = Object.fromEntries(fb.entries())

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        })
    }




    return <Modal open={userProgfressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSumit}>
            <h2>Checkout </h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="FullName" type="text" id="name" />
            <Input label="E-Mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="City" />
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button textOnly>Submit Order</Button>
            </p>
        </form>
    </Modal>

}