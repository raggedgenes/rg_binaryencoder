;(function() {
	'use strict';
	var BinaryEncoder = Object.create(null);
	var __nucls = Object.create(null);

	__nucls['A'] = 8;
	__nucls['T'] = 4;
	__nucls['C'] = 2;
	__nucls['G'] = 1;
	__nucls['N'] = 5;
	__nucls['-'] = 6;

	BinaryEncoder.scan16bit = function(seq) {
		//4mers!!
		var kmer = 4;
		var ta = [];
		var i = 0;
		while (seq[i]) {
			if (!seq[i+3]) return Buffer.from(Uint16Array.from(ta).buffer);
			var code = 0;
			code = __nucls[seq[i]];
			var k = 1;
			while (k < kmer) {
				code = code << 4;
				code |= __nucls[seq[i+k]];
				k++;
			}
			ta[i] = (code);
			i++;
		}

	}
	BinaryEncoder.bin2seq16bit = function(buf) {
		var seq = "";
		var i = 0;
		while (i <= (buf.length-2)) {
			var kmer = dekmerize16bit(buf.readUInt16LE(i));
			seq += kmer.charAt(0);
			i+=2;
		}
		seq += kmer.charAt(1);
		seq += kmer.charAt(2);
		seq += kmer.charAt(3);
		return seq;
	}
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
	BinaryEncoder.dekmerize8bit = function(kmer) {
		var utf = "";
		utf += decode(kmer >> 4);
		utf += decode(kmer & 15);
		return utf;
	}
	BinaryEncoder.bin2seq8bit = function(buff) {
		var i = 0;
		var utf = "";
		var t = 0;
		while (buff[i]) {
			t = buff[i];
			utf += decode(t  >> 4);
			i++;
			i++;
		}
		utf += decode(t & 15);
		return utf;
	}
	//Utils
	 function dekmerize16bit(kmer) {
		var utf = "";
		utf += decode(kmer >> 12);
		utf += decode((kmer >> 8) & 15);
		utf += decode((kmer >> 4) & 15);
		utf += decode(kmer & 15);
		return utf;
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
				default: console.log("hibas: " + code); return "-ERROR-";
			}
	}

	module.exports = BinaryEncoder;
}).call(this);