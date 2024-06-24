import React, {useState} from "react";
import InputArea from "./InputArea/InputArea";
import TaskList from "./TaskList/TaskList";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ProtectedComponent from "./Auth/ProtectedComponent";
import ResetPassword from "./Auth/ResetPassword";
import UserListPage from "./Users/UserListPage";
import {useLocalStorage} from "usehooks-ts";

function App() {

    const [token, setToken, removeToken] = useLocalStorage("token", "")

    const signout = () => {
        removeToken()
        window.location.href = "http://localhost:3000/signin";
    };

    const [items, setItems] = useState([
        {
            id: 1,
            name: "Сходить в зал",
            description: "на 60 мин",
            completed: false
        },
        {
            id: 2,
            name: "Сдать экзамен",
            description: "На отлично",
            completed: false
        }
    ]);

    const [sequence, setSequence] = useState(6)

    function addItem(item) {
        setItems((prevItems) => {
            return [...prevItems, {...item, id: sequence}];
        });
        setSequence(sequence + 1)
    }

    function deleteItem(id) {
        setItems((prevItems) => {
            return prevItems.filter((item) => {
                return item.id !== id;
            });
        });
    }

    function updateItem(item) {
        setItems([...items].map((el) => {
            if (el.id === item.id) {
                return item;
            } else {
                return el;
            }
        }));
    }

    function completeItem(id) {
        setItems([...items].map((el) => {
            if (el.id === id) {
                return {...el, completed: !el.completed};
            } else return el
        }));
    }

    return (
        <ChakraProvider>
            <Router>
                <NavBar token={token} signout={signout} />
                <Container maxW="xl" centerContent>
                    <Box p="4">
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/signin" />}
                            />
                            <Route
                                path="/signin"
                                element={
                                    token ? (
                                        <Navigate to="/todolist" />
                                    ) : (
                                        <SignIn setToken={setToken} />
                                    )
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    token ? (
                                        <Navigate to="/todolist" />
                                    ) : (
                                        <SignUp />
                                    )
                                }
                            />

                            <Route
                                path="/todolist"
                                element={
                                    <ProtectedComponent token={token}>
                                        <div className="container">
                                            <div className="heading">
                                                <h1>To-Do List</h1>
                                            </div>
                                            <ProtectedComponent token={token}>
                                                <InputArea onAdd={addItem}/>
                                            </ProtectedComponent>
                                            {
                                                items !== undefined && <ProtectedComponent token={token}>
                                                    <TaskList
                                                        tasks={items}
                                                        deleteItem={deleteItem}
                                                        updateItem={updateItem}
                                                        completeItem={completeItem}
                                                    />
                                                </ProtectedComponent>
                                            }
                                        </div>
                                    </ProtectedComponent>
                                }
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPassword/>}
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedComponent token={token}>
                                        <UserListPage />
                                    </ProtectedComponent>
                                }
                            />
                        </Routes>
                    </Box>
                </Container>
            </Router>
        </ChakraProvider>
    );
}

export default App;
