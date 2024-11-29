import { formatDate, parseDate } from 'app/helpers/date'

enum USER_ROLE {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
}

const USER_BIRTH_DATE_FORMAT = 'yyyy-mm-dd'
const USER_ROLES = Object.freeze(Object.keys(USER_ROLE))

type UserApiData = {
  birthDate: string
  email: string
  firstName: string
  id: number
  image: string
  ip: string
  lastName: string
  phone: string
  role: USER_ROLE
}

type UserProps = {
  birthDate: Date
  email: string
  firstName: string
  id: number
  image: string
  ip: string
  lastName: string
  phone: string
  role: USER_ROLE
}

class User {
  birthDate: Date
  email: string
  firstName: string
  id: number
  image: string
  ip: string
  lastName: string
  phone: string
  role: USER_ROLE

  constructor(props: UserProps) {
    this.birthDate = props.birthDate
    this.email = props.email
    this.firstName = props.firstName
    this.id = props.id
    this.image = props.image
    this.ip = props.ip
    this.lastName = props.lastName
    this.phone = props.phone
    this.role = props.role
  }

  static fromApi(props: UserApiData): User {
    return new User({
      birthDate: parseDate(props.birthDate, USER_BIRTH_DATE_FORMAT),
      email: props.email,
      firstName: props.firstName,
      id: props.id,
      image: props.image,
      ip: props.ip,
      lastName: props.lastName,
      phone: props.phone,
      role: props.role,
    })
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  toApi(): Omit<UserApiData, 'id'> {
    return {
      birthDate: formatDate(this.birthDate, USER_BIRTH_DATE_FORMAT),
      email: this.email,
      firstName: this.firstName,
      image: this.image,
      ip: this.ip,
      lastName: this.lastName,
      phone: this.phone,
      role: this.role,
    }
  }
}

export type {
  UserApiData,
  UserProps,
}
export {
  USER_BIRTH_DATE_FORMAT,
  USER_ROLE,
  USER_ROLES,
  User,
}
