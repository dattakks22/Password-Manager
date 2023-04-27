import './index.css'

const PasswordItems = props => {
  const {passwordDetails, showPasswords, deletePassword} = props
  const {websiteUrl, username, password, id} = passwordDetails

  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li className="list-container">
      <div className="password-item-logo">{websiteUrl[0].toUpperCase()}</div>
      <div className="list-items">
        <p className="item-text">{websiteUrl}</p>
        <p className="item-text">{username}</p>
        {showPasswords ? (
          <p className="item-text">{password}</p>
        ) : (
          <img
            className="stars-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItems
