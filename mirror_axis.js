
function OnLoad()
{
	return {
		"providers": ["mirror_axis"],
		"info": {
			"mirror_axis": {
				"name": "指定对称轴的镜像",
				"params": ["X方向对称轴"],
				"params_value": {
					"X方向对称轴": "0.5"
				}
			}
		}
	}
}

function mirror_axis(xC) {
    var XCenter = parseFloat(xC);
	var notes = GetSelectedNotes();
	if (notes.length < 1) return "请选择要镜像的物件。";
	var note;
	for (var i = 0; i < notes.length; i++) {
	    note = notes[i];
	    if (!(note instanceof ArcArc)) continue;
		var arc = new ArcArc();
		arc.LineType = note.LineType;
		arc.Timing = note.Timing;
		arc.EndTiming = note.EndTiming;
		arc.Color = note.Color;
		arc.XStart = 2*XCenter - note.XStart;
	    arc.XEnd = 2*XCenter - note.XEnd;
		arc.YStart = note.YStart;
	    arc.YEnd = note.YEnd;
		arc.IsVoid = note.IsVoid;
		arc.TimingGroup = note.TimingGroup;
		AddArcEvent(arc);
		for (var ai = 0; ai < note.ArcTaps.count; ai++) {
		    AddArcTap(arc, note.ArcTaps[ai]);
		}
		RemoveArcEvent(note);
	}
}
