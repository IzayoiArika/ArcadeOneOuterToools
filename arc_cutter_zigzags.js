function OnLoad()
{
	return {
		"providers": ["arc_cutter_zigzags"],
		"info": {
			"arc_cutter_zigzags": {
				"name": "切蛇工具 - 折线 v2.0",
				"params": ["分割数", "连接类型"],
				"params_value": {
					"分割数": "4",
					"连接类型": "parallel"
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

function arc_cutter_zigzags(divide, type) {

	var notes = GetSelectedNotes();
	
	if (notes.length != 2) return "请选择两个Arc。";
	
	if (!(notes[0] instanceof ArcArc) || !(notes[1] instanceof ArcArc))
	    return "请确保选择的两个物件均为Arc。";
	    
	var base, delta;
	if (notes[0].Color == 2){
		delta = notes[0];
		base = notes[1];
	}
	else if (notes[1].Color == 2){
		delta = notes[1];
		base = notes[0];
	}
	else return "请选择两个Arc，且其中之一颜色为绿色。";
	
	if (delta.EndTiming < base.EndTiming || delta.Timing > base.Timing)
	    return "请确保绿色Arc出现的时间段包含了另一条Arc出现的全程。";
	
	var baseXType = ArcLineTypeToEasing(base.LineType, "x");
	var baseYType = ArcLineTypeToEasing(base.LineType, "y");
	var deltaXType = ArcLineTypeToEasing(delta.LineType, "x");
	var deltaYType = ArcLineTypeToEasing(delta.LineType, "y");
	var parity = 0;

	for (var i = 0; i < divide; i++) {
	    var p = i / (divide);
    	var p1 = (i + 1) / (divide);
    	
    	var arc = new ArcArc();
    	arc.LineType = ArcLineType.S;
    	arc.Timing = Ease.Linear(base.Timing, base.EndTiming, p);
    	arc.EndTiming = Ease.Linear(base.Timing, base.EndTiming, p1);
    	arc.Color = base.Color;
    	arc.IsVoid = base.IsVoid;
    	arc.TimingGroup = base.TimingGroup;
    	
    	//Type 1: normal eg. Aegleseeker
    	if (type == "normal") {
    		if (parity == 0) {
    		    arc.XStart = Ease.Easing(baseXType, base.XStart, base.XEnd, p);
        		arc.XEnd = Ease.Easing(deltaXType, delta.XStart, delta.XEnd, p1);
        		arc.YStart = Ease.Easing(baseYType, base.YStart, base.YEnd, p);
        		arc.YEnd = Ease.Easing(deltaYType, delta.YStart, delta.YEnd, p1);
    		}
    		else {
        		arc.XStart = Ease.Easing(deltaXType, delta.XStart, delta.XEnd, p);
        		arc.XEnd = Ease.Easing(baseXType, base.XStart, base.XEnd, p1);
        		arc.YStart = Ease.Easing(deltaYType, delta.YStart, delta.YEnd, p);
        		arc.YEnd = Ease.Easing(baseYType, base.YStart, base.YEnd, p1);
    		}
    	    parity++;
    	    if (parity == 2) parity=0;
    	    AddArcEvent(arc);
    	}
    	else if (type == "parallel" || type == "rectangle") {
        	//Type 2: eg. 7thSense
    	    arc.XStart = Ease.Easing(baseXType, base.XStart, base.XEnd, p);
    		arc.XEnd = Ease.Easing(deltaXType, delta.XStart, delta.XEnd, p1);
    		arc.YStart = Ease.Easing(baseYType, base.YStart, base.YEnd, p);
    		arc.YEnd = Ease.Easing(deltaYType, delta.YStart, delta.YEnd, p1);
    		AddArcEvent(arc);
        	if (type == "parallel") continue;

        	//Type 3: eg. World Ender
        	var arclnk = new ArcArc();
        	arclnk.LineType = ArcLineType.S;
            arclnk.Timing = arclnk.EndTiming = Ease.Linear(base.Timing, base.EndTiming, p1);
            arclnk.Color = base.Color;
            arclnk.XStart = Ease.Easing(deltaXType, delta.XStart, delta.XEnd, p1);
            arclnk.XEnd = Ease.Easing(baseXType, base.XStart, base.XEnd, p1);
            arclnk.YStart = Ease.Easing(deltaYType, delta.YStart, delta.YEnd, p1);
            arclnk.YEnd = Ease.Easing(baseYType, base.YStart, base.YEnd, p1);
            arclnk.IsVoid = base.IsVoid;
            arclnk.TimingGroup = base.TimingGroup;
            AddArcEvent(arclnk);
    	}
    	else return "类型不正确，请查看帮助文档。";
	}
	RemoveArcEvent(base);
	RemoveArcEvent(delta);
}
