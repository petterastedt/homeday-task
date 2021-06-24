import { render, screen } from '@testing-library/react'
import Form from './../Form'

test('Should render form', () => {
  render(<Form/>)
  const formElement = screen.getByTestId('form')
  expect(formElement).toBeInTheDocument()
})

test('Should match inputData', () => {
  const inputData = {
    name: 'John',
    lastName: 'Doe',
    username: 'John Doe',
    email: 'johndoe@hotmail.com',
    termsAccepted: true
  }

  render(<Form inputData={inputData} />)
  expect(screen.getByTestId('form-input-name')).toHaveValue(inputData.name)
  expect(screen.getByTestId('form-input-lastName')).toHaveValue(inputData.lastName)
  expect(screen.getByTestId('form-input-username')).toHaveValue(inputData.username)
  expect(screen.getByTestId('form-input-email')).toHaveValue(inputData.email)
  expect(screen.getByTestId('form-input-checkbox')).toBeChecked(inputData.termsAccepted)
})