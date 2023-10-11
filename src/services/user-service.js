const { StatusCode } = require("http-status-codes");
const { UserRepository } = require("../repositories/index");
const { ClientError } = require("../utils/errors");
const ValidationError = require("../utils/errors/validation-error");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  signup = async (data) => {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "ValidationError") {
        throw new ValidationError({
          errors: error.errors,
          message: error.message,
        });
      }
      throw error;
    }
  };

  signin = async (data) => {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new ClientError(
          {
            message: "Invalid data sent from the client",
            explanation: "No registered user for the given email",
          },
          StatusCode.NOT_FOUND
        );
      }
      const passwordMatch = user.comparePassword(data.password);
      if (!passwordMatch) {
        throw new ClientError({
          message: "Invalid data sent from the client",
          explanation: "Password given is not correct, please try again!",
        });
      }
      const jwtToken = user.generateJWT();
      return {
        token: jwtToken,
        username: user.username,
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
