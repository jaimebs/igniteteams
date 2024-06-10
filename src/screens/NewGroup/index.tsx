import React, { useState } from "react";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";
import { Alert } from "react-native";

export default function NewGroup() {
  const { navigate } = useNavigation();

  const [group, setGroup] = useState("");

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group.trim());
      navigate("groups");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo!");
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon name="group" />
        <Highlight
          title="Nova Turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          style={{ marginBottom: 20 }}
          onChangeText={setGroup}
        />
        <Button title="Criar" onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}
