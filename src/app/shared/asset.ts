import {AssetType} from './assetType';
import {Employee} from './employee';

export interface Asset {
    tagId: number;
    assetId: number;
    assetType: AssetType;
    description: string;
    employeeId?: number;
    employee?: Employee;
    dateAdded: Date;
    retired: boolean;
    dateRetired?: Date;
}
