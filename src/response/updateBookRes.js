const nameUpdateError = {
	status: "fail",
	message: "Gagal memperbarui buku. Mohon isi nama buku",
};

const readPageUpdateError = {
	status: "fail",
	message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
};
const updateCompleate = {
	status: "success",
	message: "Buku berhasil diperbarui",
};
const updateFailed = {
	status: "fail",
	message: "Gagal memperbarui buku. Id tidak ditemukan",
};
module.exports = { nameUpdateError, readPageUpdateError, updateCompleate, updateFailed };
