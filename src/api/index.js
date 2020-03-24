const hot = {
  url: '/search/hot',
  type: 'get'
}
const loginByPhone = {
  url: '/login/cellphone',
  type: 'get',
  req: true
}
const userInfo = {
  url: '/user/detail',
  type: 'get',
  req: true
}
const searchList = {
  url: '/search',
  type: 'get',
  req: true
}
const musicList = {
  url: '/top/playlist/highquality',
  type: 'get',
  req: true
}
const tagList = {
  url: '/playlist/hot',
  type: 'get',
  req: true
}
export {
  hot as HOT,
  loginByPhone as LBP,
  userInfo as USERS,
  searchList as SEARCHL,
  musicList as MUSLIST,
  tagList as TAGLIST
}
