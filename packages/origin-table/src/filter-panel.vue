<template>
  <transition name="el-zoom-in-top">
    <div
      class="el-table-filter"
      v-if="multiple"
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <div style="border-bottom: 1px solid #EBEEF5" v-if="column.filterInputable">
        <el-input
          class="el-transfer-panel__filter"
          v-model="query"
          size="small"
          :placeholder="column.filterInputPlaceholder || t('el.transfer.filterPlaceholder')"
          @mouseenter.native="inputHover = true"
          @mouseleave.native="inputHover = false">
          <i slot="prefix"
            :class="['el-input__icon', 'el-icon-' + inputIcon]"
            @click="clearQuery"
          ></i>
        </el-input>
      </div>
      <div class="el-table-filter__content">
        <el-scrollbar wrap-class="el-table-filter__wrap" v-show="!hasNoMatch && filters.length > 0">
          <el-checkbox-group class="el-table-filter__checkbox-group" v-model="filteredValue">
            <el-checkbox
              v-for="filter in filters"
              :key="filter.value"
              :label="filter.value">{{ filter.text }}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
        <p
          style="margin:0;height:30px;line-height:30px;padding:6px 15px 0;color:#909399;text-align:center"
          v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      </div>
      <div class="el-table-filter__bottom">
        <button @click="handleConfirm"
          :class="{ 'is-disabled': filteredValue.length === 0 }"
          :disabled="filteredValue.length === 0">{{ t('el.table.confirmFilter') }}</button>
        <button @click="handleReset">{{ t('el.table.resetFilter') }}</button>
      </div>
    </div>
    <div
      class="el-table-filter"
      v-else
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <ul class="el-table-filter__list">
        <li class="el-table-filter__list-item"
            :class="{ 'is-active': filterValue === undefined || filterValue === null }"
            @click="handleSelect(null)">{{ t('el.table.clearFilter') }}</li>
        <li class="el-table-filter__list-item"
            v-for="filter in filters"
            :label="filter.value"
            :key="filter.value"
            :class="{ 'is-active': isActive(filter) }"
            @click="handleSelect(filter.value)" >{{ filter.text }}</li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popper from 'element-ui-zq/src/utils/vue-popper';
  import { PopupManager } from 'element-ui-zq/src/utils/popup';
  import Locale from 'element-ui-zq/src/mixins/locale';
  import Clickoutside from 'element-ui-zq/src/utils/clickoutside';
  import Dropdown from './dropdown';
  import ElCheckbox from 'element-ui-zq/packages/checkbox';
  import ElCheckboxGroup from 'element-ui-zq/packages/checkbox-group';
  import ElScrollbar from 'element-ui-zq/packages/scrollbar';

  export default {
    name: 'ElTableFilterPanel',

    mixins: [Popper, Locale],

    directives: {
      Clickoutside
    },

    components: {
      ElCheckbox,
      ElCheckboxGroup,
      ElScrollbar
    },

    props: {
      placement: {
        type: String,
        default: 'bottom-end'
      }
    },

    methods: {
      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },
      isActive(filter) {
        return filter.value === this.filterValue;
      },

      handleOutsideClick() {
        setTimeout(() => {
          this.showPopper = false;
        }, 16);
      },

      handleConfirm() {
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },

      handleReset() {
        this.filteredValue = [];
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },

      handleSelect(filterValue) {
        this.filterValue = filterValue;

        if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
          this.confirmFilter(this.filteredValue);
        } else {
          this.confirmFilter([]);
        }

        this.handleOutsideClick();
      },

      confirmFilter(filteredValue) {
        this.table.store.commit('filterChange', {
          column: this.column,
          values: filteredValue
        });
        this.table.store.updateAllSelected();
      }
    },

    data() {
      return {
        table: null,
        cell: null,
        column: null,
        query: '',
        inputHover: false
      };
    },

    computed: {
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },

      hasNoMatch() {
        return this.query.length > 0 && this.filters.length === 0;
      },

      filters() {
        return this.column && this.column.filters.filter(item => {
          const label = item['text'].toString() || item['value'].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        });
      },

      filterValue: {
        get() {
          return (this.column.filteredValue || [])[0];
        },
        set(value) {
          if (this.filteredValue) {
            if ((typeof value !== 'undefined') && (value !== null)) {
              this.filteredValue.splice(0, 1, value);
            } else {
              this.filteredValue.splice(0, 1);
            }
          }
        }
      },

      filteredValue: {
        get() {
          if (this.column) {
            return this.column.filteredValue || [];
          }
          return [];
        },
        set(value) {
          if (this.column) {
            this.column.filteredValue = value;
          }
        }
      },

      multiple() {
        if (this.column) {
          return this.column.filterMultiple;
        }
        return true;
      }
    },

    mounted() {
      this.popperElm = this.$el;
      this.referenceElm = this.cell;
      this.table.bodyWrapper.addEventListener('scroll', () => {
        this.updatePopper();
      });

      this.$watch('showPopper', (value) => {
        if (this.column) this.column.filterOpened = value;
        if (value) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      });
    },
    watch: {
      showPopper(val) {
        if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
          this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
      }
    }
  };
</script>
