import { createContext } from "react";

const initialState = {
    firstName: 'elton',
    lastName : 'ang'
};
export type Theme = 'light' | 'dark'

export const ThemeContext = createContext<Theme>('dark')
export type UserState = typeof initialState;

export const UserContext = createContext<typeof initialState>(initialState)

