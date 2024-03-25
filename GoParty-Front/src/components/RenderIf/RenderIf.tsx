import React from "react";

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {

    if(condition){
        return children
    }

    return false;
}