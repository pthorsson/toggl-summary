import 'mocha';
import { expect } from 'chai';

import { parseSettings } from '../lib/settings-parser';

describe('Parse settings module, settings object', () => {
  it('should have correct keys', () => {
    const settings = parseSettings('tt:123,tw:456');

    expect(settings.togglToken).to.equal('123');
    expect(settings.togglWorkspace).to.equal('456');
    expect(settings.googleSpreatsheet).to.equal(null);
    expect(Object.keys(settings).length).to.equal(3);
  });
});
