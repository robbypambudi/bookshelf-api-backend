const { nanoid } = require("nanoid");
const bookshelf = require("./books");
const { handlerNameError, handlerReadError, handlerError } = require("./response/addBookHandlerRes");
const { getBookByIdErr } = require("./response/getBookRes");
const { nameUpdateError, readPageUpdateError, updateFailed, updateCompleate } = require("./response/updateBookRes");
const { deleteIdFailed, deleteSuccess } = require("./response/deleteBookRes");

const addBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

	const id = nanoid(16);
	const finished = pageCount === readPage ? true : false;

	if (name === null || name === undefined || name === "") {
		const response = h.response(handlerNameError);
		response.code(400);
		return response;
	} else if (readPage > pageCount) {
		const response = h.response(handlerReadError);
		response.code(400);
		return response;
	}

	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};
	bookshelf.push(newBook);
	const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		const response = h.response({
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response(handlerError);
	response.code(500);
	return response;
};

const getAllBookHandler = (request, h) => {
	const { name, reading, finished } = request.query;

	if (name) {
		let bookname = bookshelf.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));

		const response = h.response({
			status: "success",
			data: {
				books: bookname.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	if (reading) {
		let bookreading = bookshelf.filter((book) => Number(book.reading) == reading);

		const response = h.response({
			status: "success",
			data: {
				books: bookreading.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	if (finished) {
		let bookfinished = bookshelf.filter((book) => Number(book.finished) == finished);
		const response = h.response({
			status: "success",
			data: {
				books: bookfinished.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: "success",
		data: {
			books: bookshelf.map((book) => ({
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			})),
		},
	});
	response.code(200);
	return response;
};

const getBookById = (request, h) => {
	const { bookId } = request.params;
	const idAvaible = bookshelf.filter((book) => book.id === bookId)[0];
	// console.log(idAvaible);
	if (idAvaible) {
		const response = h.response({
			status: "success",
			data: {
				book: idAvaible,
			},
		});
		response.code(200);
		return response;
	}
	const response = h.response(getBookByIdErr);
	response.code(404);
	return response;
};

const updateBook = (request, h) => {
	const { bookId } = request.params;
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	if (name === undefined || name === null || name === "") {
		const response = h.response(nameUpdateError);
		response.code(400);
		return response;
	}
	if (readPage > pageCount) {
		const response = h.response(readPageUpdateError);
		response.code(400);
		return response;
	}
	const index = bookshelf.findIndex((book) => book.id === bookId);
	const updatedAt = new Date().toISOString();
	let finished;
	if (pageCount === readPage) {
		finished = true;
	} else {
		finished = false;
	}
	if (index !== -1) {
		bookshelf[index] = {
			...bookshelf[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			finished,
			updatedAt,
		};

		const response = h.response(updateCompleate);
		response.code(200);
		return response;
	}
	const response = h.response(updateFailed);
	response.code(404);
	return response;
};

const deleteBook = (request, h) => {
	const { bookId } = request.params;
	const index = bookshelf.findIndex((book) => book.id === bookId);
	if (index !== -1) {
		bookshelf.splice(index, 1);
		const response = h.response(deleteSuccess);
		response.code(200);
		return response;
	}
	const response = h.response(deleteIdFailed);
	response.code(404);
	return response;
};
module.exports = { addBookHandler, getAllBookHandler, getBookById, updateBook, deleteBook };
