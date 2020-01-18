import ImageRepository from "../repository/imageRepository";

class ImageService {
  async get() {
    return await ImageRepository.find({});
  }

  async getByIdEmail(_id,email) {
    return await ImageRepository.findOne({_id, email});
  }

  async getById(_id) {
    return await ImageRepository.findById(_id);
  }

  async create(images) {
    return await ImageRepository.create(images);
  }

  async update(_id, images) {
    return await ImageRepository.findByIdAndUpdate(_id, images);
  }

  async delete(_id) {
    return await ImageRepository.findByIdAndRemove(_id);
  }
}

export default new ImageService();
