var BinaryEncoder = Object.create(null);

	
var __nucls = Object.create(null);

__nucls['A'] = 8;
__nucls['T'] = 4;
__nucls['C'] = 2;
__nucls['G'] = 1;
__nucls['N'] = 5;
__nucls['-'] = 6;

//encoding - decoding
BinaryEncoder.encode16bit = function(seq) {
	var ret;
	var i = 0;
	ret = __nucls[seq[0]];
	ret = ret << 4;
	ret |= __nucls[seq[1]];
	ret = ret << 4;
	ret |= __nucls[seq[2]];
	ret = ret << 4;
	ret |= __nucls[seq[3]]
	return ret;
}
BinaryEncoder.dekmerize16bit = function(kmer) {
	var utf = "";
	utf += decode(kmer >> 12);
	utf += decode((kmer >> 8) & 15);
	utf += decode((kmer >> 4) & 15);
	utf += decode(kmer & 15);
	return utf;
}
BinaryEncoder.dekmerize8bit = function(kmer) {
	var utf = "";
	utf += decode(kmer >> 4);
	utf += decode(kmer & 15);
	return utf;
}
BinaryEncoder.bin2seq8bit = function(buff) {
	var i = 0;
	var utf = "";
	while (buff[i]) {
		utf += dekmerize8bit(buff[i]);
		i++;
	}
	console.log(utf);
}
function decode(code) {
	switch (code) {
			case 8: return "A";
			case 4: return "T";
			case 2: return "C";
			case 1: return "G";
			case 5: return "N";
			case 6: return "-";
			case 7: return "\n";
			case 0: return "";
			default: console.log(code); return "\nERROR\n";
		}
}
module.exports = BinaryEncoder;