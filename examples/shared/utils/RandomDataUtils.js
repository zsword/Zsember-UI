Shared.define('utils.RandomDataUtils', {
	singleton: true,
	_names: ['Aaron','Abel','Abraham','Adam','Adrian','Alva','Alex','Alexander','Alan','Albert','Alfred','Andrew','Andy','Angus','Anthony','Arthur','Austin','Ben','Benson','Bill','Bob','Brandon','Brant','Brent','Brian','Bruce','Carl','Cary','Caspar','Charles','Cheney','Chris','Christian','Christopher','Colin','Cosmo','Daniel','Dennis','Derek','Donald','Douglas','David','Denny','Edgar','Edward','Edwin','Elliott','Elvis','Eric','Evan','Francis','Frank','Franklin','Fred','Gabriel','Gaby','Garfield','Gary','Gavin','George','Gino','Glen','Glendon','Harrison','Hugo','Hunk','Howard','Henry','Ignativs','Ivan','Isaac','Jack','Jackson','Jacob','James','Jason','Jeffery','Jerome','Jerry','Jesse','Jim','Jimmy','Joe','John','Johnny','Joseph','Joshua','Justin','Keith','Ken','Kenneth','Kenny','Kevin','Lance','Larry','Laurent','Lawrence','Leander','Lee','Leo','Leonard','Leopold','Loren','Lori','Lorin','Luke','Marcus','Marcy','Mark','Marks','Mars','Martin','Matthew','Michael','Mike','Neil','Nicholas','Oliver','Oscar','Paul','Patrick','Peter','Philip','Phoebe','Quentin','Randall','Randolph','Randy','Reed','Rex','Richard','Richie','Robert','Robin','Robinson','Rock','Roger','Roy','Ryan','Sam','Sammy','Samuel','Scott','Sean','Shawn','Sidney','Simon','Solomon','Spark','Spencer','Spike','Stanley','Steven','Stuart','Terence','Terry','Timothy','Tommy','Tom','Thomas','Tony','Tyler','Van','Vern','Vernon','Vincent','Warren','Wesley','William','Abigail','Abby','Ada','Adelaide','Adeline','Alexandra','Ailsa','Aimee','Alice','Alina','Allison','Amanda','Amy','Amber','Anastasia','Andrea','Angela','Angelia','Angelina','Ann','Anne','Annie','Anita','Ariel','April','Ashley','Aviva','Barbara','Beata','Beatrice','Becky','Betty','Blanche','Bonnie','Brenda','Camille','Candice','Carina','Carmen','Carol','Caroline','Carry','Carrie','Cassandra','Cassie','Catherine','Cathy','Chelsea','Charlene','Charlotte','Cherry','Cheryl','Chris','Christina','Christine','Christy','Cindy','Claudia','Clement','Cloris','Connie','Constance','Cora','Corrine','Crystal','Daisy','Daphne','Darcy','Debbie','Deborah','Debra','Demi','Diana','Dolores','Donna','Doris','Edith','Editha','Elaine','Eleanor','Elizabeth','Ella','Ellen','Ellie','Emerald','Emily','Emma','Enid','Elsa','Erica','Estelle','Esther','Eudora','Eva','Eve','Fannie','Fiona','Frances','Frederica','Frieda','Gina','Gillian','Gladys','Gloria','Grace','Greta','Gwendolyn','Hannah','Helena','Hellen','Hebe','Heidi','Ingrid','Ishara','Irene','Iris','Ivy','Jacqueline','Jamie','Jane','Janet','Jean','Jessica','Jessie','Jennifer','Jenny','Jill','Joan','Joanna','Jocelyn','Josephine','Josie','Joy','Joyce','Judith','Judy','Julia','Juliana','Julie','June','Karen','Karida','Katherine','Kate','Kathy','Katrina','Kay','Kelly','Kitty','Lareina','Laura','Lena','Lydia','Lillian','Linda','Lisa','Liz','Lorraine','Louisa','Louise','Lucia','Lucy','Lucine','Lulu','Lynn','Maggie','Mamie','Manda','Mandy','Margaret','Mariah','Martha','Mary','Matilda','Maureen','Mavis','Maxine','May','Mayme','Megan','Melinda','Melissa','Melody','Mercedes','Meredith','Michelle','Milly','Miranda','Miriam','Miya','Molly','Monica','Nancy','Natalie','Natasha','Nicole','Nikita','Nina','Olina','Oprah','Pamela','Paula','Pauline','Pearl','Peggy','Philomena','Phoebe','Phyllis','Polly','Priscilla','Quentina','Rachel','Rebecca','Regina','Rita','Rose','Roxanne','Ruth','Sabrina','Sandra','Samantha','Sandy','Sarah','Selma','Selina','Serena','Sharon','Sheila','Shelley','Sherry','Shirley','Silvia','Sonia','Stacy','Stella','Stephanie','Sue','Sunny','Susan','Tamara','Tammy','Tess','Teresa','Tiffany','Tina','Tracy','Vanessa','Vicky','Victoria','Vivian','Wanda','Wendy','Winnie','Yolanda','Yvette','Yvonne','Zoey'],
	randomInt: function(max, min) {
		return Math.floor(this.randomFloat(max, min));
	},
	randomFloat: function(max, min, scale) {
		min = min||0;
		var seed = max-min;
		var result = Math.random()*seed+min;
		if(scale) {
			result = result.toFixed(scale);
		}		
		return result;
	},
	randomNames: function(count, type) {
		var srcNames = this._names,
			max = srcNames.length;	
		var names = [];
		for(var i=0;i<count;i++) {
			var index = this.randomInt(max);
			var firstName = srcNames[index];
			index = this.randomInt(max);
			var lastName = srcNames[index];
			names.push(firstName+' '+lastName);
		}
		return names;
	}
}, function() {
	var names = this._names;
	if(!names || !names.length) {
		$.ajax({
			'url': SharedRoot+'/data/names_eng.txt',
			'success': function(data) {
				var list = data.split('\n');
				for(var i=0;i<list.length;i++) {
					var d = list[i],
						index = d.indexOf(',');
					names.push(d.substr(0, index));
				}
			}
		});
	}		
	Zsember.RandomDataUtils = this;
});