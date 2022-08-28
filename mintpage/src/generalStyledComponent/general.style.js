import styled from "styled-components";

export const MainSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  width: -webkit-fill-available;
`;

export const Container = styled.div``;
export const BackGroundImage = styled.img`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: 100% 0;
  object-position: 0 100%;
  opacity: 0.9;
`;

export const Block = styled.div`
  width: -webkit-fill-available;
  padding: 10px 20px;
`;
export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Content = styled.a`
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 3px;
  backdrop-filter: blur(10px);
  font-weight: 700;
`;
export const ContentBlurLess = styled.a`
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 3px;
  font-weight: 700;
`;

export const Button = styled.button`
  padding: 6px 20px;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 1px;
  border-radius: 3px;
  backdrop-filter: blur(10px);

  &:hover {
    opacity: 1;
    transition: 0.2s;
  }
`;
