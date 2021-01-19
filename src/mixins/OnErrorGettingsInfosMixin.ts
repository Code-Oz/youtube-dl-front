import mixins from "."
import GetErrorMessageMixin from "./GetErrorMessageMixin"

export default mixins(GetErrorMessageMixin).extend({
    methods: {
        onErrorGettingsInfos(err: any) {
            const errorMessage = this.getErrorMessage(err)
            console.error(errorMessage)
        },
    },
})