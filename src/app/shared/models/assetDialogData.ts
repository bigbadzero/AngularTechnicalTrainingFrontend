
import {Asset} from './asset';
import {AssetType} from './assetType';
import {Employee} from './employee';

export interface AssetDialogData{
    asset?:Asset;
    assetTypes?: AssetType[];
    employees?: Employee[];
}