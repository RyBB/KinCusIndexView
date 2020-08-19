<script>
  // data
	let recordsData = [];
	let sortflag = {
		data: '',
		desc: false
	};

  // methods
	const getRecords = async () => {
		const app = kintone.app.getId();
		const query = 'order by $id desc limit 500';
		const data = await kintone.api(kintone.api.url('/k/v1/records'), 'GET', {app, query});
		recordsData = data.records;
	};
	const sortData = DATA => {
		if (sortflag.data !== DATA) {
			// まだソートしてないフィールドが選ばれたら、降順にする
			recordsData = recordsData.sort((x, y) => x[DATA].value < y[DATA].value ? 1 : -1);
			sortflag = {data: DATA, desc: true, [DATA]: '↓'};
			return;
		}
		// すでにソートしているフィールドが選ばれたら、現在が昇順/降順どちらか確認してその逆順にする
		const num = sortflag.desc ? -1 : 1; // descがtrueなら昇順、falseなら降順
		recordsData = recordsData.sort((x, y) => x[DATA].value < y[DATA].value ? num : num * -1);
		sortflag = {data: DATA, desc: num === 1, [DATA]: num === 1 ? '↓' : '↑'};
	};
</script>

<main>
	{#await getRecords() then val}
		<table>
			<thead>
				<tr>
					<th class="table-header" on:click={() => sortData('$id')}>レコード番号 {sortflag['$id'] || ''}</th>
					<th class="table-header" on:click={() => sortData('title')}>タイトル  {sortflag['title'] || ''}</th>
					<th class="table-header" on:click={() => sortData('triage')}>優先度 {sortflag['triage'] || ''}</th>
					<th class="table-header" on:click={() => sortData('type')}>タイプ {sortflag['type'] || ''}</th>
				</tr>
			</thead>
			<tbody>
				{#each recordsData as record}
					<tr>
						<td>{record.$id.value}</td>
						<td>{record.title.value}</td>
						<td>{record.triage.value}</td>
						<td>{record.type.value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/await}
</main>

<style>
	main {
		text-align: center;
	}
	main table {
		margin: auto;
	}
	.table-header {
		font-size: 20px;
		font-weight: 'bold';
		border: 1px solid #000;
	}
</style>