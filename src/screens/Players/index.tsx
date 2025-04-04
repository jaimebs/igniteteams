import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";
import Filter from "../../components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import PlayerCard from "../../components/PlayerCard";
import ListEmpty from "../../components/ListEmpty";
import Button from "../../components/Button";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { AppError } from "../../utils/AppError";
import { playersGetByGroup } from "../../storage/player/playersGetByGroup";
import { PlayerStorageDTO } from "../../storage/player/playerStorageDTO";
import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export default function Players() {
  const [listPlayer, setListPlayer] = useState(["time a", "time b"]);

  const [team, setTeam] = useState("time a");

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const [newPlayerName, setNewPlayerName] = useState("");

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  const { navigate } = useNavigation();

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar!"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersTeam = await playerGetByGroupAndTeam(group, team);

      setPlayers(playersTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas filtradas do time selecionado."
      );
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover grupo", "Não foi possível remover");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover!", "Deseja remover o grupo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="adicione a galera e separe por times"
      />

      <Form>
        <Input
          placeholder="nome da pessoa"
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer} //Recurso usado para habilitar o submit do teclado.
          returnKeyType="done" // Habilita qual tecla tera habilitado o submit.
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={listPlayer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={<ListEmpty message="Não há jogadores nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
