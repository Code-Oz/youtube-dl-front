import axios from "axios"
import YoutubePanel from "../youtube-panel/YoutubePanel.vue"
import YoutubeDashboard from "../youtube-dashboard/YoutubeDashboard.vue"
import MediaSelector from "../medias-selector/MediaSelector.vue"
import YoutubeGetVideoInfoFromVideoId from "./youtube-get-video-info-from-video-id/YoutubeGetVideoInfoFromVideoId.vue"
import YoutubeGetVideosInfosFromPlaylistId from "./youtube-get-videos-infos-from-playlist-id/YoutubeGetVideosInfosFromPlaylistId.vue"
import { DL_MODE_FROM, MediaYoutubeDashboard, STATE_PROCESS_MEDIA, VideoInfosId } from "../types/"
import mixins from "../mixins"
import GetErrorMessageMixin from "../mixins/GetErrorMessageMixin"

export default mixins(GetErrorMessageMixin).extend({
    components: {
        YoutubeGetVideoInfoFromVideoId,
        YoutubeGetVideosInfosFromPlaylistId,
        MediaSelector,
        YoutubePanel,
        YoutubeDashboard,
    },
    data() {
        return {
            currentMedias: [] as MediaYoutubeDashboard[],
            itemsSize: 0,
            currentMode: DL_MODE_FROM.PLAYLIST,
            isDownload: false,
            isGettingMediaInfo: false,
        }
    },
    computed: {
        // both loading exist, one from getting infos (child component)
        // other on this component when download video
        isLoading(): boolean {
            return this.isDownload || this.isGettingMediaInfo
        },
        bindingModeComponentName(): string {
            switch(this.currentMode) {
                case DL_MODE_FROM.PLAYLIST:
                    return 'youtube-get-videos-infos-from-playlist-id'
                case DL_MODE_FROM.VIDEO_ID: 
                    return 'youtube-get-video-info-from-video-id'
            }
        },
        workingProgressPercentage(): string {
            if (!this.isDownload) {
                return '100'
            }
            if (this.currentMedias.length && this.itemsSize > 2 ) {
                const percentage = Math.round((this.currentMedias.length / this.itemsSize) * 100)
                return percentage > 100 ? '0%' : `${percentage} %`
            }
            return '0'
        },
        loadingText(): string {
            if (this.isDownload) {
                return this.workingProgressPercentage
            }
            return 'fetching media data'
        },
    },
    methods: {
        resetData() {
            this.currentMedias = []
            this.itemsSize = 0
        },
        // we need to reset data when process of download start
        async wrapperfetchingInfos(fetchingInfos: () => (event: { mediaId: string}) => Promise<void>) {
            this.resetData()
            await fetchingInfos()
        },
        onErrorDownloadVideo(event: { err: any, title: string | undefined, mediaId: string | undefined }) {
            console.log(event.err.toJSON())
            console.log(event)
            const errorMessage = this.getErrorMessage(event.err, 'This video is not available to be download (video format not avalaible in mp4, video too long (> 10 mins) or video is deleted), try with another Id')

            this.currentMedias.push({
                title: event.title || "no_title",
                id: event.mediaId || "no_id",
                state: STATE_PROCESS_MEDIA.FAILED,
                error: errorMessage,
            })
        },
        async reDownloadVideosFromIds(videoInfos: VideoInfosId) {
            const { id } = videoInfos

            this.currentMedias = this.currentMedias.filter(media => media.id !== id)
            await this.downloadVideosFromIds([ videoInfos ])
        },
        async downloadVideosFromIds(videosInfos: VideoInfosId[]) {
            this.isDownload = true
            let title
            let videoId
            this.itemsSize = videosInfos.length

            while(videosInfos.length) {
                const currentVideo = videosInfos.shift()
                if (!currentVideo) {
                    break
                }
                title = currentVideo.title
                videoId = currentVideo.id
                await this.downloadVideo({ title, mediaId: videoId })
            }
            this.isDownload = false
        },
        async downloadVideo(event: { mediaId: string, title: string }) {
            try {
                const res = await axios.get<Blob>(`http://localhost:3001/video/${event.mediaId}`, { responseType: 'blob' })
                this.currentMedias.push({
                    title: event.title,
                    id: event.mediaId,
                    state: STATE_PROCESS_MEDIA.SUCCESS,
                })
                this.buildAndSaveVideo(res.data, event.title)
            } catch (err) {
                this.onErrorDownloadVideo({ err, title: event.title, mediaId: event.mediaId })
            }
        },
        buildAndSaveVideo(blob: Blob, fileName: string) {
            const file = new File([blob], fileName)
            const url = window.URL.createObjectURL(file)
            const a = document.createElement('a')
            a.href = url
            a.download = `${fileName}.mp4`
            a.click()
            window.URL.revokeObjectURL(url)
        },
    },
})
