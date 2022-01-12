const { addBookHandler, getAllBookHandler, getBookById, updateBook, deleteBook } = require("./handler");

const routes = [
	{
		method: "POST",
		path: "/books",
		handler: addBookHandler,
	},
	{
		method: "GET",
		path: "/books",
		handler: getAllBookHandler,
	},
	{
		method: "GET",
		path: "/books/{bookId}",
		handler: getBookById,
	},
	{
		method: "PUT",
		path: "/books/{bookId}",
		handler: updateBook,
	},
	{
		method: "DELETE",
		path: "/books/{bookId}",
		handler: deleteBook,
	},
];

module.exports = routes;
