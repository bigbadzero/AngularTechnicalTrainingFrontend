import {AssetType} from './assetType';
import {Employee} from './employee';

export interface AssetDialogOptions{
    assetTypes: AssetType[];
    employees: Employee[];
}