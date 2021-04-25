import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

// Regras de negócio agora dentro do Service
class SettingsService {

  async create({ chat, username } : ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    // Select * from settings where username = "username" limit 1
    const userAlreadyExists = await settingsRepository.findOne({
      username
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService }