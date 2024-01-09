const sessionTokenKey = 'ods-playground-react-session-token'

function deleteSessionToken() {
  localStorage.removeItem(sessionTokenKey)
}

function getSessionToken() {
  return localStorage.getItem(sessionTokenKey)
}

function hasSessionToken() {
  return !!getSessionToken()
}

function setSessionToken(token: string) {
  localStorage.setItem(sessionTokenKey, token)
}

export {
  deleteSessionToken,
  getSessionToken,
  hasSessionToken,
  setSessionToken,
}
