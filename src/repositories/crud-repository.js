const logger = require("../config/logger");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      logger.error("Something went wrong in crud repository", error);
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const result = await this.model.findByIdAndDelete(id);
      result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };

  get = async (id) => {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };

  getAll = async () => {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repository");
      throw error;
    }
  };
}

module.exports = CrudRepository;
