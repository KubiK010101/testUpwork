import React, {  FC, useEffect, useState } from "react";
import { Dispatch,AnyAction, configureStore, createAction} from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

//General comment 
//counter app with a timer implemented using redux middleware function

const increment = createAction("increment");
const decrement = createAction("decrement");

interface Itimer {
  dispatch: Dispatch
  getState: () => {counter:number}
}



//reducer that adds or subtracts a number depending on the action
export const counter = (state = 0, action: Action<string>) => increment.match(action) ? state + 1 : decrement.match(action) ? state - 1 : state;

const root = combineReducers({ counter });

//midleware function that makes checks and additional actions
const timer = ({ dispatch, getState}:Itimer) => {
  
  setInterval(() => {
    let count = getState().counter;
    
    if (count === 2 || count >= 10) return;
    count < 0 ? dispatch(decrement()) : dispatch(increment());
    }, 1000);    
    
    return (next: Dispatch<AnyAction>) => (action: Action) => {
      next(action);
    };
};

const store = configureStore({
    reducer: root,
    middleware: [timer],
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App:FC = () => {
    const [visibleDropDown, setVisibleDropDown] = useState<Boolean>(false);
    const dispatch = useAppDispatch();
    const counter = useAppSelector((state: RootState) => state.counter);

    useEffect(() => {
      if (counter === 20) return alert('The counter is already 20 !');
      counter === 2 ? setVisibleDropDown(true) : setVisibleDropDown(false);
      
    },[counter])

    let onSelect = (e:any) => {
      e.target.value === 'increment' ? dispatch(increment()) : dispatch(decrement());
      return e.target.value = '';
    }

    return (
    <div style={{fontFamily: 'monospace'}}>
      {visibleDropDown ? 
      <div>
        <span data-testid="counter">{counter}</span>
        <select onChange={(e) => onSelect(e)} name="values">
          <option value="">Please choose an option</option>
          <option value="increment">Increment</option>
          <option value="decrement">Decrement</option>
        </select>
      </div> : 
      <div>      
        <button data-testid="button-up" onClick={() => dispatch(decrement())}>-</button>
        {counter}
        <button data-testid="button-down" onClick={() => dispatch(increment())}>+</button>
      </div>
          }
    </div>
    );
};

export default App;

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);