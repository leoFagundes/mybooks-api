import user from "../models/User.js";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

const randomPdfName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

class UserController {
  static async getUsers(req, res) {
    try {
      const getUsers = await user.aggregate([
        {
          $addFields: {
            normalizedUsername: { $toLower: "$username" },
          },
        },
        {
          $sort: { normalizedUsername: 1 },
        },
      ]);
      res.status(200).json(getUsers);
    } catch (error) {
      res.status(500).json({ message: `${error} - failed to fetch users.` });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      res.status(200).json(userFound);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error} - failed to fetch user by id.` });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await user.create(req.body);
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error} - failed to create a new user.` });
    }
  }

  static async createPdfLink(req, res) {
    try {
      const { userName } = req.body;
      const { originalname, buffer, mimetype } = req.file;
      const randomString = randomPdfName();
      const pdfExtension = ".pdf";

      const fileNameWithoutExt = originalname.replace(pdfExtension, "");

      const pdfName = `${userName}/${fileNameWithoutExt}${randomString}${pdfExtension}`;

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: pdfName,
        Body: buffer,
        ContentType: mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);

      res.status(200).json({
        message: `https://mybooks-repositorie.s3.amazonaws.com/${pdfName}`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error} - failed to create a new pdf link.` });
    }
  }

  static async deletePdf(req, res) {
    try {
      const { pdfName } = req.body;
      console.log(pdfName);

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: pdfName,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      res.status(200).json({
        message: `Pdf ${pdfName} successfully deleted`,
      });
    } catch (error) {
      res.status(500).json({ message: `${error} - failed to delete the pdf.` });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - failed to update user.` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - failed to delete user.` });
    }
  }
}

export default UserController;
