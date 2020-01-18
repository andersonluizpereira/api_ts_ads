import ImageRepository from "../repository/imageRepository";

class ImageService {
  get() {
    return ImageRepository.find({});
  }

  getByIdEmail(_id,email) {
    return ImageRepository.findOne({_id, email});
  }

  getById(_id) {
    return ImageRepository.findById(_id);
  }

  create(images) {
    return ImageRepository.create(images);
  }

  update(_id, images) {
    return ImageRepository.findByIdAndUpdate(_id, images);
  }

  delete(_id) {
    return ImageRepository.findByIdAndRemove(_id);
  }
}

export default new ImageService();
