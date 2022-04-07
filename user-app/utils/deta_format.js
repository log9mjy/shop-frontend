export function formatTime(l) {
	var now = new Date();
	var date = new Date(l);
	var year1 = now.getFullYear();
	var year2 = date.getFullYear();
	var month1 = now.getMonth();
	var month2 = date.getMonth();
	var date1 = now.getDate();
	var date2 = date.getDate();
	var hour2 = date.getHours();
	var minute2 = date.getMinutes();
	// 不是同一年
	if (year1 !== year2) {
		return "" + year2 + "年" + month2 + "月" + date2 + "日";
	}
	// 不是同一月
	if (month1 !== month2) {
		return "" + month2 + "月" + date2 + "日";
	}
	if (date1 - date2 > 2) {
		return "" + month2 + "月" + date2 + "日";
	}
	if (date1 - date2 === 2) {
		return "前天";
	}
	if (date1 - date2 === 1) {
		return "昨天";
	}
	if (minute2 < 10) {
		return "" + hour2 + ":0" + minute2;
	}
	return "" + hour2 + ":" + minute2;
}
export function foramatTime2(l) {
	var now = new Date();
	var date = new Date(l);
	var year1 = now.getFullYear();
	var year2 = date.getFullYear();
	var month1 = now.getMonth();
	var month2 = date.getMonth();
	var date1 = now.getDate();
	var date2 = date.getDate();
	var hour2 = date.getHours();
	var minute2 = date.getMinutes();
	// 不是同一年
	if (year1 !== year2) {
		return "" + year2 + "年" + month2 + "月" + date2 + "日";
	}
	// 不是同一月
	if (month1 !== month2) {
		return "" + month2 + "月" + date2 + "日";
	}
	if (date1 - date2 > 2) {
		return "" + month2 + "月" + date2 + "日";
	}
	if (date1 - date2 === 2) {
		if (minute2 < 10) {
			return "前天 " + hour2 + ":0" + minute2;
		}
		return "前天 " + hour2 + ":" + minute2;
	}
	if (date1 - date2 === 1) {
		if (minute2 < 10) {
			return "昨天 " + hour2 + ":0" + minute2;
		}
		return "昨天 " + hour2 + ":" + minute2;
	}
	if (minute2 < 10) {
		return "" + hour2 + ":0" + minute2;
	}
	return "" + hour2 + ":" + minute2;
}
