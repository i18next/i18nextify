import i18next from 'i18next';
import { setPath } from 'i18next/dist/es/utils';
import * as utils from './utils';

let missings = {};

function log() {
  i18next.services.logger.log('missing resources: \n' + JSON.stringify(missings, null, 2));
}

let debouncedLog = utils.debounce(log, 2000);

export function missingHandler(lngs, namespace, key, res) {
  if (typeof lngs === 'string') lngs = [lngs];
  if (!lngs) lngs = [];

  lngs.forEach(lng => {
    setPath(missings, [lng, namespace, key], res);
    debouncedLog();
  });

  if (i18next.services.backendConnector && i18next.services.backendConnector.saveMissing) {
    i18next.services.backendConnector.saveMissing(lngs, namespace, key, res);
  }
}
