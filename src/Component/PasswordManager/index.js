import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import PasswordItems from '../PasswordItems'

import './index.css'

const APP_LOGO =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'

const PASSWORD_MANAGER_SM =
  'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'

const PASSWORD_MANAGER_LG =
  'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'

class PasswordManager extends Component {
  state = {
    websiteUrl: '',
    username: '',
    password: '',
    passwordsList: [],
    showPasswords: false,
    searchInput: '',
  }

  deletePassword = id =>
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachDetails => eachDetails.id !== id,
      ),
    }))

  addNewPassword = event => {
    event.preventDefault()
    const {username, password, websiteUrl} = this.state
    if (!(username && password && websiteUrl)) {
      return
    }
    const newPassword = {
      id: uuidv4(),
      websiteUrl,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteUrl: '',
      username: '',
      password: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteUrl: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onChangeCheckbox = event => {
    this.setState({showPasswords: event.target.checked})
  }

  render() {
    const {
      websiteUrl,
      username,
      password,
      passwordsList,
      showPasswords,
      searchInput,
    } = this.state

    const searchedPasswordsList = passwordsList.filter(eachDetails =>
      eachDetails.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main-container">
        <div className="app-container">
          <div>
            <img className="logo-img" src={APP_LOGO} alt="app logo" />
          </div>
          <div className="input-section">
            <img
              className="password-img-sm"
              src={PASSWORD_MANAGER_SM}
              alt="password manager"
            />
            <img
              className="password-img-lg"
              src={PASSWORD_MANAGER_LG}
              alt="password manager"
            />
            <form className="form-container" onSubmit={this.addNewPassword}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-box-container">
                <img
                  className="logo-style"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
                <input
                  className="input-style"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteUrl}
                />
              </div>
              <div className="input-box-container">
                <img
                  className="logo-style"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png  "
                  alt="username"
                />
                <input
                  className="input-style"
                  type="text"
                  placeholder="Enter UserName"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="input-box-container">
                <img
                  className="logo-style"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  className="input-style"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>

              <button className="button-style" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="bottom-section">
            <div className="password-search-container">
              <div className="password-count">
                <h1 className="password-heading">Your Passwords</h1>
                <div className="counter-text">
                  <p>{passwordsList.length}</p>
                </div>
              </div>
              <div className="search-container">
                <img
                  className="search-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="checkbox-container">
              <input
                id="showPassword"
                type="checkbox"
                className="checkbox"
                onChange={this.onChangeCheckbox}
                value={showPasswords}
              />
              <label htmlFor="showPassword" className="show-password">
                Show Passwords
              </label>
            </div>
            {searchedPasswordsList.length > 0 ? (
              <ul className="password-items-list">
                {searchedPasswordsList.map(eachDetails => (
                  <PasswordItems
                    key={eachDetails.id}
                    passwordDetails={eachDetails}
                    showPasswords={showPasswords}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  className="no-passwords-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
