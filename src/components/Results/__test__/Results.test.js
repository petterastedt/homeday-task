import { render, screen } from '@testing-library/react'
import Results from './../Results'

// test('Should render results', () => {
//   render(<Results/>)
//   const formElement = screen.getByTestId('results')
//   expect(formElement).toBeInTheDocument()
// })

test('Should display response data', () => {
  const responseData = {
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    company: 'Art Vandelay Industries',
    location: 'New York',
    login: "JohnDoe",
    followers: 99
  }

  render(<Results responseData={responseData} />)
  expect(screen.getByTestId('result-avatar')).toHaveAttribute('src', responseData.avatar_url)
  expect(screen.getByTestId('result-login')).toHaveTextContent(responseData.login)
  expect(screen.getByTestId('result-company')).toHaveTextContent(responseData.company)
  expect(screen.getByTestId('result-city')).toHaveTextContent(responseData.location)
  expect(screen.getByTestId('result-followers')).toHaveTextContent(responseData.followers)
})