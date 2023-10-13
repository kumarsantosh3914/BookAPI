const logger = require("../config/logger");
const Book = require("../models/book");
const User = require("../models/user");
const UserBookRating = require("../models/user-book-rating");
const CrudRepository = require("./crud-repository");

class BookRepository extends CrudRepository {
  constructor() {
    super(Book);
  }

  get = async (id) => {
    try {
      const result = await this.model
        .findById(id)
        .populate("author genres")
        .lean();
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };

  getAll = async () => {
    try {
      const result = await this.model.find({}).populate("genres author").lean();
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };

  getBookRatingByAUser = async (bookId, userId) => {
    try {
      const rating = await UserBookRating.findOne({
        bookId: bookId,
        userId: userId,
      });
      return rating;
    } catch (error) {
      logger.error("Something went wrong in Book Repository", error);
      throw error;
    }
  };

  getTotalBookRatings = async (bookId) => {
    try {
      const ratings = await UserBookRating.find({
        bookId: bookId,
      }).select("id");
      if (!ratings) return 0;
      return ratings.length;
    } catch (error) {
      logger.error("Something went wrong in Book Repository", error);
      throw error;
    }
  };

  addUserRating = async (bookId, userId, rating) => {
    try {
      const userRating = await UserBookRating.create({
        bookId: bookId,
        userId: userId,
        rating: rating,
      });
      return userRating;
    } catch (error) {
      logger.error("Something went wrong in Book Repository", error);
      throw error;
    }
  };

  updateUserRating = async (bookId, userId, rating) => {
    try {
      const userRating = await UserBookRating.findOneAndUpdate(
        {
          bookId: bookId,
          userId: userId,
        },
        { rating: rating }
      );
      return userRating;
    } catch (error) {
      logger.error("Something went wrong in Book Repository", error);
      throw error;
    }
  };
}

module.exports = BookRepository;
