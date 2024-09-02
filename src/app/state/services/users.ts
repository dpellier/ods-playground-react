import { config } from 'app/config'
import { get, post, put } from 'app/helpers/http'
import { User } from 'app/models/User'

async function count() {
  return get(`${config.api.users}?limit=1&select=id`)
    .then(({ total }) => total)
}

async function create(user: User) {
  return post(`${config.api.users}/add`, user.toApi())
    .then(User.fromApi)
}

async function fetch(id: number) {
  return get(`${config.api.users}/${id}`)
    .then(User.fromApi)
}

async function list(page = 0, perPage = 10) {
  const skip = Math.max(0, (page - 1) * perPage)

  return get(`${config.api.users}?skip=${skip}&limit=${perPage}`)
    .then(({ users, total }) => ({
      count: total,
      users: (users || []).map(User.fromApi),
    }))
}

async function update(user: User) {
  return put(`${config.api.users}/${user.id}`, user.toApi())
    .then(User.fromApi)
}

export {
  count,
  create,
  fetch,
  list,
  update,
}
