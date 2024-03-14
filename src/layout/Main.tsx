import styled from 'styled-components';
import TableItems from '../components/TableItems';
import { Modal } from '../components/Modal';

const Layout = styled.main`
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
`;

export const Main: React.FC = () => {
    return (
        <Layout>
            <TableItems />
            <Modal />
        </Layout>
    );
};
