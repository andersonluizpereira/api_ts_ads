import NewsRepository from "../repository/newsRepository";

class NewsService {
  get() {
    return NewsRepository.find({});
  }

  getByIdEmail(_id,email) {
    return NewsRepository.findOne({_id, email});
  }

  getById(_id) {
    return NewsRepository.findById(_id);
  }

  create(news) {
    return NewsRepository.create(news);
  }

  update(_id, news) {
    return NewsRepository.findByIdAndUpdate(_id, news);
  }

  delete(_id) {
    return NewsRepository.findByIdAndRemove(_id);
  }
}

export default new NewsService();
