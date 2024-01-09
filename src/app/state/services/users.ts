import { config } from 'app/config'
import { get } from 'app/helpers/http'

async function count() {
  return get(`${config.api.users}?limit=1&select=id`)
    .then(({ total }) => total)
}

export {
  count,
}
