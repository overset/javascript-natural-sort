/*
 * Natural Sort algorithm for Javascript - Version 0.4 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams
 */
function naturalSort(a, b){
	// setup temp-scope variables for comparison evauluation
	var re = /([0-9]+(?:\.[0-9]+)?)/g,
		sre = /(^[ ]*|[ ]*$)/g,
		clre = /(^\0|\0$)/g,
		nC = '\0',
		x = a.toString().toLowerCase().replace(sre, '') || '',
		y = b.toString().toLowerCase().replace(sre, '') || '',
		xN = x.replace(re, nC + '$1' + nC).replace(clre, '').split(nC),
		yN = y.replace(re, nC + '$1' + nC).replace(clre, '').split(nC),
		xD = (new Date(x)).getTime(),
		yD = xD ? (new Date(y)).getTime() : null;
	// natural sorting of dates - prevent '1.2.3' valid date
	if ( y.indexOf('.') < 0 && yD )
		if ( xD < yD ) return -1;
		else if ( xD > yD )	return 1;
	// natural sorting through split numeric strings and default strings
	for( var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++ ) {
		oFxNcL = parseFloat(xN[cLoc]) || xN[cLoc] || '';
		oFyNcL = parseFloat(yN[cLoc]) || yN[cLoc] || '';
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return (isNaN(oFxNcL)) ? 1 : -1; 
		if (oFxNcL < oFyNcL) return -1;
		else if (oFxNcL > oFyNcL) return 1;
	}
	return 0;
}