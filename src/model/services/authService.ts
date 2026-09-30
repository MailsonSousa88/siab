import type { User } from "@/model/entities/user";
import { UserDataSource } from "@/model/repositories/userDataSource";

export class authService {
    private readonly userDataSource: UserDataSource;

    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }

    async login(email: string, pin: number): Promise<User> {
        const usuario = await this.userDataSource.buscarUsuarioPorEmail(email);

        if (!usuario) {
            throw new Error("Esse email não existe no nosso sistema.");
        }

        if (usuario.pin != pin) {
            throw new Error("PIN incorreto, tente novamente!")
        }

        return usuario;
    }
}