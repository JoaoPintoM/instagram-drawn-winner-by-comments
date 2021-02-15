const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const wait = require('wait')
const _ = require('lodash')
var colors = require('colors/safe')
 
const { username, password } = process.env // Only required when no cookies are stored yet
 
// const cookieStore = new FileCookieStore('./cookies.json')
// const client = new Instagram({ username, password, cookieStore })

console.log(username, password)
const client = new Instagram({ username, password })
 
;(async () => { 
  await client.login()

  let comments = []
 
  let pointer = ''
  let response = null

  const instagramPost = 'CKrJneOr4Eo' // https://www.instagram.com/p/CKrJneOr4Eo/
  do {
    response = await client.getMediaComments({ shortcode: instagramPost, first: '49', after: pointer })
    pointer = response.page_info.end_cursor 

    response.edges.forEach(edge => {
      comments.push({ user: edge.node.owner.username, comment: edge.node.text })
    });

    process.stdout.write('.')
    await wait(500) // avoid rate limit
  } while (response.page_info.has_next_page);
  console.log(' ')
  
  // on mélange.
  const sortedComments = _.shuffle(comments);

  for (let i = 0; i < sortedComments.length; i++) {
    const c = sortedComments[i];

    console.log(c.comment)
    await wait(40)
  }
  console.log('      ')
  console.log('      ')
  console.log('      ')
  console.log(' ---->>> LE GAGNANT EST : !!')
  console.log('      ')
  console.log(colors.green.bold(' ---->>> ') + colors.red.underline.bold(sortedComments[0].user) + ' : ' + sortedComments[0].comment)

  console.log('      ')
  console.log('      ')
  console.log('      ')
  console.log('BRAVO A TOI')
})()

