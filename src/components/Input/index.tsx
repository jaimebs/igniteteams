import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container, ErrorMessage } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
  error?: string;
};

export default function Input({ inputRef, error, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <>
      <Container
        ref={inputRef}
        placeholderTextColor={COLORS.GRAY_500}
        error={!!error}
        {...rest}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </>
  );
}
