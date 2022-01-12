const deleteIdFailed = {
	status: "fail",
	message: "Buku gagal dihapus. Id tidak ditemukan",
};
const deleteSuccess = {
	status: "success",
	message: "Buku berhasil dihapus",
};

module.exports = { deleteIdFailed, deleteSuccess };
