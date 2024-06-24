// src/Components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

function NavBar({ token, signout }) {
    return (
        <Box bg="teal.500" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box>
                    {token && (
                        <>
                            <Link to="/users">
                                <Button colorScheme="teal" variant="ghost">
                                    Пользователи
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
                {token && (
                    <Button colorScheme="red" onClick={signout}>
                        Выйти
                    </Button>
                )}
            </Flex>
        </Box>
    );
}

export default NavBar;
