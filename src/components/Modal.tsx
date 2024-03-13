import { Modal as ModalAntd, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { removeSelectedData, setSelectedData } from '../store/dataSlice';
import { CANCEL_URL } from '../utils/constants';
import type { IData } from '../types/dataType';
import type { RootState } from '../store';
import axios from 'axios';

export const Modal: React.FC = () => {
    const modalIsOpened = useSelector(
        (state: RootState) => state.modal.modalIsOpened,
    );
    const selectedData = useSelector(
        (state: RootState) => state.data.selectedData,
    );
    const dispatch = useDispatch();

    const handleConfirm = () => {
        const ids = selectedData.map((item: IData) => item.id);

        const fetchData = async () => {
            try {
                const response = await axios.post(`${CANCEL_URL}/cancel`, ids, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Данные успешно отправлены', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        dispatch(closeModal());
        dispatch(setSelectedData([]));
    };

    const handleCancel = () => {
        dispatch(removeSelectedData());
        dispatch(closeModal());
    };

    const getItemsList = () => {
        return selectedData.map((item: IData) => item.name).join(', ');
    };

    return (
        <>
            <ModalAntd
                title={`Вы уверены что хотите аннулировать ${
                    selectedData.length > 1 ? 'товары' : 'товар'
                }:`}
                centered
                open={modalIsOpened}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText='Применить'
                cancelText='Отклонить'
            >
                <Typography.Text>{getItemsList()}</Typography.Text>
            </ModalAntd>
        </>
    );
};
