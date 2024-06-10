import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 0 24px 10px 24px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Icon = styled(FontAwesome).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 38,
}))`
  align-self: center;
`;
