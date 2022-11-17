
function OnLoad()
{
	return {
		"providers": ["note_to_trace"],
		"info": {
			"note_to_trace": {
				"name": "辅助工具 - 保留物件轮廓",
				"params": ["hidegroup时间组编号"],
				"params_value": {
					"hidegroup时间组编号": ""
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

function setArc(lt,c,tg,iv,tm,etm,xs,xe,ys,ye) {
	var arc = new ArcArc();
	arc.LineType = lt;
	arc.Color = c;
	arc.TimingGroup = tg;
	arc.IsVoid = iv;
	arc.Timing = tm;
	arc.EndTiming = etm;
	arc.XStart = xs;
	arc.XEnd = xe;
	arc.YStart = ys;
	arc.YEnd = ye;
	return arc;
}

function note_to_trace(hgTg) {
	var isntOnlyFrame = (hgTg != "");
	var notes = GetSelectedNotes();
	if (notes.length < 1) return "请选择要保留轮廓的物件。";
	var note;

	for (var i = 0; i < notes.length; i++) {
	    note = notes[i];
		var arc = new ArcArc;
		if (note instanceof ArcTap || note instanceof ArcHold) {
			if (note instanceof ArcArcTap) continue;
			var tg = note.TimingGroup;
			var tm = note.Timing;
			var etm = tm+25;
			var xl = note.Track*0.5-0.97;
			var xr = note.Track*0.5-0.53;

			if (note instanceof ArcHold) {
				etm = note.EndTiming;
				arc = setArc(ArcLineType.S,0,tg,true,tm,etm,note.Track*0.5-0.75,note.Track*0.5-0.75,-0.22,-0.22);
				AddArcEvent(arc);
				if (isntOnlyFrame) {
					//Hide original hold
					hold = new ArcHold();
					hold.Timing = note.Timing;
					hold.EndTiming = note.EndTiming;
					hold.Track = note.Track;
					hold.TimingGroup = hgTg;
					AddArcEvent(hold);
				}
			} else {
				if (isntOnlyFrame) {
					//Hide original tap
					tap = new ArcTap();
					tap.Timing = note.Timing;
					tap.Track = note.Track;
					tap.TimingGroup = hgTg;
					AddArcEvent(tap);
				}
			}

			arc = setArc(ArcLineType.S,0,tg,true,tm,etm,xl,xl,-0.22,-0.22);
			AddArcEvent(arc);
			arc = setArc(ArcLineType.S,0,tg,true,tm,etm,xr,xr,-0.22,-0.22);
			AddArcEvent(arc);
			arc = setArc(ArcLineType.S,0,tg,true,tm,tm,xl,xr,-0.22,-0.22);
			AddArcEvent(arc);
			arc = setArc(ArcLineType.S,0,tg,true,tm,tm,xl,xr,-0.22,-0.22);
			AddArcEvent(arc);
			arc = setArc(ArcLineType.S,0,tg,true,etm,etm,xr,xl,-0.22,-0.22);
			AddArcEvent(arc);
			arc = setArc(ArcLineType.S,0,tg,true,etm,etm,xr,xl,-0.22,-0.22);
			AddArcEvent(arc);

			RemoveArcEvent(note);
		} else if (note instanceof ArcArc && !note.IsVoid) {
			//General attributes
			var lt = note.LineType;
			var c = note.Color;
			var tg = note.TimingGroup;
			var tm = note.Timing;
			var etm = note.EndTiming;
			var xs = note.XStart
			var xe = note.XEnd;
			var ys = note.YStart;
			var ye = note.YEnd;

			if (isntOnlyFrame) {
				//Hide original arc
				arc = setArc(lt,c,hgTg,false,tm,etm,xs,xe,ys,ye);
				AddArcEvent(arc);
			}

			//Height indicator
			arc = setArc(lt,c,tg,true,tm,tm,xs+0.01,xs+0.01,ys-0.12,-0.22);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs+0.01,xs+0.01,ys-0.12,-0.22);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs-0.01,xs-0.01,ys-0.12,-0.22);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs-0.01,xs-0.01,ys-0.12,-0.22);
			AddArcEvent(arc);
			//Head
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs-0.09,ys+0.09,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs-0.09,ys+0.09,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs+0.09,ys+0.09,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs+0.09,ys+0.09,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs-0.09,ys-0.12,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs-0.09,ys-0.12,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs+0.09,ys-0.12,ys-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,tm,xs,xs+0.09,ys-0.12,ys-0.08);
			AddArcEvent(arc);
			//Body
			arc = setArc(lt,c,tg,true,tm,etm,xs,xe,ys+0.09,ye+0.09);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,etm,xs-0.09,xe-0.09,ys-0.08,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,tm,etm,xs+0.09,xe+0.09,ys-0.08,ye-0.08);
			AddArcEvent(arc);
			//Tail
			arc = setArc(lt,c,tg,true,etm,etm,xe,xe-0.09,ye+0.09,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,etm,etm,xe,xe-0.09,ye+0.09,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,etm,etm,xe,xe+0.09,ye+0.09,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,etm,etm,xe,xe+0.09,ye+0.09,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,etm,etm,xe+0.09,xe-0.09,ye-0.08,ye-0.08);
			AddArcEvent(arc);
			arc = setArc(lt,c,tg,true,etm,etm,xe+0.09,xe-0.09,ye-0.08,ye-0.08);
			AddArcEvent(arc);

			RemoveArcEvent(note);
		} else if (note instanceof ArcArc && note.IsVoid) {
			//General attributes
			var lt = note.LineType;
			var c = note.Color;
			var tg = note.TimingGroup;
			var tm = note.Timing;
			var etm = note.EndTiming;
			var xs = note.XStart
			var xe = note.XEnd;
			var ys = note.YStart;
			var ye = note.YEnd;

			var xtype = ArcLineTypeToEasing(note.LineType, "x");
			var ytype = ArcLineTypeToEasing(note.LineType, "y");
			if (isntOnlyFrame) {
				var original_arc = setArc(lt,c,hgTg,true,tm,etm,xs,xe,ys,ye);
				AddArcEvent(original_arc);
			}
			for (var ai=0; ai < note.ArcTaps.count; ai++) {
				if (isntOnlyFrame)	AddArcTap(original_arc, note.ArcTaps[ai]);
				var p = (note.ArcTaps[ai].Timing - note.Timing) / (note.EndTiming - note.Timing);
				var xpos = Ease.Easing(xtype, xs, xe, p);
				var ypos = Ease.Easing(ytype, ys, ye, p);

				var xl = xpos-0.24;
				var xr = xpos+0.24;
				var yu = ypos;
				var yd = ypos-0.18;
				tm = note.ArcTaps[ai].Timing;
				//Front
				arc = setArc(lt,c,tg,true,tm,tm,xl,xl,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xl,xl,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xr,xr,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xr,xr,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xl,xr,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xl,xr,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xl,xr,yd,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm,xl,xr,yd,yd);
				AddArcEvent(arc);
				//Body
				arc = setArc(lt,c,tg,true,tm,tm+17,xl,xl,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm+17,xl,xl,yd,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm+17,xr,xr,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm,tm+17,xr,xr,yd,yd);
				AddArcEvent(arc);
				//Back
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xl,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xl,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xr,xr,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xr,xr,yu,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xr,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xr,yu,yu);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xr,yd,yd);
				AddArcEvent(arc);
				arc = setArc(lt,c,tg,true,tm+17,tm+17,xl,xr,yd,yd);
				AddArcEvent(arc);
			}
			arc = setArc(lt,c,tg,true,tm,etm,xs,xe,ys,ye);
			AddArcEvent(arc);
			RemoveArcEvent(note);
		}
	}
}
 