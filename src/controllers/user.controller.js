import userService from "../services/User.service.js";
import { customResponse } from "../utils/utils.js";

async function deleteCurrentUser(req, res, next) {
  //controller:✓
  try {
    const uid = req.user.id;

    req.logout(async function (err) {
      if (err) {
        return next(err);
      }
    });

    await userService.deleteById(uid);

    return customResponse(res, 200, "Usuario eliminado exitosamente");
  } catch (error) {
    next(error);
  }
}

async function updateCurrentUser(req, res, next) {
  //controller:✓
  try {
    const uid = req.user.id;

    if (req.file) {
      req.body = {
        ...req.body,
        ...{
          url_profile_photo: req.file.url,
          profile_public_id: req.file.publicId,
        },
      };
    }

    await userService.updateById(uid, req.body);

    return customResponse(res, 200, "Usuario actualizado exitosamente");
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  //controller:✓
  try {
    const { email } = req.body;

    await userService.forgotPassword(email);

    return customResponse(
      res,
      200,
      "Email enviado. Vaya a su cuenta de correo electrónico para cambiar su contraseña"
    );
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  //controller:✓
  try {
    const { token } = req.params;
    const { password } = req.body;

    await userService.resetPassword(token, password);

    return customResponse(res, 200, "Contraseña cambiada exitosamente");
  } catch (error) {
    next(error);
  }
}
export { deleteCurrentUser, updateCurrentUser, forgotPassword, resetPassword };
