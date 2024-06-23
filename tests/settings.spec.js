import assert from 'node:assert';
import {getSettings} from '../lib/settings.js';

describe('getSettings', () => {
  it('Catches bad settings', () => {
    assert.throws(() => {
      getSettings({
        settings: {
          meta: {
            libs: {
              foo: {
                rules: undefined,
              },
            },
          },
        },
      });
    });

    assert.throws(() => {
      getSettings({
        settings: {
          meta: {
            libs: {
              foo: {
                rules: null,
              },
            },
          },
        },
      });
    });

    assert.throws(() => {
      getSettings({
        settings: {
          meta: {
            libs: {
              foo: {
                rules: 'bar',
              },
            },
          },
        },
      });
    });

    assert.throws(() => {
      getSettings({
        settings: {
          meta: {
            libs: {
              foo: {
                [Symbol('bar')]: {},
              },
            },
          },
        },
      });
    });
  });
});
