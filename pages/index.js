import Header from "@/components/Header";
import { styled } from "styled-components";

const StyledHeader = styled.header`
  background-color: #222;
`;

export default function HomePage() {
  return (
    <StyledHeader>
      <Header />
    </StyledHeader>
  );
}
