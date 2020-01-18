import UserRepository from "../repository/userRepository";

class UserService {

  async login(user) {
    return await UserRepository.findOne({
      'email': user.email,
      'password': user.password
    });
  }

  async create(user) {
    user.createdAt = new Date()
    user.updatedAt = new Date()
    user.active = true
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
