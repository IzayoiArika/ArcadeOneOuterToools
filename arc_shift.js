
function OnLoad()
{
	return {
		"providers": ["arc_shift"],
		"info": {
			"arc_shift": {
				"name": "Arc平移工具",
				"params": ["X偏移","Y偏移"],
				"params_value": {
					"X偏移": "0.00",
					"Y偏移": "0.00"
				}
			}
		}
	}
}

function arc_shift(XShift, YShift) {
	var notes = GetSelectedNotes();
	if (notes.length < 1) return "请选择要平移的物件。";
	var XAlt = parseFloat(XShift);
	var YAlt = parseFloat(YShift);
	var note;
	for (var i = 0; i < notes.length; i++) {
	    note = notes[i];
	    if (!(note instanceof ArcArc)) continue;
		var arc = new ArcArc();
		arc.LineType = note.LineType;
		arc.Timing = note.Timing;
		arc.EndTiming = note.EndTiming;
		arc.Color = note.Color;
		arc.XStart = note.XStart + XAlt;
	    arc.XEnd = note.XEnd + XAlt;
		arc.YStart = note.YStart + YAlt;
		arc.YEnd = note.YEnd + YAlt;
		arc.IsVoid = note.IsVoid;
		arc.TimingGroup = note.TimingGroup;
		AddArcEvent(arc);
		for (var ai = 0; ai < note.ArcTaps.count; ai++) {
		    AddArcTap(arc, note.ArcTaps[ai]);
		}
		RemoveArcEvent(note);
	}
}
