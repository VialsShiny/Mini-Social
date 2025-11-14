import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Loader} from './components/Loader';
import {NavBar} from './components/NavBar';
import {ProtectedRoute} from './components/ProtectedRoute';
import {AuthProviders} from './providers/AuthProviders';
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const PostDetails = React.lazy(() => import('./pages/PostDetails'));

export default function App() {
    return (
        <AuthProviders>
            <BrowserRouter>
                <NavBar />

                <Suspense fallback={<Loader loader="dote" />}>
                    <Routes>
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
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProviders>
    );
}
