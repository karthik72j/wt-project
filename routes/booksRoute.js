import express from "express";
import { Book } from "../models/bookModel.js";
import { authorizeBookOwner } from "../middleware/auth.js";

const router = express.Router();

// Route for save a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, and description!",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      description: request.body.description,
      userId: request.user._id, // Add the authenticated user's ID
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get all books from db
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.lenght,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get books from db by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id).populate('reviews.user', 'email');
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", authorizeBookOwner, async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, and description!",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).json({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete a book
router.delete("/:id", authorizeBookOwner, async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for adding a review to a book
router.post("/:id/review", async (request, response) => {
  try {
    const { id } = request.params;
    const { comment, rating } = request.body;

    if (!comment || !rating || rating < 1 || rating > 5) {
      return response.status(400).json({
        message: "Please provide a comment and a rating between 1 and 5 stars",
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Add the review
    const newReview = {
      user: request.user._id,
      userName: request.user.email, // Using email as username for simplicity
      comment,
      rating: Number(rating),
      date: new Date(),
    };

    book.reviews.push(newReview);

    // Calculate new average rating
    const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = totalRating / book.reviews.length;

    await book.save();

    return response.status(201).json({
      message: "Review added successfully",
      review: newReview,
      averageRating: book.averageRating,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
