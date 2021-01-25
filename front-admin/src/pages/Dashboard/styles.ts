import styled from 'styled-components';
import ContainerResponsive from '../../styles/Container';

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  background-color: ${(props) => props.theme.colors.white};
  padding: 24px 10vw;

  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  line-height: 4.5em;

  @media (min-width: 500px) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

export const Container = styled(ContainerResponsive)``;

export const Section = styled.section`
  margin: auto 10vw;
  margin-top: 36px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 24px;

  @media (min-width: 425px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;
