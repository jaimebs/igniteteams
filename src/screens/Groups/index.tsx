import { useCallback, useState } from "react";
import { Container } from "./styles";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import GroupCard from "../../components/GroupCard";
import { FlatList } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import Button from "../../components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAllGroups } from "../../storage/group/getAllGroups";
import { setGroupName } from "../../features/group/groupSlice";
import { useAppDispatch } from "../../features/store";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();

  function handleNewGroup() {
    navigate("new");
  }

  function handleOpenPlayersGroup(group: string) {
    dispatch(setGroupName(group));

    navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenPlayersGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
