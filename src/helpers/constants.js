function dotDotDot () {
  // &#x2009;
  const thinSpace = ' ';
  const interpunct = '·';
  return [
    interpunct,
    interpunct,
    interpunct
  ].join(thinSpace);
}

export const APP_NAME = 'Sporkle!';
export const DEV_NULL = '/dev/null';
export const DOT_DOT_DOT = dotDotDot();
export const HEAD = 'HEAD';
export const UNCOMMITED = 'uncommited';
