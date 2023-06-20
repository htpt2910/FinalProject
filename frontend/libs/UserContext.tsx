// import {
//   Dispatch,
//   SetStateAction,
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react"
// import { User } from "./types"

// interface ContextProviderProps {
//   children?: React.ReactNode
// }

// type UserContext = {
//   user_id: number
//   setUser_id: Dispatch<SetStateAction<number>>
// }

// const UserContext = createContext<UserContext | undefined>(undefined)

// export const UserContextProvider = ({ children }: ContextProviderProps) => {
//   const [userId, setUserId] = useState(-1)

//   useEffect(() => {
//     console.log("user id in user context: ", userId)
//   }, [userId])
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }

// export function useUserContext() {
//   const userContext = useContext(UserContext)
//   if (useContext === undefined) {
//     throw new Error("useUserContext must be used inside UserProvider")
//   }
//   return useContext
// }
