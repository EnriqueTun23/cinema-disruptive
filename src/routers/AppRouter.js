import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { Menu } from '../components/Menu/Menu';
import { FavoritesPage } from '../pages/FavoritesPage';
import { HomePage } from '../pages/HomePage';
import { PeliPage } from '../pages/PeliPage';

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <Menu />
                <div>
                    <Switch>
                        <Route exact  path='/' component={HomePage}  />
                        <Route exact path='/favoritos'  component={FavoritesPage} />
                        <Route exact path='/:peli' component={PeliPage} />
                        <Redirect to= '/' />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
