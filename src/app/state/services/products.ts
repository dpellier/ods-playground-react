import { config } from 'app/config'
import { erase, get, post, put } from 'app/helpers/http'
import { Product } from 'app/models/Product'

async function count() {
  return get(`${config.api.products}?limit=1&select=id`)
    .then(({ total }) => total)
}

async function create(product: Product) {
  return post(`${config.api.products}/add`, product.toApi())
    .then(Product.fromApi)
}

async function deleteProduct(id: number) {
  return erase(`${config.api.products}/${id}`)
    .then(() => id)
}

async function fetch(id: number) {
  return get(`${config.api.products}/${id}`)
    .then(Product.fromApi)
}

async function list(page = 0, perPage = 10) {
  const skip = Math.max(0, (page - 1) * perPage)

  return get(`${config.api.products}?skip=${skip}&limit=${perPage}`)
    .then(({ products, total }) => ({
      count: total,
      products: (products || []).map(Product.fromApi),
    }))
}

async function update(product: Product) {
  return put(`${config.api.products}/${product.id}`, product.toApi())
    .then(Product.fromApi)
}

export {
  create,
  count,
  deleteProduct,
  fetch,
  list,
  update,
}
