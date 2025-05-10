import { User } from "@/features/users/data/schema"
import { BaseCrudService } from "./base-curd-service"



class UserService<T> extends BaseCrudService<T> {
  constructor() {
    super('users')
  }
}

export const userService = new UserService<User>()