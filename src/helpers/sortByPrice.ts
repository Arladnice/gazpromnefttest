import type { IData } from '../types/dataType';

export const sortData = (arr: IData[]): IData[] => {
    const newArr = [...arr];
    newArr.sort((a, b) => a.price - b.price);

    return newArr.map((el) => {
        const formDate = new Date(el.deliveryDate);
        return {
            ...el,
            deliveryDate: formDate.toDateString(),
        };
    });
};
