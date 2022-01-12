const handlerNameError = {
	status: "fail",
	message: "Gagal menambahkan buku. Mohon isi nama buku",
};
const handlerReadError = {
	status: "fail",
	message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
};

const handlerError = {
	status: "error",
	message: "Buku gagal ditambahkan",
};
module.exports = { handlerNameError, handlerReadError, handlerError };
