<template>
<div
    v-loading="isLoading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading">
    <media-selector
        @download-videos="downloadVideosFromIds($event)"
        >
        <div slot-scope="{ selectMediaFromPlaylist, selectMediaFromVideo }">
            <component
                :is="bindingModeComponentName"
                :is-getting-media-info.sync="isGettingMediaInfo"
                @download-multiple-videos="selectMediaFromPlaylist($event)"
                @download-video="selectMediaFromVideo($event)"
                >
                <div slot-scope="{ fetchingInfos }">
                    <youtube-panel
                        :current-mode.sync="currentMode"
                        :is-loading="isLoading"
                        @download-media="wrapperfetchingInfos(() => fetchingInfos($event))"
                        />
                    <youtube-dashboard
                        :current-medias="currentMedias"
                        @re-download-videos="reDownloadVideosFromIds($event)"
                    />
                </div>
            </component>
        </div>
    </media-selector>
</div>
</template>

<script lang="ts" src="./YoutubeDownloader.ts"></script>
