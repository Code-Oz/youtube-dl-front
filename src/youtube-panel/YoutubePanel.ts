import Vue from "vue"
import { PropOptions } from "vue"
import { ElForm } from "element-ui/types/form"
import { DL_MODE_FROM } from "../types"

export default Vue.extend({
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        } as PropOptions<boolean>,
        currentMode: {
            type: String,
            required: true,
        } as PropOptions<DL_MODE_FROM>,
    },
    data() {
        return {
            optionsMode: [
                { value: DL_MODE_FROM.PLAYLIST, label: 'Playlist' },
                { value: DL_MODE_FROM.VIDEO_ID, label: 'Video' },
            ],
            ruleForm: {
                mediaId: '',
            },
            rules: {
                mediaId: [
                  { required: true, message: 'Please input Id playlist or video', trigger: 'change' },
                ],
            },
        }
    },
    methods: {
        updateMode(value: DL_MODE_FROM) {
            this.$emit('update:current-mode', value)
        },
        async downloadMedia() {
            const form = this.$refs['ruleForm'] as ElForm
            form.validate((valid: boolean) => {
                if (valid) {
                    this.$emit('download-media', { mediaId: this.ruleForm.mediaId })
                    return
                }
                console.log('error submit!!')
            })
        },
    },
})
