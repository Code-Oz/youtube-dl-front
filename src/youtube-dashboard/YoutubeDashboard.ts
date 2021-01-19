import { MediaYoutubeDashboard } from "../types"
import Vue, { PropOptions } from "vue"

export default Vue.extend({
    props: {
        currentMedias: {
            type: Array,
            required: true,
        } as PropOptions<MediaYoutubeDashboard[]>
    },
    methods: {
        reDownloadMedia(media: MediaYoutubeDashboard) {
            this.$emit('re-download-videos', media)
        },
    },
})
