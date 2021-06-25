import React from 'react'

const ButtonController = ({checkForErrors, currentStep, handleButtonClick, isSubmitting}) => (
  <div className={`form-button-controller ${currentStep === 0 && "form-button-controller--hasSingleButton"}`}>
    {(currentStep !== 0 && currentStep !== 3) &&
      <button
        className="form-button-previous"
        onClick={(e) => handleButtonClick(e)}
      >Back</button>
    }

    {currentStep <= 1 &&
      <button
        className={`form-button-next ${checkForErrors() && "form-button--isDisabled"}`}
        onClick={(e) => handleButtonClick(e)}
      >{currentStep === 0 ? "Let's go!" : "Next"}</button>
    }

    {(currentStep === 2 && !isSubmitting) &&
      <button
        className={`form-button-submit ${checkForErrors() && "form-button--isDisabled"}`}
        form="signup-form"
        type="submit"
      >Create</button>
    }

    {isSubmitting &&
      <div className="form-loading-wrapper"><div className="form-loading"></div>Loading..</div>
    }
  </div>
)

export default ButtonController
