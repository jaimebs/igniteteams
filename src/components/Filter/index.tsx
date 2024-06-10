import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title, FilterStyledProps } from "./styles";

type Props = TouchableOpacityProps &
  FilterStyledProps & {
    title: string;
  };

export default function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
