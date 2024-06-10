import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllGroups } from "./getAllGroups";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await getAllGroups();
    const groups = storedGroups.filter((group) => group !== groupDeleted);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
