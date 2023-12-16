import dotenv from "dotenv";

dotenv.config();

const obj = {
  mongo_uri: process.env.MONGO_URI,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  jwt_secret: process.env.JWT_SECRET,
};

export default obj;
