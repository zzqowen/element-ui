import './revise-el-table-mixins'
import ElTable from './src/elTable';

ElTable.install = function(Vue) {
  Vue.component(ElTable.name, ElTable);
};

export default ElTable;
