import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import TableItems from '../components/TableItems';
import { store } from '../store';

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };

describe('TableItems Component', () => {
    it('renders table correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TableItems />
            </Provider>,
        );
        expect(getByText('Имя')).toBeInTheDocument();
        expect(getByText('Количество')).toBeInTheDocument();
        expect(getByText('Дата доставки')).toBeInTheDocument();
        expect(getByText('Цена')).toBeInTheDocument();
        expect(getByText('Валюта')).toBeInTheDocument();
    });
});
