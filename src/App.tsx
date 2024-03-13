import { useDispatch } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { setData } from './store/dataSlice';
import { sortData } from './helpers/sortByPrice';
import { useEffect } from 'react';
import axios from 'axios';
import { Main } from './layout/Main';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = axios.get(`${BASE_URL}/items`);
                const response2 = axios.get(`${BASE_URL}/items2`);

                const [data1, data2] = await Promise.all([
                    response1,
                    response2,
                ]);

                const jsonData = [data1.data, data2.data];

                dispatch(setData(sortData(jsonData.flat())));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Main />
        </>
    );
}

export default App;
