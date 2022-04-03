import React, { useReducer } from 'react';
import { Layout } from "./Layout";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { Menu } from "./Pages/Menu";
import { Cart } from "./Pages/Cart";
import { Product } from './Pages/Product';
import { Checkout } from './Pages/Checkout';
import { Ctx } from "./Context";

// utils
import { initialState, reducer } from "./globalState";

// css
import './App.scss';
import { StateInterface } from './globalTypes';


function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState())

  React.useEffect(() => {
    try{
      fetch('https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/products?pageNumber=1')
      .then(res => res.json())
      .then(data => dispatch({ type: "ADD_INITIAL_ITEMS", payload: data.products }))
    }catch(err){
      dispatch({ type: "ERROR" })
    }
  }, [])

  return (
    <Ctx.Provider value={state}>
      <section className="App">
        <BrowserRouter>
          <Layout dispatch={dispatch}>
            <Routes>
              <Route path="/" element={
                <Home
                  state={state as StateInterface}
                  dispatch={dispatch}
                  ctx={Ctx}
                />
              }/>
              <Route path="/menu" element={
                <Menu 
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/shopping-cart' element={
                <Cart 
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/products/:id' element={
                <Product
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/checkout' element={
                <Checkout
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </section>
    </Ctx.Provider>
  );
}

export default App;
