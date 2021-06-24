import React from 'react'

const Form = ({currentStep, setError, inputData, setInputData, handleSubmit}) => (
  <form
    aria-label="Create user account"
    data-testid="form"
    id="signup-form"
    onSubmit={(e) => handleSubmit(e)}
    >

    <fieldset className={`form-step form-step-personal ${currentStep === 1 ? "form-step--isActive" : ""}`}>
      <legend>Personal information</legend>
      <div className="form-field-wrapper">
        <label htmlFor="firstName">First name:<span className="input-required">*</span></label>
        <input
          data-testid="form-input-name"
          type="text"
          id="firstName"
          name="firstName"
          className="input-name"
          value={inputData ? inputData.name : ''}
          onChange={(e) => {
            setInputData({
              ...inputData,
              name: e.target.value,
            })
            setError('')
          }}
        />
      </div>
      <div className="form-field-wrapper">
        <label htmlFor="lastName">Last name:<span className="input-required">*</span></label>
        <input
          data-testid="form-input-lastName"
          type="text"
          id="lastName"
          name="lastName"
          className="input-name"
          value={inputData ? inputData.lastName : ''}
          onChange={(e) => {
            setInputData({
              ...inputData,
              lastName: e.target.value,
            })
            setError('')
          }}
        />
      </div>
      <div className="form-field-wrapper">
        <label htmlFor="username">Github username:<span className="input-required">*</span></label>
        <input
          data-testid="form-input-username"
          type="text"
          id="username"
          name="username"
          className="input-username"
          value={inputData ? inputData.username : ''}
          onChange={(e) => {
            setInputData({
              ...inputData,
              username: e.target.value,
            })
            setError('')
          }}
        />
      </div>
      <p className="form-step-subtitle">All fields marked with <span className="input-required">*</span> are required!</p>
    </fieldset>

    <fieldset className={`form-step form-step-email ${currentStep === 2 ? "form-step--isActive" : ""}`}>
      <legend>Email and terms</legend>
      <div className="form-field-wrapper">
        <label htmlFor="email">Email:<span className="input-required">*</span></label>
        <input
          data-testid="form-input-email"
          id="email"
          type="email"
          name="email"
          className="input-email"
          value={inputData ? inputData.email : ''}
          onChange={(e) => {
            setInputData({
              ...inputData,
              email: e.target.value,
            })
            setError('')
          }}
        />
      </div>
      <div className="form-field-wrapper checkbox">
        <label htmlFor="checkbox">Agree to terms<span className="input-required">*</span></label>
        <input
          data-testid="form-input-checkbox"
          type="checkbox"
          name="checkbox"
          id="checkbox"
          className="input-checkbox"
          checked={inputData ? inputData.termsAccepted : false}
          onChange={(e) => {
            setInputData({
              ...inputData,
              termsAccepted: e.target.checked,
            })
            setError('')
          }}
        />
      </div>
      <p className="form-step-subtitle">All fields marked with <span className="input-required">*</span> are required!</p>
    </fieldset>
  </form>
)

export default Form