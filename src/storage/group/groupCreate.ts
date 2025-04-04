import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { getAllGroups } from "./getAllGroups";
import { AppError } from "../../utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome!");
    }

    const groups = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
  } catch (error) {
    throw error;
  }
}
