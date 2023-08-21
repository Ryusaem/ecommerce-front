import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default function CartPage() {
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>1</Box>
          <Box>2</Box>
        </ColumnWrapper>
      </Center>
    </>
  );
}
