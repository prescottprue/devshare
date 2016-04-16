export default {
  tessellateRoot: 'https://kyper-tessellate.herokuapp.com', // TODO: Change to tessellate.kyper.io once SSL is enabled
  firebaseRoot: process.env.NODE_ENV !== 'test' ? 'https://kyper-tech.firebaseio.com/tessellate' : 'https://devshare-test.firebaseio.com/tessellate',
  oauthioKey: 'sxwuB9Gci8-4pBH7xjD0V_jooNU',
  filesRoot: 'files',
  highlightColors: [
    '#FF0000', '#FF00F1', '#F1C40F',
    '#D35400', '#FF08', '#2980B9',
    '#9B59B6'
  ]
}
