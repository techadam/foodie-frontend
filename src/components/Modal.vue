<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" :style="`width: ${size}`">

                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="btn btn-main-gradient" @click="$emit('close')">
                                Confirm
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    props: [
        'size',
    ],
}
</script>