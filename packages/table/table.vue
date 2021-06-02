<template>
  <pl-table
    ref="singlePlTable"
    :data="data"
    :max-height="maxHeight"
    :height="height"
    :select-tr-class="selectTrClass"
    :use-virtual="
      (height && parseInt(height) > 0) || (maxHeight && parseInt(maxHeight) > 0)
        ? useVirtual
        : false
    "
    :excess-rows="excessRows"
    :border="border"
    :data-changes-scroll-top="dataChangesScrollTop"
    :stripe="stripe"
    :row-key="rowKey"
    :fixed-columns-roll="fixedColumnsRoll"
    :fit="fit"
    :show-header="showHeader"
    :row-class-name="rowClassName"
    :cell-class-name="cellClassName"
    :header-row-class-name="headerRowClassName"
    :header-row-style="headerRowStyle"
    :header-cell-class-name="headerCellClassName"
    :header-cell-style="headerCellStyle"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    :big-data-checkbox="bigDataCheckbox"
    :thtd-beyond-hiding="thtdBeyondHiding"
    :size="size"
    :default-sort="defaultSort"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :tree-props="treeProps"
    :tree-config="treeConfig"
    :select-on-indeterminate="selectOnIndeterminate"
    :span-method="arraySpanMethod"
    :rowHeight="rowHeight"
    :tooltipEffect="tooltipEffect"
    :current-row-key="currentRowKey"
    :tooltipPlacement="tooltipPlacement"
    :header-drag-style="headerDragStyle"
    @row-click="rowClick"
    @row-dblclick="rowDblclick"
    @expand-change="expChang"
    @tableBodyScroll="tableBodyScroll"
    :highlight-current-row="highlightCurrentRow"
    :show-summary="showSummary"
    @header-dragend="headerDragend"
    :summary-method="getSummaries"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
    @cell-click="cellClick"
    @cell-dblclick="cellDblclick"
    @row-contextmenu="rowContextmenu"
    @header-contextmenu="headerContextmenu"
    @header-click="headerClick"
    @select="plSelect"
    @select-all="selectAll"
    @selection-change="handleSelectionChange"
    @filter-change="filterChange"
    @current-change="currentChange"
    @sort-change="sortChange"
  >
    <slot></slot>
  </pl-table>
</template>

<script type="text/babel">
//eslint disable next line
import { PlTable } from 'pl-table';
//eslint disable next line
import plTableMixin from './mixin';

export default {
  name: 'ElTable',

  components: {
    PlTable
  },

  mixins: [plTableMixin],

  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },

    lazy: Boolean,

    load: Function
  },

  methods: {},

  created() {},

  mounted() {},

  destroyed() {}
};
</script>
