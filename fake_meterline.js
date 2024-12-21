
function OnLoad()
{
	return {
		"providers": ["fake_meterline"],
		"info": {
			"fake_meterline": {
				"name": "伪小节线生成工具",
				"params": ["层数","长度调整","生成后删除原物件"],
				"params_value": {
					"层数": "1",
					"长度调整": "0.00",
					"生成后删除原物件": ""
				}
			}
		}
	}
}

function fake_meterline(layersCount, lengthDelta, isSubst) {
	
	var notes = GetSelectedNotes();
	
	if (notes.length != 1) return "请选择一个物件。";
	var note = notes[0];
	var lenDelta = parseFloat(lengthDelta);
	
	for (var i = 0; i < layersCount; i++)
	{
		var arc = new ArcArc();
		arc.LineType = ArcLineType.S;
    	arc.Timing = note.Timing;
    	arc.EndTiming = note.Timing;
	    arc.IsVoid = true;
    	arc.XStart = -0.5-lenDelta;
    	arc.XEnd = 1.5+lenDelta;
	    arc.YStart = -0.22;
	    arc.YEnd = -0.22;
	    arc.Color = 0;
    	arc.TimingGroup = note.TimingGroup;
		AddArcEvent(arc);
	}
	if (isSubst != "") RemoveArcEvent(note);
}
