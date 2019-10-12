
export interface Stage {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
    user?: string;
    stage?: string;
    startlocation?: string;
    endlocation?: string;
    startdateandtime?: any;
    enddateandtime?: any;
    duration: number;
    state?: 'completed'| 'cancalled' | null;
    }
