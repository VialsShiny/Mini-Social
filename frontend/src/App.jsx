import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {NavBar} from './components/NavBar';
import {ProtectedRoute} from './components/ProtectedRoute';
import {Home} from './pages/Home';
import {PostDetails} from './pages/PostDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {AuthProviders} from './providers/AuthProviders';

export default function App() {
    return (
        <AuthProviders>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route
                        path="/post/:id"
                        element={
                            <ProtectedRoute>
                                <PostDetails />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </AuthProviders>
    );
}
