import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

type PropsContainer = {
  error?: boolean;
};

export const Container = styled(TextInput)<PropsContainer>`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};

  border: ${({ theme, error }) =>
    error ? `1px solid ${theme.COLORS.RED}` : "none"};

  flex: 1;
  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;
  padding: 16px;
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED};
  margin-bottom: 10px;
`;
