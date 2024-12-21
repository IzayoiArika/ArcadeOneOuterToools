function OnLoad()
{
	return {
		"providers": ["_tracify"],
		"info": {
			"_tracify": {
				"name": "Tracify",
				"params": [],
				"params_value": {
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

function _tracify() {
	
	var notes = GetSelectedNotes();
	if (notes.length < 1) return "notes == NULL";
	
	var note;
	for (var i = 0; i < notes.length; i++) {
	    note = notes[i];
	    
	    if (note instanceof ArcTap){
	    
	    	var xL = note.Track * 0.5 - 0.96;
	    	for (var i = xL; i <= xL + 0.44; i = i + 0.02){
				var arc = new ArcArc();
				arc.LineType = ArcLineType.S;
				arc.Timing = note.Timing;
				arc.EndTiming = note.Timing + 16;
				arc.Color = 0;
				arc.IsVoid = true;
				arc.TimingGroup = note.TimingGroup;
				arc.XStart = arc.XEnd = i;
				arc.YStart = arc.YEnd = -0.22;
				AddArcEvent(arc);
			}
			
			RemoveArcEvent(note);
		}
	    
	    if (note instanceof ArcHold){
	    
	    	var xL = note.Track * 0.5 - 0.96;
	    	for (var i = xL; i <= xL + 0.44; i = i + 0.02){
	    		if (i >= xL + 0.19 && i<= xL + 0.23 ) continue;
				var arc = new ArcArc();
				arc.LineType = ArcLineType.S;
				arc.Timing = note.Timing;
				arc.EndTiming = note.EndTiming;
				arc.Color = 0;
				arc.IsVoid = true;
				arc.TimingGroup = note.TimingGroup;
				arc.XStart = arc.XEnd = i;
				arc.YStart = arc.YEnd = -0.22;
				AddArcEvent(arc);
			}
			
			RemoveArcEvent(note);
		}
	    
	    
	    if (note instanceof ArcArc && note.IsVoid){
	    	
	    	var XEasing;
	    	var YEasing;
	    	XEasing = ArcLineTypeToEasing(note.LineType, "x");
	    	YEasing = ArcLineTypeToEasing(note.LineType, "y");
	    	
	    	for (var ai = 0; ai < note.ArcTaps.count; ai++) {
	    		var atTiming = note.ArcTaps[ai].Timing;
	    		var pc = (atTiming - note.Timing) / (note.EndTiming - note.Timing);
	    		var XBase = Ease.Easing(XEasing, note.XStart, note.XEnd, pc);
	    		var YBase = Ease.Easing(YEasing, note.YStart, note.YEnd, pc);
	    		
	    		for (var i = XBase - 0.25; i <= XBase + 0.26; i = i + 0.02){
	    			for (var j = YBase; j >= YBase - 0.16; j = j - 0.03){
		    			var arc = new ArcArc();
						arc.LineType = ArcLineType.S;
						arc.Timing = atTiming;
						arc.EndTiming = atTiming + 16;
						arc.Color = 0;
						arc.IsVoid = true;
						arc.TimingGroup = note.TimingGroup;
						arc.XStart = arc.XEnd = i;
						arc.YStart = arc.YEnd = j;
						AddArcEvent(arc);
					}
	    		}
			}
			
		    RemoveArcEvent(note);
		}
	    
	    if (note instanceof ArcArc && note.IsVoid == false){
						
			//L
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.EndTiming;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart - 0.08;
		    arc.XEnd = note.XEnd - 0.08;
			arc.YStart = note.YStart - 0.08;
			arc.YEnd = note.YEnd - 0.08;
			AddArcEvent(arc);
			
			//R
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.EndTiming;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart + 0.08;
		    arc.XEnd = note.XEnd + 0.08;
			arc.YStart = note.YStart - 0.08;
			arc.YEnd = note.YEnd - 0.08;
			AddArcEvent(arc);
			
			//U
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.EndTiming;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart;
		    arc.XEnd = note.XEnd;
			arc.YStart = note.YStart + 0.08;
			arc.YEnd = note.YEnd + 0.08;
			AddArcEvent(arc);
			
			//LU
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.EndTiming;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart - 0.04;
		    arc.XEnd = note.XEnd - 0.04;
			arc.YStart = note.YStart;
			arc.YEnd = note.YEnd;
			AddArcEvent(arc);
			
			//RU
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.EndTiming;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart + 0.04;
		    arc.XEnd = note.XEnd + 0.04;
			arc.YStart = note.YStart;
			arc.YEnd = note.YEnd;
			AddArcEvent(arc);
			
			//LLeg
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart - 0.02;
		    arc.XEnd = note.XStart - 0.02;
			arc.YStart = note.YStart - 0.12;
			arc.YEnd = -0.22;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart - 0.02;
		    arc.XEnd = note.XStart - 0.02;
			arc.YStart = note.YStart - 0.12;
			arc.YEnd = -0.22;
			AddArcEvent(arc);
			
			//RLeg
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart + 0.02;
		    arc.XEnd = note.XStart + 0.02;
			arc.YStart = note.YStart - 0.12;
			arc.YEnd = -0.22;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart + 0.02;
		    arc.XEnd = note.XStart + 0.02;
			arc.YStart = note.YStart - 0.12;
			arc.YEnd = -0.22;
			AddArcEvent(arc);
			
			//LHeadEdgeU
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart + 0.08;
		    arc.XEnd = note.XStart - 0.08;
			arc.YEnd = note.YStart - 0.08;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart + 0.08;
		    arc.XEnd = note.XStart - 0.08;
			arc.YEnd = note.YStart - 0.08;
			AddArcEvent(arc);
			
			//RHeadEdgeU
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
		    arc.XEnd = note.XStart + 0.08;
			arc.YEnd = note.YStart - 0.08;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart + 0.08;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
		    arc.XEnd = note.XStart + 0.08;
			arc.YEnd = note.YStart - 0.08;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart + 0.08;
			AddArcEvent(arc);
			
			//LHeadEdgeD
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart - 0.15;
		    arc.XEnd = note.XStart - 0.08;
			arc.YEnd = note.YStart - 0.08;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart -0.15;
		    arc.XEnd = note.XStart - 0.08;
			arc.YEnd = note.YStart - 0.08;
			AddArcEvent(arc);
			
			//RHeadEdgeD
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
		    arc.XEnd = note.XStart + 0.08;
			arc.YEnd = note.YStart - 0.08;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart - 0.15;
			AddArcEvent(arc);
			var arc = new ArcArc();
			arc.LineType = note.LineType;
			arc.Timing = note.Timing;
			arc.EndTiming = note.Timing;
			arc.Color = note.Color;
			arc.IsVoid = true;
			arc.TimingGroup = note.TimingGroup;
		    arc.XEnd = note.XStart + 0.08;
			arc.YEnd = note.YStart - 0.08;
			arc.XStart = note.XStart;
			arc.YStart = note.YStart - 0.15;
			AddArcEvent(arc);
			
			RemoveArcEvent(note);
	    }
	}
}
