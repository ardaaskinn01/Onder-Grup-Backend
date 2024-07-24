const fileService = require('../services/fileService');
const FileMetadata = require('../models/fileMetadata'); // Modeli içe aktarın

const uploadFile = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: 'No file provided for upload.' });
  }

  try {
    // Dosya adının zaten veritabanında olup olmadığını kontrol et
    const existingFile = await FileMetadata.findOne({
      where: { original_name: file.originalname },
    });

    if (existingFile) {
      return res.status(409).send({ error: 'A file with this name already exists. Please rename your file and try again.' });
    }

    // Dosyayı yükle ve meta verilerini kaydet
    const { fileName } = await fileService.uploadFile(file);
    res.status(201).send({ message: 'File uploaded successfully', fileName });
  } catch (error) {
    console.error('Error uploading file:', error);

    // Hata türüne göre farklı mesajlar verebilirsiniz
    if (error.code === 'NoSuchBucket') {
      return res.status(500).send({ error: 'Bucket does not exist. Please check the configuration.' });
    }

    res.status(500).send({ error: 'Failed to upload file. Please try again later.' });
  }
};

const downloadFile = async (req, res) => {
  const { fileName } = req.params;

  try {
    const dataStream = await fileService.downloadFile(fileName);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    dataStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);

    // Özel hata mesajları
    if (error.message === 'File not found') {
      return res.status(404).send({ error: 'File not found. Please check the file name and try again.' });
    }

    res.status(500).send({ error: 'Failed to download file. Please try again later.' });
  }
};

module.exports = { uploadFile, downloadFile };