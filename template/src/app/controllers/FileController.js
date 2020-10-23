class FileController {
  async main(req, res) {
    const objResponse = req.photo;

    objResponse.photoUrl = `${process.env.CDN_URL}/${req.photo.key}`;

    return res.status(201).json(req.photo);
  }
}

module.exports = new FileController();
