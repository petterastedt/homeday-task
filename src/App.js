import React, { useState } from 'react'
import Intro from './components/Intro/Intro'
import Form from './components/Form/Form'
import Results from './components/Results/Results'
import ButtonController from './components/ButtonController/ButtonController'
import ProgressBar from './components/ProgressBar/ProgressBar'
import './styles.css'

const App = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState('')
  const [responseData, setResponseData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputData, setInputData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    termsAccepted: false
  })

  // CALL GITHUB API
  const fetchData = async () => {
    const url = 'https://api.github.com/users'

    try {
      const res = await fetch(`${url}/${inputData.username}`)
      const resJson = await res.json()

      return resJson
    } catch (error) {
      console.log("error:", error)
      setError(error)
    }
  }

  // SET SUBMIT STATES AND COLLECT DATA
  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasError = checkForErrors()

    if (hasError) {
      return setError(hasError)
    }

    setIsSubmitting(true)
    setError('')
    const response = await fetchData()

    if (response.message === "Not Found") {
      setIsSubmitting(false)
      return setError("Username not found, please go back and try again!")
    }

    setResponseData(response)
    setCurrentStep(currentStep + 1)
    setIsSubmitting(false)
  }

  // SET BUTTON CLICK STATES AND CHANGE FORM STEP
  const handleButtonClick = (e) => {
    e.preventDefault()
    const target = e.currentTarget

    if (target.classList.contains('form-button-next')) {
      const hasError = checkForErrors()

      if (hasError) {
        return setError(hasError)
      }

      setError('')
      setCurrentStep(currentStep+1)
    } else {
      setError('')
      setCurrentStep(currentStep-1)
    }
  }

  // CHECK FOR INPUT ERRORS
  const checkForErrors = () => {
    if (currentStep === 1) {
      const fields = document.querySelectorAll('.form-step-personal input')
      const emptyField = [...fields].find(field => !field.value)

      if (emptyField) {
        const elementIdToString = emptyField.id.replace( /([A-Z])/g, " $1" ).toLowerCase()
        return `The ${elementIdToString} field is empty!`
      }

      if (!fields.length) {
        return true
      }
    }

    if (currentStep === 2) {
      const emailIsValid = /\S+@\S+\.\S+/.test(inputData.email)

      if (!emailIsValid) {
        return 'The email adress is not valid!'
      }

      if (!inputData.termsAccepted) {
        return 'You have to accept the terms to continue!'
      }
    }

    return false
  }

  return (
    <div className="container home-page">
      <div className="form">

        { currentStep === 0 &&
          <Intro />
        }

        { (currentStep > 0 && currentStep < 3) &&
          <Form
            checkForErrors={checkForErrors}
            currentStep={currentStep}
            inputData={inputData}
            handleSubmit={handleSubmit}
            setError={setError}
            setInputData={setInputData}
          />
        }

        { currentStep === 3 &&
          <Results responseData={responseData} />
        }

        <div className="form-error">
          { error && error }
        </div>

        <ButtonController
          currentStep={currentStep}
          checkForErrors={checkForErrors}
          handleButtonClick={handleButtonClick}
          isSubmitting={isSubmitting}
        />

        <ProgressBar currentStep={currentStep} />
      </div>
    </div>
  )
}

export default App