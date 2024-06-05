import React from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import StartPage from './features/pages/start/StartPage';
import RegisterPage from './features/pages/start/RegisterPage';
import StartHeaderModule from './features/modules/headers/StartHeaderModule/StartHeaderModule';
import LoginPage from './features/pages/start/LoginPage';
import MainHeaderModule from './features/modules/headers/MainHeaderModule/MainHeaderModule';
import ProductsPage from './features/pages/main/ProductsPage';
import { useDispatch } from 'react-redux';
import { addPreference } from './store/reducers/preferences';
import GlobalServices from './features/API/global/GlobalServices';
import useFetching from './features/hooks/useFetching';
import { setProductsList } from './store/reducers/products';
import CreateProductPage from './features/pages/main/CreateProductPage';
import ErrorMassage from './features/utils/errorMasage/ErrorMasage';
import UserPage from './features/pages/main/UserPage';

export const RouterContext = React.createContext<any | null>(null);
export const PreferencesContext = React.createContext<any | null>(null);
export const ProductsContext = React.createContext<any | null>(null);

function Router() {

    const router = useNavigate();

    const CustomRouter = (url: string, type: number) => {
        switch (type) {
            case 1:
                router(url)
                break;
            case 2:
                window.location.href = url
                break;
        }
    }
    const dispatch = useDispatch()
    const [getPreferences, isLoadingPreferensec, errorPreferences] = useFetching(async () => {
        const response = await GlobalServices.GetPreferencesList()
        if (response.data.code == 0) {
            dispatch(addPreference(response.data.result))
        }
        if (response.data.code == 401) {
            dispatch(addPreference([]))
        }
    })
    const [getProductsList, isLoadingProducts, errorProducts] = useFetching(async () => {
        const response = await GlobalServices.GetProductsList()
        if (response.data.code == 0) {
            dispatch(setProductsList(response.data.result))
        }
    })

    return (
        <RouterContext.Provider value={CustomRouter}>
            <PreferencesContext.Provider value={getPreferences}>
                <ProductsContext.Provider value={getProductsList}>
                    <Routes>
                        <Route path='' element={
                            <>
                                <ErrorMassage />
                                <MainHeaderModule />
                                <Outlet />
                            </>
                        }>
                            <Route index element={<ProductsPage />} />
                            <Route path='create' element={<CreateProductPage />} />
                            <Route path='users' element={<Outlet />}>
                                <Route path=':userId' element={<UserPage />} />
                                <Route index element={<div>1213</div>} />
                            </Route>
                            <Route path='login' element={<LoginPage />} />
                            <Route path='register' element={<RegisterPage />} />
                        </Route>
                    </Routes>
                </ProductsContext.Provider>
            </PreferencesContext.Provider>
        </RouterContext.Provider>
    );
}

export default Router;