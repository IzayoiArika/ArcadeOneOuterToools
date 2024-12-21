
//highdens for High Density

function OnLoad()
{
	return {
		"providers": ["arc_extract"],
		"info": {
			"arc_extract": {
				"name": "切蛇工具 - 提取某段",
				"params": ["开始时间","结束时间"],
				"params_value": {
					"开始时间": "0",
					"结束时间": "1000"
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

function arc_extract(startT, endT) {

	var notes = GetSelectedNotes();
	if (notes.length != 1) return "请只选择一个Arc。";
	var note = notes[0];
	if (!(note instanceof ArcArc)) return "请选择一个Arc。";
	
	var isVoid = note.IsVoid;
	var XType; var YType;
	XType = ArcLineTypeToEasing(note.LineType, "x");
	YType = ArcLineTypeToEasing(note.LineType, "y");
	var ps = (startT-note.Timing)/(note.EndTiming-note.Timing);
	var pe = (endT-note.Timing)/(note.EndTiming-note.Timing);
	
	var arc = new ArcArc();
	arc.LineType = ArcLineType.S;
	arc.Timing = startT;
	arc.EndTiming = endT;
	arc.Color = note.Color;
	arc.XStart = Ease.Easing(XType, note.XStart, note.XEnd, ps);
	arc.XEnd = Ease.Easing(XType, note.XStart, note.XEnd, pe);
	arc.YStart = Ease.Easing(YType, note.YStart, note.YEnd, ps);
	arc.YEnd = Ease.Easing(YType, note.YStart, note.YEnd, pe);
	arc.TimingGroup = note.TimingGroup;
	AddArcEvent(arc);
}
