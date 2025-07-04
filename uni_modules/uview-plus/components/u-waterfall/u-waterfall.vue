<template>
    <view class="u-waterfall">
        <view ref="u-left-column" id="u-left-column" class="u-column">
            <slot name="left" :leftList="leftList"></slot>
        </view>
        <view ref="u-right-column" id="u-right-column" class="u-column">
            <slot name="right" :rightList="rightList"></slot>
        </view>
    </view>
</template>

<script>
    /**
     * waterfall 瀑布流
     * @description 这是一个瀑布流形式的组件，内容分为左右两列，结合uview的懒加载组件效果更佳。相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，uview的瀑布流实现了真正的 组件化，搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。
     * @tutorial https://uview-plus.jiangruyi.com/components/waterfall.html
     * @property {Array} flow-list 用于渲染的数据
     * @property {String Number} add-time 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明（默认200）
     * @example <u-waterfall :flowList="flowList"></u-waterfall>
     */
    import { mpMixin } from '../../libs/mixin/mpMixin';
	import { mixin } from '../../libs/mixin/mixin';
    export default {
        name: "u-waterfall",
        props: {
            // #ifdef VUE2
            value: {
                // 瀑布流数据
                type: Array,
                required: true,
                default: function() {
                    return [];
                }
            },
            // #endif
            // #ifdef VUE3
            modelValue: {
                // 瀑布流数据
                type: Array,
                required: true,
                default: function() {
                    return [];
                }
            },
            // #endif
            // 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
            // 单位ms
            addTime: {
                type: [Number, String],
                default: 200
            },
            // id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
            // 那么该把idKey设置为idx
            idKey: {
                type: String,
                default: 'id'
            }
        },
        mixins: [mpMixin, mixin],
        data() {
            return {
                leftList: [],
                rightList: [],
                tempList: [],
                children: []
            }
        },
        watch: {
            copyFlowList(nVal, oVal) {
                if (!nVal || nVal.length == 0) {
                    this.clear(false);
                    // console.log('clear');
                } else {
                    // 取差值，即这一次数组变化新增的部分
                    let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
                    // 拼接上原有数据
                    this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
                    this.splitData();
                }
            }
        },
        mounted() {
            this.tempList = this.cloneData(this.copyFlowList);
            this.splitData();
        },
        computed: {
            // 破坏flowList变量的引用，否则watch的结果新旧值是一样的
            copyFlowList() {
                // #ifdef VUE3
                if (!this.modelValue || this.modelValue.length == 0) {
                    this.clear(false);
                    // console.log('clear');
                    return [];
                } else {
                    return this.cloneData(this.modelValue);
                }
                // #endif
                // #ifdef VUE2
                return this.cloneData(this.value);
                // #endif
            }
        },
        emits: ['update:modelValue'],
        methods: {
            async splitData() {
                if (!this.tempList.length) return;
                let leftRect = await this.$uGetRect('#u-left-column');
                let rightRect = await this.$uGetRect('#u-right-column');
                // 如果左边小于或等于右边，就添加到左边，否则添加到右边
                let item = this.tempList[0];
                // 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
                // 数组可能变成[]，导致此item值可能为undefined
                if (!item) return;
                if (leftRect.height < rightRect.height) {
                    this.leftList.push(item);
                } else if (leftRect.height > rightRect.height) {
                    this.rightList.push(item);
                } else {
                    // 这里是为了保证第一和第二张添加时，左右都能有内容
                    // 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
                    if (this.leftList.length <= this.rightList.length) {
                        this.leftList.push(item);
                    } else {
                        this.rightList.push(item);
                    }
                }
                // 移除临时列表的第一项
                this.tempList.splice(0, 1);
                // 如果临时数组还有数据，继续循环
                if (this.tempList.length) {
                    setTimeout(() => {
                        this.splitData();
                    }, this.addTime)
                }
            },
            // 复制而不是引用对象和数组
            cloneData(data) {
                return JSON.parse(JSON.stringify(data));
            },
            // 清空数据列表
            clear(bak = true) {
                this.leftList = [];
                this.rightList = [];
                // 同时清除父组件列表中的数据
                if (bak) {
                    // #ifdef VUE2
                    this.$emit('input', []);
                    // #endif
                    // #ifdef VUE3
                    this.$emit('update:modelValue', []);
                    // #endif
                }
                this.tempList = [];
            },
            // 清除某一条指定的数据，根据id实现
            remove(id) {
                // 如果findIndex找不到合适的条件，就会返回-1
                let index = -1;
                index = this.leftList.findIndex(val => val[this.idKey] == id);
                if (index != -1) {
                    // 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
                    this.leftList.splice(index, 1);
                } else {
                    // 同理于上方面的方法
                    index = this.rightList.findIndex(val => val[this.idKey] == id);
                    if (index != -1) this.rightList.splice(index, 1);
                }
                // 同时清除父组件的数据中的对应id的条目
                // #ifdef VUE2
                index = this.value.findIndex(val => val[this.idKey] == id);
                if (index != -1) this.$emit('input', this.value.splice(index, 1));
                // #endif
                // #ifdef VUE3
                index = this.modelValue.findIndex(val => val[this.idKey] == id);
                if (index != -1) this.$emit('update:modelValue', this.modelValue.splice(index, 1));
                // #endif
            },
            // 修改某条数据的某个属性
            modify(id, key, value) {
                // 如果findIndex找不到合适的条件，就会返回-1
                let index = -1;
                index = this.leftList.findIndex(val => val[this.idKey] == id);
                if (index != -1) {
                    // 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
                    this.leftList[index][key] = value;
                } else {
                    // 同理于上方面的方法
                    index = this.rightList.findIndex(val => val[this.idKey] == id);
                    if (index != -1) this.rightList[index][key] = value;
                }
                // 修改父组件的数据中的对应id的条目
                // #ifdef VUE2
                index = this.value.findIndex(val => val[this.idKey] == id);
                // #endif
                // #ifdef VUE3
                index = this.modelValue.findIndex(val => val[this.idKey] == id);
                // #endif
                if (index != -1) {
                    // 首先复制一份value的数据
                    // #ifdef VUE2
                    let data = this.cloneData(this.value);
                    // #endif
                    // #ifdef VUE3
                    let data = this.cloneData(this.modelValue);
                    // #endif
                    // 修改对应索引的key属性的值为value
                    data[index][key] = value;
                    // 修改父组件通过v-model绑定的变量的值
                    // #ifdef VUE2
                    this.$emit('input', data);
                    // #endif
                    // #ifdef VUE3
                    this.$emit('update:modelValue', data);
                    // #endif

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .u-waterfall {
        @include flex;
        flex-direction: row;
        align-items: flex-start;
    }

    .u-column {
        @include flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        /* #ifndef APP-NVUE */
        height: 100%;
        /* #endif */
    }

    .u-image {
        /* #ifndef APP-NVUE */
        max-width: 100%;
        /* #endif */
    }
</style>
