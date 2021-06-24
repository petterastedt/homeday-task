import React from 'react'

const ProgressBar = ({currentStep}) => (
  <div className="form-progress">
    <div className="form-progress-bar" style={{ width: `${(100 / 3) * currentStep}%` }}></div>
    <div className="form-progress-background"></div>
  </div>
)

export default ProgressBar