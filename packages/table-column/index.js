import { PlTableColumn as ElTableColumn} from 'pl-table';
ElTableColumn.name = 'ElTableColumn';

/* istanbul ignore next */
ElTableColumn.install = function(Vue) {
  Vue.component(ElTableColumn.name, ElTableColumn);
};

export default ElTableColumn;
