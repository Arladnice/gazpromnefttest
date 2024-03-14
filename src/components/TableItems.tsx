import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IData } from '../types/dataType';
import { ColumnsType } from 'antd/es/table';
import { setSelectedData } from '../store/dataSlice';
import { openModal } from '../store/modalSlice';
import styled from 'styled-components';

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    height: 30px;
`;

const columns: ColumnsType<IData> = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: IData, b: IData) => a.name.localeCompare(b.name),
    },
    {
        title: 'Количество',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a: IData, b: IData) => a.quantity - b.quantity,
    },
    {
        title: 'Дата доставки',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        sorter: (a: IData, b: IData) =>
            new Date(a.deliveryDate).getTime() -
            new Date(b.deliveryDate).getTime(),
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        key: 'price',
        sorter: (a: IData, b: IData) => a.price - b.price,
    },
    {
        title: 'Валюта',
        dataIndex: 'currency',
        key: 'currency',
        sorter: (a: IData, b: IData) => a.currency.localeCompare(b.currency),
    },
];

const TableItems: React.FC = () => {
    const dataSource = useSelector((state: RootState) => state.data.data);
    const [total, setTotal] = useState(0);
    const [selectedRows, setSelectedRows] = useState<IData[]>([]);
    const dispatch = useDispatch();

    const rowSelection = useMemo(
        () => ({
            onChange: (
                _selectedRowKeys: React.Key[],
                selectedRows: IData[],
            ) => {
                setSelectedRows(selectedRows);
            },
        }),
        [],
    );

    const handleClick = useCallback(() => {
        dispatch(setSelectedData(selectedRows));
        dispatch(openModal());
    }, [dispatch, selectedRows]);

    useEffect(() => {
        if (selectedRows.length !== 0) {
            const sum = selectedRows.reduce(
                (sum: number, row: IData) => sum + row.quantity,
                0,
            );
            setTotal(sum);
        } else {
            setTotal(0);
        }
    }, [selectedRows]);

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey='id'
                rowSelection={rowSelection}
            />
            <Box>
                <Typography.Text strong>
                    Общее количество: {total}
                </Typography.Text>
                {total > 0 && (
                    <Button type='primary' onClick={handleClick}>
                        Аннулировать
                    </Button>
                )}
            </Box>
        </>
    );
};

export default TableItems;
