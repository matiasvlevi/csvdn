import { CSVDN } from './lib/csvdn';

import { bool } from './lib/operations/bool';
CSVDN.operations['bool'] = bool;

import { map } from './lib/operations/map';
CSVDN.operations['map'] = map;

import { automap } from './lib/operations/automap';
CSVDN.operations['automap'] = automap;

import { binary } from './lib/operations/binary';
CSVDN.operations['binary'] = binary;

export { CSVDN }

