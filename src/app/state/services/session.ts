import { config } from 'app/config'
import { post } from 'app/helpers/http'
import { deleteSessionToken, setSessionToken } from 'app/helpers/session'

async function signIn(username: string, password: string) {
  return post(config.api.signIn, {
    password,
    username,
  }).then(({ token }) => {
    setSessionToken(token)
  })
}

async function signOut() {
  deleteSessionToken()
  return Promise.resolve()
}

export {
  signIn,
  signOut,
}
