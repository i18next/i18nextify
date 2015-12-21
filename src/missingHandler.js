import i18next from 'i18next';
import { setPath } from 'i18next/lib/utils';
import * as utils from './utils';

let missings = {};

function log() {
  i18next.services.logger.log('missing resources: \n' + JSON.stringify(missings, null, 2));
}

let debouncedLog = utils.debounce(log, 2000);

export function missingHandler(lngs, namespace, key, res) {console.warn('here')
  setPath(missings, [namespace, key], res);
  console.warn('there')
  debouncedLog();
}
