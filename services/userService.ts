import UserRepository from "../repository/userRepository";

class UserService {

  login(user) {
    return UserRepository.findOne({
      'email': user.email,
      'password': user.password
    });
  }

  create(user) {
    user.createdAt = new Date()
    user.updatedAt = new Date()
    user.active = true
    return UserRepository.create(user);
  }

  update(_id, user) {
    user.updatedAt = new Date()
    return UserRepository.findByIdAndUpdate(_id, user);
  }

  delete(_id) {
    return UserRepository.findByIdAndRemove(_id);
  }
}

export default new UserService();
