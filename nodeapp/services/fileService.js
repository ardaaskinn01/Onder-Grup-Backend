const minioClient = require('../utils/minioClient');
const FileMetadata = require('../models/fileMetadata'); // Modeli içe aktarın

const uploadFile = async (file) => {
  const bucketName = 'uploads';
  const metaData = {
    'Content-Type': file.mimetype,
  };

  const fileName = Date.now() + '-' + file.originalname;

  // Dosyayı MinIO'ya yükle
  await minioClient.putObject(bucketName, fileName, file.buffer, metaData);

  // Dosya meta verilerini veritabanına kaydet
  const fileRecord = await FileMetadata.create({
    file_name: fileName,
    original_name: file.originalname,
    size: file.size,
    mime_type: file.mimetype,
  });

  return { fileName: fileRecord.file_name };
};

const downloadFile = async (fileName) => {
  const bucketName = 'uploads';

  // Dosya meta verilerini veritabanından al
  const fileRecord = await FileMetadata.findOne({
    where: { file_name: fileName },
  });

  if (!fileRecord) {
    throw new Error('File not found');
  }

  const dataStream = await minioClient.getObject(bucketName, fileName);
  return dataStream;
};

module.exports = { uploadFile, downloadFile };