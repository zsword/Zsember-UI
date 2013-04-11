Shared.defineStore('data.CookieUsers', {
	extend: Zsember.toStore('CookieStore'),
	alias: 'store.sharedCookieUsers',
	dataKey: 'shared.Users',
	dataExpire: new Date(3000, 1, 1),
	pageSize: 10
});