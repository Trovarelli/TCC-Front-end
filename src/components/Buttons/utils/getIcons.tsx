import { Trash, Home, User } from 'react-feather';
import { ReactElement } from "react";

export const getIcon = (v: string):ReactElement<any, any> => {
    switch(v) {
        case 'trash':
            return <Trash/>
        case 'home':
            return <Home/>
        case 'user':
            return <User/>
        default:
            return <></>
    }
}
