import React, { useState } from 'react'
import Intro from './components/Intro/Intro'
import Form from './components/Form/Form'
import Results from './components/Results/Results'
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
    const gitHubResponse = await fetchData()

    if (gitHubResponse.message === "Not Found") {
      setIsSubmitting(false)
      return setError("Username not found, please go back and try again!")
    }

    setResponseData(gitHubResponse)
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
            currentStep={currentStep}
            error={error}
            inputData={inputData}
            setError={setError}
            setInputData={setInputData}
          />
        }

        { currentStep === 3 &&
          <Results responseData={responseData} />
        }

        <div className="form-error">{ error && error }</div>

        <div className={`form-button-wrapper ${ currentStep === 0 && "form-button-wrapper--hasSingleButton"}`}>
          { (currentStep !== 0 && currentStep !== 3) &&
            <button
              className="form-button-previous"
              onClick={(e) => handleButtonClick(e)}>Back</button>
          }

          { currentStep <= 1 &&
            <button
              className={`form-button-next ${checkForErrors() ? "form-button--isDisabled" : ""}`}
              onClick={(e) => handleButtonClick(e)}
              >{ currentStep === 0 ? "Let's go!" : "Next"}</button>
          }

          { (currentStep === 2 && !isSubmitting) &&
            <button
              className={`form-button-submit ${checkForErrors() ? "form-button--isDisabled" : ""}`}
              onClick={(e) => handleSubmit(e)}
              type="submit">Create</button>
          }

          { isSubmitting &&
            <div className="form-loading-wrapper"><div className="form-loading"></div>Loading..</div>
          }
        </div>

        <ProgressBar currentStep={currentStep} />
      </div>
    </div>
  )
}

export default App