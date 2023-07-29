import { styled } from "styled-components";
import Center from "./Center";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    // max-width allows the image to be responsive
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>Pro anywhere</Title>
              <Desc>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                porro.t
              </Desc>
            </div>
          </Column>
          <Column>
            <img src="https://ryusaem-next-ecommerce.s3.amazonaws.com/1689971782705.jpg"></img>
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}
