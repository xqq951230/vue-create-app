class Example {
  constructor (a) {
    this.title = a
  }

  /** **
   *@param dataList表格数据 Array
   *@param rowKey 需要合并的字段 rowKey表示列的键名称 String
   *@param ObjectSetKey 表格数组项中自定义新增的rowspan属性名称 ObjectSetKey表示键名称 String
   * ****/
  setRowSpan (dataList, rowKey, ObjectSetKey) {
    if (dataList instanceof Array && dataList.length >= 1 && rowKey && ObjectSetKey) {
      for (let i = 0; i < dataList.length; i++) {
        // 定义循环开始行
        let startRow
        // 定义需合并的行数
        let rowspan = 1
        // 循环到最后一行时
        if (i === dataList.length - 1) {
          // 如果最后一行和倒数第二行属性不同，则rowspan=1；否则直接结束循环
          if (dataList[i][rowKey] !== dataList[i - 1][rowKey]) {
            dataList[i][ObjectSetKey] = rowspan
          }
          break
        }
        // 内层循环记录rowspan的数量
        for (let j = i; j < dataList.length - 1; j++) {
          // 记录循环结束的行数
          startRow = j
          // 属性相同则rowspan+1；否则直接结束内循环
          if (dataList[j][rowKey] === dataList[j + 1][rowKey]) {
            rowspan++
          } else {
            break
          }
        }
        // 为数组添加rowspan属性
        dataList[i][ObjectSetKey] = rowspan
        // 控制外循环从内循环结束的行数开始
        i = startRow
        // i++实际下次循环从下一位开始
      }
      return new Promise(resolve => {
        resolve(dataList)
      })
    } else {
      // eslint-disable-next-line new-cap
      throw new Error('无效的参数！')
    }
  }
}
export default new Example()
