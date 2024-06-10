import { BackButton, Container, IconBack, Logo } from "./styles";
import LogoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: Props) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("groups");
  }
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <IconBack name="chevron-back" />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
}
