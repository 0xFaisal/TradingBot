var discord = require('discord.js');
var client = new discord.Client();
var MySql = require('sync-mysql');
 var steps = { };
 var answers = { };
 var buystores = { };
 var stepsnew = { };
 var token = "token here";
 sql = new MySql({
  host: 'localhost',
  user: 'root',
	password: 'Aa1234123',
	database: 'trading'
});
const moment = require("moment");
require("moment-duration-format");
var lang = {
"0": {
"companyname": "Name of your company!",
"yoursalray": "Put Your salary",
"mustnumber": "Must be a number: 1234:",
"citys": "You must choose one of these cities",
"notfoundstores": "No shops found in the selected area!",
"alreadylang": " The ad started before! ",
"adserr": "You need put the job employees count ( must be a number) ",
"errbuystore": "You do not have enough staff!",
"startedad": "the ad is started!"
},
"1": {
"companyname": "ضع اسم الشركة!",
"yoursalray": "ضع راتبك!",
"mustnumber": "يجب ان يكون رقمأ :1234:",
"citys": "يجب اختيار وحده من هذه المدن!",
"notfoundstores": "لايوجد محلات بالمنطقة الحالية!",
"adserr": "يجب وضع الشروط [ -ads 5 ]  5 - عدد الموظفين المطلوبين!",
"alreadylang": "تم بدا الاعلان من قبل!",
"errbuystore": "ليس لديك عدد كافي من الموظفين!",
"startedad": "جاري البدء بالاعلان!"
}
}
var test = {  };
var tests = { }
function getLang (g) {
var result = sql.query(`SELECT lang FROM tradingguilds WHERE serverid = ${g.id}`)
if(!result.length) {
	sql.query(`INSERT INTO tradingguilds (serverid, lang) VALUES (${g.id}, 0)`)
}
return sql.query(`SELECT lang FROM tradingguilds WHERE serverid = ${g.id}`)[0].lang;
}
/*
 0 > english
 1 > Arabic
*/

client.on('ready', () => {
	console.log(client.user.username + ' is ready ')
	console.log(client.user.id + ' is ready')
	console.log(client.guilds.size + ' Guilds ready')
	console.log(client.users.size + ' users ready')
	console.log(client.channels.size + ' Channels ready')
	client.guilds.forEach(g => {
		getLang(g)
		var result = sql.query(`SELECT lang FROM tradingguilds WHERE serverid = ${g.id}`)
 if(!result.length) {
	 sql.query(`INSERT INTO tradingguilds (serverid, lang) VALUES (${g.id}, 0)`)
 }
	})
})

function addStores () {
var citys = ["NYC", "RUH", "JED", "LON", "MIL", "ROM", "MAN", "BER", "LCA", "MAD", "FRA", "BAH", "CAI", "MCT", "TUN", "AMW", "MED", "BEG", "GVA", "PAR"]
var shops = ["Viral Life", "Commerce Life", "Span Life", "Skilled Life", "ProBot", "Seeker Life", "Tribe Life", "Resolve Life", "Pro Shows", "Max Pro", "BigIdea Pro", "Econo Pro", "Style Pro", "Pro Emerge", "Aspire Pro", "Beam Pro", "Singularity Pro", "Tunnel Pro", "Fiesta Pro", "RightBrain Pro", "Services Pro", "NewLook Pro", "Ping Pro", "Door Pro", "Graphics Pro", "Easy Pro", "Excite Pro", "Osprey Pro", "Reputation Pro", "Pro Focused", "Pantheon Pro", "FullThrottle Pro", "Pilgrim Pro", "Pro Consult", "Rush Pro", "ster Pixel", "Corner Pixel", "WildWest Pixel", "RedHot Pixel", "Pixel Cast", "Strategies Pixel", "Aztec Pixel", "Topics Pixel", "Name Pixel", "Plexus Future", "Intra Future", "Candy Future", "Cellar Future", "Square Future", "Train Future", "Parachute Future", "Chase Future", "Chief Bucks", "Sky Bucks", "Buys Bucks", "Southern Bucks", "Common Bucks", "Renewal Bucks", "Networks Bucks", "Baron Bucks"];
setInterval(function () {
	var city = citys[Math.floor(Math.random() * citys.length)];
	var bigcitys = ["NYC", "LON", "MAD", "FRA", "PAR"];
	var stores = shops[Math.floor(Math.random() * shops.length)]
	if(bigcitys.includes(city)) {
		sql.query("INSERT INTO tradingstores (name, city, owned, companyowner, price) VALUES (?, ?, ?, ?, ?)", [shops[Math.floor(Math.random() * shops.length)], city, 0, 0, Math.floor(Math.random() * 100) + 60] )
	} else {
		sql.query("INSERT INTO tradingstores (name, city, owned, companyowner, price) VALUES (?, ?, ?, ?, ?)", [stores, city, 0, 0, Math.floor(Math.random() * 10) + 50] )
	}
//sql.query(`INSERT INTO (name, city, owned, companyowner, price) VALUES (${shops[Math.floor(Math.random() * shops.length)]}, ${citys[Math.floor(Math.random() * citys.length)]}, 0, ${message.author.id},  )`)
}, 1000*60*15)
//sql.query(`INSERT INTO (name, city, owned, companyowner, price) VALUES (`)
}
addStores()
function checkBankMoney (user) {
	var result = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${user.id}`)
	if(!result.length) {
		console.log('doesnt have')
		sql.query(`INSERT INTO tradingbank (userid, creditcard, cash) VALUES (${user.id}, 1000, 500)`)
		return false;
	} else {
		return true;
	}
}

function collectmoney () {
var gets = sql.query(`SELECT companyowner, price FROM tradingstores WHERE owned = 1`);
if(!gets.length) return;
setInterval(function () {
	var i;
for (i = 0; i < gets.length; i++) { 
	console.log(gets[i].companyowner)
	console.log(gets[i])
	console.log(gets)
	console.log(gets[i].price)
var bank = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${gets[i].companyowner}`)
sql.query(`UPDATE tradingbank SET creditcard = ${bank[0].creditcard - gets[i].price} WHERE userid = ${gets[i].companyowner}`)
}
}, 1000*60*60)

}
collectmoney()

function empsalary () {
setInterval( function () {
	var result = sql.query(`SELECT * FROM tradingjobs`);
	if(!result.length) return;
	var i;
	for (i = 0; i < result.length; i++) { 
	var bank = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${result[i].ownerid}`)
	console.log(result[i])
	sql.query(`UPDATE tradingbank SET creditcard = ${bank[0].creditcard - result[i].salary} WHERE userid = ${result[i].ownerid}`)
	}
}, 1000*60*60)
}
empsalary()
function getsMoney () {
	var gets = sql.query(`SELECT price, companyowner FROM tradingstores WHERE owned = 1`);
	if(!gets.length) return;
setInterval(function () {
	var i;
	for (i = 0; i < gets.length; i++) { 
	var bank = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${gets[i].companyowner}`)
	var calc = Math.floor(Math.random() * 1.1) + 0.6;
	var newmoney = parseInt(gets[i].price * calc);
	console.log(calc + ' | ' + newmoney)
	sql.query(`UPDATE tradingbank SET creditcard = ${bank[0].creditcard + newmoney} WHERE userid = ${gets[i].companyowner}`)
	}
}, 1000*60*60)

}
getsMoney()
function checkCompanys (user) {
	var result = sql.query(`SELECT name FROM tradingcompanys WHERE ownerid = ${user.id}`)
	if(!result.length) {
		return false;
	} else {
		return true;
	}
}
var names = { };
var price = { };
client.on('message', message => {
	if(!message.guild) {
		if(stepsnew[message.author.id] == 1) {
			if(!parseInt(message.content)) return message.reply('Must be number ! :1234:')
			if(!message.content > tests[message.author.id]["info"]["one"]) return message.reply('It must be a smaller number than ' + tests[message.author.id]["info"]["one"])
			tests[message.author.id]["info"]["one"] = tests[message.author.id]["info"]["two"];
			var result = sql.query(`SELECT name FROM tradingcompanys WHERE ownerid = ${message.author.id}`)
			message.reply('تم إضافته بنجاح!')
			sql.query(`INSERT INTO tradingjobs (userid, name, coname, ownerid, salary) VALUES (${message.content}, '${tests[message.author.id]["info"][message.content]["name"]}', '${result[0].name}', ${message.author.id}, ${tests[message.author.id]["info"][message.content]["salary"]})`)
			delete stepsnew[message.author.id];
		}
	}
if(!message.guild) return;
if(message.author.bot) return;
const args = message.content.split(/\s+/g);

if(message.content.startsWith('-new')) {
if(!steps[message.member.id]) {
	if(!checkCompanys(message.author)) {

	message.reply(`** ${lang[getLang(message.guild)]["companyname"]} **`).then( () => {
		steps[message.member.id] = 1;
		answers[message.member.id] = {}
	}) 
} else {
	message.reply("**You're opened company before the name is ``" + sql.query(`SELECT name FROM tradingcompanys WHERE ownerid = ${message.author.id}`)[0].name + "``**")
}
}
}
if(steps[message.member.id] == 1) {
	answers[message.member.id]["name"] = message.content;
	message.reply(lang[getLang(message.guild)]["yoursalray"]).then( ( ) => {
		steps[message.member.id] = 2;
	})
}
if(steps[message.member.id] == 2) {
	answers[message.member.id]["salary"] = message.content;
	if(!parseInt(message.content)) return message.reply(lang[getLang(message.guild)]["mustnumber"])
	message.reply(`Company Name! ${answers[message.member.id]["name"]} | Your CEO salary! ${answers[message.member.id]["salary"]}`)
	checkBankMoney (message.author)
	sql.query("INSERT INTO tradingcompanys (ownerid, name, employees, stocks) VALUES (?, ?, ?, ?)", [message.author.id, answers[message.member.id]["name"], 1, 5])
	sql.query("INSERT INTO tradingjobs (userid, name, coname, ownerid, salary) VALUES (?, ?, ?, ?, ?)", [message.author.id, message.author.username, answers[message.member.id]["name"], message.author.id, answers[message.member.id]["salary"]] )
	delete steps[message.member.id];
	delete answers[message.member.id]
}
if(message.content.startsWith('-setlang')) {
	if(!message.guild) return;
	if( !message.member.hasPermission( 'ADMINISTRATOR' ) ) return;
	if(args[1] == "en") {
		sql.query(`UPDATE tradingguilds SET lang = 0 WHERE serverid = ${message.guild.id}`)
		message.reply('done, i change it to English!')
	}
	if(args[1] == "ar") {
		sql.query(`UPDATE tradingguilds SET lang = 1 WHERE serverid = ${message.guild.id}`)
		message.reply('تم, تغيير الغة الى العربية!')

	}
	}
if(message.content.startsWith('-buystore')) {
	if(checkCompanys(message.author)) {
		var result = sql.query(`SELECT name FROM tradingcompanys WHERE ownerid = ${message.author.id}`)
		var checkjobs = sql.query(`SELECT userid FROM tradingjobs WHERE coname = '${result[0].name}'`)
		var checkstores = sql.query(`SELECT price FROM tradingstores WHERE companyowner = ${message.author.id}`)
		if(checkjobs.length <= checkstores.length) return message.reply(lang[getLang(message.guild)]["errbuystore"]);
		var citys = ["NYC", "RUH", "JED", "LON", "MIL", "ROM", "MAN", "BER", "LCA", "MAD", "FRA", "BAH", "CAI", "MCT", "TUN", "AMW", "MED", "BEG", "GVA", "PAR"]
		if(!args[1]) {
		 message.reply(lang[getLang(message.guild)]["citys"])
		 message.reply(citys)

	} else {
if(!citys.includes(args[1]))  {
	message.reply(lang[getLang(message.guild)]["citys"])
	message.reply(citys.join(' '))
} else {
var nyc = sql.query(`SELECT name, price FROM tradingstores WHERE city = '${args[1]}' AND owned = 0`)
if(!nyc.length) return message.reply(lang[getLang(message.guild)]["notfoundstores"])
let embed = new discord.RichEmbed()
.setColor("000000")
.setFooter('#' + message.guild.name + ' - Trading Bot')
.setAuthor(' Author : ' + message.member.displayName)
names[message.member.id] = { };
price[message.member.id] = { };
var i;
for (i = 0; i < nyc.length; i++) { 
 embed.addField(`${args[1]} City | Price`, `${i + 1} - ${nyc[i].name} | ${nyc[i].price} $ / h `, true)
 
 names[message.member.id][i + 1] = nyc[i].name;
 price[message.member.id][i + 1] = nyc[i].price;
}
message.reply({ embed }).then( () => {
	buystores[message.member.id] = 1;
})
}
	}
}
}

if(buystores[message.member.id] == 1) {
	if(parseInt(message.content)) {
		if(!names[message.member.id][message.content]) return;
		var cash = sql.query(`SELECT cash FROM tradingbank WHERE userid = ${message.member.id}`)
		var bank = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${message.member.id}`)
if(cash[0].cash + bank[0].creditcard > price[message.member.id][message.content]) {
		message.reply('Thanks to buy ' + names[message.member.id][message.content])
		sql.query(`UPDATE tradingstores SET owned = 1 WHERE name = '${names[message.member.id][message.content]}' AND owned = 0 AND price = ${price[message.member.id][message.content]}`)
		sql.query(`UPDATE tradingstores SET companyowner = ${message.member.id} WHERE name = '${names[message.member.id][message.content]}' AND owned = 1 AND price = ${price[message.member.id][message.content]}`)

	} else {
	message.reply("You don't Have money!")
}
	}
}
if(message.content.startsWith('-myco')) {
	let member = message.member;
	if( message.mentions.members.first( ) ){
			member = message.mentions.members.first( );
	}
	if(!checkCompanys(member)) {
message.reply("** YOU DON'T HAVE COMPANY OPEN ONE WITH ``-newco`` **")
} else {
	var cash = sql.query(`SELECT cash FROM tradingbank WHERE userid = ${member.id}`)
	var bank = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${member.id}`)
	var name =  sql.query(`SELECT name FROM tradingcompanys WHERE ownerid = ${member.id}`)
	var stocks = sql.query(`SELECT stocks FROM tradingcompanys WHERE ownerid = ${member.id}`)
	var jobs = sql.query(`SELECT * FROM tradingjobs WHERE ownerid = ${member.id}`)
	let embed = new discord.RichEmbed()
	.setFooter('© TradingBot By Faisal#3122')
	.setColor(0x36393f)
	.setAuthor(member.displayName,member.user.displayAvatarURL)
		.addField('»  Co - Name ',`**${name[0].name}**`,true)
		.addField('»  Co - Balance  / Bank / Cash ',`**${cash[0].cash + bank[0].creditcard} / ${bank[0].creditcard} / ${cash[0].cash}**`,true)
		.addField('»  Co - Stocks ',`**${stocks[0].stocks}**`,true)
		.addField('»  Co - Employees ',`**${jobs.length}**`,true)

		message.reply( { embed } );
}
}
if(message.content.startsWith('-inv')) {

	if(message.channel.type == "DM") {
		message.author.send('https://discordapp.com/oauth2/authorize?client_id=501019277403357184&scope=bot&permissions=117760')
	} else {
		message.reply('جاري الارسال!').then(m => {


			m.edit('تم الارسال')
			message.author.send('https://discordapp.com/oauth2/authorize?client_id=501019277403357184&scope=bot&permissions=117760').catch(err => {
				m.edit('حدث خطأ!')
			})
		})
	}
}
if(message.content.startsWith('-support')) {

	if(getLang(message.guild) == 1) {
	message.author.send('سيرفر الدعم الفني \n https://discord.gg/GP3brjb')
} else {
	message.author.send('https://discord.gg/GP3brjb')
}
}
if(message.content.startsWith('-help')) {

if(getLang(message.guild) == 1) {
	message.author.send(
	 " - Trading Bot By Faisal#3122  \n - نظام التجارة هو نظام جديد كليأ على مستوى الديسكورد فكرته عباره عن شركات ومحلات تقوم بفتح واحده وجلب موظفين عباره الاعلان ! والى ان يزداد ارباحك وتصبح من الاوائل! على النظام \n \n -new > لفتح شركة جديده! \n -setlang > لتغيير الغة \n -buystore > لشراء متجر! \n -myco > لمشاهدة البروفايل! \n -inv > لدعوة البوت \n -support > لسيرفر الدعم الفني! \n -stats > لمعرفة احصائيات البوت والاشياء المهمة!")
}
if(getLang(message.guild) == 0) {
	message.author.send(
		"Trading system is a new system in discord \n The idea is about of companys and shops which it opens a one  and add employees like an annoucement ! Until your profits increase and will be one of the top on the system 	\n -new > to open a new company \n -setlang > to change language \n-buystore > to buy a store \n-myco > to check your profile \n -inv > to invite the bot to your server \n-support > to join the support server of the bot \n -stats > to know statistics of the bot and the important things!"
	)
}
}
if(message.content.startsWith('-ads')) {

	if(checkCompanys(message.author)) {
	if(test[message.author.id]) return message.reply(lang[getLang(message.guild)]["alreadylang"]);
	if(!args[1]) return message.reply(lang[getLang(message.guild)]["adserr"]);
	if(!parseInt(args[1])) return message.reply(lang[getLang(message.guild)]["adserr"]);

		message.reply(lang[getLang(message.guild)]["startedad"]);
		tests[message.author.id] = { };

		tests[message.author.id]["info"] = { };
		tests[message.author.id]["info"]["one"] = args[1];
		tests[message.author.id]["info"]["two"] = 0;
	test[message.author.id] = setInterval( function ( ) {
   if(tests[message.author.id]["info"]["one"] == tests[message.author.id]["info"]["two"]) {
	stepsnew[message.author.id] = 1; 
	message.author.send('You can choose now!	')
	var creditcard = sql.query(`SELECT creditcard FROM tradingbank WHERE userid = ${message.author.id}`)
		sql.query(`UPDATE tradingbank SET creditcard = ${creditcard[0].creditcard - args[1]*100} WHERE userid = ${message.author.id}`)
	clearInterval(test[message.author.id])
	   delete test[message.author.id];
   } else {
	   var names = ["Jennifer E. Winters", "Gary B. Gentle", "Bertram T. Williams", "Giovana Cunha Carvalho", "Cheryl McGuire", "Mark F. Gonzales", "Mary Peterson", "Donna S. Comstock", "Joanne A. Williams", "Bonnie J. Piper"]
	   tests[message.author.id]["info"]["two"]++;
	   tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]] = { };
tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["name"] = names[Math.floor(Math.random() * names.length)];
tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["age"] = Math.floor(Math.random() * 40) + 18;
tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["salary"] = Math.floor(Math.random() * 60) + 40;

	   let embed = new discord.RichEmbed()
	.setColor("000000")
	.setFooter('#' + message.guild.name + ' - Trading Bot')
	.setAuthor(' ID : ' + tests[message.author.id]["info"]["two"])
	.addField('Name : ', tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["name"])
	.addField('Age : ', tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["age"] + " Year!")
	.addField('Salary	: ', tests[message.author.id]["info"][tests[message.author.id]["info"]["two"]]["salary"] + "$ / h")

	   message.author.send(embed)
   }


	}, 10000)
	}
}
if(message.content.startsWith('-stats')) {

	const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new discord.RichEmbed()
           .setColor("RANDOM")
           .setDescription("``Stats``")
           .addField('• Uptime' ,`${duration}`)
           .addField('• Users' ,`${client.users.size.toLocaleString()}`)
           .addField('• Servers' ,`${client.guilds.size.toLocaleString()}`)
           .addField('• Channels' ,`${client.channels.size.toLocaleString()}`)
           .addField('• Developer ' ,`Faisal#3122`)
message.channel.send({embed});
}
})

client.login(token)