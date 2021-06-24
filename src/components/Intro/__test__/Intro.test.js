import { render, screen } from '@testing-library/react'
import Intro from './../Intro'

test('Should render intro', () => {
  render(<Intro/>)
  const formElement = screen.getByTestId('intro')
  expect(formElement).toBeInTheDocument()
})
