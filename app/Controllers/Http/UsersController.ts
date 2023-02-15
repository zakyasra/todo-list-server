import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {
  public async register({ response, request }: HttpContextContract) {
    const { email, password, nama } = request.body();

    const check = await User.query()
      .where({ email })
      .andWhere("dihapus", 0)
      .first();

    if (check) {
      return response.abort({ message: "Email sudah terdaftar" });
    }

    await User.create({
      nama,
      password,
      email,
    });

    return response.ok({ message: "Akun berhasil dibuat" });
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.body();

    const check = await User.query()
      .where({ email })
      .andWhere("dihapus", 0)
      .first();

    if (!check) {
      return response.abort({ message: "Akun belum terdaftar" });
    }

    const passwords = await Hash.verify(check.password, password);

    if (!passwords) {
      return response.abort("Password yang anda masukkan salah");
    }

    return auth.attempt(email, password);
  }

  public async profile({ auth }: HttpContextContract) {
    return await auth.authenticate();
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
