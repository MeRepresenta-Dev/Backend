class FileController {
  async main(req, res) {
    const objResponse = req.file;

    objResponse.fileUrl = `${process.env.CDN_URL}/${req.file.key}`;

    return res.status(201).json(req.file);
  }
}

module.exports = new FileController();
