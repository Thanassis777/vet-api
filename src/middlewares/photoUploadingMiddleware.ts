import multer, { StorageEngine } from 'multer';
import sharp from 'sharp';
import AppError from '../utils/appError';
import { StatusCodes } from '../constants/statusCodes';
import { catchAsyncError } from './catchAsyncError';
import { UserTypes } from '../constants/userTypes';
import { Request, Response, NextFunction } from 'express';

/*

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/vet');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

 */

interface MulterRequest extends Request {
  user: {
    id: string;
    userType: UserTypes;
  };
  files: {
    imageProfile: Express.Multer.File[];
    images: Express.Multer.File[];
  };
  body: {
    imageProfile: string;
    images: string[];
  };
}

//  save image in memory as a buffer
const multerStorage: StorageEngine = multer.memoryStorage();

// filter only type: image to be acceptable
const multerFilter = (req: Request, file: Express.Multer.File, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(AppError('Not an image!Please upload only images', StatusCodes.NOT_FOUND), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// middleware for uploading images
export const uploadUserImages = upload.fields([
  { name: 'imageProfile', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// upload.single('imageProfile'); --> single image
// upload.array('imageProfile', 5); --> multiple images with maxCount: 5

// middleware for processing images
export const resizeUserImages = catchAsyncError(async (req: MulterRequest, res: Response, next: NextFunction) => {
  const { id, userType } = req.user;
  const userFolder = userType === UserTypes.vet ? 'vet' : 'client';

  if (!req.files.imageProfile || !req.files.images) return next();

  // Profile image, set this field for persistence later in DB
  req.body.imageProfile = `${userFolder}-${id}-${Date.now()}-profile.jpeg`;

  await sharp(req.files.imageProfile[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 }) // percentage of quality
    .toFile(`public/img/${userFolder}/${req.body.imageProfile}`);

  // Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `${userFolder}-${id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/${userFolder}/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});
