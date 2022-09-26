import Cookies from 'js-cookie';
import Md5 from 'md5'

class Interceptors {
  constructor() {
    this.AllToken = {
      'Qj-Token': Cookies.get('Qj-Token'),
      'Admin-Token': Cookies.get('Admin-Token'),
      'Zzd-Token': Cookies.get('Zzd-Token')
    }
  }

  /** **
  *@param AllToken 项目需要的所有token
  *@param
  ** */
  init () {
    this.AllToken = {
      'Qj-Token': Cookies.get('Qj-Token'),
      'Admin-Token': Cookies.get('Admin-Token'),
      'Zzd-Token': Cookies.get('Zzd-Token')
    }
  }
  hasQjToken () {
    let hasToken = null
    switch (this.AllToken['Qj-Token']) {
      case '':
        hasToken = false
        break;
      case undefined:
        hasToken = false
        break;
      default:
        hasToken = true
        break;
    }
    return hasToken
  }
  hasMainToken () {
    let hasToken = null
    switch (this.AllToken['Admin-Token']) {
      case '':
        hasToken = false
        break;
      case undefined:
        hasToken = false
        break;
      default:
        hasToken = true
        break;
    }
    return hasToken
  }
  hasZzdToken () {
    let hasToken = null
    switch (this.AllToken['Zzd-Token']) {
      case '':
        hasToken = false
        break;
      case undefined:
        hasToken = false
        break;
      default:
        hasToken = true
        break;
    }
    return hasToken
  }
  initRequestHeaders (config) {
    Object.keys(this.AllToken).forEach(key => {
      switch (this.AllToken[key]) {
        case '':
          config.headers[key] = ''
          break;
        case undefined:
          config.headers[key] = ''
          break;
        default:
          const nowTime = parseInt((new Date().getTime() - new Date().getTime() % 60000) / 1000) * 1000
          config.headers[key] = this.AllToken[key] + '##' + Md5('tuojing!@#123' + nowTime).toUpperCase()
          break;
      }
    })
    return config
  }
}

export default Interceptors
