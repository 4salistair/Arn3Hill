
export interface Stage {
    // id: string?;
    userSessionID?: string;
    startID?: string;
    startName?: string;
    endID?: string;
    endName?: string;
    startdateandtime?: any;
    enddateandtime?: any;
    duration?: number;
    state?: 'completed'| 'cancalled' | null;
    }
