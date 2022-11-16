import { Router } from "express";
import {
  viewLoginController,
  viewMenuController,
  viewRegisterController,
  viewIndexController,
  viewCartController,
  viewErrorLoginController,
  viewErrorRegisterController,
  viewEnterProductController,
  viewModifiedProductController
} from "../controllers/views.controllers.js";

const router = new Router();

router.get("/", viewIndexController);

router.get("/register", viewRegisterController);

router.get("/login", viewLoginController);

router.get("/menu", viewMenuController);

router.get("/cart", viewCartController);

router.get('/errorlogin', viewErrorLoginController);

router.get('/errorregister', viewErrorRegisterController);

router.get('/enterproduct', viewEnterProductController);

router.get('/modifiedproduct', viewModifiedProductController);

export default router;
