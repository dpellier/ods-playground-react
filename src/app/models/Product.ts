import defaultImageUrl from 'assets/images/default-image.webp'

type ProductCategory = 'beauty' | 'fragrances' | 'furniture' | 'groceries'

type ProductApiData = {
  brand?: string
  category: ProductCategory
  description: string
  discountPercentage?: number
  id: number
  images: string[]
  price: number
  rating?: number
  stock?: number
  thumbnail: string
  title: string
}

type ProductProps = {
  category: ProductCategory
  description: string
  id: number
  images: string[]
  price: number
  restockDate?: Date
  restockTime?: string
  thumbnail: string
  title: string
}

class Product {
  category: ProductCategory
  description: string
  id: number
  images: string[]
  price: number
  restockDate?: Date
  restockTime?: string
  thumbnail: string
  title: string

  constructor(props: ProductProps) {
    this.category = props.category
    this.description = props.description
    this.id = props.id
    this.images = props.images || []
    this.price = props.price
    this.restockDate = props.restockDate
    this.restockTime = props.restockTime
    this.thumbnail = props.thumbnail || defaultImageUrl
    this.title = props.title
  }

  static fromApi(props: ProductApiData): Product {
    return new Product({
      category: props.category,
      description: props.description,
      id: props.id,
      images: props.images,
      price: props.price,
      restockDate: undefined,
      restockTime: undefined,
      thumbnail: props.thumbnail,
      title: props.title,
    })
  }

  toApi(): Omit<ProductApiData, 'id'> {
    return {
      category: this.category,
      description: this.description,
      images: this.images,
      price: this.price,
      thumbnail: this.thumbnail,
      title: this.title,
    }
  }
}

export type {
  ProductApiData,
  ProductProps,
}
export { Product }
