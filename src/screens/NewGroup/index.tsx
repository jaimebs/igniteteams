import React, { useState } from "react";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";
import { Alert, Text } from "react-native";
import * as yup from "yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  groupName: yup
    .string()
    .required("O nome do grupo é obrigatório!")
    .min(3, "Tem que ser no mínimo 3 caracteres!"),
});

export default function NewGroup() {
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleNewGroup(formData: FieldValues) {
    try {
      await groupCreate(formData.groupName.trim());
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
        <Controller
          control={control}
          name="groupName"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome da turma"
              value={value}
              onChangeText={onChange}
              error={errors.groupName?.message}
            />
          )}
        />

        <Button title="Criar" onPress={handleSubmit(handleNewGroup)} />
      </Content>
    </Container>
  );
}
