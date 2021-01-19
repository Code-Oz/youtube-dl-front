import { PropOptions } from "vue"
import axios from "axios"
import { VideoInfos } from "../../types"
import mixins from "../../mixins"
import OnErrorGettingsInfosMixin from "../../mixins/OnErrorGettingsInfosMixin"
import RenderlessfetchingInfosMixin from "../../mixins/RenderlessFetchingInfosMixin"

export default mixins(RenderlessfetchingInfosMixin<{ mediaId: string }>(), OnErrorGettingsInfosMixin).extend({
    props: {
        isGettingMediaInfo: {
            type: Boolean,
            required: true,
        } as PropOptions<boolean>,
    },
    methods: {
        downloadVideoEvent(title: string | undefined, mediaId: string | undefined) {
            this.$emit('download-video', { mediaId, title })
        },
        async getVideoInfos(mediaId: string) {
            const { data: { title } } = await axios.get<VideoInfos>(`http://localhost:3001/video/infos/${mediaId}`)
            return title
        },
        async fetchingInfos(event: { mediaId: string }) {
            this.$emit('update:isGettingMediaInfo', true)
            try {
                const title = await this.getVideoInfos(event.mediaId)
                this.downloadVideoEvent(title, event.mediaId)
            } catch (err) {
                this.onErrorGettingsInfos(err)
            } finally {
                this.$emit('update:isGettingMediaInfo', false)
            }
        },
    },
})
