function OnLoad()
{
	return {
		"providers": ["kicktrace"],
		"info": {
			"kicktrace": {
				"name": "Kick Trace",
				"params": ["Strength","Division","Direction Reverse"],
				"params_value": {
					"Strength": "0.13",
					"Division": "12",
					"Direction Reverse": ""
				}
			}
		}
	}
}

function ArcLineTypeToEasing(type, direction) {
    if (direction == "y"){
        switch (type) {
		    case ArcLineType.B:
		    	return "InOutSine";
	    	case ArcLineType.SiSi:
	    	case ArcLineType.SoSi:
		    	return "OutSine";
	    	case ArcLineType.SoSo:
	    	case ArcLineType.SiSo:
	    		return "InSine";
		    default:
		    	return "Linear";
	    }
    }
    else if (direction == "x"){
        switch (type) {
		    case ArcLineType.B:
		    	return "InOutSine";
	    	case ArcLineType.Si:
	    	case ArcLineType.SiSi:
	    	case ArcLineType.SiSo:
		    	return "OutSine";
	    	case ArcLineType.So:
	    	case ArcLineType.SoSo:
	    	case ArcLineType.SoSi:
	    		return "InSine";
		    default:
		    	return "Linear";
	    }
    }
    else return "Linear";
}

function kicktrace(strength, division, dirrev) {

	var notes = GetSelectedNotes();
	
	division /= 1;
	strength *= 1.0;
	if (dirrev == "") dirrev = -1;	else dirrev = 1;

	for (var k = 0; k < notes.length; k++) {

		if (!(notes[k] instanceof ArcArc))	continue;

		var parity = 0;

		for (var i = 0; i < division; i++) {
			var p = i / (division);
			var p1 = (i + 1) / (division);
			
			var arc = new ArcArc();
			arc.LineType = ArcLineType.S;
			arc.Timing = Ease.Linear(notes[k].Timing, notes[k].EndTiming, p);
			arc.EndTiming = Ease.Linear(notes[k].Timing, notes[k].EndTiming, p1);
			arc.Color = notes[k].Color;
			arc.IsVoid = notes[k].IsVoid;
			arc.TimingGroup = notes[k].TimingGroup;
			
			//Type 1: normal eg. Aegleseeker
			if (parity == 0) {
				arc.XStart = Ease.Easing("OutSine", notes[k].XStart + dirrev * strength, notes[k].XEnd, p);
				arc.XEnd = Ease.Easing("OutSine", notes[k].XStart - dirrev * strength, notes[k].XEnd, p1);
				arc.YStart = Ease.Easing("OutSine", notes[k].YStart, notes[k].YEnd, p);
				arc.YEnd = Ease.Easing("OutSine", notes[k].YStart, notes[k].YEnd, p1);
			}
			else {
				arc.XStart = Ease.Easing("OutSine", notes[k].XStart - dirrev * strength, notes[k].XEnd, p);
				arc.XEnd = Ease.Easing("OutSine", notes[k].XStart + dirrev * strength, notes[k].XEnd, p1);
				arc.YStart = Ease.Easing("OutSine", notes[k].YStart, notes[k].YEnd, p);
				arc.YEnd = Ease.Easing("OutSine", notes[k].YStart, notes[k].YEnd, p1);
			}
			parity++;
			if (parity == 2) parity=0;
			AddArcEvent(arc);
		}
		RemoveArcEvent(notes[k]);
	}
	
}
