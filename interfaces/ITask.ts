//For task.ts Model
export interface ITask extends Document {
    title: string;
    materials?: Array<string> | null | undefined;
    materialsCost?: string;
    price: number | string;
    notes?: string;
    completed: boolean;
};