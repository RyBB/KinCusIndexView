<template>
  <div class="hello">
    <table>
      <thead>
        <tr>
          <th class="table-header" @click="sortRecords('$id')">レコード番号  {{ this.sortflag['$id']    || '' }}</th>
          <th class="table-header" @click="sortRecords('title')">タイトル   {{ this.sortflag['title']  || '' }}</th>
          <th class="table-header" @click="sortRecords('triage')">優先度    {{ this.sortflag['triage'] || '' }}</th>
          <th class="table-header" @click="sortRecords('type')">タイプ      {{ this.sortflag['type']   || '' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in recordsData" :key="record.$id">
          <td>{{ record.$id.value }}</td>
          <td>{{ record.title.value }}</td>
          <td>{{ record.triage.value }}</td>
          <td>{{ record.type.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const app = kintone.app.getId();
const query = 'order by $id desc limit 500';
export default {
  name: 'HelloWorld',
  data() {
    return {
      recordsData: [],
      sortflag: {
        desc: false,
        data: '',
      }
    }
  },
  async mounted() {
    const data = await kintone.api(kintone.api.url('/k/v1/records'), 'GET', {app, query});
    this.recordsData = data.records;
  },
  methods: {
    sortRecords(DATA) {
      if (this.sortflag.data !== DATA) {
        // まだソートしてないフィールドが選ばれたら、降順にする
        this.recordsData = this.recordsData.sort((x, y) => x[DATA].value < y[DATA].value ? 1 : -1);
        this.sortflag = {data: DATA, desc: true, [DATA]: '↓'};
        return;
      }
      // すでにソートしているフィールドが選ばれたら、現在が昇順/降順どちらか確認してその逆順にする
      const num = this.sortflag.desc ? -1 : 1; // descがtrueなら昇順、falseなら降順
      this.recordsData = this.recordsData.sort((x, y) => x[DATA].value < y[DATA].value ? num : num * -1);
      this.sortflag = {data: DATA, desc: num === 1, [DATA]: num === 1 ? '↓' : '↑'};
    },
  }
}
</script>

<style>
.hello table {
  margin: auto;
}
.table-header {
  font-size: 20px;
  font-weight: 'bold';
  border: 1px solid #000;
}
</style>