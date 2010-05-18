/*
 * Natural Sort algorithm for Javascript - Version 0.4 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams
 */
function naturalSort(a, b){
	// setup temp-scope variables for comparison evauluation
	var re = /(^[0-9]+\.?[0-9]*[df]?(?:e?[0-9]?)$|^0x[0-9a-f]+$|[0-9]+)/g,
		sre = /(^[ ]*|[ ]*$)/g,
		hre = /^0x[0-9a-f]+$/g,
		ore = /^0/,
		nC = '\0',
		x = a.toString().toLowerCase().replace(sre, '') || '',
		y = b.toString().toLowerCase().replace(sre, '') || '',
		// first look for hex values otherwise chunk/tokenize
		xN = (x.search(hre) == 0 ? parseInt(x) + '' : x.replace(re, nC + '$1' + nC)).split(nC),
		yN = (y.search(hre) == 0 ? parseInt(y) + '' : y.replace(re, nC + '$1' + nC)).split(nC),
		xD = (new Date(x)).getTime(),
		yD = xD ? (new Date(y)).getTime() : null;
	// natural sorting of dates - prevent '1.2.3' valid date
	if ( y.indexOf('.') < 0 && yD )
		if ( xD < yD ) return -1;
		else if ( xD > yD )	return 1;
	// natural sorting through split numeric strings and default strings
	for( var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++ ) {
		// find floats not starting with '0', string or 0 if not defined
		oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return (isNaN(oFxNcL)) ? 1 : -1; 
		if (oFxNcL < oFyNcL) return -1;
		else if (oFxNcL > oFyNcL) return 1;
	}
	return 0;
}