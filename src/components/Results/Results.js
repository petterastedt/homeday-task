import React from 'react'

const Results = ({responseData}) => (
  <div className="form-result" data-testid="results">
    <div className="form-result-wrapper">
      <h2 className="form-result-title">Account created successfully!</h2>
    </div>
    <img
      data-testid="result-avatar"
      src={ responseData.avatar_url }
      className="form-result-avatar"
      alt="Github avatar"
      height="150"
      width="150" />
    <h3 className="form-result-username" data-testid="result-login">{ responseData.login }</h3>
    { responseData.company && <p className="form-result-company" data-testid="result-company">Works at <strong>{ responseData.company }</strong></p> }
    { responseData.location && <p className="form-result-city" data-testid="result-city">Based in <strong>{ responseData.location }</strong></p> }
    { responseData.followers && <p className="form-result-followers" data-testid="result-followers">Followers: <strong>{ responseData.followers }</strong></p> }
  </div>
)

export default Results