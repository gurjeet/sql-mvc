"use strict";

/*
speed/memory performance  is not important
ease of use is important

http://infoheap.com/jslint-command-line-on-ubuntu-linux/
 */
/*

handles scripting
tries to be db agnostic...relies on generic functions of the dbe

lot of wording ewxpresses sql or firebird PSQL, this is not the intent to limit it, just the lingo of the first platform

 */

/*
 */

/*
variables are expressed as firebird PSQL
fill constants are just that.
master.ref is replaced with #master_ref#
## gets expanded to '||var||'

keep a log of each record. master. being accessed they will need to be manually assigned later


a significant variance in the variables is the use of field short hands using assignments,
although this could be made fully generic it is not the intention to make it so,
thus we must optimise this case to simple text substitutions

 */
exports.module_name='template_control';

exports.tag_html = function (zx, line_obj) {
	// if (active_pass!=zx.pass) return true;
	zx.mt.lines.push(line_obj.html);
	if (line_obj.html.indexOf("<script") >= 0) {
		if (zx.pass === 1)
			console.warn('Script found in template - this wont execute in DOM - rather use <#jscript tag : in file:', line_obj.filename);
	}
};

exports.tag_print = function (zx, line_obj) {
	//simple code including <$selects>
	//also use for varios debug outputs - like passed parameters, etc..


	/*
	1 produces vars containing the database stuff
	produce a mt output of the non databse stuff
	 */

	zx.mt.lines.push(zx.expressions.TextWithEmbededExpressions(zx, line_obj, line_obj.nonkeyd, "mt", "tag_print"));

	//console.log('tag_print:',line_obj.nonkeyd );
	//<#print "($elect name from Me where ref=operator.ref $)">
};

exports.start_pass = function (zx) {
	zx.mt.lines = [];
	zx.mt.stack = [];
	zx.vid = 0; //value id key to sync data between sql,mt
};

exports.start_item = function () {
	return;
};
exports.done_item = function () {
	return;
};

exports.init = function (zx) {
	//
	//console.log('init template_control: ');

	//moustache templates
	zx.mt = {};
	zx.mt.lines = [];
	zx.mt.stack = [];
	zx.vid = 0; //value id key to sync data between sql,mt

	//exports.unit_test2(zx);
	//process.exit(2);
};

exports.done = function () {
	//console.log('done script: ',zx.variables);
	//console.log('done template_control: ');

};
