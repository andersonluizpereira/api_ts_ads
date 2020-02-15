import UserRepository from "../repository/userRepository";
import { isEmail } from "validator";

class UserService {

  async hasValidEmail(user) {
    return await isEmail(user.email);
  }

  async search(user) {
    return await UserRepository.find({email: user.email});
  }
  
  async login(user) {
    return await UserRepository.find({
      'email': user.email,
      'password': user.password
    });
  }

  async create(user) {
    user.createdAt = new Date()
    user.updatedAt = new Date()
    return await UserRepository.create(user);
  }

  async update(_id, user) {
    user.updatedAt = new Date()
    return await UserRepository.findByIdAndUpdate(_id, user);
  }

  async delete(_id) {
    return await UserRepository.findByIdAndRemove(_id);
  }
}

export default new UserService();
