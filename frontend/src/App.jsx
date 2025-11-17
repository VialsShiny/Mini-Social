import React, {Suspense} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {Loader} from './components/Loader';
import {NavBar} from './components/NavBar';
import {ProtectedRoute} from './components/ProtectedRoute';
import _404 from './pages/errors/_404';
import Profile from './pages/Profile';
import {AuthProviders} from './providers/AuthProviders';
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const PostDetails = React.lazy(() => import('./pages/PostDetails'));

export default function App() {
    return (
        <AuthProviders>
            <BrowserRouter>
                <Suspense fallback={<Loader loader="dote" />}>
                    <Routes>
                        <Route
                            element={
                                <>
                                    <NavBar />
                                    <Outlet />
                                </>
                            }
                        >
                            <Route path="/" element={<Home />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route
                                path="/post/:id"
                                element={
                                    <ProtectedRoute>
                                        <PostDetails />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        <Route path="*" element={<_404 />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProviders>
    );
}
