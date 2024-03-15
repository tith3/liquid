//type for storing the contents of an individual pane
export interface PaneData {
    index: number;
    text: string;
    headerExpanded: boolean;
}

export interface PaneDimensions {
    rows: number;
    cols: number;
    maxRows: number;
    maxCols: number;
    vertical: boolean;
}