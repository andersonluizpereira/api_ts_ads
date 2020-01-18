import NewsRepository from "../repository/newsRepository";

class NewsService {
  async get() {
    return await NewsRepository.find({});
  }

  async getByIdEmail(_id,email) {
    return await NewsRepository.findOne({_id, email});
  }

  async getById(_id) {
    return await NewsRepository.findById(_id);
  }

  async create(news) {
    return await NewsRepository.create(news);
  }

  async update(_id, news) {
    return await NewsRepository.findByIdAndUpdate(_id, news);
  }

  async delete(_id) {
    return await NewsRepository.findByIdAndRemove(_id);
  }
}

export default new NewsService();
