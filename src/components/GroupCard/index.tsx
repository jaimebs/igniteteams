import { Container, Icon, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export default function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name="diversity-3" />
      <Title>{title}</Title>
    </Container>
  );
}
