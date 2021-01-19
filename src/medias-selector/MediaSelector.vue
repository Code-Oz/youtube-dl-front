<template>
<div>
    <el-dialog
        title="Select medias"
        :visible="isVisible"
        width="30%"
        center
        @close="resetData"
        >
        <div v-for="media in currentMedias" :key="media.id">
            <el-checkbox
                :value="media.isSelected"
                @change="media.isSelected = !media.isSelected"
                >
                {{ media.title }}
            </el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetData">Cancel</el-button>
            <el-button type="primary" @click="sendMedias">Confirm</el-button>
        </span>
    </el-dialog>

    <slot
        :select-media-from-playlist="selectMediaFromPlaylist"
        :select-media-from-video="selectMediaFromVideo"
        />
</div>
</template>

<script lang="ts" src="./MediaSelector.ts"></script>
