const Results = ({responseData}) => (
  <div className="form-result">
    <div className="form-result-wrapper">
      <h2 className="form-result-title">Account created successfully!</h2>
    </div>
    <img
      src={ responseData.avatar_url }
      className="form-result-avatar"
      alt="Github avatar"
      height="150"
      width="150" />
    <h3 className="form-result-username">{ responseData.login }</h3>
    { responseData.company && <p className="form-result-location">Works at <strong>{ responseData.company }</strong></p> }
    { responseData.location && <p className="form-result-city">Based in <strong>{ responseData.location }</strong></p> }
    { responseData.followers && <p className="form-result-followers">Followers: <strong>{ responseData.followers }</strong></p> }
  </div>
)

export default Results