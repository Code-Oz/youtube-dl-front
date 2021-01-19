import Vue from "vue"

export default Vue.extend({
    methods: {
        getErrorMessage(err: any, defaultMessage?: string) {
            if (defaultMessage) {
                return !!err?.response?.data?.error ? err.response.data.error : defaultMessage
            }
            return !!err?.response?.data?.error ? err.response.data.error : err.toString()
        },
    },
})