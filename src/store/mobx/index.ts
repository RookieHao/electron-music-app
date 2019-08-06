/** @format */

import {configure} from 'mobx'
configure({enforceActions: 'always'})

export {default as LayOutStore, LayOutType} from './layOut'
export {default as PlayStore, PlayType} from './play'
