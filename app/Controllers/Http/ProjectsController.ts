import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "App/Models/Project";

export default class ExamplesController {
  public async index({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate();

    const data = await Project.query()
      .where({ userId: user.id })
      .andWhere("dihapus", 0);

    const todoDone = (
      await Project.query()
        .where({ userId: user.id })
        .where("selesai", 1)
        .andWhere("dihapus", 0)
    ).length;

    const todoProgres = (
      await Project.query()
        .where({ userId: user.id })
        .where("selesai", 0)
        .andWhere("dihapus", 0)
    ).length;

    return response.ok({
      data,
      todoDone,
      todoProgres,
    });
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const { nama } = request.body();

    const data = await Project.create({
      nama,
      userId: user?.id,
    });

    if (data) {
      return response.ok({
        message: "Data berhasil dibuat",
      });
    }

    return response.abort({ message: "Data gagal dibuat" });
  }

  public async update({
    response,
    request,
    auth,
    params: { id },
  }: HttpContextContract) {
    const user = await auth.authenticate();
    const { nama } = request.body();

    const data = await Project.query().where("id", id).update({
      nama,
      userId: user?.id,
    });

    if (data) {
      return response.ok({
        message: "Data berhasil diubah",
      });
    }

    return response.abort({ message: "Data gagal dibuat" });
  }

  public async selesai({
    response,
    request,
    // auth,
    params: { id },
  }: HttpContextContract) {
    // const user = await auth.authenticate();
    const { selesai } = request.body();

    const data = await Project.query().where("id", id).update({
      selesai,
    });

    if (data) {
      return response.ok({
        message: "Data berhasil diubah",
      });
    }

    return response.abort({ message: "Data gagal diubah" });
  }

  public async destroy({ response, params: { id } }: HttpContextContract) {
    const data = await Project.query().where({ id }).update({
      dihapus: 1,
    });

    if (data) {
      return response.ok({
        message: "Data berhasil dihapus",
      });
    }

    return response.abort({ message: "Data gagal dihapus" });
  }
}
