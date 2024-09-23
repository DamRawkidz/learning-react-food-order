import { useContext } from 'react'
import Modal from './UI/Modal.jsx'
import CartContext from '../store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Button from './UI/Button.jsx'
import userProgressCtx from '../store/UserProgressContext.jsx'
export default function Cart() {
    const cartCtx = useContext(CartContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
    console.log(userProgressCtx)
    // userProgressCtx.progress === 'cart'
    return <Modal className='cart' open={true}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item =>
                <li key={item.id}>
                    {item.name} - {item.quantity}
                </li>
            )
            }
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly> Close</Button>
            <Button> Go to Checkout</Button>
        </p>
    </Modal>
}