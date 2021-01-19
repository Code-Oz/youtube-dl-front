export enum DL_MODE_FROM {
    PLAYLIST = 'PLAYLIST',
    VIDEO_ID = 'VIDEO_ID',
}

export interface VideoInfos {
    title: string,
}

export type VideoInfosId = VideoInfos & { id: string }

export type MediaYoutubeDashboard = VideoInfosId & (StateMediaProcessFailed | StateMediaProcessSuccess)

interface StateMediaProcessSuccess {
    state: STATE_PROCESS_MEDIA.SUCCESS,
}

interface StateMediaProcessFailed {
    state: STATE_PROCESS_MEDIA.FAILED,
    error: string,
}

export enum STATE_PROCESS_MEDIA {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}