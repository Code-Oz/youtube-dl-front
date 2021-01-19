<template>
<div>
    <div
        v-for="media in currentMedias"
        :key="media.id"
        class="border-item"
        >
        <span> {{ media.title }} </span>
        <span v-if="media.state === 'SUCCESS'"> <i class="el-icon-success green-icon" style='color'></i> </span>
        <span v-if="media.state === 'FAILED'"> <i class="el-icon-error red-icon"></i> </span>
        <span v-if="media.error"> {{ media.error }} </span>
        <span><el-button icon="el-icon-refresh-left" @click="reDownloadMedia(media)"/></span>
    </div>
</div>
</template>

<script lang="ts" src="./YoutubeDashboard.ts"></script>

<style lang="scss" scoped>
    .border-item {
        border: 3px solid black
    }
    .green-icon {
        color: green;
    }
    .red-icon {
        color: red
    }
</style>