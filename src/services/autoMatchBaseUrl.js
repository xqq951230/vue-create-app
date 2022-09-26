/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl (prefix) {
  let baseUrl = '';
  switch (prefix) {
    case '':
      // baseUrl = window.LOCAL_CONFIG.API_HOME;
      break;
    default:
          // baseUrl = window.LOCAL_CONFIG.API_HOME;
  }

  return `${baseUrl}${prefix}`;
}
