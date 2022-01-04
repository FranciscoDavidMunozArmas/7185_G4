import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import { multerPart } from '../../config/multer.product.config';
import * as Controller from '../controller/product.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getProducts)
.post(authUser, multerPart.single("imagePart"), Controller.createProduct)
.delete(authUser, Controller.deleteProducts);

router.route("/:id")
.get(authUser, Controller.getProductById)
.put(authUser, multerPart.single("imagePart"), Controller.updateProduct)
.delete(authUser, Controller.deleteProductById);

export default router;