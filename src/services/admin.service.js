import { $axios } from "../api";

class adminService {
  async getAllUsers() {
    return await $axios.get("/admin");
  }
  async updateUserInfo(
    login,
    password,
    email,
    name,
    patronymic,
    surname,
    isConfirmed,
    isAdmin
  ) {
    try {
      const { data } = await $axios.post("/admin/createUser", {
        login,
        password,
        email,
        name,
        patronymic,
        surname,
        isConfirmed,
        isAdmin,
      });
      if (data.token) Cookies.set(TOKEN, data.token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new adminService();
