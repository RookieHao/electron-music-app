/** @format */

export interface ResultList {
  code: number
  category: number
  result: ResultItem[]
}
export interface ResultItem {
  alg: string
  canDislike: boolean
  copywriter: string
  id: number
  name: string
  picUrl: string
  program: any
  type: number
}
