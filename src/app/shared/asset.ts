export interface Asset {
    tagId: number;
    assetId: number;
    description: string;
    employeeId?: number;
    dateAdded: Date;
    retired: boolean;
    dateRetired?: Date;
}
