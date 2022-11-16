
function OnLoad()
{
	return {
		"providers": ["enwiden_dealing"],
		"info": {
			"enwiden_dealing": {
				"name": "辅助工具 - 4k/6k转换工具 v1.7",
				"params": ["模式","开始时间","持续时间"],
				"params_value": {
				    "模式": "1",
				    "开始时间": "1000",
				    "持续时间": "5000"
				}
			}
		}
	}
}

function enwiden_dealing(mode, activatingTime, duration) {

	var notes = GetSelectedNotes();
	if (notes.length < 1) return "请选择要转换的物件。";
	
	for (var i = 0; i < notes.length; i++) {
	    var note = notes[i];
	    if (!(note instanceof ArcArc)) continue;
		var arc = new ArcArc();
		arc.LineType = note.LineType;
		arc.Timing = note.Timing;
		arc.EndTiming = note.EndTiming;
		arc.Color = note.Color;
		arc.IsVoid = note.IsVoid;
		arc.TimingGroup = note.TimingGroup;
		if (mode / 1 == 2) {
		    //Mode 2: 6k to 4k
		    arc.XStart = (note.XStart * 2 + 0.5) / 3;
	        arc.XEnd = (note.XEnd * 2 + 0.5) / 3;
		    arc.YStart = note.YStart / 1.61;
    		arc.YEnd = note.YEnd / 1.61;
    		
		}
		else if (mode / 1 == 3 || mode / 1 == 4) {
		    var perc;
		    //Mode 3 and 4: The process when changing 4k to 6k (as Mode 3), or 6k to 4k (as Mode 4)
		    activatingTime = activatingTime / 1;
		    duration = duration / 1;
		    
		    //Time percentage
		    perc = (arc.Timing - activatingTime) / duration;
		    //Reverse perc when Mode 4
		    if (mode / 1 == 4) perc = 1 - perc;
		    arc.XStart = (2 * note.XStart * ( 2 + perc) - perc) / 4;
		    arc.YStart = note.YStart * (1 + 0.61 * perc);
		    
		    perc = (arc.EndTiming - activatingTime) / duration;
		    if (mode / 1 == 4) perc = 1 - perc;
		    arc.XEnd = (2 * note.XEnd * ( 2 + perc) - perc) / 4;
		    arc.YEnd = note.YEnd * (1 + 0.61 * perc);
		    
		}
		else {
		    //Default (also Mode 1): 4k to 6k
		    arc.XStart = note.XStart * 1.5 - 0.25;
	        arc.XEnd = note.XEnd * 1.5 - 0.25;
		    arc.YStart = note.YStart * 1.61;
	    	arc.YEnd = note.YEnd * 1.61;
	    	
		}
		AddArcEvent(arc);
		for (var ai = 0; ai < note.ArcTaps.count; ai++) {
		    AddArcTap(arc, note.ArcTaps[ai]);
		}
		RemoveArcEvent(note);
	}
	
}
