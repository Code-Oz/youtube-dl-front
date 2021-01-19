import { PropOptions } from "vue"
import axios from "axios"
import { VideoInfosId } from "../../types"
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
        async getPlaylistInfos(playlistId: string) {
            let videosInfos: VideoInfosId[] = []
            try {
                const response = await axios.get<[VideoInfosId]>(`http://localhost:3001/playlist/${playlistId}`)
                videosInfos = response.data
                return videosInfos
            } catch (err) {
                this.onErrorGettingsInfos(err)
                return videosInfos
            }
        },
        async fetchingInfos(event: { mediaId: string }) {
            this.$emit('update:isGettingMediaInfo', true)
            const videosInfos = await this.getPlaylistInfos(event.mediaId)
            this.$emit('update:isGettingMediaInfo', false)

            if (!videosInfos.length) {
                return
            }

            this.$emit('download-multiple-videos', videosInfos)
        },
    },
})
