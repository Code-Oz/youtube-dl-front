<template>
<div>
    <el-select
        :disabled="isLoading"
        :value="currentMode"
        @change="updateMode"
        >       
        <el-option
            v-for="item in optionsMode"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="mediaId">
            <el-input
                :disabled="isLoading"
                placeholder="Id"
                v-model="ruleForm.mediaId"
            />
        </el-form-item>
    </el-form>
    <el-button
        @click="downloadMedia"
        >
      Download Video
    </el-button>
</div>
</template>

<script lang="ts" src="./YoutubePanel.ts"></script>
 