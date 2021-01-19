import Vue, { VNode } from "vue"

export default <TMediaTypeEvent>() => Vue.extend({
    render(h): VNode {
        const defaultScopedSlot = this.$scopedSlots.default
        if (defaultScopedSlot) {
            return h('div', [
                defaultScopedSlot({
                    fetchingInfos: this.fetchingInfos, 
                })
              ])
        }
        return h('div')
    },
    methods: {
        async fetchingInfos(event: TMediaTypeEvent) {
            throw Error('implement Process download in this component')
        },
    }
})