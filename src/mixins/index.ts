import Vue, { VueConstructor } from "vue"

export type VueClass<T> = VueConstructor<T & Vue>
 
export default function mixins<TA>(constructor: VueClass<TA>): VueClass<TA>
export default function mixins<TA, TB>(constructor1: VueClass<TA>, constructor2: VueClass<TB>): VueClass<TA & TB>

export default function mixins(...constructors: VueConstructor[]): VueConstructor {
    return Vue.extend({ mixins: constructors })
}
 