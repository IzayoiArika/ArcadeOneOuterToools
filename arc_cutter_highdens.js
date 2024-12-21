
//highdens for High Density

function OnLoad()
{
	return {
		"providers": ["arc_cutter_highdens"],
		"info": {
			"arc_cutter_highdens": {
				"name": "切蛇工具 - 高架桥",
				"params": ["分割数", "样式", "指定x缓动", "指定y缓动"],
				"params_value": {
					"分割数": "4",
					"样式": "1",
					"指定x缓动": "", 
					"指定y缓动": ""
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

function arc_cutter_highdens(divide, type, xalt, yalt) {

	var notes = GetSelectedNotes();
	if (notes.length != 1) return "请只选择一个Arc。";
	var note = notes[0];
	if (!(note instanceof ArcArc)) return "请选择一个Arc。";
	
	var HeightAlteringStatus = -1;
	if (note.YStart == note.YEnd) HeightAlteringStatus = 0;
	
	var isVoid = note.IsVoid;
	var XType; var YType;
	
	if (xalt == "") XType = ArcLineTypeToEasing(note.LineType, "x");
	else XType = xalt;
	
	if (yalt == "") YType = ArcLineTypeToEasing(note.LineType, "y");
	else YType = yalt;
	
	for (var i = 0; i < divide; i++) {
		var p = i / (divide);
		var p1 = (i + 1) / (divide);
		var arc = new ArcArc();
		arc.LineType = ArcLineType.S;
		arc.Timing = Ease.Linear(note.Timing, note.EndTiming, p);
		arc.EndTiming = Ease.Linear(note.Timing, note.EndTiming, p1);
		if (type == 2) arc.EndTiming = arc.EndTiming - 1;
		arc.Color = note.Color;
		arc.XStart = Ease.Easing(XType, note.XStart, note.XEnd, p);
		if (type == 4 || type == 7 || type == 6) arc.XEnd = Ease.Easing(XType, note.XStart, note.XEnd, p);
		else arc.XEnd = Ease.Easing(XType, note.XStart, note.XEnd, p1);
		arc.YStart = Ease.Easing(YType, note.YStart, note.YEnd, p);
		if (type == 4 || type == 7 || type == 5) arc.YEnd = Ease.Easing(YType, note.YStart, note.YEnd, p);
		else arc.YEnd = Ease.Easing(YType, note.YStart, note.YEnd, p1);
		if (type == 1 || type == 2){
		    if (HeightAlteringStatus == 0){
		        HeightAlteringStatus = 1;
		        if (arc.YEnd == 0) arc.YEnd = arc.YEnd + 0.01;
		        else arc.YEnd = arc.YEnd - 0.01;
		    }
		    else if (HeightAlteringStatus == 1){
		        HeightAlteringStatus = 0;
		        if (arc.YStart == 0) arc.YStart = arc.YStart + 0.01;
		        else arc.YStart = arc.YStart - 0.01;
		    }
		}
		if (type == 3) {
			if (isVoid) arc.IsVoid = true;
			else arc.IsVoid = false;
			isVoid = !isVoid;
		}
		else {
			arc.IsVoid = isVoid;
		}
		if (type == 8) {
			arc.EndTiming = Ease.Linear(note.Timing, note.EndTiming, (p+p1)/2);
			arc.XEnd = Ease.Easing(XType, note.XStart, note.XEnd, (p+p1)/2);
			arc.YEnd = Ease.Easing(YType, note.YStart, note.YEnd, (p+p1)/2);
		}
		arc.TimingGroup = note.TimingGroup;
		AddArcEvent(arc);
		if (type == 7) {
			var arc = new ArcArc();
			arc.LineType = ArcLineType.S;
			arc.Timing = Ease.Linear(note.Timing, note.EndTiming, p1);
			arc.EndTiming = Ease.Linear(note.Timing, note.EndTiming, p1);
			arc.Color = note.Color;
			arc.XStart = Ease.Easing(XType, note.XStart, note.XEnd, p);
			arc.XEnd = Ease.Easing(XType, note.XStart, note.XEnd, p1);
			arc.YStart = Ease.Easing(YType, note.YStart, note.YEnd, p);
			arc.YEnd = Ease.Easing(YType, note.YStart, note.YEnd, p1);
			arc.IsVoid = isVoid;
			arc.TimingGroup = note.TimingGroup;
			AddArcEvent(arc);
		}
	}
	RemoveArcEvent(note);
}
