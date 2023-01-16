import { Camera, Home } from 'react-feather';
import { ReactElement } from "react";

export const getIcon = (v: string):ReactElement<any, any> => {
    switch(v) {
        case 'camera':
            return <Camera />
        case 'home':
            return <Home />
        default:
            return <></>
    }
}
