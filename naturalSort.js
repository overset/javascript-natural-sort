/*
 * Natural Sort algorithm for Javascript
 *  Version 0.3
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 *  optimizations and safari fix by Mike Grier (mgrier.com)
 * Released under MIT license.
 */
function naturalSort(a, b){
	// setup temp-scope variables for comparison evauluation
	var re = /(-?[0-9\.]+)/g,
		nC = String.fromCharCode(0),
		x = a.toString().toLowerCase().split(nC)[0] || '',
		y = b.toString().toLowerCase().split(nC)[0] || '',
		xN = x.replace( re, nC + '$1' + nC ).split(nC),
		yN = y.replace( re, nC + '$1' + nC ).split(nC),
		xD = (new Date(x)).getTime(),
		yD = xD ? (new Date(y)).getTime() : null;
	// natural sorting of dates
	if ( yD )
		if ( xD < yD ) return -1;
		else if ( xD > yD )	return 1;
	// natural sorting through split numeric strings and default strings
	for( var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++ ) {
		oFxNcL = parseFloat(xN[cLoc]) || xN[cLoc];
		oFyNcL = parseFloat(yN[cLoc]) || yN[cLoc];
		if (oFxNcL < oFyNcL) return -1;
		else if (oFxNcL > oFyNcL) return 1;
	}
	return 0;
}