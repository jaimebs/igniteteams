import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`;

export const IconBack = styled(Ionicons).attrs(({ theme }) => ({
  size: 28,
  color: theme.COLORS.WHITE,
}))``;
