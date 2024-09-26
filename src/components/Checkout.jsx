import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import Input from "./UI/Input.jsx"
import CartContext from "../store/CartContext.jsx"
import { currencyFormatter } from "../util/formatting.js"
import Button from "./UI/Button.jsx"
import UserProgressContext from "../store/UserProgressContext.jsx"
import useHttp from "../hooks/useHttp.js"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgfressCtx = useContext(UserProgressContext)

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig, [])


    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleClose() {
        userProgfressCtx.hideCheckOut();
    }


    function handleFinish() {
        userProgfressCtx.hideCheckOut()
        cartCtx.clearCart()
        clearData()
    }

    function handleSumit(event) {
        event.preventDefault()

        const fb = new FormData(event.target)
        const customerData = Object.fromEntries(fb.entries())

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button textOnly>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgfressCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was sumitted successfully</p>
            <p>We will get back to you with more detail via email within the next few minutes</p>
            <p className="modal-actions">
                <Button onClick={handleClose}>Okey</Button>
            </p>
        </Modal>
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
                <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to submit order" message={error} />}

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>

}