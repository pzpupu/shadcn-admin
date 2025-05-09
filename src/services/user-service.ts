import { CreateUserForm, User } from "@/features/users/data/schema"
import { BaseCrudService } from "./base-curd-service"


class UserService extends BaseCrudService<User, CreateUserForm> {
  constructor() {
    super('users')
  }
}

export const userService = new UserService()