class FileController {
  async main(req, res) {
    const objResponse = req.file;

    objResponse.photoUrl = `${process.env.CDN_URL}/${req.file.key}`;

    return res.status(201).json(objResponse);
  }
}

module.exports = new FileController();
