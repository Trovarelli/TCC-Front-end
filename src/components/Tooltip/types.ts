import { ReactNode } from 'react';

export interface ToolTipProps {
    children: ReactNode;
    tooltip?: string;
    state?: "error" | "success" | "info" | "warning";
}


