import { semverSort } from './semver';

describe('test semver function', function () {
  it('semver test', function () {
    expect(semverSort(['0.1', '0.0'])).toStrictEqual(['0.0', '0.1']);
    expect(semverSort(['0.1', '0.10'])).toStrictEqual(['0.1', '0.10']);
    expect(semverSort(['0.10', '0.9'])).toStrictEqual(['0.9', '0.10']);
    expect(semverSort(['1.2.3.4.5.6.7', '1'])).toStrictEqual([
      '1',
      '1.2.3.4.5.6.7',
    ]);
    expect(semverSort(['1', '9.1.1', '0.0.1'])).toStrictEqual([
      '0.0.1',
      '1',
      '9.1.1',
    ]);

    expect(
      semverSort([
        '1.0.5',
        '2.5.0',
        '0.12.0',
        '1',
        '1.23.45',
        '1.4.50',
        '1.2.3.4.5.6.7',
      ])
    ).toStrictEqual([
      '0.12.0',
      '1',
      '1.0.5',
      '1.2.3.4.5.6.7',
      '1.4.50',
      '1.23.45',
      '2.5.0',
    ]);
  });
});
