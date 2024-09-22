import Header from './components/Header.jsx'
import Meals from './components/Meal.jsx'
import { CartContextProvider } from './store/CartContext.jsx';
function App() {
  return (
    <>
      {/* <h1>You got this 💪</h1>
      <p>Stuck? Not sure how to proceed?</p>
      <p>Don't worry - we've all been there. Let's build it together!</p> */}
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    </>
  );
}

export default App;
