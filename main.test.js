import React from 'react'
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';
import { counter } from './main'
import App from './main';

const renderWithRedux = (
  component,
  { state = 0, store = configureStore(counter, state = 0) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

afterEach(cleanup);

it('checks initial state is equal to 0', () => {
    const { getByTestId } = renderWithRedux(<App />)
    expect(getByTestId('counter')).toHaveTextContent('0')
})

it('increments the counter through redux', () => {
  const { getByTestId } = renderWithRedux(<App />, 
    {initialState: {count: 5}
})
  fireEvent.click(getByTestId('button-up'))
  expect(getByTestId('counter')).toHaveTextContent('6')
})

it('decrements the counter through redux', () => {
  const { getByTestId} = renderWithRedux(<App />, {
    initialState: { count: 100 },
  })
  fireEvent.click(getByTestId('button-down'))
  expect(getByTestId('counter')).toHaveTextContent('99')
})