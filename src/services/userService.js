import axios from 'axios'
import { SERVER_URL } from '../config'

export default class UserService {
  static instance = undefined
  email = ''
  pseudo = ''
  firstName = ''
  lastName = ''
  token = ''
  constructor() {
    if (UserService.instance !== undefined) {
      throw new Error('Constructor call more than one time !')
    }
  }
  static getInstance = () => {
    if (UserService.instance === undefined) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }
  authenticate = async (email, password) => {
    let res
    const req = {
      password: password,
      email: email
    }
    try {
      const res = await axios.post(`${SERVER_URL}/UserEnigmators/login`, req)
      return true
    } catch (err) {
      switch (err.response.status) {
        case 401:
          console.error('Bad credential')
          break
        case 404:
          console.error("User doesn't exist")
          break
        default:
          console.error('error')
      }
    }
  }
}
