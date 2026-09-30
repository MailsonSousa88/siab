import type { User } from "@/model/entities/user";

export class UserDataSource {
  private readonly usuariosRepository: Array<User> = [
    {
      id: 1,
      name: "Mailson Sousa",
      email: "mailsondev@gmail.com",
      pin: 1234,
    },
  ];

  async buscarUsuarios(): Promise<Array<User>> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return [...this.usuariosRepository];
  }

  async buscarUsuarioPorEmail(email: string): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return this.usuariosRepository.find((u) => u.email == email);
  }
}
