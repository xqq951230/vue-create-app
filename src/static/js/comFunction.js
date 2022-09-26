import * as echarts from 'echarts'
/* eslint-disable one-var */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* 下面是封装的公共函数 */
export default {
  install: function (Vue, option) {
    Vue.prototype.$echarts = echarts
    Vue.prototype.$mySort = function (key, asc = true) {
      return function (a, b) {
        let valueA = a[key]
        let valueB = b[key]
        if (asc) {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      }
    }
    Vue.prototype.$echartsColor = {
      color: ['#60acfc', '#feb64d', '#5bc49f', '#FF6666', '#32d3eb', '#feb64d', '#ff7c7c', '#9287e7', '#D4EC59', '#B55CBD', '#2FB0D2', '#668ED6', '#1275D9', '#6478F4', '#D89994', '#FFFFCC', '#FFCC99', '#FF9999', '#99CC99', '#FF6666', '#CCFF99', '#66CCCC', '#CCCCFF']
    }
    Vue.prototype.$FontChart = function (size) {
      // 获取到屏幕的宽度
      let clientWidth =
        document.documentElement.clientWidth ||
        window.innerWidth ||
        document.body.clientWidth;
      if (!clientWidth) return; // 报错拦截：
      let fontSize = 20 * (clientWidth / 1920); // 适配1rem=20px
      return size * fontSize;
    }
    Vue.prototype.$exportData = function (option) {
      let loadingInstance
      if (option.targetName) {
        loadingInstance = Loading.service({
          lock: true,
          text: '',
          target: document.querySelector(option.targetName),
          background: option.loadingColor || '#fff'
        })
      }
      this.$ajaxGet({
        method: option.method || 'get',
        url: option.url,
        params: option.params,
        responseType: 'blob',
        cb: (res) => {
          let blob, downloadElement, href
          if (option.targetName) {
            loadingInstance.close()
          }
          if (option.exportType == 'excel') {
            blob = new Blob([res], {
              type: 'application/vnd.ms-excel;charset=utf-8'
            })
          } else if (option.exportType == 'csv') {
            blob = new Blob([res], {
              type: 'application/csv;charset=utf-8'
            })
          }
          downloadElement = document.createElement('a')
          href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = option.exportType == 'excel' ? `${option.fileName}.xlsx` : `${option.fileName}.csv` // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        }
      })
    }
  }
}
