import { VideoInfosId } from "../types"
import Vue from "vue"

type VideoInfosIdSelected = VideoInfosId & { isSelected: Boolean }

export default Vue.extend({
    data() {
        return {
            isVisible: false,
            currentMedias: [] as VideoInfosIdSelected[],
        }
    },
    methods: {
        resetData() {
            this.isVisible = false
            this.currentMedias = []
        },
        selectMediaFromPlaylist(videosInfos: VideoInfosId[]) {
            this.currentMedias = videosInfos.map(video => ({
                ...video,
                isSelected: true
            }))
            this.isVisible = true
        },
        selectMediaFromVideo(event: { mediaId: string, title: string }) {
            this.currentMedias = [{ id: event.mediaId, title: event.title, isSelected: true }]
            this.isVisible = true
        },
        sendMedias() {
            const mediaSelected: VideoInfosId[] = this.currentMedias
                .filter(video => video.isSelected)
                .map(video => ({ id: video.id, title: video.title }))
            
            if (mediaSelected.length) {
                this.$emit('download-videos', mediaSelected)
            }

            this.resetData()
        },
    },
})
