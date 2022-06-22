
import {Asset} from '../shared/asset';
import {AssetType} from '../shared/assetType';
import {Employee} from '../shared/employee';

export interface AssetDialogData{
    asset:Asset;
    assetTypes?: AssetType[];
    employees?: Employee[];
}